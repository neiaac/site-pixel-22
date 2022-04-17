import { Helmet } from 'react-helmet';

import { AuthContext } from '../hooks/useAuth';

import '../styles/base.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContext>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pixel D'Ouro 2022</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="http://fonts.cdnfonts.com/css/minion-pro"
          rel="stylesheet"
        ></link>
      </Helmet>
      <Component {...pageProps} />
    </AuthContext>
  );
}

export default MyApp;
