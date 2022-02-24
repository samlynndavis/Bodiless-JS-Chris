import { asTokenGroup } from '../../util';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['Color'],
  },
};

export const cxElementColor = asTokenGroup(meta)({
  WithPrimaryBgColor: 'bg-primary-bg',
  WithPrimaryBrandColorBg: 'bg-primary-brand',
  WithPrimaryBrandColorText: 'text-primary-brand',
  WithInteractiveColorBg: 'bg-primary-interactive',
  WithInteractiveColorText: 'text-primary-interactive',
  WithInteractiveHoverColorText: 'hover:opacity-70',
  WithInteractiveActiveColorText: 'active:text-primary-interactive-active',
  WithInteractiveDisabledColorText: 'text-opacity-60',
  WithGrayPageBg: 'bg-gray-page',
  WithLightGrayBg: 'bg-gray-light',
  WithLightGrayText: 'text-gray-light',
  WithBodyText: 'text-gray-body',
  WithFooterBg: 'bg-gray-footer',
  WithHeaderColor: 'text-black-header',
  WithEyebrowColor: 'text-secondary-eyebrow',
});
