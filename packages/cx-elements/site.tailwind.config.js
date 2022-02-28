const tailwindcssDir = require('tailwindcss-dir')();

module.exports = {
  purge: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      xs: ['0.75rem', '1.125rem'],
      sm: ['0.875rem', '1.25rem'],
      base: ['1.125rem', '1.5rem'],
      lg: ['1.625rem', '2rem'],
      xl: ['1.625rem', '2rem'],
      '2xl': ['2rem', '2.25rem'],
      '3xl': ['2.563rem', '2.813rem'],
      'm-xs': ['0.688rem', '0.938rem'],
      'm-sm': ['0.75rem', '1rem'],
      'm-base': ['1rem', '1.25rem'],
      'm-lg': ['1.438rem', '1.625rem'],
      'm-xl': ['1.438rem', '1.625rem'],
      'm-2xl': ['1.813rem', '2.125rem'],
      'm-3xl': ['2.25rem', '2.5rem'],
    },
    colors: {
      primary: {
        brand: '#CA081B',
        bg: '#ffffff',
        interactive: '#000099',
        'interactive-active': '#000341',
      },
      gray: {
        page: '#F4F4F4',
        light: '#D8D8D8',
        body: '#63666A',
        footer: '#2B2B33',
      },
      black: {
        header: '#212121',
      },
      secondary: {
        eyebrow: '#CC0099',
      },
    },
    extend: {
      fontFamily: {
        DMSans: ['DM Sans', 'sans-serif'],
      },
      margin: {
        4.5: '1.125rem',
        5.75: '1.438rem',
      }
    },
  },
  variants: {
    extend: {
      textColor: ['active'],
    }
  },
  plugins: [
    tailwindcssDir,
  ],
};
