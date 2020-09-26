import { FC } from 'react';
import styled from 'styled-components';

import { scrollToID } from '@/utils';
import { media } from '@/utils/theme';
import { Router } from '@/i18n';

import DarkWhiteLogo from '@/public/static/logo/logo-new-dark-white.svg';
import PrimaryWhiteLogo from '@/public/static/logo/logo-new-white.svg';

const LogoWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  > p {
    font-size: ${p => p.theme.fontSize.bigger};
    font-weight: 500;
  }

  ${media('desktop')} {
    > p {
      font-size: 1em;
    }
  }
`;

const Logo = styled.img`
  height: 97%;
  margin-right: 0.5em;

  ${media('desktop')} {
    height: 90%;
  }
`;

const modeSrcMap = {
  dark: DarkWhiteLogo,
  primary: PrimaryWhiteLogo,
};

const HeaderLogo: FC<{ mode?: 'primary' | 'dark'; onClick: () => void }> = ({
  mode = 'dark',
  onClick,
}) => {
  return (
    <LogoWrapper onClick={onClick}>
      <Logo src={modeSrcMap[mode] as any} />
      <p className="en">
        {/* <a href={'http://certs.turingchain.tech'}> */}
        TuringCerts
        {/* </a> */}
      </p>
    </LogoWrapper>
  );
};

export default HeaderLogo;
