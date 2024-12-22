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
          ? "w-60 ml-auto rounded-md border border-b-dark-buttonBorder/5 border-l-dark-buttonBorder border-r-dark-buttonBorder border-t-dark-buttonBorder bg-light-lightBg/80 text-light-darkText shadow-dark-buttonBorder hover:bg-common-purple dark:bg-common-portfolioButton/50 dark:text-dark-text hover:dark:bg-common-purple dark:hover:text-dark-darkBg"
          : "w-96"
      } border-1 z-0 h-11 rounded-md border-solid px-4 py-3 text-center drop-shadow-md ${
        disabled
          ? "cursor-not-allowed border-none bg-light-primary hover:bg-light-primary dark:bg-skeleton200 hover:dark:bg-skeleton200 text-light-secondaryTextColor dark:text-dark-text"
          : `shadow-indigo-500/50 cursor-pointer ${
              isActive
                ? "bg-common-linearGradient text-light-primary"
                : "bg-light-primary dark:bg-[#232336] text-light-secondaryTextColor dark:text-dark-text"
            } dark:hover:bg-common-cyan`
      }`}
      onClick={onButtonClick}
    >
      {text}
    </motion.button>
  );
};

export default Button;
