import { withNodeKey } from '@bodiless/data';
import { flowHoc, replaceWith } from '@bodiless/fclasses';
import { withPlaceholder } from '@bodiless/components';
import { vitalEditorPlain } from '@bodiless/vital-editors';

import { asSectionToken } from '../SectionClean';

export const SectionNodeKeys = {
  Title: 'title',
  Description: 'description',
  Link: 'link',
  Content: 'content',
};

const Default = asSectionToken({
  Components: {
    Title: vitalEditorPlain.Default,
    Description: vitalEditorPlain.Default,
  },
  Layout: {
    Wrapper: 'w-full flex flex-col',
  },
  Schema: {
    Title: withNodeKey(SectionNodeKeys.Title),
    Description: withNodeKey(SectionNodeKeys.Description),
    Link: withNodeKey(SectionNodeKeys.Link),
    Content: withNodeKey(SectionNodeKeys.Content),
  },
  Content: {
    Title: withPlaceholder('Default Section Title'),
    Content: withPlaceholder('Default Section Content'),
    Description: withPlaceholder('Section description'),
  },
  Meta: flowHoc.meta.term('Type')('Section'),
});

const WithNoTitle = asSectionToken({
  ...Default,
  Components: {
    ...Default.Component,
    Title: replaceWith(() => null),
  },
});

const WithNoDescription = asSectionToken({
  ...Default,
  Components: {
    ...Default.Component,
    Description: replaceWith(() => null),
  },
});

const WithNoLink = asSectionToken({
  ...Default,
  Components: {
    ...Default.Component,
    Link: replaceWith(() => null),
  },
});

export default {
  Default,
  WithNoTitle,
  WithNoDescription,
  WithNoLink
};
