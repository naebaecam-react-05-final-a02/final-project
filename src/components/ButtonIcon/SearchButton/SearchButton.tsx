import SearchSVG from '@/assets/nav/search.svg';

const SearchButton = () => {
  // const [isFocusOn, setIsFocusOn] = useState<boolean>(false);
  const handleClick = () => {
    alert('hello');
  };
  return (
    <button
      onClick={handleClick}
      className={`rounded-xl border-2 border-black/10 shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25),-2px_-2px_4px_0px_rgba(255,255,255,0.10)] backdrop-blur-[5px] p-2`}
    >
      <SearchSVG />
    </button>
  );
};

export default SearchButton;
