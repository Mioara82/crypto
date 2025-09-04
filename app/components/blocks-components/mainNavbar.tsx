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
    <div className="z-999 flex justify-center">
      <nav
        aria-label="Main site navigation"
        className="relative flex w-full max-w-324 justify-between gap-2 px-6 py-2 md:gap-6 md:py-4"
      >
        <Logo />
        <div className="flex w-24 gap-2 md:w-[265px] md:gap-6">
          <HomeButton />
          <PortfolioButton />
        </div>
        <div className="flex items-center justify-center gap-6">
          <Search />
          <div className="flex justify-center gap-1">
            <CurrencySelector />
            <AuthHeader />
            <ThemeSwitch />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
