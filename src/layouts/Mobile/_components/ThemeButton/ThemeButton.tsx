import { useThemeStore } from '@/stores/themeStore';
import { cva } from 'class-variance-authority';

const themeButtonVariants = cva(' w-40 h-10 rounded-full border-black border-2 absolute right-10', {
  variants: {
    darkMode: {
      false: 'text-black bg-white',
      true: 'text-white bg-black',
    },
  },
});

const ThemeButton = () => {
  const toggleTheme = useThemeStore((state) => state.toggleMode);
  const darkMode = useThemeStore((state) => state.darkMode);
  return (
    <button className={themeButtonVariants({ darkMode })} onClick={toggleTheme}>
      {darkMode ? '다크모드' : '라이트모드'}
    </button>
  );
};

export default ThemeButton;
