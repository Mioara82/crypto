"use client";
import ThemeSwitch from "../ThemeSwitch";
import Logo from "../UI-components/logo";
import HomeButton from "../UI-components/homeButton";
import PortfolioButton from "../UI-components/portfolioButton";
import Search from "./search";
import CurrencySelector from "./currencySelector";
import AuthHeader from "../../auth/authHeader";

const Navbar = () => {
  return (
    <div className="z-999">
      <div className="max-w-1296 relative mx-auto flex w-full justify-between gap-2 px-6 py-2 md:gap-6 md:py-4">
        <Logo />
        <div className="flex w-24 gap-2 md:w-[265px] md:gap-6">
          <HomeButton />
          <PortfolioButton />
        </div>
        <div className="flex items-center justify-stretch gap-6">
          
          <Search />
          <CurrencySelector />
          <AuthHeader />
          <ThemeSwitch />

        </div>
      </div>
    </div>
  );
};

export default Navbar;
