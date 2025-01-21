import React from "react";
import { motion } from "framer-motion";
const variants = {
  open: {
    opacity: 1,
    y: 0,
    zIndex: 9999,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  closed: {
    opacity: 0,
    y: "-100%",
    zIndex: -1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
const Dropdown = React.forwardRef<
  HTMLUListElement,
  { show: boolean; children: React.ReactNode; feature?: string }
>(({ show, children, feature }, ref) => {
  return (
    <motion.ul
      animate={show ? "open" : "closed"}
      variants={variants}
      ref={ref}
      className={`z-50 absolute 
        ${feature === "currency list" ? "top-[40px] w-[108px] overflow-hidden" : ""} 
        ${feature === "portfolio" ? "left-3/5 top-[90px] h-96 w-3/5 overflow-y-auto py-2 pl-9 pr-4" : "top-[36px] w-full"} 
        ${feature === "table dropdown" ? "h-44" : ""}
        ${feature === "investment" ? "left-[25%] top-[20%] w-3/4 py-2 pl-9 pr-4 mt-2" : "w-60"}
        ${feature === "search" ? "left-0 max-h-40 min-w-40 top-[40px] md:w-full md:h-96" : ""}
        overflow-auto rounded-b-xl bg-[#ccccfa] dark:bg-dark-191 border-[1px] border-common-cyan
        ${show ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </motion.ul>
  );
});
Dropdown.displayName = "Dropdown";
export default Dropdown;
