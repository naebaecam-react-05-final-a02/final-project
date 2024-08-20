import SearchSVG from '@/assets/nav/search.svg';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useChallengeFilterStore } from '@/stores/challengeFilter.store';
import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';
import BackButton from './BackButton';

interface ChallengesHeaderProps {
  title?: string;
  showLogo?: boolean;
  showBackButton?: boolean;
  icon?: ReactNode;
  titleIcon?: ReactNode;
  onClick?: () => void;
  className?: string;
  customBackAction?: () => void;
}

const ChallengesHeader = ({
  title,
  showLogo = false,
  showBackButton = true,
  icon,
  titleIcon,
  onClick,
  className = '',
  customBackAction,
}: ChallengesHeaderProps) => {
  const modal = useModal();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);
  const resetSearchValue = () => {
    const newFilter = structuredClone(filter);
    setFilter({ ...newFilter, searchValue: '' });
  };
  const setFilter = useChallengeFilterStore((state) => state.setFilter);
  const filter = useChallengeFilterStore((state) => state.filter);

  const onSubmitSearchValue: () => void = () => {
    if (!isFocused) return;
    if (!searchValue) return modal.alert(['검색어를 입력해주세요']);
    const newFilter = structuredClone(filter);
    setFilter({ ...newFilter, searchValue });
    setIsFocused(false);
  };

  const handleOnSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitSearchValue();
  };

  const checkSearchValue = () => {
    if (!searchValue) resetSearchValue();
  };

  useEffect(() => {
    return resetSearchValue();
  }, []);

  return (
    <header
      className={`flex w-full transition-all duration-300 justify-between items-center  header-gradient ${
        isFocused ? 'gap-2' : 'gap-0'
      } ${className}`}
    >
      {showBackButton ? <BackButton customAction={customBackAction} /> : <span className="w-11"></span>}
      <div
        className={`flex-grow transition-all duration-300 text-nowrap flex justify-center items-center py-[18px] ${
          isFocused ? 'w-0 opacity-0' : 'w-full opacity-100'
        }`}
      >
        {showLogo ? (
          <Image src="/OOSIE.png" alt="Logo" width={105} height={28} />
        ) : title ? (
          <div className="flex items-center">
            <h2 className="text-sm font-medium">{title}</h2>
            {titleIcon && <button className="ml-1">{titleIcon}</button>}
          </div>
        ) : null}
      </div>

      <label
        htmlFor="searchInput"
        className={`w-10 h-10 flex justify-center items-center transition-all duration-300 rounded-xl relative z-30 ${
          isFocused
            ? 'w-full input-bg'
            : ' shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25),-2px_-2px_4px_0px_rgba(255,255,255,0.10)] backdrop-blur-[5px] cursor-pointer'
        }`}
      >
        <form
          className={`min-w-10 px-2 transition-all duration-300 box-border flex justify-end w-full ${
            isFocused ? 'gap-2' : 'gap-0'
          }`}
          onSubmit={handleOnSubmit}
        >
          <input
            id="searchInput"
            onChange={onChangeSearchValue}
            placeholder="검색할 단어를 입력해주세요"
            onFocus={() => setIsFocused(true)}
            onBlur={checkSearchValue}
            type="text"
            className={` flex-1 placeholder:text-white/40 transition-all duration-300 bg-transparent outline-none ${
              isFocused ? ' w-full opacity-100 px-2' : 'w-0 opacity-0 px-0'
            }`}
          />
          {isFocused ? (
            <button type="submit">
              <SearchSVG
                className="transition-all"
                width="24"
                height="24"
                opacity={isFocused ? (searchValue ? 1 : 0.4) : 1}
              />
            </button>
          ) : (
            <SearchSVG
              className="transition-all"
              width="24"
              height="24"
              onClick={() => setIsFocused(true)}
              opacity={isFocused ? (searchValue ? 1 : 0.4) : 1}
            />
          )}
        </form>
      </label>

      {isFocused && <div onClick={() => setIsFocused(false)} className="fixed inset-0 bg-black/70 z-20"></div>}
    </header>
  );
};

export default ChallengesHeader;
