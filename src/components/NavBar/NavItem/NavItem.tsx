import React from 'react';

interface NavItemProps {
  icon: React.ComponentType<{ className?: string; active?: boolean }>;
  text: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, text, active = false }: NavItemProps) => {
  return (
    <div className="relative flex flex-col justify-center items-center h-[72px] w-full max-w-[97.5px]">
      {active && <span className="absolute bottom-0 left-0 right-0 h-[36px] bg-radial-gradient rounded-full" />}
      <div className={`relative z-10 flex flex-col items-center ${active ? 'text-[#12F287]' : 'text-white/30'}`}>
        <Icon className="w-6 h-6" active={active} />
        <h2 className="text-nowrap text-[12px] mt-1">{text}</h2>
      </div>
    </div>
  );
};
export default NavItem;
