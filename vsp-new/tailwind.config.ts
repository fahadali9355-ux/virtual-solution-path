import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vsp: {
          50: '#F0F9FF', // Very light blue-white (cleaner than gray)
          100: '#E0F2FE',
          // The "Electric" accent for buttons/gradients
          500: '#0EA5E9', // Sky Blue (Vibrant)
          600: '#0284C7', // Deep Sky (Primary Action)
          // The "Corporate" deep colors for text/navbars
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E', // Very dark rich ocean blue (Premium Text)
          950: '#082F49', // Almost black (Footer)
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right bottom, #F0F9FF, #E0F2FE, #ffffff)',
        'blue-gradient': 'linear-gradient(135deg, #0284C7 0%, #0EA5E9 100%)', // Premium Button Gradient
      },
      boxShadow: {
        'glow': '0 0 20px rgba(14, 165, 233, 0.3)', // Soft blue glow for cards
      }
    },
  },
  plugins: [],
};
export default config;