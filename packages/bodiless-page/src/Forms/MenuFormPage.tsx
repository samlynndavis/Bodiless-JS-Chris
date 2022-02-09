import React from 'react';
import {
  ContextMenuProvider,
} from '@bodiless/core';
import { ComponentFormSpinner } from '@bodiless/ui';
import { usePageMenuOptionUI } from '../MenuOptionUI';
import {
  PageState,
  PageStatus,
} from '../types';
import { PageURLField } from './MenuFormFields';

const MenuFormPage = (props : PageStatus) => {
  const {
    status,
    errorMessage,
    completeMessage,
    pagePath,
    titlePending,
    formTitle,
    linkId,
    FormFields,
  } = props;

  const defaultUI = usePageMenuOptionUI();
  const {
    ComponentFormDescription,
    ComponentFormLabelSmall,
    ComponentFormLink,
    ComponentFormTitle,
    ComponentFormWarning,
  } = defaultUI;

  switch (status) {
    case PageState.Init: {
      return (
        <>
          <ContextMenuProvider ui={defaultUI}>
            <ComponentFormTitle>{formTitle}</ComponentFormTitle>
            {FormFields && FormFields(ComponentFormLabelSmall)}
            <PageURLField
              fieldFull
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
          <ComponentFormTitle>{titlePending}</ComponentFormTitle>
          <ComponentFormSpinner />
        </>
      );
    case PageState.Complete:
      return (
        <>
          <ComponentFormTitle>Operation Complete</ComponentFormTitle>
          <ComponentFormDescription>
            <ComponentFormLink href={pagePath} id={linkId}>{`${completeMessage}: ${pagePath}`}</ComponentFormLink>
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

export {
  MenuFormPage,
};
