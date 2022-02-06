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
import {
  withDesign, addClasses, flowHoc, stylable, startWith, Pre,
} from '@bodiless/fclasses';
import { asAccordionWrapper, asAccordionTitle, asAccordionBody } from '@bodiless/accordion';
import { withChild } from '@bodiless/core';
import {
  asHeader3, asBold, asTextWhite, asTealBackground,
} from './Elements.token';

export const tokenPanelStyles = {
  Panel: withDesign({
    Title: asHeader3,
    Category: flowHoc(asBold, addClasses('mt-2')),
    CheckBox: addClasses('mr-2'),
    Label: addClasses('block'),
    CategoryWrapper: addClasses('w-48'),
    Body: addClasses('flex'),
  }),
};

export const withTokenEditorStyles = flowHoc(
  withDesign({
    Container: withDesign({
      Wrapper: flowHoc(stylable, addClasses('border-blue-700 border-solid border-2 p-5')),
    }),
    DetailsWrapper: flowHoc(
      asAccordionWrapper,
      addClasses('border-teal-700 bortder-2'),
    ),
    DetailsTitle: flowHoc(
      withChild(() => <>Details</>),
      asAccordionTitle,
      withDesign({
        Wrapper: flowHoc(
          asHeader3,
          asTextWhite,
          asTealBackground,
          addClasses('p-2'),
        ),
      }),
    ),
    DetailsBody: flowHoc(
      startWith(Pre),
      asAccordionBody,
      addClasses('p-2'),
    ),
  }),
);
