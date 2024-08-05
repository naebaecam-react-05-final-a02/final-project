import ChallengeSkeleton from './Challenge.skeleton';

interface CardListSkeletonProps {
  length: number;
}

const SkeletonCardList = ({ length }: CardListSkeletonProps) => {
  return Array.from({ length }).map((_, i) => (
    <li key={i}>
      <ChallengeSkeleton />
    </li>
  ));
};

export default SkeletonCardList;
