import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      colors:{
        common:{
          green:"#00B1A7",
          red:"#FE2264",
          linearGradient: "#6161D680",
          purple:"#849DFF",
          orange:"#F7931A",
          light:"FFFFFF",
          "chart-graph-100":"rgba(231, 114, 255, 0.6)",
          "chart-graph-200": "rgba(116, 116, 250, 0.6)",
        },
        light:{
          primary:"#FFFFFF",
          primaryBg: "#F3F5F9",
          darkBg: "#353570",
          lightBg: "#CCCCFA66",
          primaryTextColor:"#181825",
          tableTextColor:"#232336",
          secondaryTextColor:"#424286",
          lightTextColor:"#D1D1D1"
        },
        dark:{
          primaryBg:"#13121A",
          darkBg: "#1E1932",
          lightBg:"#191932",
          text:"#FFFFFF",
          textDark:"#000000",
          textFocus:"#E4E4F0",
          hover:"#232336",
          chartTextColor:"#D1D1D1",
          chartDateColor:"#B9B9BA",
          "191":"#191925",
          "chart-100":"#B9B9BA",
          "chart-200":"#C27721",
          "chart-300":"#6374C3",
          "chart-400":"#30E0A1",
          "chart-500":"#F5AC37",
          "chart-600":"#F3EB2F",
          "chart-700":"#638FFE",
          "chart-800":"#4DEEE5",
          "chart-900":"#F06142",
          "chart-910":"#5082CF"
        }
      },
      extend: {
        fontFamily: {
         PlayfairDisplay: ["Space Grotesk", "sans-serif"],
         Inter:["Inter", "sans-serif"]
        },
        borderRadius:{
          "custom":"1.25rem"
        },
        maxWidth:{
          "custom":"90rem"
        },
        width:{
          "w86":"356px"
        }
      },
    },
  plugins: [],
  darkMode:"class",
};
export default config;
