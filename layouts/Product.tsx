import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyles from '@/themes/GlobalStyles';
import NormalizeStyles from '@/themes/NormalizeStyles';
import { SITE_TITLE } from '@/constants';
import Header from '@/components/product/Header';
import Footer from '@/components/product/Footer';
import { media } from '@/utils/theme';
import { i18n } from '@/i18n';

const Main = styled.main`
  width: 75%;
  margin: auto;
  ${media('largeDesktop')} {
    width: 65%;
  }
`;

type TProps = {
  title?: string;
  children: React.ReactNode;
};

const ProductLayout: React.FunctionComponent<TProps> = ({
  children,
  title = SITE_TITLE,
}) => {
  return (
    <ThemeProvider
      theme={theme => {
        // light theme
        theme.color = theme.colors.smokyBlack;
        theme.background = theme.colors.backgroundWhite;

        // language
        theme.font =
          i18n.language === 'en'
            ? theme.fontFamily.SFText
            : theme.fontFamily.NotoSansTC;
        return theme;
      }}
    >
      <>
        <NormalizeStyles />
        <GlobalStyles />
        <Head>
          <title>{title}</title>
          <link
            rel="stylesheet"
            href="https://unpkg.com/react-day-picker/lib/style.css"
          />
        </Head>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </>
    </ThemeProvider>
  );
};

export default ProductLayout;