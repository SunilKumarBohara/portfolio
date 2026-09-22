import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#06070a",
        surface: {
          50: "#161922",
          100: "#12141c",
          200: "#0d0f16",
          300: "#090a0f",
          DEFAULT: "#0d0f16",
        },
        brand: {
          emerald: "#10b981",
          teal: "#06b6d4",
          cyan: "#00f0ff",
          green: "#00e599",
          lime: "#84cc16",
          accent: "#00e599",
        },
        borderGlow: "rgba(0, 229, 153, 0.2)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cyber-grid": "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        "gradient-glow": "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 229, 153, 0.08), transparent 40%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "glow-ping": "glowPing 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "radar-sweep": "radar 4s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPing: {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.15)", opacity: "0.4" },
          "100%": { transform: "scale(1)", opacity: "0.8" },
        },
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 15px -3px rgba(0, 229, 153, 0.3)",
        "glow-md": "0 0 25px -5px rgba(0, 229, 153, 0.4)",
        "glow-lg": "0 0 45px -5px rgba(0, 229, 153, 0.35)",
        "glow-cyan": "0 0 30px -5px rgba(0, 240, 255, 0.35)",
        "glass-card": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};
export default config;
