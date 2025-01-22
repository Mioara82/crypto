"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <button
        className="p-2 border-1 rounded-md md:p-3 gap-1 border-light-primary/5 bg-light-lightBg dark:bg-dark-191"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "light" ? <FiMoon /> : <FiSun />}
      </button>
    </div>
  );
};

export default ThemeSwitch;
