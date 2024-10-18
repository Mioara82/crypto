import React from "react";
import { useScrollButtonVisibility } from "@/lib/hooks/useIsScrollBottom";

const BackToTopButton = () => {
  const show = useScrollButtonVisibility();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {show && (
        <div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full fixed flex justify-center items-center bottom-10 left-[50%] z-50 bg-[#7878fa90] dark:bg-light-lightBg hover:bg-[#7878fa] hover:dark:bg-light-darkBg hover:border-slate-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default BackToTopButton;
