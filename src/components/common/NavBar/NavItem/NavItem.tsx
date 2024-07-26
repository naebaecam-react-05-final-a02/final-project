import React from 'react';

interface NavItemProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, text, active = false }: NavItemProps) => {
  return (
    <div className={`flex flex-col justify-center items-center ${active ? 'text-green-500' : 'text-white/30'}`}>
      <Icon className={`w-6 h-6 ${active ? 'fill-green-500 stroke-green-500' : 'stroke-white/30'}`} />
      <h2 className="text-nowrap text-[12px] mt-1">{text}</h2>
    </div>
  );
};

export default NavItem;
