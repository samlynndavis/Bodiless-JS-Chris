import { asLogoToken, vitalLogoBase } from '@bodiless/vital-layout';

const Default = asLogoToken({
  ...vitalLogoBase.Default,
  Layout: {
    Wrapper: 'w-full max-w-64 lg:min-w-64',
    Image: 'max-h-full',
  },
});

export default {
  ...vitalLogoBase,
  Default,
};
