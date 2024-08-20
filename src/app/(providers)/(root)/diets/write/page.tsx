'use client';
import Header from '@/components/Header';
import Mobile from '@/layouts/Mobile';
import DietForm from './_components/DietForm';

const PostDietPage = ({ searchParams }: { searchParams: { mode: string } }) => {
  const isEditMode = searchParams.mode === 'edit';

  return (
    <Mobile headerLayout={<Header title={`식단 ${isEditMode ? '수정' : '추가'}하기`} />}>
      <div className="flex flex-col">
        <span className="w-10 mb-4" aria-hidden="true" role="presentation"></span>
        <DietForm />
      </div>
    </Mobile>
  );
};

export default PostDietPage;
