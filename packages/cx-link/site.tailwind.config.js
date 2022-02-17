const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(
        {
          '.cx-download-link::before': {
            content: '"file_download"',
            'font-family': 'Material Icons',
            'text-decoration': 'none',
            'line-height': '1rem',
            'vertical-align': 'text-bottom',
            'margin-right': '.25rem',
          },
          '.cx-external-link::after': {
            content: '" launch"',
            'font-family': 'Material Icons',
            'font-size': '.875rem',
            'font-style': 'normal',
            'line-height': '1rem',
            'text-decoration': 'none',
            'text-transform': 'none',
          },
        }
      );
    }),
  ],
};
