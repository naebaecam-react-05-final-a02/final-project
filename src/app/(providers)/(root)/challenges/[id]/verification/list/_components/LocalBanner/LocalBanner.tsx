import ArticleTitle from '../../../../../_components/ArticleTitle/ArticleTitle';

interface LocalBannerProps {
  users: number;
}

const LocalBanner = ({ users }: LocalBannerProps) => {
  return (
    <article className="w-full h-[92px] rounded-2xl bg-white/5 p-4 flex flex-col justify-between">
      <ArticleTitle icon="🏃‍♂️" title="만보 걷기 챌린지" />
      <p className="text-sm">
        오늘 벌써 총 <span className="text-primary-100">{users}명</span>이 인증했어요!
      </p>
    </article>
  );
};

export default LocalBanner;
