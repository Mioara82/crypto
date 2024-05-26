import PortfolioIcon from "@/app/icons/portfolioIcon";

const PortfolioButton = () => {
  return (
    <div className="flex items-center gap-2">
      <PortfolioIcon />
      <div className="leading-[20.42px] text-base font-normal text-light-darkBg dark:text-dark-text hover:cursor-fancy">
        Portfolio
      </div>
    </div>
  );
};

export default PortfolioButton;
