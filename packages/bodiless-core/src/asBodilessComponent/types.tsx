import { Enhancer, ComponentOrTag } from '@bodiless/fclasses';
import { WithNodeProps, WithNodeKeyProps } from './Types/NodeTypes';
import { EditButtonOptions, UseBodilessOverrides } from './Types/EditButtonTypes';
/**
 * Options for making a component "bodiless".
 */

export type Options<P, D> = EditButtonOptions<P, D> & {
  /**
   * The event used to activate the edit button.  Default is 'onClick'
   */
  activateEvent?: string;
  /**
   * An optional component to use as a wrapper in edit mode. Useful if the underlying component
   * cannot produce an activation event (eg if it does not accept an 'onClick' prop).
   */
  Wrapper?: ComponentOrTag<any>;
  /**
   * An object providing default/initial values for the editable props. Should be keyed by the
   * prop name.
   */
  defaultData?: D;
};
export type AsBodiless<P, D, E = {}> = (
  nodeKeys?: WithNodeKeyProps,
  defaultData?: D,
  useOverrides?: UseBodilessOverrides<P, D, E>) => Enhancer<Partial<WithNodeProps>>;
