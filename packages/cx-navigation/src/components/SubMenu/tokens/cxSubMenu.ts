import { addProps, as, on } from '@bodiless/fclasses';
import { cxColor } from '@bodiless/cx-elements';
import { asSubMenuToken } from '../SubMenuClean';
import { cxMenuTitle, MenuTitleClean } from '../../MenuTitle';
import { withAnalyticsAttr } from '../../../util';

const Base = asSubMenuToken({
  A11y: {
    Wrapper: addProps({ role: 'menu' }),
    Item: addProps({ role: 'menuitem' }),
  },
  Analytics: {
    Title: withAnalyticsAttr,
  },
  Components: {
    Title: on(MenuTitleClean)(cxMenuTitle.Default),
  },
});

const Footer = asSubMenuToken(Base, {
  Theme: {
    Title: as(
      cxColor.TextPrimaryFooterCopy,
      'text-base',
      // @todo why is this not an available token in cxFontSize?
      'font-medium md:text-sm lg:text-xs',
    ),
  },
  Spacing: {
    Item: 'mt-5 lg:mt-2',
  },
});

export default {
  Base,
  Footer,
};
