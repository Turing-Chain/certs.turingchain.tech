import { FC } from 'react';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import Section from '@/components/Section';
import H2 from '@/components/H2';
import H3 from '@/components/H3';
import { getRelativePath } from '@/utils';
import { media } from '@/utils/theme';
import { useTranslation } from 'react-i18next';
import { i18nNamespace } from '@/utils/constants';

const Title = styled(H2)`
  margin-bottom: 10vh;
  color: ${p => p.theme.colors.websiteCatelogWordGold};
  ${media('largeDesktop')} {
  }
`;

const Content = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const CEO = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CEOName = styled.p`
  font-size: 1.5rem;
  font-weight: 1000;
`;
const CEOposition = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
`;

const Profile = styled.img`
  width: 21vw;
  min-width: 200px;
  margin-top: 5%;
  margin-bottom: 5%;
`;

const TextBox = styled.div`
  ${media('pad')} {
    margin-left: 2em;
  }
  ${media('tablet')} {
    margin-left: 5em;
  }
`;

const Quote = styled(H3)`
  font-size: 20px;
  margin-top: 1em;
  margin-bottom: 2em;
`;

const Text = styled.p`
  width: 40vw;
  min-width: 250px;
  margin-bottom: 1em;
  text-align: left;
  line-height: 1.5;
  letter-spacing: 0.56px;

  &.en {
    opacity: 0.4;
    font-size: ${p => p.theme.fontSize.smaller};
  }
`;

const AboutUs: FC<{ id: string }> = ({ id }) => {
  const { t, i18n } = useTranslation(i18nNamespace.Home);

  return (
    <Section id={id} justifyContent="center" fullscreen>
      <Title>{t('aboutUs.title')}</Title>
      <Content>
        <ScrollAnimation animateIn="fadeInUp">
          <CEO>
            <Profile
              src={getRelativePath('/static/img/CEO.png')}
              srcSet={`${getRelativePath('/static/img/CEO@2x.png')} 2x`}
            />
            <CEOName>Jeff Hu</CEOName>
            <CEOposition>Turing Certs CEO</CEOposition>
          </CEO>
        </ScrollAnimation>
        <TextBox>
          <ScrollAnimation animateIn="fadeInUp" delay={400} offset={0}>
            <Quote>{t('aboutUs.quote')}</Quote>
            <Text>{t('aboutUs.descriptionP1')}</Text>
            <p></p>
            <Text>{t('aboutUs.descriptionP2')}</Text>
            <p></p>
            {/* delete en version by Jeff */}
            {i18n.language === 'zh-TW' ? (
              <Text>{t('aboutUs.descriptionP3')}</Text>
            ) : null}
            <p></p>
            <Text>{t('aboutUs.descriptionP4')}</Text>
          </ScrollAnimation>
        </TextBox>
      </Content>
    </Section>
  );
};

export default AboutUs;
