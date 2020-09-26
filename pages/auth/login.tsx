import { NextComponentType } from 'next';

import { i18nNamespace } from '@/constants';
import AuthLayout from '@/layouts/Auth';
import Login from '@/components/auth/Login';

const LoginPage: NextComponentType = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};

LoginPage.getInitialProps = () => {
  return {
    namespacesRequired: [
      i18nNamespace.Common,
      i18nNamespace.Issuer,
      i18nNamespace.Register,
    ],
  };
};

export default LoginPage;
