import { useState } from 'react';
import StarIcon from '../../../../../../../../icons/star.svg';

interface StarRatingProps {
  onRatingChange: (rating: number) => void;
}

const StarRating = ({ onRatingChange }: StarRatingProps) => {
  const starArray = [1, 2, 3, 4, 5];
  const [starHover, setStarHover] = useState(0);
  const [starRating, setStarRating] = useState(0);

  const handleStarRating = (idx: number) => {
    setStarRating(idx);
    onRatingChange(idx);
  };

  return (
    <div className="flex flex-row justify-between items-center">
      {starArray.map((idx) => (
        <StarIcon
          key={idx}
          className="w-8 h-8"
          onMouseEnter={() => setStarHover(idx)}
          onMouseLeave={() => setStarHover(0)}
          onClick={() => handleStarRating(idx)}
          fill={idx <= (starHover || starRating) ? '000' : '#e5e5e5'} // hover 상태 또는 선택된 별점 상태에 따라 색상 변경
        />
      ))}
    </div>
  );
};

export default StarRating;
