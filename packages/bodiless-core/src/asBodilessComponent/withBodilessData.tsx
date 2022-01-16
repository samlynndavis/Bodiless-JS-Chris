import flowRight from 'lodash/flowRight';
import { Enhancer } from '@bodiless/fclasses';
import withNode, { withNodeKey } from '../withNode';
import { withNodeDataHandlers } from '../hoc';
import { WithNodeProps, WithNodeKeyProps } from '../Types/NodeTypes';
/**
 * Convenience HOC to plug a component into the bodiless data model.
 *
 * @param nodeKeys The nodekeys which will be used to locate the component's data.
 *
 * @param defaultData Default data to be provided for this component.
 */
export const withBodilessData = <D extends object>(
  nodeKey?: WithNodeKeyProps,
  defaultData?: D) => flowRight(
    withNodeKey(nodeKey),
    withNode,
    withNodeDataHandlers(defaultData)) as Enhancer<Partial<WithNodeProps>>;
