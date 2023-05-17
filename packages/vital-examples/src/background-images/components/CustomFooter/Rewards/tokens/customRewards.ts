import {
  addProps,
} from '@bodiless/fclasses';
// import { withParent } from '@bodiless/core';
import { asRewardsToken, vitalRewards } from '@bodiless/vital-layout';
import { withChild } from '@bodiless/core';
import LogoIcon from '../../../../assets/images/logo';

const customRewards = asRewardsToken({
  ...vitalRewards.Default,
  Theme: {
    ...vitalRewards.Default.Theme,
    // NOTE: By default, the logo lives in the 'Brand' slot of the vitalRewards component.
    // It is here that you'll override this slot and replace it with the SVG logo uploaded to your
    // newly-created assets folder.
    Brand: withChild(LogoIcon),
  },
});

const Default = asRewardsToken({
  Behavior: {
    ...vitalRewards.Default.Behavior,
    Wrapper: addProps({ 'shadowed-by': 'CustomRewards' }),
  },
},
customRewards);

export default {
  ...vitalRewards,
  Default,
};
