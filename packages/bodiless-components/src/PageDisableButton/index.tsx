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
  useState,
  useCallback,
} from 'react';
import {
  withNode,
  useNode,
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
  buttonLabel: string,
  formIcon?: string,
  formTitle: string,
  formDescription: string[],
};

type FormProps = ContextMenuFormProps & {state: FormState};

const enabledFormState: FormState = {
  buttonLabel: 'Disable',
  formTitle: 'Page Disabled',
  formDescription: [
    'This page is now disabled.',
    'You can enable it again at this URL.',
  ],
  formIcon: 'visibility_off',
};

const disabledFormState: FormState = {
  buttonLabel: 'Enable',
  formTitle: 'Page Enabled',
  formDescription: [
    'This page is now enabled.',
  ],
  formIcon: 'visibility',
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
        {
          // We are not going to modify this array, so let's use the index as a key
          // eslint-disable-next-line react/no-array-index-key
          formDescription.map((string, index) => <p key={index}>{string}</p>)
        }
      </ComponentFormFieldTitle>
    </ContextMenuForm>
  );
};

type DisabledOptions = {
  page: boolean,
  menuLinks: boolean,
  contentLinks: boolean,
  indexing: boolean,
};

type Data = {
  disabledPages?: {
    [path: string]: DisabledOptions,
  },
};

const useMenuOptions = (): TMenuOption[] => {
  const { node } = useNode<Data>();
  const { pagePath, data } = node;
  const { disabledPages = {} } = data;
  const context = useEditContext();
  const isPageInDisabledList = disabledPages[pagePath]?.page !== undefined;
  const [isPageDisabled, setPageDisabled] = useState<boolean>(isPageInDisabledList);

  const togglePageVisibility = (): void => {
    if (isPageInDisabledList) {
      // Enable
      node.setData({
        ...data,
        disabledPages: {
          ...disabledPages,
          [pagePath]: {
            ...disabledPages[pagePath],
            page: false,
          },
        },
      });
      setPageDisabled(false);
    } else {
      // Disable
      node.setData({
        ...data,
        disabledPages: {
          ...disabledPages,
          [pagePath]: {
            ...disabledPages[pagePath],
            page: true,
          },
        },
      });
      setPageDisabled(true);
    }
  };

  const formState: FormState = isPageDisabled ? disabledFormState : enabledFormState;
  const render = (formProps: FormProps) => {
    togglePageVisibility();
    return <Form {...formProps} state={formState} />;
  };
  const { buttonLabel, formIcon } = formState;
  const menuOptions$: TMenuOption[] = [
    {
      name: 'page-disable',
      icon: formIcon,
      label: buttonLabel,
      group: 'page-group',
      isHidden: useCallback(() => !context.isEdit, []),
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
