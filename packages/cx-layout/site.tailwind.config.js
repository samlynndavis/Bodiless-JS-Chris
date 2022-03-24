module.exports = {
  purge: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    screens: {
      md: '768px',
      lg: '1025px',
      xl: '1921px',
    },
    // Colors are used in styleguide.
    colors: {
      red: '#FF0000',
      green: '#00FF00',
      blue: '#0000FF',
      orange: '#FFA500',
    },
    maxWidth: {
      48: '12rem',
      56: '14rem',
      64: '16rem',
    },
  },
  variants: {
    backgroundColor: ['first', 'last', 'responsive'],
    margin: ['first', 'last', 'responsive'],
    padding: ['first', 'last', 'responsive'],
    width: ['first', 'last', 'responsive'],
  },
};
