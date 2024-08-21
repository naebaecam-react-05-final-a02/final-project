'use client';

import Loading from '@/components/Loading/Loading';
import NavBar from '@/components/NavBar';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { lazy, Suspense, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CommunityListHeader from './CommunityListHeader';

const FloatingWriteButton = lazy(() => import('./FloatingWriteButton'));
const VotePostPreview = lazy(() => import('./VotePostPreview'));

const DynamicCommunityPosts = dynamic(() => import('./DynamicCommunityPosts'), {
  loading: () => <Loading />,
  ssr: false,
});

const categories = [{ value: '전체' }, { value: '자유 게시판' }, { value: 'Q&A 게시판' }, { value: '정보공유' }];

const CommunityPostList = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const { ref: buttonVisibilityRef, inView: buttonVisibilityInView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px 200px 0px',
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="relative min-h-screen overflow-hidden max-w-[800px] flex flex-col mx-auto">
      <CommunityListHeader
        categories={categories}
        onCategoryChange={handleCategoryChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <Suspense fallback={<Loading />}>
        <DynamicCommunityPosts
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          categories={categories.map((c) => c.value)}
        />
      </Suspense>
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
        <div className="max-w-[800px] mx-auto px-4 relative">
          <div className="absolute bottom-20 right-4 md:right-10 pointer-events-auto">
            <Link href="/community/write">
              <Suspense fallback={<Loading />}>
                <FloatingWriteButton inView={buttonVisibilityInView} />
              </Suspense>
            </Link>
          </div>
        </div>
      </div>
      <div ref={buttonVisibilityRef} className="h-0 relative -z-10" />
      <NavBar />
    </div>
  );
};

export default CommunityPostList;
