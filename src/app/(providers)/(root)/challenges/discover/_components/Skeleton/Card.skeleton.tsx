interface CardListSkeletonProps {
  length: number;
}

const SkeletonCardList = ({ length }: CardListSkeletonProps) => {
  return Array.from({ length }).map((_, i) => (
    <li key={i}>
      <article className="flex flex-col gap-2">
        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-200"></div>
        <div className="h-7 w-full bg-gray-200 rounded-full" />
        <div className="h-4 w-full bg-gray-200 rounded-full" />
      </article>
    </li>
  ));
};

export default SkeletonCardList;
