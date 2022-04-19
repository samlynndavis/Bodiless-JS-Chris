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
} from '@bodiless/fclasses';
import {
  asBodilessTable,
} from '@bodiless/table';
import { withEditorFull } from '@bodiless/vital-editors';
import { asTableToken } from '../TableClean';

/**
 * Token which produces a default VitalDS editable table.
 */

/* TODO remove editor mb-6 */
const Base = asTableToken({
  Theme: {
    Wrapper: '',
    Table: '',
  },
  Schema: {
    Table: flowHoc(
      asBodilessTable(),
      withDesign({
        Cell: withEditorFull('cell', ''),
      }),
    ),
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
      Cell: 'px-6 py-4 text-left',
    }),
  }
});

const StripedTable = asTableToken({
  ...Base,
  Theme: {
    ...Base.Theme,
    Table: withDesign({
      Row: '', // @TO DO add stripes.
    }),
  }
});

const withHoverable = asTableToken({
  Theme: {
    Table: withDesign({
      Row: 'hover:bg-gray-100',
    }),
  }
});

export default {
  Default,
  StripedTable,
  withHoverable,
};
