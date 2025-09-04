import { motion } from "framer-motion";

interface ButtonProps {
  text: string;
  isActive?: any;
  onButtonClick?: any;
  feature: string;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  text,
  isActive,
  onButtonClick,
  feature,
  disabled,
}) => {
  const variants = {
    open: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    closed: {
      opacity: 0.6,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
  return (
    <motion.button
      animate={isActive ? "open" : "closed"}
      variants={variants}
      className={`${
        feature === "large"
          ? "ml-auto w-28 border border-b-dark-buttonBorder/5 border-l-dark-buttonBorder border-r-dark-buttonBorder border-t-dark-buttonBorder bg-light-lightBg/80 text-xs text-light-darkText shadow-dark-buttonBorder hover:bg-common-purple dark:bg-common-portfolioButton/50 dark:text-dark-text hover:dark:bg-common-purple dark:hover:text-dark-darkBg md:w-60 md:text-sm lg:text-base"
          : "w-24 text-sm sm:w-32 md:w-64 lg:w-80 lg:text-base"
      } border-1 z-0 h-11 rounded-md border-solid p-1 text-center drop-shadow-md md:px-4 md:py-3 ${
        disabled
          ? "cursor-not-allowed border-none bg-light-primary text-dark-darkBg hover:bg-light-primary dark:bg-skeleton200 dark:text-dark-text hover:dark:bg-skeleton200"
          : `shadow-indigo-500/50 cursor-pointer ${
              isActive
                ? "bg-gradient-to-r from-[#3840E7] to-[#91FCE4] text-light-primary"
                : "bg-light-primary text-light-secondaryTextColor dark:bg-[#232336] dark:text-dark-text"
            } dark:hover:bg-common-cyan`
      }`}
      onClick={onButtonClick}
    >
      {text}
    </motion.button>
  );
};

export default Button;
