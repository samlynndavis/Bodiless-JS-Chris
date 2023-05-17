// TODO This file should move to Listerine package..

import {
  vitalFooter, asFooterToken, RewardsClean,
} from '@bodiless/vital-layout';
import {
  addProps,
  as,
  flowHoc, on,
} from '@bodiless/fclasses';
import { asElementToken } from '@bodiless/vital-elements';
import customRewards from '../Rewards/tokens/customRewards';

// NOTE: In truth, all of the styling found within this withTopFooterWave token
// could be applied directly to the customFooter token below, but is separated
// here for readability and modularity's sake.

const withTopFooterWave = asElementToken({
  Theme: {
    _: '2xl:before:content-none before:content-[\'\'] before:bg-mobile-wave-top',
  },
  Spacing: {
    _: 'before:mr-[-50vw] before:right-[50%] before:top-[-35px]'
  },
  Layout: {
    _: 'before:absolute before:w-screen before:h-9'
  },
});

const customFooter = asFooterToken(vitalFooter.Default, {
  ...vitalFooter.WithRewardsExpanding2XL,
  Components: {
    Rewards: flowHoc(
      // NOTE: Here we replace our footer's current 'Rewards' slot with
      // a new clean Rewards component with our 'customRewards' styling
      // applied to it.
      on(RewardsClean)(customRewards.Default),
    ),
  },
  Theme: {
    // NOTE: Here in 'Theme' domain of our footer token, we apply our footer-wave
    // class to the container (Wrapper) at desktop screen sizes.
    Wrapper: '2xl:footer-wave',
    Column2Wrapper: as(
      withTopFooterWave,
      'relative',
    ),
  },
  Layout: {
    Column2Wrapper: 'pb-5',
  }
});

const Default = asFooterToken({
  Behavior: {
    ...vitalFooter.Default.Behavior,
    Wrapper: addProps({ 'shadowed-by': 'CustomFooter' }),
  },
},
customFooter);

export default {
  ...vitalFooter,
  Default,
  customFooter,
};
