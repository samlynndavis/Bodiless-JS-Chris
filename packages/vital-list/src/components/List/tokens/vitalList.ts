import {
  flowHoc, startWith, as, on
} from '@bodiless/fclasses';
import { LinkClean, cxLink } from '@bodiless/cx-link';
import { withEditorPlain, withEditorRich } from '@bodiless/cx-editors';
import { asListToken } from '../ListClean';
import { TitleInfographicClean, vitalTitleInfographic } from '../../TitleInfographic';

const WithPlainTitle = asListToken({
  Meta: flowHoc.meta.term('Title')('Plain Text'),
  Schema: {
    Title: withEditorPlain('title', 'Item'),
  },
});

const WithInfographicTitle = asListToken({
  Components: {
    Title: on(TitleInfographicClean)(vitalTitleInfographic.Default),
  },
  Spacing: {
    Wrapper: 'space-y-4',
  },
  Meta: flowHoc.meta.term('Title')('Infographic'),
});

const WithLinkedTitle = asListToken({
  Meta: flowHoc.meta.term('Title')('Links'),
  Schema: {
    Title: as(
      startWith(LinkClean),
      withEditorPlain('title', 'Link'),
      cxLink.Sidecar,
    ),
  },
});

const WithRichTitle = asListToken({
  Meta: flowHoc.meta.term('Title')('Rich Text'),
  Schema: {
    Title: withEditorRich('title', 'Item'),
  },
});

const WithIndent = asListToken({
  Spacing: {
    Wrapper: 'ltr:pl-10 rtl:pr-10',
  },
});

const WithBullets = asListToken({
  Layout: {
    Wrapper: 'list-disc',
  },
  Spacing: {
    Wrapper: 'ltr:pl-5 rtl:pr-5',
  },
});

const WithNumbers = asListToken({
  Layout: {
    Wrapper: 'list-decimal',
  },
  Spacing: {
    Wrapper: 'ltr:pl-5 rtl:pr-5',
  },
});

const Base = asListToken({
  Meta: flowHoc.meta.term('Type')('List'),
});

const Default = asListToken({
  ...Base,
  ...WithRichTitle,
});

export default {
  Base,
  Default,
  WithIndent,
  WithBullets,
  WithRichTitle,
  WithInfographicTitle,
  WithLinkedTitle,
  WithNumbers,
  WithPlainTitle,
};
