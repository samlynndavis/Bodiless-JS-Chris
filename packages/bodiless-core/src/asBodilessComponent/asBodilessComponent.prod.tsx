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

import flowRight from 'lodash/flowRight';
import { withoutProps } from '@bodiless/fclasses';
import withData from '../withData';
import { Options, AsBodiless } from './types';
import { withBodilessData } from './withBodilessData';

export const withActivatorWrapper = null;

const asBodilessComponent = <P extends object, D extends object>(options: Options<P, D>): AsBodiless<P, D> => (
  (
    nodeKeys?,
    defaultData = {} as D,
  ) => {
    const {
      defaultData: defaultDataOption = {},
    } = options;
    const finalData = { ...defaultDataOption, ...defaultData };
    return flowRight(
      withBodilessData(nodeKeys, finalData),
      withoutProps(['setComponentData']),
      withData,
    );
  }
);

export default asBodilessComponent;
