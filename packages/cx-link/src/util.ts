import { asBodilessLink } from '@bodiless/components-ui';
import type { AsBodilessLink } from '@bodiless/components';

/**
 * Produces an HOC which creates an editable link.
 *
 * @see asBodilessLink.
 */
const asEditableLink: AsBodilessLink = asBodilessLink;

/**
* hook that determines if the link is an external link
* the hook validates the data in the current node
*
* @returns true when link href starts with http:// | https:// | //
*/
const useExternalLinkToggle = (props: any) => {
  const { externalLinkFilter, href } = props;
  // Use custom filter if appropriate prop was provided.
  if (href && externalLinkFilter) {
    return externalLinkFilter(href);
  }
  const regexp = /^https:\/\/|^http:\/\/|^\/\//;
  return !!(href && regexp.test(href));
};

const useIsDownloadLink = (...types: string[]) => ({ href }: any) => {
  const types$ = types.length > 0 ? types : ['doc', 'docx', 'pdf'];
  const regexp = new RegExp(`\\.(${types$.join('|')})$`);
  return regexp.test(href || '');
};

const anchorTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  element?.focus();
  requestAnimationFrame(() => {
    // eslint-disable-next-line no-restricted-globals
    const newHref = location.href.replace(`#${elementId}`, '');
    // eslint-disable-next-line no-restricted-globals
    history.replaceState(history.state, '', newHref);
  });
};

export {
  useExternalLinkToggle, useIsDownloadLink, asEditableLink, anchorTo,
};
