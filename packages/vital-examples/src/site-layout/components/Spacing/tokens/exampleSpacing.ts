import { asTokenGroup, SpacingMeta } from '@bodiless/vital-elements';
import { vitalSpacingBase } from '@bodiless/vital-elements/src/base';

// Here we use `asTokenGroup` to share the TextDecorationMeta among all tokens exported.
export default asTokenGroup(SpacingMeta)({
  ...vitalSpacingBase,
  WithSiteMargin: 'mx-2 xl:mx-6 xxl:px-20',
  // You can find more about this specific token on the vital-element package.
  // packages/vital-elements/src/components/Spacing/tokens/vitalSpacing.ts.
  WithSiteXLConstraint: 'xxl:container xxl:mx-auto',
});
