'use client';

import Masonry from 'react-masonry-css';
import VerificationItem from '../VerificationItem';

const breakpointColumnsObj = {
  default: 2,
};

const VerificationList = () => {
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
      {Array.from({ length: 10 }, (_, i) => (
        <li className="list-none" key={i}>
          <VerificationItem />
        </li>
      ))}
    </Masonry>
  );
};

export default VerificationList;
