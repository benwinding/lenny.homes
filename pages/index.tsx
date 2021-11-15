import type { NextPage } from 'next'
import Head from 'next/head';
import React from 'react';
import { LayoutMain } from '../components/LayoutMain';

const Page: NextPage = () => {
  const primary = '#333'
  const secondary = '#000'
  const imageSrc = "/lenny.jpg";
  return <LayoutMain color={{primary, secondary}}>
    <Head>
      <meta property="og:title" content="Lenny" />
      <meta property="og:description" content="Homes" />
      <meta property="og:image" content={imageSrc} />
    </Head>
    <div className="flex flex-col items-center">
    <h1 className="text-white">Lenny</h1>
    <h4 className="text-gray-300 italic">{'"Homes"'}</h4>
    <img src={imageSrc} />
    </div>
  </LayoutMain>
}

export default Page
