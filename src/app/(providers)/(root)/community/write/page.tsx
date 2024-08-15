import CommunityPostForm from './_components/CommunityPostForm';

const CommunityWritePage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden max-w-[900px] flex flex-col mx-auto">
      <div className="fixed inset-0 bg-[#0E0C15] -z-30 overflow-hidden">
        <div className="w-[140px] h-[300px] absolute top-[70px] left-[48px] blur-[90px] rounded-full bg-[#52467B]"></div>
        <div className="w-[340px] h-[105px] absolute bottom-[110px] right-[-24px] blur-[90px] bg-white/40 rounded-full"></div>
      </div>
      <CommunityPostForm />
    </div>
  );
};

export default CommunityWritePage;
