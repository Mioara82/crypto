import { useState } from "react";
import SearchIcon from "@/app/icons/searchIcon";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setSearchValue(value.trim().toLowerCase());
    setShow(true);
  };

  const handleOnBlur = (e: any) => {
    e.preventDefault();
    setSearchValue("");
    setShow(false);
  };

  return (
    <div className="relative flex items-center justify-center gap-3 font-[Inter] font-normal">
      <input
        className="border-1 rounded-md pl-9 pr-4 py-2 bg-light-lightBg dark:bg-dark-191 focus:ring-sky-500 text-sm text-light-secondaryTextColor/80 dark:text-dark-white/80"
        value={searchValue}
        onChange={handleChange}
        onBlur={handleOnBlur}
        name="searchInput"
        type="text"
        placeholder="Search..."
      ></input>
      <SearchIcon />
      <div
        className={`h-96 w-[356px] pl-9 pr-4 py-2 absolute top-[60px] bg-light-lightBg dark:bg-dark-191 border-2 border-[#FFFFFF0D] ${
          show ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </div>
  );
};

export default SearchInput;
