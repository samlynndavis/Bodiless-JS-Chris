import {
  replaceWith,
  P,
  HOC,
  flowHoc,
  as,
  addProps,
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
import { asCxTokenSpec } from '@bodiless/cx-elements';
import { LinkClean } from '@bodiless/cx-link';
import Components from './cxRichText.cx-components';

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
const Default = asCxTokenSpec()({
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
  Content: {
    _: addProps({ placeholder: 'Placeholder' }),
  },
  Components,
  Behavior: {
    Link: withLinkDeserializer,
  },
  Compose: {
    AsFlowContainerItem,
  },
});

export default { Default, AsFlowContainerItem };
