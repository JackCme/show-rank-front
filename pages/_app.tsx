import '../styles/globals.css';
import type { AppProps } from 'next/app';

// pages/_app.js
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

// Font files can be colocated inside of `pages`
// const myFont = localFont({
//   src: '../styles/fonts/woff2/PretendardVariable.woff2',
//   preload: true,
// });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  const router = useRouter();

  return getLayout(<Component key={router.asPath} {...pageProps} />);
}
