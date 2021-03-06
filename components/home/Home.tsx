import { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ScrollAnimation from 'react-animate-on-scroll';
import Section from '@/components/Section';
import { getRelativePath } from '@/utils';
import H1 from '@/components/H1';
import Button from '@/components/Button';
import { media } from '@/utils/theme';
import { i18nNamespace } from '@/utils/constants';

const Text = styled.p`
  margin-bottom: 8px;
  font-size: ${p => p.theme.fontSize.bigger};
  color: ${p => p.theme.colors.backgroundWordDarkGrey};
`;

const CNText = styled(Text)`
  letter-spacing: 1.5px;
`;

const Logo = styled.img`
  height: 25vh;
  ${media('desktop')} {
    height: 28vh;
  }
`;

const Title = styled(H1)`
  color: ${p => p.theme.colors.backgroundWordDarkGrey};
  margin: 0.6em 0 0.3em 0;
  white-space: pre-line;
`;

const Bg = styled.img`
  position: absolute;
  bottom: 0%;
  min-height: 100%;
  min-width: 100%;
`;

const Icon = styled.img`
  position: absolute;
  right: 5%;
  bottom: 10%;
  width: 15%;
`;

const TitleWrapper = styled(ScrollAnimation)`
  display: none;
  width: 80%;
  text-align: center;
  ${media('desktop')} {
    display: block;
    width: 100%;
  }
`;

const MobileTitleWrapper = styled(TitleWrapper)`
  display: block;
  span {
    &.cn {
      font-size: 2.3rem;
    }
  }
  ${media('desktop')} {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  a {
    text-decoration: none;
    color: white;
  }
`;

const Home: FC<{ id: string }> = ({ id }) => {
  const { t, i18n } = useTranslation(i18nNamespace.Home);
  return (
    <Section fullscreen id={id}>
      <Bg
        src={getRelativePath('/static/bg/bg.png')}
        srcSet={`${getRelativePath(
          '/static/bg/bg@2x.png',
        )} 2x, ${getRelativePath('/static/bg/bg@3x.png')} 3x`}
      />
      <Icon
        src={getRelativePath('/static/icon/Path 24.png')}
        srcSet={`${getRelativePath('/static/icon/Path 24@2x.png')} 2x`}
      />
      <ScrollAnimation animateIn="fadeInUp">
        <Logo src={require('../../static/logo/logo-new.svg')} />
      </ScrollAnimation>
      <TitleWrapper animateIn="fadeInUp" delay={400} offset={0}>
        <Title>
          {t('home.title.en')}
          {i18n.language === 'zh-TW' ? ` ${t('home.title.cn')}` : ''}
        </Title>
        <Text className="en">{t('home.subTitle')}</Text>
      </TitleWrapper>
      <MobileTitleWrapper animateIn="fadeInUp" delay={400} offset={0}>
        <Title>
          {t('home.title.en')} <br />
          {i18n.language === 'zh-TW' && (
            <span className="cn">{t('home.title.cn')}</span>
          )}
        </Title>
        <CNText>{t('home.mobileSubTitle')}</CNText>
      </MobileTitleWrapper>
      <ScrollAnimation animateIn="fadeInUp" delay={400} offset={0}>
        <StyledButton>
          <a href={t('home.loginLink')} target="_blank">
            {t('home.login')}
          </a>
        </StyledButton>
      </ScrollAnimation>
    </Section>
  );
};

export default Home;
