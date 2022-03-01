import { asTokenGroup } from '../../../util';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['Color'],
  },
};

export const cxElementColor = asTokenGroup(meta)({
  WithBgPrimaryBrandColor: 'bg-cx-primary-brand',
  WithPrimaryBrandColorText: 'text-cx-primary-brand',
  WithBgPrimaryCardBgColor: 'bg-cx-primary-card-bg',
  WithBgPrimaryPageBgColor: 'bg-cx-primary-page-bg',
  WithBgPrimaryInteractiveColor: 'bg-cx-primary-interactive',
  WithTextPrimaryInteractiveColor: 'text-cx-primary-interactive',
  WithPrimaryInteractiveHoverOpacity: 'hover:opacity-70',
  WithTextPrimaryInteractiveActiveColor: 'active:text-cx-primary-interactive-active',
  WithTextPrimaryInteractiveDisabledOpacity: 'text-opacity-60',
  WithBgPrimaryDividerColor: 'bg-cx-primary-divider',
  WithTextPrimaryDividerColor: 'text-cx-primary-divider',
  WithTextPrimaryBodyCopyColor: 'text-cx-primary-body-copy',
  WithTextPrimaryHeaderCopyColor: 'text-cx-primary-header-copy',
  WithBgSecondaryFooterBgColor: 'bg-cx-secondary-footer-bg',
  WithTextSecondaryEyebrow: 'text-cx-secondary-eyebrow',
});
