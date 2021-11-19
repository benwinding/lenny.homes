import type { NextPage } from 'next'
import Head from 'next/head';
import React from 'react';
import moment from 'moment';
import { LayoutMain } from '../components/LayoutMain';

const Page: NextPage = () => {
  const primary = '#333'
  const secondary = '#000'
  const imageSrc = "/lenny.jpg";
  const Title = <div className="text-center">
    <h1>Lenny</h1>
    <h4 className="text-gray-300 italic -mt-3">{'"Homes"'}</h4>
  </div>;

  const donateLinks = [
    {
      href: '',
      imageUrl: '/donate_buttons/metamask.png'
    },
    {
      href: '',
      imageUrl: '/donate_buttons/patreon.png'
    },
    {
      href: '',
      imageUrl: '/donate_buttons/paypal.png'
    },
  ]

  const Donate = <div>
    <div className="text-center">
      <h1 className="font-bold">Donate</h1>
      <p className="text-xl">Do you like to <i>not</i> work? Met too! I{'\''}m looking to travel the world and not work, if you want to help fund my journey, please donate!</p>
    </div>

    <div className="my-3 flex gap-2 justify-center items-center">
      {donateLinks.map(({ href, imageUrl }) => <a key={href + imageUrl} href={href}>
        <img src={imageUrl} width={130} />
      </a>)}
    </div>

    <div className="text-center">
      <p className="text-xl">Remember every one of your dollars will help me get the best content to you! 😁</p>
      <DonateCount />
      <p className="mb-5 -mt-3 text-center font-bold">Raised so far!</p>
    </div>
  </div>

  return <LayoutMain color={{ primary, secondary }}>
    <Head>
      <meta property="og:title" content="Lenny" />
      <meta property="og:description" content="Homes" />
      <meta property="og:image" content={imageSrc} />
    </Head>
    <div className="flex flex-col items-center text-white">
      {Title}
      {Donate}
      <img src={imageSrc} width="100%" />
      <Reviews />
    </div>    
  </LayoutMain>
}

export default Page

function DonateCount() {
  const [count, setCount] = React.useState<string>();
  React.useEffect(() => {
    const now = new Date();
    const countStart = 3000;
    const countAddedSince = Date2Dollars(now, 12.9);
    const countWithCommas = (countStart + countAddedSince).toLocaleString();
    setCount(countWithCommas);
  }, []);
  return <h1 className="pr-3">${count}</h1>
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
  ];

  return <div className="w-full flex flex-col gap-2">
    <h1>Reviews</h1>
    {reviews.map((review) => <ReviewItem key={review.user + review.location} review={review} />)}
  </div>
}

function ReviewItem({review}: {review: Review}) {
  return <div className="text-black rounded-xl bg-gray-200 p-3">
    <span className="flex items-center gap-2">
      <p className="font-bold">{review.user}</p>
      <span className="flex-grow">({review.location})</span>
      <h5 className="text-xs text-gray-700">{review.created_at}</h5>
    </span>
    <p>{review.comment}</p>
  </div>
}