import CheckCircle from '@/icons/CheckCircle/CheckCircle';
import Image from 'next/image';
import Title from '../Title';

interface Challenge {
  content: string;
  createdBy: number;
  imageURL: string;
  startDate: string;
  endDate: string;
  title: string;
}

interface User {
  profileURL?: string | null;
  nickname?: string | null;
}

interface ChallengeInfoMethodProps {
  id: number;
  challenge: Challenge;
  challengeAuthor: User | null;
}

const ChallengeInfoMethod = ({ id, challenge, challengeAuthor }: ChallengeInfoMethodProps) => {
  return (
    <article className="mb-2 px-4">
      <div className="mb-4 flex flex-row gap-2">
        <CheckCircle />
        <Title>챌린지 인증 방법</Title>
      </div>
      <div className="flex flex-row gap-2">
        <div className="relative w-5 h-5 border-white border rounded-full overflow-hidden">
          <Image
            src={challengeAuthor?.profileURL ?? '/default-profile.png'}
            alt={'username'}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <p
          className="mt-[10px] py-2 px-4 border-2 border-white/[0.1] rounded-2xl rounded-tl-none w-full text-[14px]"
          style={{
            background: 'linear-gradient(95deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0.06) 100%)',
          }}
        >
          {challenge.content}
        </p>
      </div>
    </article>
  );
};

export default ChallengeInfoMethod;
