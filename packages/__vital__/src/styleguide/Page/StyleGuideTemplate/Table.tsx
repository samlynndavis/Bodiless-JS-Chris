/* eslint-disable react/jsx-indent */
/**
 * Copyright © 2022 Johnson & Johnson
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
import { withNodeKey } from '@bodiless/core';
import {
  flowHoc,
  as,
  replaceWith,
} from '@bodiless/fclasses';
import { vitalTable, TableClean } from '@bodiless/vital-table';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';

const DefaultTable = as(
  vitalTable.Default,
  withNodeKey('defaulttable'),
)(TableClean);

const StripedTable = as(
  vitalTable.Default,
  vitalTable.WithStripes,
  withNodeKey('stripedtable'),
)(TableClean);

const HoverTable = as(
  vitalTable.Default,
  vitalTable.WithHoverable,
  withNodeKey('defaulthoverabletable'),
)(TableClean);

/* @todo
  * Rendered only the two types of images available in flow container as separate components.
  * To do is provide all variations we want tested individually.
  */
const Examples = (props: any) => (
   <>
     <DefaultTable />
     <hr className="my-4" />
     <StripedTable />
     <hr className="my-4" />
     <HoverTable />
   </>
);

export const Table = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Table'),
  Content: {
    Title: replaceWith(() => <>Table</>),
    Examples: replaceWith(Examples),
  },
});
