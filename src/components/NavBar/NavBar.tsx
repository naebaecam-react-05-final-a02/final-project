'use client';

import ChallengeIcon from '@/icons/ChallengeIcon';
import CommunityIcon from '@/icons/CommunityIcon';
import DashBoardIcon from '@/icons/DashBoardIcon';
import MyPageIcon from '@/icons/MyPageIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavItem from './NavItem';

interface NavBarProps {
  className?: string;
}

const NavBar = ({ className = '' }: NavBarProps) => {
  const pathname = usePathname();

  const navItems = [
    { icon: DashBoardIcon, text: '대시보드', href: '/' },
    { icon: CommunityIcon, text: '커뮤니티', href: '/community' },
    { icon: ChallengeIcon, text: '챌린지', href: '/challenges' },
    { icon: MyPageIcon, text: '마이페이지', href: '/mypage' },
  ];

  return (
    <div
      className={`flex flex-col w-full backdrop-blur-[20px] bg-black/70 rounded-t-2xl fixed bottom-0 max-w-[800px] ${className}`}
    >
      <div className="grid grid-cols-4 gap-1 px-2 ">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href} className="flex justify-center">
            <NavItem icon={item.icon} text={item.text} active={pathname === item.href} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
