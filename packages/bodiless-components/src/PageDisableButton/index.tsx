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
  withNode,
  // useNode,
  useEditContext,
  withMenuOptions,
  TMenuOption,
  MenuOptionsDefinition,
  useMenuOptionUI,
  ContextMenuForm,
  withNodeKey,
} from '@bodiless/core';
import {
  asToken,
} from '@bodiless/fclasses';

import type {
  ContextMenuFormProps,
} from '@bodiless/core';

type FormState = {
  pageDisabled: boolean,
  formIcon?: string,
  formTitle: string,
  formDescription: string[],
};

type FormProps = ContextMenuFormProps & {state: FormState};

const initialFormState: FormState = {
  pageDisabled: false,
  formTitle: 'Disabled',
  formDescription: [
    'This page is now disabled.',
    'You can enable it again at this URL.',
  ],
  formIcon: 'visibility_off',
};

const Form = (props: FormProps) => {
  const { ComponentFormFieldTitle, ComponentFormTitle } = useMenuOptionUI();
  const { state: { formTitle, formDescription } } = props;
  return (
    <ContextMenuForm {...props}>
      <ComponentFormTitle>
        {formTitle}
      </ComponentFormTitle>
      <ComponentFormFieldTitle>
        {formDescription.map(string => <p>{string}</p>)}
      </ComponentFormFieldTitle>
    </ContextMenuForm>
  );
};

// type Data = {
//   disabledPages?: string[],
// };

const useMenuOptions = (): TMenuOption[] => {
  // const { node } = useNode<Data>();
  // const disablePage = () => {
  //   const disabledPages = node.data.disabledPages || [];
  //   node.setData({
  //     ...node.data,
  //     disabledPages: disabledPages.concat([node.pagePath]),
  //   });
  // };

  // const enablePage = () => {
  //   const disabledPages = node.data.disabledPages || [];
  //   node.setData({
  //     ...node.data,
  //     disabledPages: disabledPages.filter(path => path !== node.pagePath),
  //   });
  // };

  const context = useEditContext();
  const formState: FormState = initialFormState;
  const render = (formProps: FormProps) => (
    <Form {...formProps} state={formState} />
  );
  const { formTitle, formIcon } = formState;
  const menuOptions$: TMenuOption[] = [
    {
      name: 'page-disable',
      icon: formIcon,
      label: formTitle,
      group: 'page-group',
      isDisabled: useCallback(() => !context.isEdit, []),
      handler: () => render,
    },
  ];
  return menuOptions$;
};

const menuOptions: MenuOptionsDefinition<object> = {
  useMenuOptions,
  name: 'PageDisable',
  root: true,
};

const withPageDisableButton = asToken(
  withMenuOptions(menuOptions),
  withNode,
  withNodeKey({
    nodeKey: 'disabled-pages',
    nodeCollection: 'site',
  }),
);

export default withPageDisableButton;
