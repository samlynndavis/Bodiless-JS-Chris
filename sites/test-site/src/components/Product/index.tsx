/**
 * Copyright © 2021 Johnson & Johnson
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
  H1,
  Div,
  Img,
  addClasses,
  addProps,
  flowHoc,
} from '@bodiless/fclasses';
import Card from '../Card';
import { withEditorSimple } from '../Editors';
import {
  asHeader1,
  asImage,
  asYMargin,
  asNegXMargin,
  withPadding5,
} from '../Elements.token';
import { asEditableImagePlain as asEditableImage } from '../Image';
import {
  asCardWithPaddings,
  asCardDefaultStyle,
  asCardVertical,
} from '../Card/token';

const asTestableProductTitle = addProps({ 'data-product-element': 'title' });
export const ProductTitle = flowHoc(
  asHeader1,
  withEditorSimple('product_title', 'Product Title'),
  asTestableProductTitle,
)(H1);

const asProductImage = addClasses('w-full');
const asTestableProductImage = addProps({ 'data-product-element': 'image' });
export const ProductImage = flowHoc(
  asProductImage,
  asImage,
  asEditableImage('product_image'),
  asTestableProductImage,
)(Img);

export const ProductCard = flowHoc(
  asCardWithPaddings,
  asCardDefaultStyle,
  asCardVertical,
)(Card);

export const SectionContent = withPadding5(Div);
export const SectionMargin = asYMargin(Div);
export const SectionNegXMargin = flowHoc(
  asYMargin,
  asNegXMargin,
)(Div);

const asProductDetailWrapper = addClasses('w-full lg:w-1/2 lg:pr-2');
export const ProductDetailImageWrapper = asProductDetailWrapper(Div);
export const ProductDetailAccWrapper = asProductDetailWrapper(Div);
