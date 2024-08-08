import LogoSVG from '@/assets/mockup/intro-logo.svg';
import Button from '@/components/Button';
import Link from 'next/link';

const Introduction = () => {
  return (
    <article className="w-[420px] flex flex-col items-center text-white gap-8">
      <LogoSVG />
      <div className="text-lg flex flex-col gap-2">
        <p>안녕하세요 저희는 헬스케어 브랜드 OOSIE 입니다.</p>
        <p>현재 데스크톱 버전에서는 모바일 인터페이스가 제공됩니다.</p>
        <p>현재 주요하게 제공되는 기능은 아래와 같습니다.</p>
      </div>
      <div className="text-lg">
        <ul className="list-disc text-xl flex flex-col gap-4">
          <li>대시보드 조희</li>
          <li>운동 투두 기록 및 수정, 삭제</li>
          <li>식단 기록 및 수정, 삭제</li>
          <li>챌린지 생성 및 수정, 삭제</li>
          <li>챌린지 참여 및 챌린지 인증</li>
          <li>마이페이지 조회 및 수정</li>
        </ul>
      </div>
      <Link href="https://forms.gle/aQdsM1RdQuSKjVes5" target="_blank">
        <div className="w-40">
          <Button>피드백 설문 참여하기</Button>
        </div>
      </Link>
    </article>
  );
};

export default Introduction;
