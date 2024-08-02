import ChallengeItem from '../ChallengeItem';

const ChallengeList = () => {
  return (
    <ul className="flex flex-col gap-2">
      {Array.from({ length: 10 }, (_, i) => {
        return (
          <li key={i}>
            <ChallengeItem />
          </li>
        );
      })}
    </ul>
  );
};

export default ChallengeList;
