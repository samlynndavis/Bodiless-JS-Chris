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
  ComponentType,
  HTMLProps,
  useEffect,
  useState,
} from 'react';
import flow from 'lodash/flow';
import {
  ContextMenuProvider,
  contextMenuForm,
  handleBackendResponse,
  useMenuOptionUI,
  useEditContext,
} from '@bodiless/core';
import {
  StylableProps,
  addClasses,
  asToken,
  removeClasses,
} from '@bodiless/fclasses';
import { ComponentFormSpinner } from '@bodiless/ui';
import {
  PageClient,
  PageState,
  PageStatus,
} from '../types';
import { PageURLField } from './MenuFormFields';

let actualState: number = -1;

const hasPageChild = async ({ path, client } : any) => {
  const result = await handleBackendResponse(client.directoryChild(path));
  if (result.response && result.message === 'Success') {
    return Promise.resolve();
  }
  return Promise.reject(new Error(result.message));
};

const deletePage = async ({ path, client } : any) => {
  const result = await handleBackendResponse(client.deletePage(path));
  if (result.response) {
    if (result.message !== 'Success' && typeof (result.message) === 'string') {
      return Promise.reject(new Error(result.message));
    }
    try {
      await handleBackendResponse(client.deleteStaticAssets(path));
    } catch (e: any) {
      return Promise.reject(new Error(e.message));
    }
    return Promise.resolve();
  }
  return Promise.reject(new Error('The page cannot be deleted.'));
};

const DeletePageForm = (props : PageStatus) => {
  const {
    status, errorMessage,
  } = props;
  const defaultUI = useMenuOptionUI();
  const {
    ComponentFormDescription,
    ComponentFormWarning,
    ComponentFormTitle,
    ComponentFormLabel,
  } = defaultUI;
  const formTitle = 'Delete Page';

  switch (status) {
    case PageState.Init: {
      const CustomComponentFormLabel = flow(
        removeClasses('bl-text-xs'),
        addClasses('bl-font-bold bl-text-base'),
      )(ComponentFormLabel as ComponentType<StylableProps>);
      const ui: object = {
        ...defaultUI,
        ComponentFormLabel: CustomComponentFormLabel as ComponentType<HTMLProps<HTMLLabelElement>>,
        ComponentFormLink: asToken(removeClasses('bl-block'), addClasses('bl-italic')),
        ComponentFormWarning: removeClasses('bl-float-left'),
        ComponentFormTitle: addClasses('bl-italic'),
      };
      return (
        <>
          <ContextMenuProvider ui={ui}>
            <ComponentFormTitle>{formTitle}</ComponentFormTitle>
            <ComponentFormLabel>
              Are you sure you want to delete the current page?
            </ComponentFormLabel>
            <PageURLField
              fieldLabel="Add optional redirect"
              placeholder="/redirectpage"
              validateOnChange
              validateOnBlur
            />
          </ContextMenuProvider>
        </>
      );
    }
    case PageState.Pending:
      return (
        <>
          <ComponentFormTitle>Deleting Page</ComponentFormTitle>
          <ComponentFormSpinner />
        </>
      );
    case PageState.Complete: {
      const CustomComponentFormLabel = flow(
        removeClasses('bl-text-xs'),
        addClasses('bl-font-bold bl-text-base'),
      )(ComponentFormLabel as ComponentType<StylableProps>);
      const ui: object = {
        ...defaultUI,
        ComponentFormLabel: CustomComponentFormLabel as ComponentType<HTMLProps<HTMLLabelElement>>,
      };
      return (
        <>
          <ContextMenuProvider ui={ui}>
            <ComponentFormTitle>{formTitle}</ComponentFormTitle>
            <ComponentFormLabel>Delete operation was successful.</ComponentFormLabel>
            <ComponentFormDescription>
              Upon closing this dialog you will be redirected to the deleted page’s parent page.
            </ComponentFormDescription>
          </ContextMenuProvider>

        </>
      );
    }
    case PageState.Errored:
      return (
        <>
          <ComponentFormTitle>{formTitle}</ComponentFormTitle>
          <ComponentFormWarning>{errorMessage}</ComponentFormWarning>
        </>
      );
    default: return (<></>);
  }
};

const redirectPage = (values: {keepOpen: boolean, path?: string }) => {
  if (values.keepOpen || actualState === PageState.Errored || typeof window === 'undefined') {
    actualState = -1;
    return;
  }

  actualState = -1;

  const { href } = window.location;
  const hrefArray = href.split('/');

  // Handle paths withtout '/' at the end.
  if (hrefArray[hrefArray.length - 1] !== '') hrefArray.push('');

  // Removes last child path from href array.
  hrefArray.splice(-2, 1);

  const parentHref = hrefArray.join('/');
  // Uses replace to redirect since child page no longer exists.
  window.location.replace(parentHref);
};

const menuFormPageDelete = (client: PageClient) => contextMenuForm({
  submitValues: ({ keepOpen }: any) => keepOpen,
  hasSubmit: ({ keepOpen }: any) => keepOpen,
  onClose: redirectPage,
})(({ formState, formApi } : any) => {
  const { ComponentFormText } = useMenuOptionUI();
  const {
    submits,
  } = formState;
  const [state, setState] = useState<PageStatus>({
    status: PageState.Init,
  });
  const context = useEditContext();
  const path = (typeof window !== 'undefined') ? window.location.pathname : '';

  useEffect(() => {
    if (path === '/') {
      actualState = PageState.Errored;
      setState({ status: PageState.Errored, errorMessage: 'The page cannot be deleted.' });
      formApi.setValue('keepOpen', false);
    } else {
      hasPageChild({ path, client })
        .catch((err: Error) => {
          actualState = PageState.Errored;
          setState({ status: PageState.Errored, errorMessage: err.message });
          formApi.setValue('keepOpen', false);
        });
    }

    if (submits && path) {
      context.showPageOverlay({ hasSpinner: false });
      actualState = PageState.Pending;
      setState({ status: PageState.Pending });

      // Delete the page.
      deletePage({ path, client })
        .then(() => {
          actualState = PageState.Complete;
          setState({ status: PageState.Complete });
        })
        .catch((err: Error) => {
          actualState = PageState.Errored;
          setState({ status: PageState.Errored, errorMessage: err.message });
        })
        .finally(() => {
          context.hidePageOverlay();
          formApi.setValue('keepOpen', false);
        });
    }
  }, [submits]);
  const { status, errorMessage } = state;

  return (
    <>
      <ComponentFormText type="hidden" field="keepOpen" initialValue />
      <DeletePageForm
        status={status}
        errorMessage={errorMessage}
      />
    </>
  );
});

export {
  menuFormPageDelete,
};
