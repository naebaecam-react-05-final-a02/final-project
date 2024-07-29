import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'radial-gradient':
          'radial-gradient(50% 50% at 49.54% 100%, rgba(18, 242, 135, 0.3) 0%, rgba(18, 242, 135, 0) 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
