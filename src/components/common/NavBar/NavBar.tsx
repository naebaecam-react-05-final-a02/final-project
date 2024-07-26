import ChallengeIcon from '@/icons/ChallengeIcon';
import CommunityIcon from '@/icons/CommunityIcon';
import DashBoardIcon from '@/icons/DashBoardIcon';
import MyPageIcon from '@/icons/MyPageIcon';
import NavItem from './NavItem';

const NavBar = () => {
  return (
    <div className="flex flex-col bg-[#111111] p-1 gap-1">
      <div className="flex justify-around bg-[#1a1a1a] rounded-lg p-2">
        <NavItem icon={DashBoardIcon} text="대시보드" active={true} />
        <NavItem icon={CommunityIcon} text="커뮤니티" />
        <NavItem icon={ChallengeIcon} text="챌린지" />
        <NavItem icon={MyPageIcon} text="마이페이지" />
      </div>
    </div>
  );
};

export default NavBar;
