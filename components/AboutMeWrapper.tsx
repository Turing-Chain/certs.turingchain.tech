import { useContext, FC } from 'react';
import { Router } from '@/i18n';
import Button from '@/components/Button';
import styled from 'styled-components';
import { UserContext } from '@/contexts/user';
import { media } from '@/utils/theme';
import Title from './Cert/Title';
import { useTranslation } from 'react-i18next';
import { i18nNamespace } from '@/utils/constants';

const Wrapper = styled.div`
  margin-top: 10%;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${Button} {
    width: 6em;
    padding: 0.7em 1em;
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${p => p.theme.colors.white};
  padding: 1.5em 0.5em;
  margin-top: 10px;

  ${media('largeDesktop')} {
    padding: 2em 8%;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.div<{ src: string }>`
  width: 4.5rem;
  height: 4.5rem;
  border: solid 1px #e6e6e6;
  background: url(${p => p.src}) center no-repeat/cover;
  margin-right: 1em;
  margin-left: 1.5em;
  border-radius: 50%;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-top: 15px;

  .name {
    white-space: nowrap;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: ${p => p.theme.fontSize.bigger};
    margin-bottom: 2px;
    margin-left: 0.5em;
  }

  .join-date {
    color: #bdbdbd;
    font-size: ${p => p.theme.fontSize.smaller};
  }
`;

type TProps = {
  title: string;
};

const AboutMeWrapper: FC<TProps> = ({ children, title }) => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation(i18nNamespace.Product);

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{title}</Title>
        <Button mode="white" onClick={() => Router.push('/auth/login')}>
          {t('AboutMe.logout')}
        </Button>
      </TitleWrapper>
      <InfoWrapper>
        <UserWrapper>
          <Avatar src={user.avatarUri} />
          <NameWrapper>
            <p className="name">{user.name || 'Me'}</p>
          </NameWrapper>
        </UserWrapper>
        {children}
      </InfoWrapper>
    </Wrapper>
  );
};

export default AboutMeWrapper;
