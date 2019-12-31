import { FC, useState, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { TRenderComponentProps } from '@/pages/issuer/issue-cert/[page]';

import { templateStyles } from '@/constants';
import { runtimeEnv } from '@/environment';
import { Router } from '@/i18n';
import { uploadCertTemplate, issueCertByCSV } from '@/utils/api';
import { dataURItoBlob } from '@/utils';
import { UserContext } from '@/contexts/user';
import notify from '@/utils/notify';
import { CertsContext } from '@/contexts/certs';

import BackPage from '../BackPage';
import IssueTitleSection from './TitleSection';
import Button from '../Button';
import Step from '../Step';
import TextInput from '../TextInput';
import Loading from '../Loading';

import { useTranslation } from 'react-i18next';
import { i18nNamespace } from '@/constants';

const StyledBackPage = styled(BackPage)`
  margin-top: 7%;
`;

const StyledTextInput = styled(TextInput)`
  width: 50%;
`;

const SectionWrapper = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem 2.5rem;
`;

const SectionTitle = styled.p`
  color: ${p => p.theme.colors.primary};
  letter-spacing: 1px;
  font-weight: 400;
  margin-bottom: 1em;
`;

const StyledButton = styled(Button)`
  min-width: 10rem;
  padding: 0.7em 1em;
  margin: 3% auto 10px;
`;

const CertImg = styled.img`
  width: 80%;
  margin: 0 auto 1em;
`;

const CertName = styled(SectionTitle)`
  font-size: ${p => p.theme.fontSize.bigger};
`;

const Error = styled.p`
  font-weight: 400;
  text-align: center;
  color: ${p => p.theme.colors.primary};
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: ${p => p.theme.fontSize.smaller};
`;

const IssuePage2: FC<TRenderComponentProps> = ({ value }) => {
  const { user } = useContext(UserContext);
  const { updateCerts } = useContext(CertsContext);
  const [loadingText, setLoadingText] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    message: '',
    count: 0,
  });
  const { t } = useTranslation(i18nNamespace.Issuer);

  const cert = templateStyles.find(t => t.key === value.template);

  const onSubmit = useCallback(async () => {
    if (error.count >= 3) {
      notify.error({ msg: t('Issue.errorPwd') });
      window.scrollTo({ top: 0 });
      Router.push('/issuer');
      return;
    } else if (password === runtimeEnv.MVP.issuePassword) {
      setLoadingText(t('Issue.uploadTemplate'));
      // upload template cert
      const templateFormData = new FormData();
      templateFormData.append('issuer', user.name);
      templateFormData.append('type', value.type);
      templateFormData.append('itemsCount', '1');
      templateFormData.append('fontFamily[0]', 'Georgia');
      templateFormData.append('fontSize[0]', '60');
      templateFormData.append('color[0]', 'black');
      templateFormData.append('height[0]', '460');
      templateFormData.append('width[0]', '450');
      templateFormData.append('certFile', dataURItoBlob(cert!.uri));
      await uploadCertTemplate(templateFormData);
      if (value.csv) {
        // issue cert by csv
        setLoadingText(t('Issue.step4.issuing'));
        const formData = new FormData();
        formData.append('issueFile', value.csv);
        await issueCertByCSV(formData);

        // FIXME: temporary use setTimeout to add new cert
        setTimeout(
          () =>
            updateCerts(certs => [
              ...certs,
              {
                type: value.type,
                ipfs: '',
                issuer: user.name,
                name: value.type,
                timestamp: 0,
                coverUri: cert!.uri,
                verified: false,
                pin: false,
                progress: [true, false, false, false, false],
                issuing: true,
              },
            ]),
          2000,
        );
      }
      notify.success({ msg: `${t('Issue.step4.success0')} ${value.type} ${t('Issue.step4.success1')}` });
      Router.push('/issuer');
    } else {
      setError({
        message: `${t('Issue.step4.notice0')} ${3 - error.count} ${t('Issue.step4.notice1')}`,
        count: error.count + 1,
      });
    }
  }, [password, value, error]);

  return (
    <>
      <StyledBackPage />
      <Step>STEP 3</Step>
      <IssueTitleSection title={t('Issue.step3.preview')}>
        <SectionWrapper style={{ textAlign: 'center' }}>
          {cert && <CertImg src={cert.uri} />}
          <CertName>{value.type}</CertName>
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
            {t('Issue.step3.edit')}
          </StyledButton>
        </SectionWrapper>
      </IssueTitleSection>
      <Step>STEP 4</Step>
      <IssueTitleSection title={t('Issue.step4.enterPwd')}>
        <SectionWrapper>
          <SectionTitle>{t('Issue.step4.pwd')}</SectionTitle>
          <StyledTextInput
            placeholder={t('Issue.step4.pwdFormat')}
            value={password}
            onChange={setPassword}
            input={{ type: 'password' }}
          />
        </SectionWrapper>
      </IssueTitleSection>
      {error.count ? <Error>{error.message}</Error> : null}
      <StyledButton style={{ marginTop: '10%' }} onClick={onSubmit}>
        {loadingText ? <Loading /> : t('Issue.issue')}
      </StyledButton>
      {loadingText && <LoadingText>({loadingText})</LoadingText>}
    </>
  );
};

export default IssuePage2;
