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
  withBoldMeta,
  withUnderlineMeta,
  withSuperScriptMeta,
  withHeader1Meta,
  withHeader2Meta,
  withHeader3Meta,
  withHeader4Meta,
  withHeader5Meta,
} from '@bodiless/richtext';
import {
  DefaultNormalHref,
} from '@bodiless/components';
import { cxLink, LinkClean } from '@bodiless/cx-link';
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

// QUESTION -- I had to bring in the definitions to get right order as () didn't work.
const Full = asCxTokenSpec()({
  Core: {
    paragraph: as(replaceWith(P), asBlock as HOC),
    Bold: withBoldMeta,
    Underline: withUnderlineMeta,
    Link: replaceWith(LinkClean),
    SuperScript: withSuperScriptMeta,
    H1: withHeader1Meta,
    H2: withHeader2Meta,
    H3: withHeader3Meta,
    H4: withHeader4Meta,
    H5: withHeader5Meta,
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
    Link: as(cxLink.Default),
  },
  Components: {
    Link: as(cxLink.Default),
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
