import { vitalColorBase } from '@bodiless/vital-elements/src/base';
import { ColorMeta } from '@bodiless/vital-elements/src/components/Color';
import { asTokenGroup } from '@bodiless/vital-elements/src/util';

export default asTokenGroup(ColorMeta)({
  ...vitalColorBase,
  BgPrimaryBrand: 'bg-primary-brand',
  TextPrimaryBrand: 'text-primary-brand',
  BgPrimaryCard: 'bg-primary-card-bg',
  BgPrimaryPage: 'bg-primary-page-bg',
  BgPrimaryInteractive: 'bg-primary-interactive',
  TextPrimaryInteractive: 'text-primary-interactive',
  BorderPrimaryInteractive: 'border-primary-interactive',
  TextPrimaryInteractiveNoHover:
    'text-primary-interactive active:text-primary-interactive-active',
  TextPrimaryInteractiveHover: 'hover:text-primary-interactive',
  BgPrimaryDivider: 'bg-primary-divider',
  TextPrimaryDivider: 'text-primary-divider',
  TextPrimaryBodyCopy: 'text-primary-body-copy',
  TextPrimaryHeaderCopy: 'text-primary-header-copy',
  TextPrimaryFooterCopy: 'text-primary-footer-copy',
  TextSecondaryEyebrow: 'text-secondary-eyebrow',
  BgSecondaryFooter: 'bg-secondary-footer-bg',
  BorderSecondarySeparator: 'border-secondary-separator',
});
