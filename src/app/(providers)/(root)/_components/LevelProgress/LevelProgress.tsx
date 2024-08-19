'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type LevelProgressProps = {
  experience: number;
};

const LevelProgress = ({ experience }: LevelProgressProps) => {
  const data = [{ name: 'Progress', value: experience }];

  return (
    <ResponsiveContainer width="100%" height={10}>
      <BarChart layout="vertical" data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis type="number" hide domain={[0, 100]} />
        <YAxis type="category" dataKey="name" hide />
        <Bar
          fill="#12F287"
          filter="url(#glow)"
          background={(props: any) => {
            const { x, y, width, height } = props;
            return (
              <rect
                x={x}
                y={y + 1}
                width={width}
                height={height - 2}
                fill="#ffffff26"
                rx={10}
                ry={10}
                filter="url(#glow)"
              />
            );
          }}
          dataKey="value"
          radius={[10, 10, 10, 10]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LevelProgress;
