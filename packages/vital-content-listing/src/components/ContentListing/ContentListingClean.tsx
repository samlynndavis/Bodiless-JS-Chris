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

import React, { FC } from 'react';
import {
  designable,
  Div,
  Fragment,
  Img,
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { FlowContainerClean } from '@bodiless/vital-flowcontainer';
import { LayoutClean } from '@bodiless/vital-layout';
import { ContentListingFiltersClean } from '../ContentListingFilters';
import type { ContentListingComponents, ContentListingProps } from './types';

const contentListingComponents: ContentListingComponents = {
  PageWrapper: LayoutClean,
  Breadcrumb: Fragment,
  // TitleRow: TitleRowClean,
  MainWrapper: Div,
  HeroWrapper: Div,
  HeroImage: Img,
  FilterWrapper: Div,
  Filter: ContentListingFiltersClean,
  ContentListing: FlowContainerClean,
  BottomWrapper: Div,
  BottomContent: FlowContainerClean,
};

const ContentListingBase: FC<ContentListingProps> = ({ components: C, ...rest }) => (
  <C.PageWrapper {...rest}>
    <C.Breadcrumb />
    <C.MainWrapper>
      {/* <C.TitleRow /> */}
      <C.HeroWrapper>
        <C.HeroImage />
      </C.HeroWrapper>
      <C.FilterWrapper>
        <C.Filter>
          <C.ContentListing />
        </C.Filter>
      </C.FilterWrapper>
      <C.BottomWrapper>
        <C.BottomContent />
      </C.BottomWrapper>
    </C.MainWrapper>
  </C.PageWrapper>
);

const ContentListingClean = designable(contentListingComponents, 'ContentListing')(ContentListingBase);

export const asContentListingToken = asVitalTokenSpec<ContentListingComponents>();

export default ContentListingClean;
