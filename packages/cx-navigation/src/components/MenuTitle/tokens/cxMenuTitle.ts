import { withNodeKey, withSidecarNodes } from '@bodiless/core';
import { startWith, Div } from '@bodiless/fclasses';
import { withBodilessLinkToggle, withPlaceholder } from '@bodiless/components';
import { asBodilessLink } from '@bodiless/components-ui';
import { cxEditorPlain } from '@bodiless/cx-editors';
import { asMenuTitleToken } from '../MenuTitleClean';

/**
 * @private
 */
const asMenuLink = (asEditableLink: typeof asBodilessLink) => withSidecarNodes(
  asEditableLink('link', undefined, () => ({ groupLabel: 'Menu Link' })),
);

/**
 * Default MenuTitleToken that applies default Editors to the Menu Titles.
 */
const Default = asMenuTitleToken({
  Editors: {
    Title: cxEditorPlain.Default,
  },
  Schema: {
    Title: withNodeKey('text'),
    Link: asMenuLink(withBodilessLinkToggle(asBodilessLink, startWith(Div), true)),
  },
  Content: {
    Title: withPlaceholder('Menu Item'),
  },
});

export default { Default };
