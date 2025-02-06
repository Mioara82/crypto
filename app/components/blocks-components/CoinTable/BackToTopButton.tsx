import React from "react";
import { useScrollButtonVisibility } from "@/lib/hooks/useIsScrollBottom";

const BackToTopButton = ({ handleScroll }: { handleScroll: () => void }) => {
  const show = useScrollButtonVisibility();
  return (
    <>
      {show && (
        <div>
          <button
            onClick={handleScroll}
            className="fixed bottom-10 left-[50%] z-50 flex h-10 w-10 items-center justify-center rounded-full bg-light-lightBg hover:scale-125 hover:bg-common-azure dark:bg-light-darkBg hover:dark:bg-common-azure"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
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
