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
  flowHoc,
  on,
} from '@bodiless/fclasses';
import {
  asBodilessTable,
} from '@bodiless/table';
import { vitalRichText, RichTextClean } from '@bodiless/vital-editors';
import { asTableToken } from '../TableClean';

/**
 * Token which produces a default VitalDS editable table.
 */

/* TODO remove editor mb-6 */
const Base = asTableToken({
  Meta: flowHoc.meta.term('Type')('Table'),
  Schema: {
    _: asBodilessTable(),
  },
  Editors: {
    CellContent: on(RichTextClean)(vitalRichText.Default),
  },
});

/* TODO make header bold/darker */
const Default = asTableToken({
  ...Base,
  Theme: {
    ...Base.Theme,
    Wrapper: '',
    Table: 'min-w-full',
    TBody: '',
    THead: 'border-b',
    TFoot: '',
    Row: 'border-b',
    Cell: '',
    CellContent: 'text-left',
  },
  Spacing: {
    ...Base.Spacing,
    Wrapper: '',
    Table: '',
    TBody: '',
    THead: '',
    TFoot: '',
    Row: '',
    Cell: 'px-6',
    CellContent: '',
  },
});

const WithStripes = asTableToken({
  Meta: flowHoc.meta.term('Decoration')('Striped Rows'),
  Theme: {
    Row: 'row-heidi-stripes', // @TO DO add stripes.
  }
});

const WithHoverable = asTableToken({
  Meta: flowHoc.meta.term('Decoration')('Hoverable Rows'),
  Theme: {
    Row: 'row-heidi-hoverable hover:bg-gray-100',
  }
});

export default {
  Default,
  WithStripes,
  WithHoverable,
};
