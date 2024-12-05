import { motion } from "framer-motion";

interface ButtonProps {
  text: string;
  isActive?: boolean;
  onButtonClick: any;
  feature: string;
}
const Button: React.FC<ButtonProps> = ({
  text,
  isActive,
  onButtonClick,
  feature,
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
      className={`w-60 ${
        feature === "large"
          ? "ml-auto dark:bg-common-portfolioButton/50 hover:dark:bg-common-purple border rounded-md border-t-dark-buttonBorder border-l-dark-buttonBorder border-r-dark-buttonBorder border-b-dark-buttonBorder/5"
          : ""
      } h-11 text-center rounded-md py-3 px-4 border-1 border-solid drop-shadow-md ${
        isActive
          ? "bg-common-linearGradient shadow-indigo-500/50"
          : "bg-light-primary dark:bg-[#232336]"
      }
     ${
       isActive
         ? "text-light-primary"
         : "text-light-secondaryTextColor dark:text-dark-text"
     } cursor-pointer`}
      onClick={onButtonClick}
    >
      {text}
    </motion.button>
  );
};

export default Button;
