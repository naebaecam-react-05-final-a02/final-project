interface CardListSkeletonProps {
  length: number;
}

const SkeletonCardList = ({ length }: CardListSkeletonProps) => {
  return Array.from({ length }).map((_, i) => (
    <li key={i}>
      <article className="flex flex-col gap-2">
        <div className="relative w-full aspect-square overflow-hidden bg-gray-200"></div>
        <div className="h-7 w-20 bg-gray-200 " />
        <div className="h-4 w-32 bg-gray-200 " />
      </article>
    </li>
  ));
};

export default SkeletonCardList;
