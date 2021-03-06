import { getRelativePath } from '@/utils';

/* head meta tag data */
export const SITE_TITLE = '圖靈證書 Turing Certs';
export const SITE_DESC =
  '區塊鏈成就履歷。不可篡改、無國界的優勢，重新定義傳統教育，創造穩定永續的學習旅程追蹤，強化官方證書的最高信任與真實價值。';
export const SITE_URL = 'www.0x1Certificate.com';
export const FAVICON_PATH = getRelativePath('/static/favicon-new.ico?ver=2.0');
export const LARGE_ICON_PATH = getRelativePath(
  '/static/large-icon-new.png?ver=2.0',
);
export const NAV_TITLE = 'nav title';

export enum i18nNamespace {
  Common = 'common',
  Home = 'home',
  Demo = 'demo',
  Issuer = 'issuer',
  Product = 'product',
}

export const GA_ID = process.env.GA_ID;

export const API_ENDPOINT = 'https://x1certificate-aqkcbxdduq-uc.a.run.app/v1';

export const langsMap: { [key: string]: boolean } = {
  'zh-TW': true,
  en: true,
};
