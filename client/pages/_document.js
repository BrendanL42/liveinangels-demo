/* eslint-disable react/jsx-filename-extension */
import React from "react";
import Document, { Html, Main, NextScript, Head } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";



export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
      <meta name="robots" content="noindex"/>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          
          <link href="https://fonts.googleapis.com/css2?family=Montez&display=swap" rel="stylesheet" />

          <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Montserrat:wght@200&display=swap" rel="stylesheet" />


          <link
            href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,500;1,400&display=swap"
            rel="stylesheet"
          />
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap" rel="stylesheet"></link>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />

          <script src="https://use.fontawesome.com/91bdcb6117.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
