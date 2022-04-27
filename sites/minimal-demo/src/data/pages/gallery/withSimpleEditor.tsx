import { RichText } from '@bodiless/richtext-ui';
import {
  addClasses, flowHoc, replaceWith, withDesign, A, Em, Strong,
} from '@bodiless/fclasses';
import { asBodilessLink, withPlaceholder } from '@bodiless/components';
import { withChild, withNodeKey } from '@bodiless/core';

const asBold = flowHoc(
  replaceWith(Strong),
  addClasses('font-bold'),
);

const asItalic = flowHoc(
  replaceWith(Em),
);

const asUnderline = addClasses('underline');

const asLink = flowHoc(
  replaceWith(A),
  asBodilessLink(),
  addClasses('text-blue-700 underline')
);

const simpleDesign = {
  Bold: asBold,
  Italic: asItalic,
  Underline: asUnderline,
  Link: asLink,
};

const withSimpleEditor = (nodeKey?: string, placeholder?: string) => flowHoc(
  addClasses('overflow-hidden'),
  withChild(RichText, 'Editor'),
  withDesign({
    Editor: flowHoc(
      withDesign(simpleDesign),
      withPlaceholder(placeholder),
      withNodeKey(nodeKey),
    ),
  }),
);

export default withSimpleEditor;
