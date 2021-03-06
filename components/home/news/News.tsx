import { FC } from 'react';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import { SectionGrey } from '@/components/Section';
import H2 from '@/components/H2';
//import ScrollInfo from '@/components/ScrollInfo';
import Description from '@/components/Description';
import { getRelativePath } from '@/utils';
import { media } from '@/utils/theme';
import { i18nNamespace } from '@/utils/constants';
import { useTranslation } from 'react-i18next';
import Carousel from '@/components/home/news/Carousel';

const Title = styled(H2)`
  margin-top: 10vh;
  color: ${p => p.theme.colors.websiteCatelogWordGold};

  ${media('largeDesktop')} {
    margin-top: 10vh;
  }
`;

const News: FC<{ id: string }> = ({ id }) => {
  const { t } = useTranslation(i18nNamespace.Home);
  return (
    <SectionGrey justifyContent="center" id={id} fullscreen>
      <Title>{t('news.title')}</Title>
      <Carousel newsNumber={4} />
    </SectionGrey>
  );
};

export default News;
