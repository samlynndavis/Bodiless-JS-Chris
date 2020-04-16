/**
 * Copyright © 2019 Johnson & Johnson
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

import { flow } from 'lodash';
import {
  SingleAccordionClean,
  asTestableAccordion,
} from '@bodiless/organisms';
import {
  withNode,
} from '@bodiless/core';
import { withDesign } from '@bodiless/fclasses';
import asSingleAccordionDefaultStyle from './token';
import { withEditorSimple, withEditorBasic } from '../Editors';

const asSingleAccordion = flow(
  withNode,
  withDesign({
    Title: withEditorSimple('title', 'Accordion Title'),
    Body: withEditorBasic(
      'body',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
    ),
  }),
  asSingleAccordionDefaultStyle,
  asTestableAccordion,
);

const SingleAccordion = asSingleAccordion(SingleAccordionClean);

export default SingleAccordion;
