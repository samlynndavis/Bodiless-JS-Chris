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

import React, { ComponentType, FC, useCallback } from 'react';
import { flow, flowRight } from 'lodash';
import { designable, A, Div } from '@bodiless/fclasses';
import { asBaseBodilessIframe, withFormHeader, withFormSnippet } from '@bodiless/components';
import { CuratorComponents, CuratorProps } from './types';
import CuratorProvider from './CuratorProvider';
import { AsBodiless, useMenuOptionUI } from '@bodiless/core';

const CuratorComponentsStart: CuratorComponents = {
  Content: Div,
};

const extreactFromUrl = (url: string) => {
  const regExp = /^.*(cdn\.curator\.io\/published\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2] ? match[2] : undefined;
};
const isValidUrl = extreactFromUrl;

const withCuratorTransformer = (Component: ComponentType<any>) => {
  const WithCuratorTransformer = (props: any) => {
    const { feedID, ...rest } = props;
    const feedId = feedID ? extreactFromUrl(feedID) : '';
    const src$ = `https://cdn.curator.io/published/${feedId}`;
    const url = new URL(src$);
    return <Component {...rest} feedID={url.toString()} />;
  };
  WithCuratorTransformer.displayName = 'WithCuratorTransformer';
  return WithCuratorTransformer;
};

const withCuratorFormSrcSnippet = withFormSnippet({
  nodeKeys: 'curator',
  defaultData: { feedID: '', containerId: '' },
  snippetOptions: {
    renderForm: ({ formState, scope }) => {
      const errors = scope ? formState.errors[scope] : formState.error;
      const {
        ComponentFormLabel,
        ComponentFormText,
        ComponentFormWarning,
      } = useMenuOptionUI();
      const validate = useCallback(
        (value: string) => (!value || !isValidUrl(value)
          ? 'Invalid Curator URL specified.'
          : undefined),
        [],
      );
      return (
        <React.Fragment key="curator">
          <ComponentFormLabel htmlFor="feedID">URL</ComponentFormLabel>
          <ComponentFormText
            field="feedID"
            placeholder="https://cdn.curator.io/published/YourKeyHere"
            validate={validate}
            validateOnChange
            validateOnBlur
          />
          {errors && errors.feedID && (
            <ComponentFormWarning>{errors.feedID}</ComponentFormWarning>
          )}
          <ComponentFormLabel htmlFor="containerId">Container ID</ComponentFormLabel>
          <ComponentFormText
            field="containerId"
            placeholder="Container ID"
          />
        </React.Fragment>

      );
    },
  },
});

const withCuratorFormHeader = withFormHeader({
  title: 'Curator Configuration',
});

const asBaseBodilessCurator: AsBodiless<any, any> = asBaseBodilessIframe;

const asBodilessCurator: AsBodiless<any, any> = (
  nodeKeys?,
  defaultData?,
  useOverrides?,
) => flowRight(
  asBaseBodilessCurator(nodeKeys, defaultData, useOverrides),
  withCuratorFormHeader,
  withCuratorFormSrcSnippet,
  withCuratorTransformer,
);

const CuratorBase: FC<CuratorProps> = ({
  components,
  ...props
}) => {
  const { Content } = components;
  // @ts-ignore
  const { feedID, containerId } = props;
  console.log(props);


  const script = (
    `(function(){
        var i, e, d = document, s = "script";i = d.createElement("script");i.async = 1;
        i.src = "${feedID}.js";
        e = d.getElementsByTagName(s)[0];e.parentNode.insertBefore(i, e);
      })();`
  );

  return (
    <CuratorProvider scriptFunction={script}>
      <Content id={containerId}>
        <A href="https://curator.io" target="_blank" className="crt-logo crt-tag">Powered by Curator.io</A>
      </Content>
    </CuratorProvider>
  );
};

const CuratorClean = flow(
  designable(CuratorComponentsStart, 'Curator'),
)(CuratorBase);

const Curator = asBodilessCurator()('iframe');

export {
  asBodilessCurator,
  Curator,
  CuratorBase,
  CuratorClean,
};
