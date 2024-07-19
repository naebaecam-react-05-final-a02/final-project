'use client';

import { useGetWeights } from '@/hooks/dashboard/useDashBoard';

const Chart = () => {
  const { data: weights } = useGetWeights();
  console.log('WEIGHTS___', weights);
  return <div>Chart</div>;
};

export default Chart;
