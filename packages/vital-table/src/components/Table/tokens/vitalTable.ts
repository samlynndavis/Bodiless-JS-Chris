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

import {
  addClassesIf,
  and,
  flowHoc,
  on,
} from '@bodiless/fclasses';
import {
  asBodilessTable, useIsInBody, useIsOddRow,
} from '@bodiless/table';
import { vitalRichText, RichTextClean } from '@bodiless/vital-editors';
import { vitalTextDecoration } from '@bodiless/vital-elements';
import { asTableToken } from '../TableClean';

/**
 * Token which produces a base VitalDS editable table with editable RTE cells
 */
const Base = asTableToken({
  Meta: flowHoc.meta.term('Type')('Table'),
  Schema: {
    _: asBodilessTable(),
  },
  Editors: {
    CellContent: on(RichTextClean)(vitalRichText.Default),
  },
});

/**
 * Token which produces a default VitalDS editable table with minimal styling
 */
const Default = asTableToken({
  ...Base,
  Theme: {
    ...Base.Theme,
    Table: 'min-w-full',
    CellContent: 'text-left',
    THead: vitalTextDecoration.ExtraBold,
    TFoot: vitalTextDecoration.ExtraBold,
  },
  Spacing: {
    ...Base.Spacing,
    Cell: 'pt-6 px-6',
  },
});

/**
 * Token which add alternating striped rows
 */
const WithStripes = asTableToken({
  Meta: flowHoc.meta.term('Decoration')('Striped Rows'),
  Theme: {
    Row: addClassesIf(and(useIsInBody, useIsOddRow))('bg-gray-100'),
  }
});

/**
 * Token which add hoverable rows
 */
const WithHoverable = asTableToken({
  Meta: flowHoc.meta.term('Decoration')('Hoverable Rows'),
  Theme: {
    Row: 'hover:bg-gray-100',
  }
});

/**
 * Token which add borders to all cells
 */
const WithBorders = asTableToken({
  Meta: flowHoc.meta.term('Decoration')('Bordered Cells'),
  Theme: {
    Row: 'border',
  }
});

/**
 * Token which add borders to bottom of the rows
 */
const WithBottomBorders = asTableToken({
  Meta: flowHoc.meta.term('Decoration')('Bottom Bordered Rows'),
  Theme: {
    THead: 'border-b',
    Row: 'border-b',
  }
});

/**
 * Token which add header background to table.
 */
const WithLightHeaderFooter = asTableToken({
  Meta: flowHoc.meta.term('Decoration')('Light Header'),
  Theme: {
    THead: 'bg-gray-50',
    TFoot: 'bg-gray-50',
  }
});

/**
 * Token which add scrollbar if becomes to wide for viewport.
 */
const ScrollingTable = asTableToken({
  Meta: flowHoc.meta.term('Decoration')('Scrolling Table'),
  Theme: {
    Wrapper: 'overflow-x-auto',
  }
});

export default {
  Default,
  WithStripes,
  WithHoverable,
  WithBorders,
  WithBottomBorders,
  WithLightHeaderFooter,
  ScrollingTable,
};
