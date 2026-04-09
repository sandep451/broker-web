import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem"
      }
    }
  },
  plugins: []
} satisfies Config;
