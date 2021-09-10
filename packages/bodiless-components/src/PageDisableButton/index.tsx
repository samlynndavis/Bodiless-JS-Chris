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
  useEffect,
  useState,
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

// @TEMP
const testDelay = (() => (
  new Promise(resolve => {
    setTimeout(() => {
      resolve('done');
    }, 10000);
  })
))();

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

const useMenuOptions = (): TMenuOption[] => {
  const context = useEditContext();
  const [state, setState] = useState<FormState>(initialFormState);
  useEffect(() => {
    (async () => {
      await testDelay;
      setState(currentState => ({
        ...currentState,
        formTitle: 'Enabled',
        formIcon: 'visibility',
      }));
    })();
  }, []);
  const render = (formProps: FormProps) => (
    <Form {...formProps} state={state} />
  );
  const { formTitle, formIcon } = state;
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
  peer: true,
};

const withPageDisableButton = withMenuOptions(menuOptions);

export default withPageDisableButton;
