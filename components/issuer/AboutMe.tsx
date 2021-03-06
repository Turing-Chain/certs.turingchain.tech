import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useContext, memo } from 'react';
import { CertsContext } from '@/contexts/certs';
import AboutMeWrapper from '@/components/AboutMeWrapper';
import { media } from '@/utils/theme';
import { useTranslation } from 'react-i18next';
import { i18nNamespace } from '@/utils/constants';

const AboutMeWrapperExtend = styled(AboutMeWrapper)`
  justify-content: center;
  align-items: center;

  ${media('desktop')} {
    display: flex;
  }

  ${media('phone')} {
    display: inline;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 8.2em;
  height: 8.2em;

  > p {
    letter-spacing: 0.67px;
  }
  ${media('phone')} {
    font-size: 1em;
    float: right;
  }

  ${media('desktop')} {
    font-size: 1.2em;
  }
`;

const AnimatedNumber = styled(animated.p)`
  color: ${p => p.theme.colors.primary};
  margin-top: 3px;
  font-weight: bold;
  font-family: ${p => p.theme.fontFamily.SFText};

  ${media('phone')} {
    font-size: 2em;
    float: right;
  }

  ${media('desktop')} {
    font-size: 2em;
  }
`;

const AboutMe = memo(() => {
  const { certs } = useContext(CertsContext);
  const typeCount = certs.reduce<string[]>((acc, c) => {
    if (!acc.includes(c.name + c.issuer)) {
      acc.push(c.name + c.issuer);
    }
    return acc;
  }, []).length;
  const { t } = useTranslation(i18nNamespace.Issuer);

  const typeCountProps = useSpring({
    number: typeCount,
    from: { number: 0 },
  });
  const certsProps = useSpring({
    number: certs.length,
    from: { number: 0 },
  });

  const icons = [
    {
      name: t('AboutMe.icon1'),
      props: typeCountProps,
    },
    {
      name: t('AboutMe.icon2'),
      props: certsProps,
    },
  ];
  return (
    <AboutMeWrapperExtend title={t('AboutMe.title')}>
      {icons.map(icon => (
        <IconWrapper key={icon.name}>
          <p>{icon.name}</p>
          <AnimatedNumber>
            {icon.props.number.interpolate(x => x.toFixed(0))}
          </AnimatedNumber>
        </IconWrapper>
      ))}
    </AboutMeWrapperExtend>
  );
});

export default AboutMe;
