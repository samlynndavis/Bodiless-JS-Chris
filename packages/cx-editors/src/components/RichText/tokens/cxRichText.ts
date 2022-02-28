import {
  replaceWith,
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
import {
  asCxTokenSpec, H1Clean, H2Clean, H3Clean, H4Clean, H5Clean, ParagraphClean,
} from '@bodiless/cx-elements';
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
    paragraph: as(replaceWith(ParagraphClean), asBlock as HOC),
    Bold: withBoldMeta,
    Underline: withUnderlineMeta,
    Link: replaceWith(LinkClean),
    SuperScript: withSuperScriptMeta,
    H1: as(replaceWith(H1Clean), withHeader1Meta),
    H2: as(replaceWith(H2Clean), withHeader2Meta),
    H3: as(replaceWith(H3Clean), withHeader3Meta),
    H4: as(replaceWith(H4Clean), withHeader4Meta),
    H5: as(replaceWith(H5Clean), withHeader5Meta),
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
