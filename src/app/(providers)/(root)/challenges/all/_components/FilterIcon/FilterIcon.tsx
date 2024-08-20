'use client';
import FilterIconSVG from '@/assets/filter.svg';

interface FilterIconProps {
  onClick: () => void;
}

const FilterIcon = ({ onClick }: FilterIconProps) => {
  return (
    <button aria-label="filter-button" onClick={onClick} className="w-7 h-7 relative flex justify-center items-center">
      <FilterIconSVG />
      <div className="absolute inset-0 border border-white/20 rounded-[4px]"></div>
      <div className="absolute inset-0 bg-white/10 rounded-[4px]"></div>
    </button>
  );
};

export default FilterIcon;
