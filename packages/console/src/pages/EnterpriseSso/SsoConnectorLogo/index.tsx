import { Theme } from '@logto/schemas';
import type { SsoConnectorWithProviderConfig } from '@logto/schemas';
import classNames from 'classnames';

import ImageWithErrorFallback from '@/ds-components/ImageWithErrorFallback';
import useTheme from '@/hooks/use-theme';

import * as styles from './index.module.scss';

type Props = {
  className?: string;
  containerClassName?: string;
  data: Pick<SsoConnectorWithProviderConfig, 'providerLogo' | 'providerLogoDark' | 'branding'>;
};

/**
 * Prioritize `branding` configuration:
 *   - Even if it's in light mode and have `branding.darkLogo` configured, use `branding.darkLogo`.
 */
const pickLogoForCurrentTheme = (
  isDarkMode: boolean,
  { logo, logoDark }: { logo: string; logoDark: string },
  branding: SsoConnectorWithProviderConfig['branding']
): string => {
  // Need to use `||` here since `??` operator can not avoid empty strings.
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const configuredLogo = isDarkMode ? branding.darkLogo : branding.logo || branding.darkLogo;
  const builtInLogo = isDarkMode ? logoDark : logo || logoDark;

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  return configuredLogo || builtInLogo;
};

function SsoConnectorLogo({ className, containerClassName, data }: Props) {
  const theme = useTheme();
  const isDarkMode = theme === Theme.Dark;
  const { providerLogo: logo, providerLogoDark: logoDark, branding } = data;

  return (
    <ImageWithErrorFallback
      containerClassName={classNames(styles.container, containerClassName)}
      className={classNames(styles.logo, className)}
      alt="logo"
      src={pickLogoForCurrentTheme(isDarkMode, { logo, logoDark }, branding)}
    />
  );
}

export default SsoConnectorLogo;
