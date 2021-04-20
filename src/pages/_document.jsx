import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

import logger from '../helpers/logger';

process.on('unhandledRejection', err => {
  logger.error('unhandledRejection', err);
});

process.on('uncaughtException', err => {
  logger.error('uncaughtException', err);
});

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheets.getStyleElement()}
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
            rel="stylesheet"
          />
        </Head>
        <style jsx="true" global="true">
          {`
            body {
              margin: 0;
            }

            /* When mouse is detected, ALL focused elements have outline removed. */
            body.using-mouse :focus {
              outline: none;
            }
          `}
        </style>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
