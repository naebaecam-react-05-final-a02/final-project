import TabButton from '../TabButton';

const Tab = () => {
  return (
    <div className="flex">
      <TabButton value={'weight'}>무게&횟수</TabButton>
      <TabButton value={'cardio'}>시간&거리</TabButton>
    </div>
  );
};

export default Tab;
