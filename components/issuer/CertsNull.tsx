import { FC } from 'react';
import styled from 'styled-components';
import Button from '@/components/Button';
import { TMyCertsRenderComponentProps } from '@/components/Cert/MyCerts';
import { Router } from '@/i18n';
import { useTranslation } from 'react-i18next';
import { i18nNamespace } from '@/constants';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: ${p => p.theme.colors.darkGrey};
  }
`;

const NUllImg = styled.img`
  height: 25vh;
`;

const StyledButton = styled(Button)`
  margin: 1em 0;
`;

const CertsNull: FC<TMyCertsRenderComponentProps> = () => {
  const { t } = useTranslation(i18nNamespace.Issuer);
  return (
    <Wrapper>
      <NUllImg src={require('../../public/static/bg/bg-certs-empty.svg')} />
      <p>{t('Issue.notice.0')}</p>
      <p>{t('Issue.notice.1')}</p>
      <StyledButton
        mode="white"
        onClick={() =>
          Router.push(
            {
              pathname: '/issuer/issue-cert/[page]',
              query: {
                page: 1,
              },
            },
            '/issuer/issue-cert/1',
          )
        }
      >
        {t('Issue.issue')}
      </StyledButton>
    </Wrapper>
  );
};

export default CertsNull;
