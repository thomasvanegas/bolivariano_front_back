import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        
        // Colores institucionales UPB
        upb: {
          pink: {
            DEFAULT: "rgb(var(--upb-pink) / <alpha-value>)",
            light: "rgb(var(--upb-pink-light) / <alpha-value>)",
          },
          red: {
            DEFAULT: "rgb(var(--upb-red) / <alpha-value>)",
            light: "rgb(var(--upb-red-light) / <alpha-value>)",
          },
          purple: {
            DEFAULT: "rgb(var(--upb-purple) / <alpha-value>)",
            light: "rgb(var(--upb-purple-light) / <alpha-value>)",
          },
          white: "rgb(var(--upb-white) / <alpha-value>)",
          black: "rgb(var(--upb-black) / <alpha-value>)",
        },
        
        // Escala de grises
        gray: {
          50: "rgb(var(--gray-50) / <alpha-value>)",
          100: "rgb(var(--gray-100) / <alpha-value>)",
          200: "rgb(var(--gray-200) / <alpha-value>)",
          300: "rgb(var(--gray-300) / <alpha-value>)",
          400: "rgb(var(--gray-400) / <alpha-value>)",
          500: "rgb(var(--gray-500) / <alpha-value>)",
          600: "rgb(var(--gray-600) / <alpha-value>)",
          700: "rgb(var(--gray-700) / <alpha-value>)",
          800: "rgb(var(--gray-800) / <alpha-value>)",
          900: "rgb(var(--gray-900) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        'gradient-upb-primary': 'linear-gradient(135deg, rgb(var(--upb-pink)) 0%, rgb(var(--upb-purple)) 100%)',
        'gradient-upb-secondary': 'linear-gradient(135deg, rgb(var(--upb-red)) 0%, rgb(var(--upb-pink)) 100%)',
        'gradient-upb-accent': 'linear-gradient(135deg, rgb(var(--upb-purple)) 0%, rgb(var(--upb-red)) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
