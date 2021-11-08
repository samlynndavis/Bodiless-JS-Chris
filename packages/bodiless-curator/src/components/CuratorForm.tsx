import React from 'react';
import { withFormHeader, withFormSnippet } from '@bodiless/components';
import { useMenuOptionUI } from '@bodiless/core';

const withCuratorFormHeader = withFormHeader({
  title: 'Curator Configuration',
});

const withCuratorFormSnippet = withFormSnippet({
  nodeKeys: 'feed-id',
  defaultData: { 'feed-id': '' },
  snippetOptions: {
    renderForm: ({ formState, scope }) => {
      const errors = scope ? formState.errors[scope] : formState.error;
      const {
        ComponentFormLabel,
        ComponentFormText,
        ComponentFormWarning,
      } = useMenuOptionUI();

      // @TODO: Implement validation callback for Feed ID.
      return (
        <React.Fragment key="feed-id">
          <ComponentFormLabel htmlFor="feed-id">Feed ID</ComponentFormLabel>
          <ComponentFormText
            field="feed-id"
            placeholder="b59be9ca-afe7-47cf-9199-c2123491ca41.js"
            validate={() => {}}
            validateOnChange
            validateOnBlur
          />
          {errors && errors.src && (
          <ComponentFormWarning>{errors.src}</ComponentFormWarning>
          )}
        </React.Fragment>
      );
    },
  },
});

export {
  withCuratorFormHeader,
  withCuratorFormSnippet,
};
