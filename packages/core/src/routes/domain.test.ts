import { type Domain, type CreateDomain } from '@logto/schemas';
import { pickDefault } from '@logto/shared/esm';

import { mockDomain, mockDomainResponse } from '#src/__mocks__/domain.js';
import { MockTenant } from '#src/test-utils/tenant.js';
import { createRequester } from '#src/utils/test-utils.js';

const { jest } = import.meta;

const domains = {
  findAllDomains: jest.fn(async (): Promise<Domain[]> => [mockDomain]),
  insertDomain: async (data: CreateDomain): Promise<Domain> => ({
    ...mockDomain,
    ...data,
  }),
  findDomainById: async (id: string): Promise<Domain> => {
    const domain = [mockDomain].find((domain) => domain.id === id);
    if (!domain) {
      throw new Error('Not found');
    }
    return domain;
  },
  deleteDomainById: jest.fn(),
};

const tenantContext = new MockTenant(undefined, { domains });

const domainRoutes = await pickDefault(import('./domain.js'));

describe('domain routes', () => {
  const domainRequest = createRequester({ authedRoutes: domainRoutes, tenantContext });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /domains', async () => {
    const response = await domainRequest.get('/domains');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([mockDomainResponse]);
  });

  it('GET /domains/:id', async () => {
    const response = await domainRequest.get(`/domains/${mockDomain.id}`);
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject(mockDomainResponse);
  });

  it('POST /domains', async () => {
    domains.findAllDomains.mockResolvedValueOnce([]);
    const response = await domainRequest.post('/domains').send({ domain: 'test.com' });
    expect(response.status).toEqual(201);
    expect(response.body.id).toBeTruthy();
    expect(response.body.domain).toEqual('test.com');
  });

  it('POST /domains should fail when there is already a domain', async () => {
    await expect(
      domainRequest.post('/domains').send({ domain: mockDomain.domain })
    ).resolves.toHaveProperty('status', 422);
  });

  it('DELETE /domains/:id', async () => {
    await expect(domainRequest.delete(`/domains/${mockDomain.id}`)).resolves.toHaveProperty(
      'status',
      204
    );
  });
});