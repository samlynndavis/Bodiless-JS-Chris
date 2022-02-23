import {
  replaceWith,
  P,
  HOC,
  flowHoc,
  as,
  withTokenFromRegistry,
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
import { ifComponentSelector } from '@bodiless/layouts';
import { asFluidToken } from '@bodiless/cx-elements';
import { LinkClean } from '@bodiless/cx-link';
import Components from './cxRichText.cx-components';

const withLinkDeserializer = withHtmlDeserializer(
  createLinkDeserializer({
    normalizeHref: ((href: string) => (
      new DefaultNormalHref(href).toString()
    )) as any,
  }),
) as HOC;

const AsFlowContainerItem = asFluidToken({
  Core: {
    _: as(
      ifComponentSelector(asPreview),
    ),
  },
  Meta: flowHoc.meta.term('Type')('Text Editor'),
});

const WithRegisteredComponents = withTokenFromRegistry('cxRichText__WithComponents');

const WithComponents = asFluidToken({
  Components,
});

// QUESTION -- I had to bring in the definitions to get right order as () didn't work.
const Full = asFluidToken({
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
  Behavior: {
    Link: withLinkDeserializer,
  },
  Compose: {
    WithRegisteredComponents,
    AsFlowContainerItem,
  },
});

export default { Full, AsFlowContainerItem, WithComponents, WithRegisteredComponents };
