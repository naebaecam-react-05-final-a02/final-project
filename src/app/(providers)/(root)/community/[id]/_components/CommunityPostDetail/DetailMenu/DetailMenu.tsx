'use client';

import { useEffect, useRef, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

interface DetailMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onOpenChange: (isOpen: boolean) => void;
  iconClassName?: string;
  answer?: boolean;
}

const DetailMenu = ({ answer = false, onEdit, onDelete, onOpenChange, iconClassName = '' }: DetailMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<'bottom' | 'top'>('bottom');
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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
    if (isMenuOpen && containerRef.current && menuRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const distanceFromBottom = windowHeight - containerRect.bottom;

      const isFullWidth = windowWidth >= 1024;
      const threshold = isFullWidth ? 220 : 50;

      if (distanceFromBottom < menuRect.height + threshold) {
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
          ref={menuRef}
          className={`absolute right-0 w-24 rounded-lg shadow-lg bg-white/10 backdrop-blur-[20px] border-2 z-[10001] ${
            answer ? 'border-none' : ' border-primary-50'
          }   ${menuPositionClass}`}
        >
          <ul
            className={`py-1 transition-all duration-300 ease-in-out scale-100 opacity-100 cursor-pointer `}
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
              className={`block px-4 py-2 text-sm text-white/50 hover:text-primary-100 w-full text-center rounded-md text-nowrap transform transition-all duration-300 ease-in-out opacity-0 animate-dropdown-item ${
                answer ? 'bg-blue-500 hover:bg-blue-600' : 'hover:bg-primary-10'
              }`}
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
              className={`block px-4 py-2 text-sm text-white/50 hover:text-primary-100 w-full text-center rounded-md text-nowrap transform transition-all duration-300 ease-in-out opacity-0 animate-dropdown-item ${
                answer ? 'bg-red-500 hover:bg-red-600' : 'hover:bg-primary-10'
              }`}
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
