import dayjs from 'dayjs';
import Image from 'next/image';

interface ChallengeCard {
  challenge: any;
}

const ChallengeCard = ({ challenge }: ChallengeCard) => {
  console.log(challenge.startDate);
  const today = dayjs();
  const ChallengeStartDate = dayjs(challenge.startDate);
  const restDate = ChallengeStartDate.diff(today, 'day') + 1;
  console.log(restDate);

  return (
    <article>
      <div className="relative w-full aspect-square rounded-xl overflow-hidden">
        <Image src={challenge.imageURL} alt={challenge.title} fill style={{ objectFit: 'cover' }} />
      </div>
      <h3 className="mt-2 text-lg font-semibold">{challenge.title}</h3>

      <span className="text-sm text-gray-500">{restDate === 1 ? '내일부터 시작' : `${restDate}일 뒤에 시작`}</span>
    </article>
  );
};

export default ChallengeCard;
