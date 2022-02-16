import {
  replaceWith,
  P,
  HOC,
  flowHoc,
  as,
} from '@bodiless/fclasses';
import {
  asBlock,
  createLinkDeserializer,
  withHtmlDeserializer,
  asPreview,
} from '@bodiless/richtext';
import {
  DefaultNormalHref,
} from '@bodiless/components';
//import { cxLink, LinkClean } from '@canvasx/link';
import { ifComponentSelector } from '@bodiless/layouts';
import { cxElement, asCxTokenSpec } from '@bodiless/cx-elements';

const withLinkDeserializer = withHtmlDeserializer(
  createLinkDeserializer({
    normalizeHref: ((href: string) => (
      new DefaultNormalHref(href).toString()
    )) as any,
  }),
) as HOC;

const AsFlowContainerItem = asCxTokenSpec()({
  Core: {
    _: as(
      ifComponentSelector(asPreview),
    ),
  },
  Meta: flowHoc.meta.term('Type')('Text Editor'),
});

const Full = asCxTokenSpec()({
  Core: {
    paragraph: as(replaceWith(P), asBlock as HOC),
    // Link: replaceWith(LinkClean),
    // H1: {},
    // H2: {},
    // H3: {},
    // H4: {},
    // H5: {},
  },
  Theme: {
    paragraph: cxElement.Body,
    Bold: cxElement.Bold,
    Underline: cxElement.Underline,
    SuperScript: cxElement.SuperScript,
    H1: cxElement.H1,
    H2: cxElement.H2,
    H3: cxElement.H3,
    H4: cxElement.H4,
    H5: cxElement.H5,
    // Link: as(cxLink.Default),
  },
  Components: {
    // Link: as(cxLink.Default),
  },
  Behavior: {
    Link: withLinkDeserializer,
  },
  Compose: {
    AsFlowContainerItem,
  },
});

// eslint-disable-next-line import/prefer-default-export
export const cxRichText = { Full, AsFlowContainerItem };
