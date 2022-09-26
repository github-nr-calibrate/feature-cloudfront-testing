import React from 'react';
import Document, {
  Head, Html, Main, NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// Document creation date ref
const buildDate = new Date();

export default class extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="/fonts/fonts.css?v=2" />
          {this.props.styleTags}
        </Head>
        <body data-build={buildDate}>
          <Main />
          <NextScript />
          <script async defer type="text/javascript" src="//static.cdn.prismic.io/prismic.js?repo=calibrate&new=true" />
        </body>
      </Html>
    );
  }
}
