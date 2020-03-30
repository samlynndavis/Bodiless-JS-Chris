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
import { flowRight } from 'lodash';
import {
  ifEditable, withNode, ifReadOnly, withoutProps,
} from '@bodiless/core';
import { replaceWith, asComponent } from '@bodiless/fclasses';
import { Fragment } from 'react';
import { asBodilessFilterItem } from './Item';
import { withToggleTo, withWrapOnSubmit } from '../Toggle';

const EmptyToggle = flowRight(
  ifEditable(
    withWrapOnSubmit,
    asBodilessFilterItem(),
    replaceWith(asComponent<JSX.IntrinsicElements['span']>('span')),
  ),
  ifReadOnly(
    withNode,
    withoutProps(['wrap']),
  ),
)(Fragment);

const withFilterToggle = flowRight(
  withNode,
  withToggleTo(EmptyToggle),
);

export default withFilterToggle;
