import Mobile from '@/layouts/Mobile';
import React from 'react';

const CommunityLayout = ({ children }: { children: React.ReactNode }) => {
  return <Mobile>{children}</Mobile>;
};

export default CommunityLayout;
