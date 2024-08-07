'use client';

import SearchSVG from '@/assets/nav/search.svg';
import Header from '@/components/Header';
import Mobile from '@/layouts/Mobile';
import ChallengeList from '../_components/ChallengeList';
import WritingButton from '../_components/WritingButton';
import OrderTab from './_components/OrderTab/OrderTab';

const AllChallengesPage = () => {
  return (
    <Mobile
      headerLayout={
        <Header
          title={`챌린지 목록`}
          icon={<SearchSVG />}
          // titleIcon={<DownIcon />}
        />
      }
    >
      <section className="px-4 flex flex-col gap-2 ">
        <OrderTab />
        <ChallengeList />
        <WritingButton />
      </section>
    </Mobile>
  );
};

export default AllChallengesPage;
