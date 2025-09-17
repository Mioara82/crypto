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
      className={`absolute z-50 ${feature === "currency list" ? "top-[40px] w-[108px] overflow-hidden" : ""} 
      ${feature === "portfolio" ? "left-3/5 top-[90px] h-96 w-3/5 overflow-y-auto py-2 pl-9 pr-4" : "top-[36px] w-full"}
       ${feature === "dropdown table" ? "p-4" : ""} 
       ${feature === "investment" ? "left-0 top-[20%] mt-2 h-52 py-2 pl-2 pr-0 md:left-[25%] md:w-3/4 md:pl-9 md:pr-4" : "w-60"} 
       ${feature === "search" ? "left-0 top-[40px] max-h-40 min-w-40 md:h-96 md:w-full" : ""} 
       ${feature === "converter" ? "left-0 top-[40px] h-52 w-full p-4" : ""} overflow-auto rounded-md mt-1 bg-[#ccccfa] dark:bg-dark-191 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </motion.ul>
  );
});
Dropdown.displayName = "Dropdown";
export default Dropdown;
