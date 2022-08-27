import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../lib/theme';
import Layout from '../components/layout/main/layout';


function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout path={router.asPath}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
