import Link from 'next/link';
import ChallengeCard from '../ChallengeCard';

interface ChallengeListProps {
  data: any;
}

const ChallengeList = ({ data }: ChallengeListProps) => {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {data.map((challenge: any) => (
        <li key={challenge.id}>
          <Link href={`/challenges/${challenge.id}/detail`}>
            <ChallengeCard challenge={challenge} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ChallengeList;
