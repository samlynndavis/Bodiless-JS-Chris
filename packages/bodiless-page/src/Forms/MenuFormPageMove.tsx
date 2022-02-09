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
  useEffect,
  useState,
} from 'react';
import {
  ContextMenuProvider,
  contextMenuForm,
  handleBackendResponse,
  useEditContext,
  useNode,
} from '@bodiless/core';
import { ComponentFormSpinner } from '@bodiless/ui';
import { usePageMenuOptionUI } from '../MenuOptionUI';
import { createRedirect } from '../Operations';
import {
  PageClient,
  PageState,
  PageStatus,
} from '../types';
import {
  getPathValue,
  hasPageChild,
  usePagePath,
} from '../utils';
import { MovePageURLField } from './MenuFormFields';

let actualState: number = -1;

let destinationGlb: string = '';

const movePage = async ({ origin, destination, client } : any) => {
  const directoryExists = await handleBackendResponse(client.directoryExists(destination));

  if (directoryExists.message !== 'The page cannot be moved. Directory exists') {
    try {
      await handleBackendResponse(client.clonePage(origin, destination));
    } catch (e: any) {
      return Promise.reject(new Error(e.message));
    }

    const hasChild = await handleBackendResponse(client.directoryChild(origin));

    let deleteResult;

    if (hasChild.response && hasChild.message === 'Success') {
      try {
        deleteResult = await handleBackendResponse(client.deletePage(origin));
      } catch (e: any) {
        return Promise.reject(new Error(e.message));
      }
      // Deleting the static assets on move leads to a gatsby image rendering issue.
      // To be resolved with another aproach:
      // https://github.com/johnsonandjohnson/Bodiless-JS/issues/1348
      // if (deleteResult.response){
      //   try {
      //     await handle(client.deleteStaticAssets(origin));
      //   } catch (e: any) {
      //     return Promise.reject(new Error(e.message));
      //   }
      // }
    } else {
      try {
        deleteResult = await handleBackendResponse(client.removeFile(origin));
      } catch (e: any) {
        return Promise.reject(new Error(e.message));
      }
    }

    if (deleteResult.response) {
      if (deleteResult.message !== 'Success' && typeof (deleteResult.message) === 'string') {
        return Promise.reject(new Error(deleteResult.message));
      }
      return Promise.resolve();
    }
    return Promise.reject(new Error('The page cannot be moved.'));
  }
  return Promise.reject(new Error('The page cannot be moved.'));
};

const MovePageComp = (props : PageStatus) => {
  const {
    status, errorMessage,
  } = props;
  const basePathValue = usePagePath();

  const defaultUI = usePageMenuOptionUI();
  const {
    ComponentFormCheckBox,
    ComponentFormDescription,
    ComponentFormLabel,
    ComponentFormLabelSmall,
    ComponentFormTitle,
    ComponentFormWarning,
  } = defaultUI;

  const formTitle = 'Move';
  switch (status) {
    case PageState.Init: {
      return (
        <>
          <ContextMenuProvider ui={defaultUI}>
            <ComponentFormTitle>{formTitle}</ComponentFormTitle>
            <ComponentFormDescription>Move this page to a new URL.</ComponentFormDescription>
            <ComponentFormLabelSmall>Current URL</ComponentFormLabelSmall>
            <ComponentFormDescription>{basePathValue}</ComponentFormDescription>
            <MovePageURLField
              validateOnChange
              validateOnBlur
            />
            <ComponentFormLabel>
              <ComponentFormCheckBox
                field="redirectEnabled"
                initialValue
                keepState
              />
              Redirect
            </ComponentFormLabel>
          </ContextMenuProvider>
        </>
      );
    }
    case PageState.Pending:
      return (
        <>
          <ComponentFormTitle>Moving Page</ComponentFormTitle>
          <ComponentFormSpinner />
        </>
      );
    case PageState.Complete:
      return (
        <>
          <ComponentFormTitle>{formTitle}</ComponentFormTitle>
          <ComponentFormDescription>
            Move operation was successful. Upon closing this dialog you will be redirected to the
            new page’s url.
          </ComponentFormDescription>
        </>
      );
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

const redirectPage = (values: {keepOpen: boolean, path?: string}) => {
  if (values.keepOpen || actualState === PageState.Errored || typeof window === 'undefined') {
    actualState = -1;
    return;
  }

  actualState = -1;

  // Uses replace to redirect since child page no longer exists.
  window.location.replace(destinationGlb);
};

const menuFormPageMove = (client: PageClient) => contextMenuForm({
  submitValues: ({ keepOpen }: any) => keepOpen,
  hasSubmit: ({ keepOpen }: any) => keepOpen,
  onClose: redirectPage,
})(({ formState, formApi } : any) => {
  const { ComponentFormText } = usePageMenuOptionUI();

  const { node } = useNode();

  const origin = usePagePath();

  const {
    submits, invalid, values,
  } = formState;
  const [state, setState] = useState<PageStatus>({
    status: PageState.Init,
  });

  const context = useEditContext();
  const path = getPathValue(values);
  const pathChild = (typeof window !== 'undefined') ? window.location.pathname : '';
  const { redirectEnabled } = values;

  useEffect(() => {
    if (pathChild === '/') {
      actualState = PageState.Errored;
      setState({ status: PageState.Errored, errorMessage: 'The page cannot be moved.' });
      formApi.setValue('keepOpen', false);
    } else {
      hasPageChild({ pagePath: pathChild, client })
        .catch(() => {
          actualState = PageState.Errored;
          setState({ status: PageState.Errored, errorMessage: 'The page cannot be moved while it has child pages.' });
          formApi.setValue('keepOpen', false);
        });
    }

    if (submits && path && invalid === false) {
      let destination = '';
      if (values.pagePath[0] === '/') {
        destination = values.pagePath;
      } else {
        const pathArray = path.split('/');
        pathArray.splice(-2, 1);
        destination = pathArray.join('/');
      }
      destinationGlb = destination;
      const originClear = origin.slice(0, -1);

      if (destination === originClear) {
        actualState = PageState.Errored;
        setState({ status: PageState.Errored, errorMessage: 'The page cannot be moved.' });
        formApi.setValue('keepOpen', false);
      } else {
        context.showPageOverlay({ hasSpinner: false });
        actualState = PageState.Pending;
        setState({ status: PageState.Pending });

        movePage({
          origin,
          destination,
          client,
        })
          .then(() => {
            if (redirectEnabled) {
              createRedirect(node, originClear, destination);
            }
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
    }
  }, [submits]);
  const { status, errorMessage } = state;
  return (
    <>
      <ComponentFormText type="hidden" field="keepOpen" initialValue />
      <MovePageComp
        status={status}
        errorMessage={errorMessage}
      />
    </>
  );
});

export {
  menuFormPageMove,
};
