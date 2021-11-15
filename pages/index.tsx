import type { NextPage } from 'next'
import React from 'react';
import { LayoutMain } from '../components/LayoutMain';

const Page: NextPage = () => {
  const primary = '#333'
  const secondary = '#000'
  return <LayoutMain color={{primary, secondary}}>
    <div className="flex flex-col items-center">
    <h1 className="text-white">Lenny</h1>
    <h4 className="text-gray-300 italic">{'"Homes"'}</h4>
    <img src="/lenny.jpg" />
    </div>
  </LayoutMain>
}

export default Page
