/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import flow from 'lodash/flow';
import {
  HOC, Design, withDesign, flowHoc, withFinalDesign, flowIf,
} from '@bodiless/fclasses';
import {
  asStylableSubList, asSubList, withDeleteNodeOnUnwrap,
  withSubLists, UseListOverrides, useListContext,
} from '@bodiless/components';

import { asBreadcrumb } from '../Breadcrumbs';
import {
  asMenuTitle, asMenuCard, DEFAULT_NODE_KEYS,
} from './MenuTitles';

/**
 * Creates a stylable sublist which deletes it's data when the last item is removed.
 * Suitable for use for all menus.
 *
 * @param titleDesign token which will be applied to the sublist title.
 * @param useOverrides optional hook returning overrides for the submenu button.
 */
const asMenuSubList = (
  withTitleDesign: HOC | HOC,
  useOverrides: UseListOverrides = () => ({}),
) => flow(
  asSubList((props) => ({ groupLabel: 'Sub-Menu Item', ...useOverrides(props) })),
  asStylableSubList,
  withDeleteNodeOnUnwrap('sublist'),
  // We must use withFinalDesign to ensure that asBreadcrumb uses the correct node
  // when the item is a sublist. Skip `overview` list items.
  withFinalDesign({
    Item: flowIf(() => useListContext().currentItem !== 'overview')(
      asBreadcrumb(DEFAULT_NODE_KEYS),
    ),
  }),
  withDesign({
    Title: withTitleDesign,
  }),
);

const withSubMenuDesign = (design: Design<any>) => withDesign({
  Item: withDesign(design),
});

/**
 * Helper which can be used to add a List submenu option to the menu.
 *
 * @param withTitleDesign optional token which will be applied to the sublist title.
 *
 */
const withListSubMenu = (withTitleDesign?: HOC | HOC) => withSubMenuDesign({
  List: asMenuSubList(
    flowHoc(asMenuTitle, withTitleDesign),
  ),
});

/**
 * Helper which can be used to add a Cards submenu option to the menu.
 *
 * @param withTitleDesign optional token which will be applied to the sublist title.
 *
 */
const withCardsSubMenu = (withTitleDesign?: HOC | HOC) => withSubMenuDesign({
  Cards: asMenuSubList(
    flowHoc(asMenuCard, withTitleDesign),
  ),
});

/**
 * Helper which can be used to add a Columns submenu option to the menu.
 *
 * @param withTitleDesign optional token which will be applied to the sublist title.
 *
 */
const withColumnSubMenu = (withTitleDesign?: HOC | HOC) => withSubMenuDesign({
  Columns: flowHoc(
    asMenuSubList(
      flowHoc(asMenuTitle, withTitleDesign),
    ),
    withSubLists(1)(
      asMenuSubList(
        flowHoc(asMenuTitle, withTitleDesign),
        () => ({ groupLabel: 'Column Sub-Menu Item' }),
      ),
    ),
  ),
});

export {
  withListSubMenu,
  withCardsSubMenu,
  withColumnSubMenu,
};
