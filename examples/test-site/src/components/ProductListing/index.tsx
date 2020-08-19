/**
 * Copyright © 2019 Johnson & Johnson
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
import { flow } from 'lodash';
import {
  H1,
  Img,
  addClasses,
} from '@bodiless/fclasses';
import { withEditorSimple } from '../Editors';
import { asLandscapeImage } from '../Image';
import {
  asHeader1,
  asImage,
  asImageRounded,
} from '../Elements.token';

export { ProductListingFlowContainer } from './ProductListingFlowContainer';

export const ProductListingTitle = flow(
  asHeader1,
  withEditorSimple('product_listing_title', 'Product Listing Title'),
)(H1);

const asProductListingImage = flow(
  asImageRounded,
  addClasses('w-full'),
);

export const ProductListingImage = flow(
  asLandscapeImage('product_listing_image'),
  asImage,
  asProductListingImage,
)(Img);
