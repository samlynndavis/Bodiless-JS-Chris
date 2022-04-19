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
  withDesign,
  flowHoc,
  // on,
} from '@bodiless/fclasses';
import {
  asBodilessTable,
} from '@bodiless/table';
// import { vitalRichText, RichTextClean } from '@bodiless/vital-editors';
import { withEditorRich } from '@bodiless/vital-editors';
import { asTableToken } from '../TableClean';

/**
 * Token which produces a default VitalDS editable table.
 */

/* TODO remove editor mb-6 */
const Base = asTableToken({
  Meta: flowHoc.meta.term('Type')('Table'),
  Theme: {
    Table: '',
  },
  Schema: {
    Table: asBodilessTable(),
  },
  /* @TODO  CellContent to the bodiless table design, and use that
   * here rather than using withEditor...
   * i'm not sure we actually need the nodeKey. For the placeholder,
   * maybe we can just use the defautl placeholder, but if you want a
   * unique one, add it via 'addProps'
   * maybe in the 'Content' domain.
   */
  Editors: {
    // CellContent: on(RichTextClean)(vitalRichText.Default),
    Table: withDesign({
      CellContent: withEditorRich('cell', ''),
    }),
  },
});

/* TODO make header bold/darker */
const Default = asTableToken({
  ...Base,
  Theme: {
    ...Base.Theme,
    Table: withDesign({
      Wrapper: 'min-w-full',
      TBody: '',
      THead: 'border-b',
      TFoot: '',
      Row: 'border-b',
      Cell: 'px-6 text-left',
    }),
  },
});

const withStripes = asTableToken({
  Meta: flowHoc.meta.term('Decoration')('Striped Rows'),
  Theme: {
    Table: withDesign({
      Row: 'row-heidi-stripes', // @TO DO add stripes.
    }),
  }
});

const withHoverable = asTableToken({
  Meta: flowHoc.meta.term('Decoration')('Hoverable Rows'),
  Theme: {
    Table: withDesign({
      Row: 'row-heidi-hoverable hover:bg-gray-100',
    }),
  }
});

export default {
  Default,
  withStripes,
  withHoverable,
};
