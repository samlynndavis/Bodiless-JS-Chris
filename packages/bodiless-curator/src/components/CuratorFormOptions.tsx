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

import React from 'react';
import { useMenuOptionUI } from '@bodiless/core';

const CuratorOptions = {
  icon: 'settings',
  groupLabel: 'Curator',
  label: 'Settings',
  name: 'curator-settings',
  global: false,
  local: true,
  nodeKeys: 'curator',
  defaultData: {
    'feed-id': 'b59be9ca-afe7-47cf-9199-c2123491ca41',
    'container-id': 'curator-feed-default-feed-layout',
  },
  renderForm: () => {
    const {
      ComponentFormLabel,
      ComponentFormText,
    } = useMenuOptionUI();

    // @TODO: Implement validation callback for Feed ID.
    return (
      <>
        <ComponentFormLabel htmlFor="feed-id">Feed ID</ComponentFormLabel>
        <ComponentFormText
          field="feed-id"
          placeholder="Feed ID..."
          validate={() => {}}
          validateOnChange
          validateOnBlur
        />
        <ComponentFormLabel htmlFor="container-id">Container ID</ComponentFormLabel>
        <ComponentFormText
          field="container-id"
          placeholder="Container ID..."
          validate={() => {}}
          validateOnChange
          validateOnBlur
        />
      </>
    );
  },
};

const useCuratorOptions = () => CuratorOptions;

export {
  CuratorOptions,
  useCuratorOptions,
};
