import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // darkMode manejado via data-theme attribute (no clase ni media query)
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          light:   "var(--color-primary-light)",
          dark:    "var(--color-primary-dark)",
          ink:     "var(--color-primary-ink)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          light:   "var(--color-secondary-light)",
          dark:    "var(--color-secondary-dark)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          light:   "var(--color-accent-light)",
          dark:    "var(--color-accent-dark)",
        },
        surface: {
          DEFAULT: "var(--color-bg)",
          muted:   "var(--color-surface)",
          alt:     "var(--color-surface-alt)",
        },
        ink: {
          DEFAULT:   "var(--color-text)",
          secondary: "var(--color-text-secondary)",
          muted:     "var(--color-text-muted)",
          inverse:   "var(--color-text-inverse)",
        },
        line: {
          DEFAULT: "var(--color-border)",
          strong:  "var(--color-border-strong)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error:   "var(--color-error)",
        info:    "var(--color-info)",
      },
      fontFamily: {
        sans: ["var(--font-general-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm:   "var(--radius-sm)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        xl:   "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      transitionDuration: {
        fast:   "var(--transition-fast)",
        normal: "var(--transition-normal)",
        slow:   "var(--transition-slow)",
      },
    },
  },
  plugins: [],
};

export default config;
