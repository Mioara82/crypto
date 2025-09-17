import HomeButton from "../../UI-components/homeButton";
import PortfolioButton from "../../UI-components/portfolioButton";
import ThemeSwitch from "../../ThemeSwitch";
import Image from "next/image";

export const MobileTop = () => {
  return (
    <div className="flex items-center justify-between backdrop-blur-sm">
      <div className="flex items-center">
        <div className="relative h-12 w-12">
          <Image
            src="/crypto-logo.png"
            alt="a symbol of a chain link"
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <ThemeSwitch />
      </div>
      <div className="ml-auto flex items-center gap-4">
        <HomeButton />
        <PortfolioButton />
      </div>
    </div>
  );
};
