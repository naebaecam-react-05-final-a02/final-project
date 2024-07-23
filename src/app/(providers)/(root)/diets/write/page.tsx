import DietForm from './_components/DietForm';

const PostDietPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold">식단 기록</h1>
      <DietForm />
    </div>
  );
};

export default PostDietPage;
