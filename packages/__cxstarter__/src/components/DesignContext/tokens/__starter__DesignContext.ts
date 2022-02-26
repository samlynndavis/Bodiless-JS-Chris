import { asTokenGroup } from '@bodiless/cx-elements';
import { addProps, as, withRegisterDesignContext } from '@bodiless/fclasses';
import omit from 'lodash/omit';

const WithRegisterRichText = withRegisterDesignContext('RichText',
  d => omit(d, 'H1'));

const WithRegisterEditorPlain = withRegisterDesignContext('EditorPlain',
  d => ({ Editable: as(d?.Editable, addProps({ placeholder: 'Custom' })) }),);

export default asTokenGroup({
  categories: {
    Component: ['DesignContext']
  }
})({
  WithRegisterRichText,
  WithRegisterEditorPlain,
});
