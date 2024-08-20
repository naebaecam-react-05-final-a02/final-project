import BackBoard from '@/layouts/Mobile/BackBoard';
import Image from 'next/image';
import LoadingImage from '/public/icons/loading.png';

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen fixed top-0 left-0 bg-[#00000088] z-50">
      <Image className="animate-spin" width={35} height={35} src={LoadingImage} alt="로딩이미지" />
      <BackBoard />
    </div>
  );
};

export default Loading;
