import ChevronLeft from '@/icons/ChevronLeft';
import DotsVertical from '@/icons/DotsVertical';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Challenge {
  content: string;
  createdBy: number;
  imageURL: string;
  startDate: string;
  endDate: string;
  title: string;
}

interface ThumbnailProps {
  challenge: Challenge;
}

const ThumbnailSection = ({ challenge }: ThumbnailProps) => {
  const router = useRouter();

  return (
    <section className="relative w-full aspect-video">
      <Image src={challenge.imageURL} alt="썸네일 이미지" fill className="object-cover mb-5" />
      <header
        className="absolute w-full left-0 top-0 py-2 px-8 h-14 flex justify-between items-center z-10 text-white"
        style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.50)14.29%, rgba(0, 0, 0, 0.00)100%)' }}
      >
        <button onClick={() => router.back()} aria-label="뒤로가기">
          <ChevronLeft />
        </button>
        <h2 className="text-[14px] font-medium">챌린지 상세</h2>
        <DotsVertical width={24} height={24} />
      </header>
      <div
        className="absolute bottom-0 right-0 w-full p-4"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.50)14.97%, rgba(0, 0, 0, 0.00)100%)',
          transform: 'matrix(1, 0, 0, -1, 0, 0)',
        }}
      >
        <div className="flex justify-end" style={{ transform: 'inherit' }}>
          <ul className="inline-flex flex-row gap-3 rounded-[4px] border border-white/[0.2] text-[12px] leading-4 bg-opacity-20px-2 py-1 px-2">
            <li className="text-[#12F287]">참여 40</li>
            <li>인증 12</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ThumbnailSection;
