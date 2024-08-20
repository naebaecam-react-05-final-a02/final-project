'use client';
import SearchSVG from '@/assets/nav/search.svg';
import NotificationButton from '@/components/ButtonIcon/NotificationButton';
import { useModal } from '@/contexts/modal.context/modal.context';
import ArrowDropDown from '@/icons/ArrowDropDown';
import { useEffect, useRef, useState } from 'react';

type Category = {
  value: string;
};

type CommunityListHeaderProps = {
  categories: Category[];
  onCategoryChange: (category: string) => void;
  onSearchSubmit: (searchValue: string) => void;
  onNotificationClick?: () => void;
};

const CommunityListHeader = ({
  categories,
  onCategoryChange,
  onSearchSubmit,
  onNotificationClick,
}: CommunityListHeaderProps) => {
  const modal = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].value);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (isFocused && inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFocused]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
    onCategoryChange(category);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearchValue = searchValue.trim();
    if (trimmedSearchValue.length < 2) {
      modal.alert(['검색어는 최소 2글자 이상이어야 합니다.']);
      setIsFocused(false);
      return;
    }
    onSearchSubmit(trimmedSearchValue);
  };

  const handleSearchFocus = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  return (
    <header
      className={`flex w-full transition-all duration-300 justify-between items-center header-gradient px-4 py-2 mb-6 sm:py-5 ${
        isFocused ? 'gap-10' : 'gap-0'
      }`}
    >
      <div
        ref={dropdownRef}
        className={`relative transition-all duration-300 ${isFocused ? 'hidden' : 'w-32 opacity-100'}`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 w-full py-2 text-white bg-transparent rounded-lg focus:outline-none pl-2"
        >
          <span className="z-20">{selectedCategory}</span>
          <span className={`transition-all duration-300 ease-in-out ${isOpen ? 'rotate-180 z-20' : ''}`}>
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

      <div className="flex-grow flex justify-end items-center gap-4">
        <label
          htmlFor="searchInput"
          className={`h-10 flex justify-center items-center transition-all duration-300 rounded-xl relative z-30 text-white ${
            isFocused
              ? 'w-full input-bg'
              : 'w-10 shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25),-2px_-2px_4px_0px_rgba(255,255,255,0.10)] backdrop-blur-[5px] cursor-pointer'
          }`}
        >
          <form
            onSubmit={handleSearchSubmit}
            className={`min-w-10 px-2 transition-all duration-300 box-border flex justify-end w-full `}
          >
            <input
              id="searchInput"
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="검색할 단어를 입력해주세요"
              onFocus={handleSearchFocus}
              className={`flex-1 placeholder:text-white/40 transition-all duration-300 bg-transparent outline-none ${
                isFocused ? 'w-full opacity-100 px-2' : 'hidden w-0 opacity-0 px-0'
              }`}
            />
            {isFocused ? (
              <button type="submit">
                <SearchSVG
                  className="transition-all"
                  width="24"
                  height="24"
                  aria-label="search-button"
                  opacity={isFocused ? (searchValue ? 1 : 0.4) : 1}
                />
              </button>
            ) : (
              <SearchSVG
                className="transition-all"
                width="24"
                height="24"
                onClick={handleSearchFocus}
                aria-label="search-button"
                opacity={isFocused ? (searchValue ? 1 : 0.4) : 1}
              />
            )}
          </form>
        </label>
        <button
          onClick={onNotificationClick}
          aria-label="notification-button"
          className={`transition-opacity duration-300 ${isFocused ? 'opacity-0' : 'opacity-100'}`}
        >
          <NotificationButton />
        </button>
      </div>

      {isFocused && <div onClick={() => setIsFocused(false)} className="fixed inset-0 bg-black/70 z-20"></div>}
    </header>
  );
};

export default CommunityListHeader;
