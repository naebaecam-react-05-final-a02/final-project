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
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        '13': '13px',
        '15': '15px',
        '17': '17px',
        '18': '18px',
        '20': '20px',
        '28': '28px',
        '32': '32px',
        '48': '48px',
        '60': '60px',
      },
      lineHeight: {
        '140': '140%',
      },
      letterSpacing: {
        tighter: '-0.025em', // -2.5%
      },
      colors: {
        whiteT: {
          3: '#ffffff08', // 3%
          5: '#ffffff0d', // 5%
          10: '#ffffff1a', // 10%
          20: '#ffffff33', // 20%
          30: '#ffffff4d', // 30%
          40: '#ffffff66', // 40%
          50: '#ffffff80', // 50%
          60: '#ffffff99', // 60%
          70: '#ffffffb3', // 70%
          80: '#ffffffcc', // 80%
          90: '#ffffffe6', // 90%
          100: '#ffffff', // 100%
        },
        blackT: {
          3: '#00000008',
          5: '#0000000d',
          10: '#0000001a',
          20: '#00000033',
          30: '#0000004d',
          40: '#00000066',
          50: '#00000080',
          60: '#00000099',
          70: '#000000b3',
          80: '#000000cc',
          90: '#000000e6',
          100: '#000000',
        },
        primary: {
          3: '#12f28708',
          5: '#12f2870d',
          10: '#12f2871a',
          20: '#12f28733',
          30: '#12f2874d',
          40: '#12f28766',
          50: '#12f28780',
          60: '#12f28799',
          70: '#12f287b3',
          80: '#12f287cc',
          90: '#12f287e6',
          100: '#12f287',
        },
      },
      keyframes: {
        'dropdown-item': {
          '0%': { opacity: '0', transform: 'translateY(-10px) scale(1)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'dropdown-item': 'dropdown-item 0.3s ease-out forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'radial-gradient':
          'radial-gradient(50% 50% at 49.54% 100%, rgba(18, 242, 135, 0.3) 0%, rgba(18, 242, 135, 0) 100%)',
        'input-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0.06) 100%)',
        'button-gradient': 'linear-gradient(180deg, rgba(18, 242, 135, 0.9) 0%, rgba(18, 242, 135, 1) 100%)',
        'button-hover-gradient': 'linear-gradient(180deg, rgba(15, 205, 115, 0.9) 0%, rgba(15, 205, 115, 1) 100%)',
        'radial-gradient-button':
          'radial-gradient(50% 50% at 49.54% 100%, rgba(255, 255, 255, 0.50)0%, rgba(255, 255, 255, 0.00)100%)',
        'select-input-hover-gradient':
          'radial-gradient(50% 50% at 49.54% 100%, rgba(18, 242, 135, 0.10) 0%, rgba(18, 242, 135, 0.00) 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.border-gradient': {
          'border-image':
            'linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%, rgba(18, 242, 135, 1) 50%, rgba(0, 0, 0, 0.3) 100%) 1',
          'border-image-slice': '1',
          'border-width': '0 0 1px 0',
        },
        '.border-gradient-noti': {
          'border-image':
            'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%) 1',
          'border-image-slice': '1',
          'border-width': '0 0 1px 0',
        },
        '.border-gradient-light': {
          'border-image':
            'linear-gradient(to right, rgba(0, 0, 0, 0.06) 0%, rgba(18, 242, 135, 0.21) 50%, rgba(0, 0, 0, 0.06) 100%) 1',
          'border-image-slice': '1',
          'border-width': '0 0 1px 0',
        },
        '.border-error-gradient': {
          'border-image': 'linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, #E52817 50%, rgba(0, 0, 0, 0.9) 100%) 1',
          'border-image-slice': '1',
          'border-width': '0 0 1px 0',
        },
        '.header-gradient': {
          'border-image':
            'linear-gradient(to right, transparent, rgba(255,255,255,0.3) 15%, rgba(255,255,255,0.3) 85%, transparent) 1',
          'border-image-slice': '1',
          'border-width': '0 0 1px 0',
        },
        '.bg-custom-dashed-border': {
          'background-image': `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23333' stroke-width='4' stroke-dasharray='5' stroke-dashoffset='20' stroke-linecap='butt'/%3e%3c/svg%3e")`,
          'border-radius': '8px',
        },
        '.autofill-bg': {
          '&:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 1000px transparent inset',
            transition: 'background-color 5000s ease-in-out 0s',
            'background-image': 'linear-gradient(180deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0.06) 100%)',
          },
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
export default config;
