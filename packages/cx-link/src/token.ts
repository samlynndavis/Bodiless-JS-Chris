import {
  addProps, Span, addClassesIf, addPropsIf, flowIf, as, on,
} from '@bodiless/fclasses';
import { withSidecarNodes, withNodeKey } from '@bodiless/core';
import { cxElement } from '@bodiless/cx-elements';
import { asLinkToken } from './LinkClean';
import { useExternalLinkToggle, asEditableLink, useIsDownloadLink } from './util';

/**
 * Token which causes link to display as an external link.
 */
const WithExternalStyles = asLinkToken({
  Flow: flowIf(useExternalLinkToggle),
  Core: {
    ExternalSRText: on(Span)(
      'sr-only',
      addProps({
        children: 'Open link in new window',
      }),
    ),
  },
  Behavior: {
    Wrapper: addProps({
      target: '_blank',
      rel: 'noopener noreferrer',
    }),
  },
  Theme: {
    // TODO -- switch to SVG Icon
    Wrapper: 'cx-external-link',
  },
});

const WithDownloadStyles = asLinkToken({
  Core: {
    Wrapper: as(
      // TODO -- switch to SVG Icon
      addClassesIf(useIsDownloadLink())('cx-download-link'),
      addPropsIf(useIsDownloadLink())({ target: '_blank', rel: 'noopener noreferrer' }),
    ),
  },
});

/**
 * Token which produces a default canvasx editable link.
 */
const Default = asLinkToken({
  /**
   * Canvasx typography and colors.
   */
  Theme: {
    _: as(WithDownloadStyles, WithExternalStyles),
    // @todo these should apply tokens from the cxElement collection.
    Wrapper: as(cxElement.Link, cxElement.WithInteractiveColorText),
  },
  /**
   * Makes the link editable. Nodekey must be provided separately.
   * Editor token should be applied after all composed tokens to ensure
   * they have access to props...
   */
  Schema: {
    _: asEditableLink(),
  },
});

const Sidecar = asLinkToken({
  ...Default,
  Schema: {
    _: withSidecarNodes(
      withNodeKey('link'),
      asEditableLink(),
    ),
  },
});

const cxLink = {
  Default, WithExternalStyles, WithDownloadStyles, Sidecar,
};

// eslint-disable-next-line import/prefer-default-export
export { cxLink };
