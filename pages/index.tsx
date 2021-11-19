import type { NextPage } from 'next'
import Head from 'next/head';
import React from 'react';
import moment from 'moment';
import clipboard from 'clipboard';
import { LayoutMain } from '../components/LayoutMain';

const Page: NextPage = () => {
  const primary = '#333'
  const secondary = '#000'
  const imageSrc = "/lenny.jpg";
  const Title = <div className="text-center">
    <h1>Lenny</h1>
    <h4 className="text-gray-300 italic -mt-3">{'"Homes"'}</h4>
  </div>;

  const PAYPAL_LINK = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=lennycees%40gmail.com&item_name=Lamping&currency_code=AUD&source=url'
  const donateLinks = [
    {
      href: PAYPAL_LINK,
      imageUrl: '/donate_buttons/metamask.png'
    },
    {
      href: PAYPAL_LINK,
      imageUrl: '/donate_buttons/patreon.png'
    },
    {
      href: PAYPAL_LINK,
      imageUrl: '/donate_buttons/paypal.png'
    },
  ]

  const cryptoLinks = [
    {
      name: 'Bit Coin',
      imageUrl: '/crypto/bitcoin.png',
      address: '3ApvrCVctiP5UikNRJGdgFwi1GxLWtfEKm',
    },
    {
      name: 'Ethereum',
      imageUrl: '/crypto/ethereum.png',
      address: '0x4273FE90482ef91c5a8246642Dce4469574a908e',
    },
    {
      name: 'Hex',
      imageUrl: '/crypto/hex.png',
      address: '0x4273FE90482ef91c5a8246642Dce4469574a908e',
    },
    {
      name: 'Pulse Chain',
      imageUrl: '/crypto/pulse-chain.png',
      address: '0x4273FE90482ef91c5a8246642Dce4469574a908e',
    },
  ]

  const Donate = <div>
    <div className="text-center">
      <h1 className="font-bold">Donate</h1>
      <p className="text-xl">Do you like to <i>not</i> work? Me too! I{'\''}m looking to travel the world and <i>not</i> work, if you want to help fund my journey, please donate!</p>
    </div>

    <h3 className="text-center font-bold">Centralised</h3>
    <div className="my-3 flex gap-2 items-center justify-center">
      {donateLinks.map(({ href, imageUrl }) => <a key={href + imageUrl} href={href}>
        <img src={imageUrl} width={130} />
      </a>)}
    </div>

    <h3 className="text-center font-bold">Decentralised</h3>
    <div className="flex justify-center">
      <div className="w-full max-w-2xl my-3 flex-col gap-y-2 items-center">
        {cryptoLinks.map(({ name, imageUrl, address }, i) =>
          <CryptoCard name={name} imageUrl={imageUrl} address={address} key={imageUrl} index={i} />
        )}
      </div>
    </div>

    <div className="flex flex-col items-center gap-3">
      <p className="text-xl">Remember every one of your dollars will help me get the best content to you! 😁</p>
      <DonateCount />
      <h4 className="mb-5 font-bold">Raised so far!</h4>
    </div>
  </div>

  const Image = <div className="flex justify-center"><div className="w-full max-w-2xl">
    <img className="rounded-xl" src={imageSrc} width="100%" />
  </div></div>;

  return <LayoutMain color={{ primary, secondary }}>
    <Head>
      <meta property="og:title" content="Lenny" />
      <meta property="og:description" content="Homes" />
      <meta property="og:image" content={imageSrc} />
    </Head>
    <div className="flex flex-col gap-2 items-center text-white">
      {Title}
      {Image}
      {Donate}
      <Reviews />
    </div>
  </LayoutMain>
}

export default Page

function CryptoCard(props: { imageUrl: string, name: string, address: string, index: number }) {
  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    if (buttonRef.current) {
      const clip = new clipboard(buttonRef.current);
      return () => {clip.destroy()}
    }
  }, [buttonRef?.current]);

  const id = 'id_crypto_' + props.index
  
  return <div className="p-3 bg-gray-700 flex gap-2 m-0 mt-2 rounded-xl">
    <div><img src={props.imageUrl} width={40} /></div>
    <div className="w-full">
      <div className="font-mono select-none">{props.name}</div>     
      <div className="flex gap-2">
        <input type="text" className="font-mono text-xs md:text-xl px-2 break-all bg-black flex-grow w-full" contentEditable={false} readOnly id={id} value={props.address} onChange={() => {}}/>
        <button ref={buttonRef} className="bg-gray-400 rounded p-2" data-clipboard-target={"#"+id}>Copy</button>
      </div> 
    </div>
  </div>
}

function DonateCount() {
  const [count, setCount] = React.useState<string>();
  React.useEffect(() => {
    const now = new Date();
    const countStart = 3000;
    const countAddedSince = Date2Dollars(now, 12.9);
    const countWithCommas = (countStart + countAddedSince).toLocaleString();
    setCount(countWithCommas);
  }, []);

  return <h1 className="pr-3 text-green-200 font-bold font-mono text-7xl md:text-8xl" >{count && ('$'+count)}</h1>
}

function Date2Dollars(endDate: Date, perHour: number): number {
  const m = moment('2021-11-17', 'YYYY-MM-DD');
  const diff = -m.diff(endDate, 'hours');
  return Math.round(diff * perHour);
}

type Review = {
  user: string,
  location: string,
  comment: string,
  created_at: string,
}

function MakeReviewObj(user: string, location: string, comment: string, dateStr: string): Review {
  return {
    user,
    location,
    comment,
    created_at: moment(dateStr, 'YYYY-MM-DD').format('LL'),
  }
}

function Reviews() {
  const reviews = [
    MakeReviewObj('Dave Serin', 'Whyalla, SA', 'I worked hard for this money, but you deserve it more, have a good one!', '2021-10-16'),
    MakeReviewObj('Michael', 'Whyalla, SA', 'You\'re doing important things, a few bucks is the least I can do for ya! :)', '2021-10-26'),
    MakeReviewObj('Daniel Roberts', 'Adelaide, SA', 'Thanks for everything you do Guru, enjoy the ride bruzzy 🤙', '2021-10-27'),
    MakeReviewObj('Annonymous', '-, SA', 'WTF is this? Are you really asking people to give you money to go on holiday!!? Disgusting', '2021-10-28'),
    MakeReviewObj('Lenny Fan', 'Robe, SA', 'Don\'t let the haters get you down Lou, keep doing what you do bro! 👌👌👌', '2021-10-29'),
    MakeReviewObj('Darl Bigging', 'Henly, SA', 'At least he\'s honest about where the money is going, good on him.', '2021-11-03'),
  ];

  return <div className="w-full flex flex-col gap-2">
    <h1 className="text-center">Reviews</h1>
    {reviews.map((review) => <ReviewItem key={review.user + review.location} review={review} />)}
  </div>
}

function ReviewItem({ review }: { review: Review }) {
  return <div className="text-black rounded-xl bg-gray-300 p-3">
    <span className="flex items-center gap-2">
      <p className="font-bold">{review.user}</p>
      <span className="flex-grow">({review.location})</span>
      <h5 className="text-xs text-gray-700">{review.created_at}</h5>
    </span>
    <p>{review.comment}</p>
  </div>
}