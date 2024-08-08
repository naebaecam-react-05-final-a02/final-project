'use client';

import ChallengeIcon from '@/icons/ChallengeIcon';
import CommunityIcon from '@/icons/CommunityIcon';
import DashBoardIcon from '@/icons/DashBoardIcon';
import MyPageIcon from '@/icons/MyPageIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavItem from './NavItem';

const NavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: DashBoardIcon, text: '대시보드', href: '/' },
    { icon: CommunityIcon, text: '커뮤니티', href: '#', unimplemented: true },
    { icon: ChallengeIcon, text: '챌린지', href: '/challenges' },
    { icon: MyPageIcon, text: '마이페이지', href: '/mypage' },
  ];

  const handleUnimplementedClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    alert('아직 준비중인 기능입니다.');
  };

  return (
    <div className="flex flex-col w-full bg-black/70 rounded-t-2xl">
      <div className="grid grid-cols-4 gap-1 px-2 ">
        {navItems.map((item) =>
          item.unimplemented ? (
            <div key={item.text} className="flex justify-center cursor-not-allowed" onClick={handleUnimplementedClick}>
              <NavItem icon={item.icon} text={item.text} active={false} />
            </div>
          ) : (
            <Link href={item.href} key={item.href} className="flex justify-center">
              <NavItem icon={item.icon} text={item.text} active={pathname === item.href} />
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

export default NavBar;
