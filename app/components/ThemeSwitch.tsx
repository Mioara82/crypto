"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

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
      <button className="border-1 rounded-md p-3 gap-1 border-light-primary/5 bg-light-lightBg dark:bg-dark-191" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? <FiMoon /> : <FiSun />}
      </button>
    </div>
  );
};

export default ThemeSwitch;
