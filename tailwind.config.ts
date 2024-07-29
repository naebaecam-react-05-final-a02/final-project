import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      background: {},
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'radial-gradient':
          'radial-gradient(50% 50% at 49.54% 100%, rgba(18, 242, 135, 0.3) 0%, rgba(18, 242, 135, 0) 100%)',
        'input-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0.06) 100%)',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.border-gradient': {
          'border-image':
            'linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%, rgba(18, 242, 135, 1) 50%, rgba(0, 0, 0, 0.3) 100%) 1',

          'border-image-slice': '1',
          'border-width': '0 0 1px 0',
        },
        '.border-error-gradient': {
          'border-image': 'linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, #E52817 50%, rgba(0, 0, 0, 0.9) 100%) 1',
          'border-image-slice': '1',
          'border-width': '0 0 1px 0',
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
export default config;
