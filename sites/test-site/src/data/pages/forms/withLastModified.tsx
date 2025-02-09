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

import React, { ComponentType } from 'react';
import { withoutProps } from '@bodiless/fclasses';
import {
  useMenuOptionUI, withEditFormSnippet, ifEditable, ifReadOnly
} from '@bodiless/core';
import {
  withNodeDataHandlers, WithNodeKeyProps, withNode, withNodeKey, withData,
} from '@bodiless/data';
import { flowRight } from 'lodash';

type Props = {
  lastModified?: string,
  timestamp?: string,
};

const renderForm = () => {
  const { ComponentFormText, ComponentFormLabel } = useMenuOptionUI();
  return (
    <ComponentFormLabel>
      Last modified by
      <ComponentFormText field="lastModified" />
    </ComponentFormLabel>
  );
};

const submitValueHandler = (values: any) => ({
  ...values,
  timestamp: new Date().toString(),
});

const withTimestamp = (Component: ComponentType<Props>) => {
  const WithTimestamp = ({ timestamp, lastModified, ...rest }: Props) => (
    <div>
      <Component {...rest} />
      <hr />
      Last modified
      {lastModified && ` by ${lastModified}`}
      {timestamp && ` on ${timestamp}`}
    </div>
  );
  return WithTimestamp;
};

const withLastModified = (nodeKey: WithNodeKeyProps) => flowRight(
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(),
  ifEditable(
    withEditFormSnippet({ renderForm, submitValueHandler }),
  ),
  ifReadOnly(
    withoutProps('setComponentData'),
  ),
  withData,
  withTimestamp,
);

export default withLastModified;
