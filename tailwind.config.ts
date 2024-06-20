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
        "shake-bottom": {
          "0%, 100%": {
            transform: "rotate(0deg)",
            "transform-origin": "50% 100%",
          },
          "10%": {
            transform: "rotate(2deg)",
          },
          "20%, 40%, 60%": {
            transform: "rotate(-4deg)",
          },
          "30%, 50%, 70%": {
            transform: "rotate(4deg)",
          },
          "80%": {
            transform: "rotate(-2deg)",
          },
          "90%": {
            transform: "rotate(2deg)",
          },
        },
        "bounce-left": {
          "0%": {
            transform: "translateX(-48px)",
            "animation-timing-function": "ease-in",
            opacity: "1",
          },
          "24%": {
            opacity: "1",
          },
          "40%": {
            transform: "translateX(-26px)",
            "animation-timing-function": "ease-in",
          },
          "65%": {
            transform: "translateX(-13px)",
            "animation-timing-function": "ease-in",
          },
          "82%": {
            transform: "translateX(-6.5px)",
            "animation-timing-function": "ease-in",
          },
          "93%": {
            transform: "translateX(-4px)",
            "animation-timing-function": "ease-in",
          },
          "25%, 55%, 75%, 87%, 98%": {
            transform: "translateX(0px)",
            "animation-timing-function": "ease-out",
          },
          "100%": {
            transform: "translateX(0px)",
            "animation-timing-function": "ease-out",
            opacity: "1",
          },
        },
      },
      animation: {
        "swing-right-fwd": "swing-right-fwd 2s ease-in-out",
        "swing-left-fwd": "swing-left-fwd 2s ease-in-out",
        "shake-bottom": "shake-bottom 1.5s ease-in-out",
        "bounce-left": "bounce-left 1s ease-in-out",
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
