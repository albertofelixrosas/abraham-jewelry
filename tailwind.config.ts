import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef7e8',
          100: '#fceecf',
          200: '#f9dca0',
          300: '#f6c872',
          400: '#f1b73a',
          500: '#e19a0b',
          600: '#b77708',
          700: '#8f5b07',
          800: '#6b4605',
          900: '#523806'
        },
        gray: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e5e7eb',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b'
        }
      }
    }
  },
  plugins: []
};

export default config;
