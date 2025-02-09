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

import React, {
  createContext, useRef, useContext, MutableRefObject, FC,
} from 'react';
import { useFormState, useFormApi, Scope } from 'informed';
import { HOC } from '@bodiless/fclasses';
import { ContextMenuForm, FormBodyProps, FormBodyRenderer } from './contextMenuForm.bl-edit';
import type { ContextMenuFormProps } from './Types/ContextMenuTypes';
import type { MenuOptionsDefinition } from './Types/PageContextProviderTypes';
import { withMenuOptions } from './PageContextProvider';

/**
 * A collection of form fields (with initial values and submit handler) which can be rendered
 * as part of a compound form.
 */
export type Snippet<D> = {
  /**
   * A unique identifier for this snippet
   */
  id: string,
  /**
   * The function which will render the actual form fields
   */
  render: FormBodyRenderer<D>,
  /**
   * The initial values for each form field. Note that you
   * *must* include a key for each field in the form.
   */
  initialValues?: any,
  /**
   * The submit handler.  Will be invoked with form values
   * whose field names match the keys of the specified initialValues.
   */
  submitValues?: (values: any) => void,
};

type SnippetRegister<D> = (snippet: Snippet<D>) => void;

type FormProps<D> = ContextMenuFormProps & {
  snippets: Snippet<D>[],
  hasSubmit?: boolean,
};

/**
 * @private
 */
const Context = createContext<SnippetRegister<any>>(() => {});
const SnippetContext = createContext<MutableRefObject<Snippet<any>[]>|undefined>(undefined);

const Snippets = <D extends object>(props$: FormProps<D>) => {
  const { snippets: snippets$, ...rest$ } = props$;
  const renderProps: FormBodyProps<D> = {
    formState: useFormState(),
    formApi: useFormApi(),
    ...rest$,
  };
  return (
    <>
      {snippets$.map(s => (
        <Scope scope={s.id} key={s.id}>
          {s.render({ ...renderProps, scope: s.id })}
        </Scope>
      ))}
    </>
  );
};

/**
 * @private
 *
 * A Form which renders a collection of snippets.
 *
 * @param props Standard context menu form props + an array of snippets to render.
 */
const Form = <D extends object>(props: FormProps<D>) => {
  const { snippets, ...rest } = props;

  const submitValues = (values: any) => {
    snippets.forEach(s => {
      if (s.submitValues) {
        s.submitValues(values[s.id] || {});
      }
    });
  };

  const initialValues = snippets.reduce(
    (values, snippet) => ({
      ...values,
      [snippet.id]: snippet.initialValues,
    }),
    {},
  );

  const formProps = { submitValues, initialValues };

  return (
    <ContextMenuForm {...rest} {...formProps}>
      <Snippets snippets={snippets} {...rest} />
    </ContextMenuForm>
  );
};

type MenuOptionsDefinition$<P> = MenuOptionsDefinition<P>|((props:P) => MenuOptionsDefinition<P>);

/**
 * @private
 *
 * Given the supplied options, returns a menu options hook suitable to pass to withMenuOptions.
 *
 * @param def The options defining this compound form.
 *
 * @returns A menu options hook.
 */
const createMenuOptionDefinition = <P extends object>(def$: MenuOptionsDefinition$<P>) => {
  const useMenuOptions = (props: P) => {
    const def = typeof def$ === 'function' ? def$(props) : def$;
    const {
      useMenuOptions: useMenuOptionsBase = () => undefined,
    } = def;
    const baseOptions = useMenuOptionsBase(props) || [];
    const [compoundFormOption, ...otherOptions] = baseOptions;
    const snippets = useContext(SnippetContext);
    const render = (p: ContextMenuFormProps) => (
      <Form
        {...p}
        snippets={snippets!.current}
        hasSubmit={def?.hasSubmit}
      />
    );
    return [
      {
        ...compoundFormOption,
        handler: () => render,
      },
      ...otherOptions,
    ];
  };
  return (props: P) => ({
    ...typeof def$ === 'function' ? def$(props) : def$,
    useMenuOptions,
  });
};

/**
 * HOC to create a menu option which will display a "compound form". Children of this
 * component can contribute "snippets" to the form. Each snippet consists of
 * - a render function (to render the form fields)
 * - initial values to populate the fields
 * - a submit handler which will be passed all submitted values from the form.
 * @param option A context menu option (minus the handler).
 */
const withCompoundForm = <P extends object>(
  def$: MenuOptionsDefinition$<P>,
): HOC => Component => {
    const useMenuOptionDefinition = createMenuOptionDefinition(def$);
    const ComponentWithButton = withMenuOptions(useMenuOptionDefinition)(Component);

    const WithCompoundForm: FC<any> = props => {
    // This ref will hold all snippets registered by child components.
      const snippets = useRef<Snippet<any>[]>([]);
      // This callback will be used by child components to contribute their snippets.
      const registerSnippet = (snippet: Snippet<any>) => {
      // Ensure that there is only a single entry for each snippet.
        const existsAt = snippets.current.findIndex(s => s.id === snippet.id);
        if (existsAt >= 0) snippets.current.splice(existsAt, 1, snippet);
        else snippets.current.push(snippet);
      };

      // Wrap the original component with a context containing the register snippet callback
      return (
        <Context.Provider value={registerSnippet}>
          <SnippetContext.Provider value={snippets}>
            <ComponentWithButton {...props} />
          </SnippetContext.Provider>
        </Context.Provider>
      );
    };
    return WithCompoundForm;
  };

export default withCompoundForm;

/**
 * Hook to register a form snippet which will be rendered as part of a compound form. Should
 * be invoked within a component wrapped in `withCompoundForm`.
 *
 * @param snippet The snippet to add to the form.
 */
export const useRegisterSnippet = <D extends object>(snippet: Snippet<D>) => (
  useContext(Context)(snippet)
);
