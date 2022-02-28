import { asTokenGroup } from '@bodiless/cx-elements';
import type { ElementComponents } from '@bodiless/cx-elements';
import {
  addProps, as, withRegisterDesignContext
} from '@bodiless/fclasses';
import omit from 'lodash/omit';

import { __cxstarter__Element } from '../../Element';

// Do not customize formatting of individual elements within the richtext
// here.  That should be done in the Element design context below.
const WithRegisterRichText = withRegisterDesignContext('RichText', d => (
  omit(d, 'H1')
));

// @todo this could perhaps just be a designable element...
const WithRegisterEditorPlain = withRegisterDesignContext('EditorPlain', d => ({
  Editable: as(d?.Editable, addProps({ placeholder: 'Custom' }))
}));

// This is where place customized designable element styling into the design context.
// These will be used by any CanvasX component which uses a designable element.
const WithRegisterElement = withRegisterDesignContext<ElementComponents>('Element', d => ({
  // @todo should we put the whole token collection here or ony the ones used
  // in existing designable elements?
  ...__cxstarter__Element,
}));

export default asTokenGroup({
  categories: {
    Component: ['DesignContext']
  }
})({
  WithRegisterRichText,
  WithRegisterEditorPlain,
  WithRegisterElement,
});
