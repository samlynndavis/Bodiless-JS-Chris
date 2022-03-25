import { addProps, as, on } from '@bodiless/fclasses';
import { cxColor, cxFontSize, cxTextDecoration } from '@bodiless/cx-elements';
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
      cxTextDecoration.Uppercase,
      cxColor.TextPrimaryFooterCopy,
      cxFontSize.Base,
    ),
    Item: 'leading-none',
  },
  Spacing: {
    Item: 'mt-5 lg:mt-3',
    Title: 'my-3 lg:my-1.5',
  },
});

export default {
  Base,
  Footer,
};
