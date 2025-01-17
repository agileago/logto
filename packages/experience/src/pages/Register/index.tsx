import { SignInMode } from '@logto/schemas';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import LandingPageLayout from '@/Layout/LandingPageLayout';
import Divider from '@/components/Divider';
import TextLink from '@/components/TextLink';
import { isDevFeaturesEnabled } from '@/constants/env';
import SocialSignInList from '@/containers/SocialSignInList';
import TermsAndPrivacy from '@/containers/TermsAndPrivacy';
import { useSieMethods } from '@/hooks/use-sie';

import ErrorPage from '../ErrorPage';

import IdentifierRegisterForm from './IdentifierRegisterForm';
import * as styles from './index.module.scss';

const Register = () => {
  const { signUpMethods, socialConnectors, signInMode, signInMethods, ssoConnectors } =
    useSieMethods();
  const { t } = useTranslation();

  if (!signInMode) {
    return <ErrorPage />;
  }

  if (signInMode === SignInMode.SignIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <LandingPageLayout title="description.create_your_account">
      {signUpMethods.length > 0 && (
        <IdentifierRegisterForm signUpMethods={signUpMethods} className={styles.main} />
      )}
      {signUpMethods.length === 0 && socialConnectors.length > 0 && (
        <>
          <TermsAndPrivacy className={styles.terms} />
          <SocialSignInList className={styles.main} socialConnectors={socialConnectors} />
        </>
      )}
      {
        // Single Sign On footer TODO: remove the dev feature check once SSO is ready
        isDevFeaturesEnabled && ssoConnectors.length > 0 && (
          <div className={styles.singleSignOn}>
            {t('description.use')}{' '}
            <TextLink to="/single-sign-on/email" text="action.single_sign_on" />
          </div>
        )
      }
      {
        // SignIn footer
        signInMode === SignInMode.SignInAndRegister && signInMethods.length > 0 && (
          <div className={styles.createAccount}>
            {t('description.have_account')} <TextLink replace to="/sign-in" text="action.sign_in" />
          </div>
        )
      }
      {
        // Social sign-in methods
        signUpMethods.length > 0 && socialConnectors.length > 0 && (
          <>
            <Divider label="description.or" className={styles.divider} />
            <SocialSignInList socialConnectors={socialConnectors} className={styles.main} />
          </>
        )
      }
    </LandingPageLayout>
  );
};

export default Register;
