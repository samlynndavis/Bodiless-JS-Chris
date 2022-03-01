import { H2 } from '@bodiless/fclasses'
import { designableElement } from '@bodiless/cx-elements';

// We are creating a new, brand specific designable element.
// This can be used when composing other components and will allow individual
// sites to customize the element globally through the design context.
export const H2SpecialClean = designableElement('H2Special')(H2);
