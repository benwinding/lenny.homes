import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

class MyDocument extends Document {
  render() {
    return <Html lang="en" translate="no">
      <Head />
      <body className={"font-sans antialiased leading-normal tracking-wider bg-cover"}>
        <Main />
        <NextScript />
      </body>
    </Html>;
  }
}

export default MyDocument