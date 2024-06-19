import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    extend: {
      keyframes: {
        "swing-right-fwd": {
          "0%": { transform: "rotateY(0deg) translateX(0px)" }, // Corrected typo
          "100%": { transform: "rotateY(180deg) translateX(50vw)" },
        },
        "swing-left-fwd": {
          "0%": { transform: "rotateY(0deg) translateX(0px)" },
          "100%": { transform: "rotateY(-180deg) translateX(-50vw)" },
        },
      },
      animation: {
        "swing-right-fwd": "swing-right-fwd 2s ease-in-out",
        "swing-left-fwd": "swing-left-fwd 2s ease-in-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        chosunlo: ["ChosunLo", "sans-serif"],
        chosunsg: ["ChosunSg", "sans-serif"],
        chosunkg: ["ChosunKg", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
