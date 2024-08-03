import dayjs from 'dayjs';
import Image from 'next/image';

interface ChallengeCard {
  challenge: any;
}

const ChallengeCard = ({ challenge }: ChallengeCard) => {
  const today = dayjs();
  const ChallengeStartDate = dayjs(challenge.startDate);
  const restDate = ChallengeStartDate.diff(today, 'day') + 1;

  return (
    <article>
      <div className="relative w-full aspect-square overflow-hidden">
        <Image src={challenge.imageURL} alt={challenge.title} fill style={{ objectFit: 'cover' }} />
      </div>
      <h3 className="mt-2 text-lg font-semibold">{challenge.title}</h3>

      <span className="text-sm text-gray-500">{restDate === 0 ? '내일부터 시작' : `${restDate}일 뒤에 시작`}</span>
    </article>
  );
};

export default ChallengeCard;
