'use client';

import { useEffect, useRef, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

interface DetailMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onOpenChange: (isOpen: boolean) => void;
  iconClassName?: string;
}

const DetailMenu = ({ onEdit, onDelete, onOpenChange, iconClassName = '' }: DetailMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<'bottom' | 'top'>('bottom');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    onOpenChange(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        onOpenChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, onOpenChange]);

  useEffect(() => {
    if (isMenuOpen && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const distanceFromBottom = windowHeight - containerRect.bottom;

      if (distanceFromBottom < 120) {
        setMenuPosition('top');
      } else {
        setMenuPosition('bottom');
      }
    }
  }, [isMenuOpen]);

  const menuPositionClass = menuPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';

  return (
    <div ref={containerRef} className={`relative detail-menu ${isMenuOpen ? 'z-[999]' : ''}`}>
      <BiDotsVerticalRounded
        onClick={handleMenuToggle}
        className={`cursor-pointer ${isMenuOpen ? 'z-[1000]' : ''} ${iconClassName}`}
      />
      {isMenuOpen && (
        <div
          className={`absolute right-0 w-24 rounded-lg shadow-lg bg-white/10 backdrop-blur-[20px] border-2 border-primary-50 z-[10001] ${menuPositionClass}`}
        >
          <ul
            className="py-1 transition-all duration-300 ease-in-out scale-100 opacity-100"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <li
              onClick={() => {
                onEdit();
                setIsMenuOpen(false);
                onOpenChange(false);
              }}
              className="block px-4 py-2 text-sm text-white/50 hover:bg-primary-10 hover:text-primary-100 w-full text-center rounded-md text-nowrap transform transition-all duration-300 ease-in-out opacity-0 animate-dropdown-item"
              role="menuitem"
            >
              수정하기
            </li>
            <li
              onClick={() => {
                onDelete();
                setIsMenuOpen(false);
                onOpenChange(false);
              }}
              className="block px-4 py-2 text-sm text-white/50 hover:bg-primary-10 hover:text-primary-100 w-full text-center rounded-md text-nowrap transform transition-all duration-300 ease-in-out opacity-0 animate-dropdown-item"
              role="menuitem"
            >
              삭제하기
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailMenu;
