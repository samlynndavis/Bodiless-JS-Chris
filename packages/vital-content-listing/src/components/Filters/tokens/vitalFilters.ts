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
  addProps,
  as,
} from '@bodiless/fclasses';
import { vitalColor, vitalTextDecoration } from '@bodiless/vital-elements';
import { asFiltersToken, asFiltersTagTitleToken, asFiltersListToken } from '../Filters';

const WithTagTitleStyles = asFiltersTagTitleToken({
  Layout: {
    FilterInputWrapper: 'flex items-center',
  },
  Spacing: {
    FilterInputWrapper: 'pb-2',
    FilterGroupItemInput: 'mr-3 rtl:ml-3 rtl:mr-0',
  },
});

const WithTagListStyles = asFiltersListToken({
  Content: {
    Title: addProps({ emptyTitleText: 'Groups' }),
  },
  Spacing: {
    Wrapper: 'm-2 pl-2',
  },
  Theme: {
    Title: WithTagTitleStyles,
  },
});

const WithCategoryListStyles = asFiltersListToken({
  Spacing: {
    Wrapper: 'p-2',
    Item: 'py-2',
  },
  Theme: {
    Title: as(
      vitalColor.TextPrimaryHeaderCopy,
      vitalTextDecoration.Bold,
    ),
  },
});

const Default = asFiltersToken({
  Theme: {
    CategoryList: WithCategoryListStyles,
    TagList: WithTagListStyles,
  },
});

export default {
  Default,
};
