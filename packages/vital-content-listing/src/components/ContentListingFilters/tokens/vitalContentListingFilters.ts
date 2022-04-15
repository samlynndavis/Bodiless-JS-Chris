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
  flowHoc,
  withDesign,
} from '@bodiless/fclasses';
import {
  withSingleAllowedTag,
  withMultipleAllowedTags,
} from '@bodiless/filtering';
import { asContentListingFiltersToken } from '../ContentListingFiltersClean';

const withTagListStyles = withDesign({
  Title: flowHoc(
    addProps({ emptyTitleText: 'Group' }),
    withDesign({
      FilterInputWrapper: 'flex pb-2 items-center',
      FilterGroupItemInput: 'mr-3 rtl:ml-3 rtl:mr-0',
      FilterGroupItemPlaceholder: 'text-gray-600',
    }),
  ),
  Wrapper: 'm-2 pl-2',
});

const withCategoryList = withDesign({
  Title: 'font-bold',
  Wrapper: 'p-2',
  Item: 'py-2',
});

const Default = asContentListingFiltersToken({
  Layout: {
    Wrapper: 'flex flex-col flex flex-col lg:flex-row lg:min-h-screen',
    FilterWrapper: 'lg:w-1/3 lg:mr-5 lg:rtl:ml-5 lg:rtl:mr-0',
    FilterHeader: 'flex flex-col w-full lg:flex-row lg:justify-between lg:items-center',
    ContentWrapper: 'w-full lg:w-1/3',
    ResetButton: 'self-start',
  },
  Spacing: {
    FilterTitle: 'my-2 lg:my-0',
    ResetButton: 'my-2',
  },
  Theme: {
    FilterWrapper: 'bg-gray-400',
    FilterHeader: 'bg-gray-500 p-2',
    FilterTitle: 'text-xl font-bold',
    ResetButton: 'underline',
    Filter: withDesign({
      TagList: withTagListStyles,
      CategoryList: withCategoryList,
    }),
  },
});

const WithMultipleAllowedTags = asContentListingFiltersToken({
  Core: {
    _: withMultipleAllowedTags,
  },
});

const WithSingleAllowedTag = asContentListingFiltersToken({
  Core: {
    _: withSingleAllowedTag,
  },
});

export default {
  Default,
  WithMultipleAllowedTags,
  WithSingleAllowedTag,
};
