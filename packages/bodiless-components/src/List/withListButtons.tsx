/**
 * Copyright © 2019 Johnson & Johnson
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

import { useMemo } from 'react';
import {
  withMenuOptions, withLocalContextMenu,
  withContextActivator, ifEditable, PageEditContextInterface,
} from '@bodiless/core';
import { v1 } from 'uuid';

import { ItemProps } from './types';

const hasChildSubList = (context: PageEditContextInterface, count: number = 1): boolean => {
  const descendants = context.activeDescendants || [];
  // The first child list is the one to which this toggle applies,
  // so we check to see if more than one.
  return descendants.filter(c => c.type === 'list-item').length > count;
};

const useMenuOptions = (props: ItemProps) => {
  // const context = useEditContext();
  const {
    onAdd, onDelete, canDelete,
  } = props;

  const menuOptions = useMemo(() => ([
    {
      name: `add-${v1()}`,
      // isHidden: () => hasChildSubList(context),
      icon: 'add',
      label: 'Add',
      handler: onAdd,
      global: false,
      local: true,
    },
    {
      name: `remove-${v1()}`,
      icon: 'delete',
      label: 'Delete',
      // isHidden: () => !canDelete() || hasChildSubList(context),
      isHidden: () => !canDelete(),
      handler: onDelete,
      global: false,
      local: true,
    },
  ]), []);

  return menuOptions;
};

const withListButtons = ifEditable(
  withMenuOptions({ useMenuOptions, name: 'List Item', type: 'list-item' }),
  withContextActivator('onClick'),
  withLocalContextMenu,
);

export default withListButtons;
export { hasChildSubList };
