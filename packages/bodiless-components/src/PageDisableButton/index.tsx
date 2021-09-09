/**
 * Copyright © 2021 Johnson & Johnson
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

import React, {
  useCallback,
} from 'react';
import {
  useEditContext,
  withMenuOptions,
  TMenuOption,
  MenuOptionsDefinition,
  useMenuOptionUI,
  ContextMenuForm,
} from '@bodiless/core';

import type {
  ContextMenuFormProps,
} from '@bodiless/core';

const DisabledForm = (props: ContextMenuFormProps) => {
  const { ComponentFormFieldTitle, ComponentFormTitle } = useMenuOptionUI();
  return (
    <ContextMenuForm {...props}>
      <ComponentFormTitle>
        Disabled
      </ComponentFormTitle>
      <ComponentFormFieldTitle>
        This page is now disabled.
        <br />
        You can enable it again at this URL.
      </ComponentFormFieldTitle>
    </ContextMenuForm>
  );
};

const EnabledForm = (props: ContextMenuFormProps) => {
  const { ComponentFormFieldTitle, ComponentFormTitle } = useMenuOptionUI();
  return (
    <ContextMenuForm {...props}>
      <ComponentFormTitle>
        Enabled
      </ComponentFormTitle>
      <ComponentFormFieldTitle>
        This page is now enabled.
      </ComponentFormFieldTitle>
    </ContextMenuForm>
  );
};

const useMenuOptions = (): TMenuOption[] => {
  const context = useEditContext();

  const menuOptions$: TMenuOption[] = [
    {
      name: 'page-disable',
      icon: 'visibility_off',
      label: 'Disable',
      group: 'page-group',
      isDisabled: useCallback(() => !context.isEdit, []),
      handler: () => DisabledForm,
    },
    {
      name: 'page-enable',
      icon: 'visibility',
      label: 'Enable',
      group: 'page-group',
      isDisabled: useCallback(() => !context.isEdit, []),
      handler: () => EnabledForm,
    },
  ];
  return menuOptions$;
};

const menuOptions: MenuOptionsDefinition<object> = {
  useMenuOptions,
  name: 'PageDisable',
  peer: true,
};

const withPageDisableButton = withMenuOptions(menuOptions);

export default withPageDisableButton;
