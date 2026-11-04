
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F8F4EC",
        ink: "#1B1B18",
        msitu: "#0F3D2E",
        jua: "#E8A020",
        clay: "#B5472B",
        leaf: "#2E7D4F",
        border: "#DDD5C5",
        muted: "#716D63"
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        display: ["var(--font-fraunces)", "serif"]
      },
      borderRadius: {
        control: "8px",
        card: "14px",
        sheet: "24px"
      },
      boxShadow: {
        card: "0 4px 16px rgba(27, 27, 24, 0.05)",
        elevated: "0 12px 32px rgba(27, 27, 24, 0.10)"
      },
      maxWidth: {
        content: "1280px"
      },
      transitionDuration: {
        sheet: "200ms"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        "heart-pop": {
          "0%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" }
        }
      },
      animation: {
        shimmer: "shimmer 1.8s ease-in-out infinite",
        "heart-pop": "heart-pop 250ms ease-out"
      }
    }
  },
  plugins: []
};

export default config;
