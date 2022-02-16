const tailwindcssDir = require('tailwindcss-dir')();

module.exports = {
  purge: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      xs: ['0.75rem', '1.125rem'],
      sm: ['0.875rem', '1.25rem'],
      base: ['1rem', '1.375rem'],
      lg: ['1.125rem', '1.5rem'],
      xl: ['1.625rem', '2rem'],
      '2xl': ['2rem', '2.25rem'],
      '3xl': ['2.563rem', '2.813rem'],
      'm-xs': ['0.688rem', '0.938rem'],
      'm-sm': ['0.75rem', '1rem'],
      'm-base': ['0.875rem', '1.125rem'],
      'm-lg': ['1.125rem', '1.5rem'],
      'm-xl': ['1.438rem', '1.75rem'],
      'm-2xl': ['1.813rem', '2.125rem'],
      'm-3xl': ['2.25rem', '2.625rem'],
    },
    extend: {
      fontFamily: {
        DMSans: ['DM Sans', 'sans-serif'],
      },
    },
  },

  plugins: [
    tailwindcssDir,
  ],
};
