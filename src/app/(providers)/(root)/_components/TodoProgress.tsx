'use client';

import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'A', x: 1, fill: 'green' },
//   { name: 'B', x: 2, fill: 'yellow' },
// ];

const data = [{ name: 'L1', value: 75 }];

const circleSize = 30;

const TodoProgress = () => {
  return (
    <div className="size-16 relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          width={circleSize}
          height={circleSize}
          cx={'50%'}
          cy={'50%'}
          innerRadius={'80%'}
          outerRadius={'100%'}
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background dataKey="value" cornerRadius={circleSize / 2} fill="red" />
        </RadialBarChart>
      </ResponsiveContainer>
      <div
        className="select-none absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-gray-500 
          rounded-full size-10 flex items-center justify-center text-white text-sm"
      >
        {data[0].value}
      </div>
    </div>
  );
};

export default TodoProgress;
