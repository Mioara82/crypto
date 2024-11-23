"use client";
import ThemeSwitch from "../ThemeSwitch";
import Logo from "../UI-components/logo";
import HomeButton from "../UI-components/homeButton";
import PortfolioButton from "../UI-components/portfolioButton";
import Search from "./search";
import CurrencySelector from "./currencySelector";

const Navbar = () => {
  return (
    <div className="z-0">
      <div className="max-w-1296 mx-auto flex justify-between gap-6 py-4 px-[72px]">
        <Logo />
        <div className=" flex w-[265px] gap-6">
          <HomeButton />
          <PortfolioButton />
        </div>
        <div className="flex gap-6 z-0 justify-stretch items-center">
          <Search />
          <CurrencySelector />
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
