import {
  asBodilessList, ListComponents, asStylableList, ListProps,
} from '@bodiless/components';

import {
  flowHoc,
} from '@bodiless/fclasses';
import { asCxTokenSpec } from '@bodiless/cx-elements';
import { ComponentType } from 'react';
import { withoutHydration } from '@bodiless/hydration';

export type SubListComponents = {
  OuterWrapper: ComponentType<any>,
} & ListComponents;

const ListClean: ComponentType<ListProps> = flowHoc(
  asBodilessList(),
  asStylableList,
)('ul');

export default ListClean;
export const ListStatic: ComponentType<ListProps> = withoutHydration()(ListClean);
export const asListToken = asCxTokenSpec<ListComponents>();
export const asSubListToken = asCxTokenSpec<SubListComponents>();
