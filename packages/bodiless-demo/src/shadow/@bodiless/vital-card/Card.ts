import { asCardToken, vitalCardBase } from '@bodiless/vital-card';

const Hero = asCardToken(vitalCardBase.Hero, {
  // ...vitalCardBase.WithPrimaryButton,
});

export default {
  ...vitalCardBase,
  Hero,
};
