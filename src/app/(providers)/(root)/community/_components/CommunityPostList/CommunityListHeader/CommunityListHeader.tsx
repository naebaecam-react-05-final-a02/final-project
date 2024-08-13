'use client';
import { useEffect, useRef, useState } from 'react';

import NotificationButton from '@/components/ButtonIcon/NotificationButton';
import SearchButton from '@/components/ButtonIcon/SearchButton';
import ArrowDropDown from '@/icons/ArrowDropDown';

type Category = {
  value: string;
};

type CommunityListHeaderProps = {
  categories: Category[];
  onCategoryChange: (category: string) => void;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
};

const CommunityListHeader = ({
  categories,
  onCategoryChange,
  onSearchClick,
  onNotificationClick,
}: CommunityListHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
    onCategoryChange(category);
  };

  return (
    <header className="flex w-full justify-between items-center header-gradient px-4 py-2 mb-6">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1  w-32 pl- py-2 text-white bg-transparent rounded-lg focus:outline-none pl-2 `}
        >
          <span className="z-20">{selectedCategory}</span>
          <span className={`transition-all duration-300 ease-in-out ${isOpen ? 'rotate-180 z-20 ' : ''} `}>
            <ArrowDropDown isActive={isOpen} />
          </span>
        </button>
        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black/70 bg-opacity-50 z-10" onClick={() => setIsOpen(false)} />
            <ul className="absolute left-0 flex flex-col gap-3 w-full mt-1 p-1.5 bg-white/10 backdrop-blur-[20px] rounded-lg border-2 border-primary-50 shadow-lg z-20 overflow-hidden transform origin-top transition-all duration-300 ease-in-out scale-100 opacity-100">
              {categories.map((category, index) => (
                <li
                  key={index}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="relative w-full rounded-md bg-transparent p-[6px] transform transition-all duration-300 ease-in-out opacity-0 translate-y-2 scale-95 hover:bg-primary-10 hover:text-primary-100 cursor-pointer animate-dropdown-item text-white/50"
                  onClick={() => handleCategorySelect(category.value)}
                >
                  {category.value}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button onClick={onSearchClick}>
          <SearchButton />
        </button>

        <button onClick={onNotificationClick}>
          <NotificationButton />
        </button>
      </div>
    </header>
  );
};

export default CommunityListHeader;
