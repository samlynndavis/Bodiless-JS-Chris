/* eslint-disable no-restricted-globals */
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

import flow from 'lodash/flow';
import React, { useCallback, useEffect } from 'react';
import { useFormApi, useFormState } from 'informed';
import {
  ContextMenuForm,
  MenuOptionsDefinition,
  TMenuOption,
  useEditContext,
  useMenuOptionUI,
  withMenuOptions,
  withNode,
  withNodeKey,
  useNode,
} from '@bodiless/core';
import {
  flowHoc,
  withOnlyProps,
  HOC,
  addClasses,
  removeClasses,
} from '@bodiless/fclasses';
import type {
  ContextMenuFormProps,
} from '@bodiless/core';
import { ComponentFormDefaultPanelSize } from '@bodiless/ui';
import { withToolsButton } from '../Tools';
import { useGetRedirectAliases } from './hooks';
import type { AliasItem } from './types';
import { DefaultNormalHref } from '../Link';

enum Steps { Edit, Confirmation }

const REDIRECT_ALIASES = 'Redirect Aliases';
const REDIRECT_ALIASES_PLACEHOLDER = '/page-1/ /page-2/ 301'
  + '\n/example/contact-us/ /contact-us/ 302'
  + '\n/example/campaign/special / 301'
  + '\n/page-3/ https://example.com 301';
const CONFIRMATION = 'Redirect aliases file validated and saved.';
const INVALIDATED = 'The redirects are not valid, please correct.';
const DEFAULT_REDIRECT_STATUS = '301';
const ALIAS_PARTS_COUNT = 3;
const PATTERN_MULTILINE_MULTIPLE_SPACES = /\s{2,}/m;

const isTextEmpty = (text: string) => (!text || text === '');

const isTextValid = (text: string): boolean => {
  // Users must be able to save no redirects.
  if (isTextEmpty(text)) return true;

  // Only single whitespace is allowed to separate the values in the text,
  // Therefore, any multiple whitespaces are invalid.
  if (text.match(PATTERN_MULTILINE_MULTIPLE_SPACES)) return false;

  try {
    const aliases = text.split('\n');
    const validatedAliases = aliases.filter(item => {
      // For each item, first and last chars must not be whitespace.
      if (item[0] === ' ' || item[item.length - 1] === ' ') {
        return false;
      }

      // Now, split the item values so we can validate each one individually.
      const items = item.split(' ');

      // Items are valid if last value is not provided.
      // First and second values can not be numbers.
      // Last value, if provided, must be validated as a number to represent status code.
      if (
        (items.length !== ALIAS_PARTS_COUNT && items.length !== (ALIAS_PARTS_COUNT - 1))
        || typeof items[0] !== 'string' || !isNaN(parseInt(items[0], 10))
        || typeof items[1] !== 'string' || !isNaN(parseInt(items[1], 10))
        || (typeof items[2] !== 'undefined' && isNaN(parseInt(items[2], 10)))
      ) {
        return false;
      }

      return true;
    });

    return validatedAliases.length === aliases.length;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const convertAliasJsonToText = (aliases: [AliasItem]): string => {
  if (!(aliases && aliases.length)) {
    return '';
  }
  return aliases.map((e: AliasItem) => `${e.fromPath} ${e.toPath} ${e.statusCode}`).join('\n');
};

const convertAliasTextToJson = (text: string) => {
  if (isTextEmpty(text)) return [];
  return text.split('\n').map(item => {
    const items = item.split(' ');
    return {
      fromPath: new DefaultNormalHref(items[0]).toString(),
      toPath: new DefaultNormalHref(items[1]).toString(),
      statusCode: (typeof items[2] !== 'undefined') ? items[2] : DEFAULT_REDIRECT_STATUS,
    };
  });
};

const FormBodyBase = () => {
  const {
    ComponentFormTitle,
    ComponentFormTextArea,
    ComponentFormDescription,
    ComponentFormSubmitButton,
    ComponentFormCheckBox,
  } = useMenuOptionUI();
  const ComponentFormIsValid = flow(
    addClasses('hidden')
  )(ComponentFormCheckBox);
  const ComponentFormTextAreaSize = flow(
    removeClasses('bl-w-full bl-min-w-xl-grid-1 bl-min-h-grid-16'),
    ComponentFormDefaultPanelSize,
  );
  const CustomComponentFormTextArea = flow(
    ComponentFormTextAreaSize,
  )(ComponentFormTextArea);
  const {
    setValue,
    setValues,
    setStep,
  } = useFormApi();
  const { values: formValues, step } = useFormState();
  const { node } = useNode();
  const initialAliases = convertAliasJsonToText(useGetRedirectAliases(node));

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { aliases } = formValues;
    if (!isTextValid(aliases as string)) {
      setValue('isValid', false);
      return;
    }

    setValue('isValid', true);

    // Saves json file.
    node.setData(convertAliasTextToJson(aliases as string));
    setStep(Steps.Confirmation);
  };

  const EditForm = useCallback(() => {
    useEffect(() => {
      // Gets initial values from node.
      const values = {
        aliases: initialAliases,
        isValid: true,
      };

      setValues(values);
    }, []);

    // If validation fails, clears error message when the user focus
    // on the form to type again.
    return (
      <>
        <CustomComponentFormTextArea
          keepState
          field="aliases"
          onFocus={() => setValue('isValid', true)}
          placeholder={REDIRECT_ALIASES_PLACEHOLDER}
        />
        <ComponentFormIsValid keepState field="isValid" />
        <i>{ !formValues.isValid && INVALIDATED }</i>
        <ComponentFormSubmitButton
          aria-label="Submit"
          onClick={handleSubmit}
        />
      </>
    );
  }, [formValues]);

  const ConfirmationForm = () => (
    <ComponentFormDescription>
      {CONFIRMATION}
    </ComponentFormDescription>
  );

  return (
    <>
      <ComponentFormTitle>
        { REDIRECT_ALIASES }
      </ComponentFormTitle>
      { step === Steps.Edit && <EditForm /> }
      { step === Steps.Confirmation && <ConfirmationForm /> }
    </>
  );
};

const FormBody: any = flowHoc(
  withNode,
  withNodeKey({
    nodeKey: 'redirect-aliases',
    nodeCollection: 'site',
  }),
)(FormBodyBase);

const Form = (props: ContextMenuFormProps) => (
  <ContextMenuForm {...props} hasSubmit={false}>
    <FormBody />
  </ContextMenuForm>
);

const useMenuOptions = (): TMenuOption[] => {
  const context = useEditContext();
  const render = (props: ContextMenuFormProps) => <Form {...props} />;
  const menuOptions$: TMenuOption[] = [
    {
      name: 'redirect-alias',
      icon: 'route',
      label: 'Aliases',
      group: 'tools-group',
      isHidden: useCallback(() => !context.isEdit, []),
      handler: () => render,
    },
  ];
  return menuOptions$;
};

const menuOptions: MenuOptionsDefinition<object> = {
  useMenuOptions,
  name: 'RedirectAlias',
  root: true,
};

const withRedirectAliasButton = flowHoc(
  withOnlyProps('key', 'children') as HOC,
  withMenuOptions(menuOptions),
  withToolsButton,
);

export {
  convertAliasJsonToText,
  convertAliasTextToJson,
  withRedirectAliasButton,
};
