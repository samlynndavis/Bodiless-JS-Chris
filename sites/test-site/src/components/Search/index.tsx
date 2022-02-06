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

import { ComponentType } from 'react';
import pick from 'lodash/pick';
import { withDesign, replaceWith, flowHoc } from '@bodiless/fclasses';
import { withResponsiveVariants } from '@bodiless/components';
import {
  SearchBox as SearchBoxClean,
  SearchResult as SearchResultClean,
  ResponsiveSearchBox as ResponsiveSearchBoxClean,
} from '@bodiless/search';

import { breakpoints as allBreakpoints } from '../Page';
import { asDesktopOnly, asMobileOnly } from '../Elements.token';
import {
  asSimpleSearchResult, asInlineSearch, asSimpleSearch,
  asResponsiveSearch as asResponsiveSearchStyles,
} from './token';

const breakpoints = pick(allBreakpoints, 'lg');

const asResponsiveSearch = (DesktopSearch: ComponentType) => flowHoc(
  withResponsiveVariants({ breakpoints }),
  // Note, it's important to apply responsive CSS to the 2 search components in order to
  // avoid flicker on the static site. The search for the inactive breakpoint
  // is rendered during SSR and unmounted as a side effect after rehydration.
  withDesign({
    _default: withDesign({ Wrapper: asMobileOnly }),
    lg: flowHoc(replaceWith(DesktopSearch), asDesktopOnly),
  }),
);

export const SimpleSearchResult = flowHoc(asSimpleSearchResult)(SearchResultClean);
export const InlineSearchBox = asInlineSearch(SearchBoxClean);
export const SimpleSearchBox = asSimpleSearch(SearchBoxClean);
export const ResponsiveSearchBox = flowHoc(
  asResponsiveSearchStyles,
  asResponsiveSearch(SimpleSearchBox),
)(ResponsiveSearchBoxClean);
