import {
  H1, H2, H3, H4, H5, Div, P, ComponentOrTag,
} from '@bodiless/fclasses';
import {
  designableElement
} from '../../util';

export type ElementComponents = {
  H1: ComponentOrTag<any>,
  H2: ComponentOrTag<any>,
  H3: ComponentOrTag<any>,
  H4: ComponentOrTag<any>,
  H5: ComponentOrTag<any>,
  Paragraph: ComponentOrTag<any>,
  Eyebrow: ComponentOrTag<any>,
};

// @todo should these be called 'Clean' since in general they will
// pick up the global design context stylings?
export const H1Clean = designableElement<ElementComponents>('H1')(H1);
export const H2Clean = designableElement<ElementComponents>('H2')(H2);
export const H3Clean = designableElement<ElementComponents>('H3')(H3);
export const H4Clean = designableElement<ElementComponents>('H4')(H4);
export const H5Clean = designableElement<ElementComponents>('H5')(H5);
export const ParagraphClean = designableElement<ElementComponents>('Paragraph')(P);
export const EyebrowClean = designableElement<ElementComponents>('Eyebrow')(Div);
