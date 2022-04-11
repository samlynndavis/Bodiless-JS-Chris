import { cxRichText } from '@bodiless/cx-editors';
import { cxImage } from '@bodiless/cx-image';
import { addProps } from '@bodiless/fclasses';
import { withNodeKey } from '../../../../../bodiless-components/node_modules/@bodiless/core/lib';
import { asTitleInfographicToken } from '../TitleInfographicClean';

const Default = asTitleInfographicToken({
  Editors: {
    Title: cxRichText.Default,
    Image: cxImage.Default,
  },
  Schema: {
    Title: withNodeKey('title'),
    Image: withNodeKey('image'),
  },
  Content: {
    Title: addProps({ placeholder: 'Title' }),
  },
  Layout: {
    Wrapper: 'flex flex-row',
    Image: 'max-w-24 pr-4 rtl:pl-4 rtl:pr-0 box-content',
  },
});

export default {
  Default,
};
