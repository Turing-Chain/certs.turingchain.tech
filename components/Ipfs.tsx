import { NextComponentType } from 'next';
import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { getRelativePath } from '@/utils';
import queryString from 'query-string';

import Head from 'next/head';
import Side from '@/components/verifier/Proof';
import Certificate from '@/components/verifier/Certificate';
import { timeConverter } from '@/utils';

let Root = styled.div`
  width: 100%;
  height: 100vh;
  background: $fafafa;
`;

const Ipfs: NextComponentType = () => {
  const [date, setDate] = useState('-');
  const [issuerName, setIssuerName] = useState('-');
  const [type, setType] = useState('-');
  const [holderName, setHolderName] = useState('-');
  const [holderEmail, setEmail] = useState('-');
  const [IPFS, setIPFS] = useState('-');
  const [IOTA, setIOTA] = useState('-');
  const [issuerWebsite, setIssuerWebsite] = useState('-');
  const [zoomLevel, setZoomLevel] = useState(0.7);
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1170);
  const [holderId, setHolderId] = useState('-');
  const [issuerId, setIssuerId] = useState('-');

  useEffect(() => {
    if (window.innerWidth > 800)
      setZoomLevel(
        Math.min(window.innerWidth / 1920, window.innerHeight / 1170),
      );
    else setZoomLevel(window.innerWidth / 480);

    async function fetchCertsAPI() {
      const value = queryString.parse(window.location.search);
      const hash = value.hash;
      hash;
      await fetch(
        `https://x1certificate-aqkcbxdduq-uc.a.run.app/v1/view/certs?ipfs=${hash}`,
      )
        .then(res => res.json())
        .then(returnData => {
          setDate(timeConverter(returnData.content.timestamp));
          setIssuerName(returnData.content.issuerName);
          setType(returnData.content.type);
          setIPFS(returnData.content.ipfs);
          setIOTA(returnData.content.iOTAhash);
          setHolderName(returnData.content.holderName);
          setEmail(returnData.content.emailHolder);
          setIssuerWebsite(returnData.content.issuerWebsite);
          setHolderId(returnData.content.holder);
          setIssuerId(returnData.content.issuer);
        })
        .catch(console.log);
    }
    fetchCertsAPI();

    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      if (window.innerWidth > 800)
        setZoomLevel(
          Math.min(window.innerWidth / 1920, window.innerHeight / 1170),
        );
      else setZoomLevel(window.innerWidth / 480);
    }

    window.addEventListener('resize', handleResize);
  }, []);

  let RootStyle;
  if (width > 800) {
    RootStyle = {
      zoom: zoomLevel,
    };
  } else {
    RootStyle = {
      zoom: width / 480,
    };
  }
  return (
    <Root style={RootStyle}>
      <Head>
        <title>TuringVerifier</title>
        <link
          rel="stylesheet"
          type="text/css"
          href={getRelativePath('/static/css/ipfs.css')}
        />
      </Head>
      <Side
        date={date}
        issuerName={issuerName}
        type={type}
        holderName={holderName}
        holderEmail={holderEmail}
        ipfs={IPFS}
        iota={IOTA}
        issuerWebsite={issuerWebsite}
        issuerId={issuerId}
        holderId={holderId}
      />
      <Certificate ipfs={IPFS} />
    </Root>
  );
};

export default Ipfs;
