'use client';

import DotsVertical from '@/icons/DotsVertical';
import { useEffect, useState } from 'react';

interface DetailMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

const DetailMenu = ({ onEdit, onDelete, onOpenChange }: DetailMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    onOpenChange(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.detail-menu')) {
        setIsMenuOpen(false);
        onOpenChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, onOpenChange]);

  return (
    <div className="relative detail-menu z-[9999]">
      <DotsVertical onClick={handleMenuToggle} className="z-20" />
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-24 rounded-lg shadow-lg bg-white/10 backdrop-blur-[20px] border-2 border-primary-50 z-50">
          <ul className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <li
              onClick={() => {
                onEdit();
                setIsMenuOpen(false);
                onOpenChange(false);
              }}
              className="block px-4 py-2 text-sm text-white/50 hover:bg-primary-10 hover:text-primary-100 w-full text-center rounded-md text-nowrap"
              role="menuitem"
            >
              수정 하기
            </li>
            <li
              onClick={() => {
                onDelete();
                setIsMenuOpen(false);
                onOpenChange(false);
              }}
              className="block px-4 py-2 text-sm text-white/50 hover:bg-primary-10 hover:text-primary-100 w-full text-center rounded-md text-nowrap"
              role="menuitem"
            >
              삭제 하기
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailMenu;
