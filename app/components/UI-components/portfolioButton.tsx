import PortfolioIcon from "@/app/icons/portfolioIcon";
import Link from "next/link";

const PortfolioButton = () => {
  return (
    <div className="flex items-center gap-2">
      <PortfolioIcon />
      <div className="leading-[20.42px] text-base font-normal text-light-darkBg dark:text-dark-text hover:cursor-fancy">
        <Link href="/Portfolio">Portfolio</Link>
      </div>
    </div>
  );
};

export default PortfolioButton;
