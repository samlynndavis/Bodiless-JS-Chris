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

import Editable, { withPlaceholder, asEditable } from './Editable';
import { asBodilessLink } from './Link';
import Image, {
  asBodilessImage,
  TImagePickerUI,
  withImagePlaceholder,
} from './Image';
import NodeViewer from './NodeViewer';
import withLinkToggle from './LinkToggle';
import List, { asTestableList } from './List';
import asTaggableItem from './Taggable/asTaggableItem';
import withListTitle from './List/withListTitle';
import asEditableList from './List/asEditableList';
import asBasicSublist from './List/asBasicSublist';
import asBodilessList, {
  asSubList, asTitledItem, withSubListDesign as withSimpleSubListDesign,
} from './List/asBodilessList';
import withSublist, { withBasicSublist } from './List/withSublist';
import withDeleteSublistOnUnwrap from './List/withDeleteSublistOnUnwrap';
import asChamelionSubList, {
  withSubLists,
  withSubListDesign,
} from './List/asChamelionSubList';
import {
  withMeta, withMetaStatic, withMetaHtml, withTitle,
} from './Meta/Meta';
import withMetaForm, { withMetaSnippet } from './Meta/withMetaForm';
import type { FieldType as MetaFormFieldType } from './Meta/withMetaForm';
import asBodilessHelmet from './Helmet/Helmet';
import withEvent from './GTM/gtm';
import { withToggle, withToggleTo, withToggleButton } from './Toggle';
import withEditPlaceholder from './Placeholder';
import { TagButtonProps, withTagButton, useTagsAccessors } from './TagButton';
import withFilterByTags from './withFilterByTags';
import Youtube, { asBodilessYoutube } from './Youtube';
import PageDimensionsProvider, {
  usePageDimensionsContext,
  withPageDimensionsContext,
  BreakpointsType,
} from './PageDimensionsProvider';
import {
  ifViewportIs,
  ifViewportIsNot,
} from './withResponsiveToggle';
import asBreadcrumb, { useBreadcrumbContext } from './asBreadcrumb';
import withBodilessLinkToggle from './withBodilessLinkToggle';

export {
  withBodilessLinkToggle,
  asBodilessLink,
  Image,
  asBodilessImage,
  withImagePlaceholder,
  TImagePickerUI,
  Editable,
  NodeViewer,
  withLinkToggle,
  List,
  asBodilessList,
  withSimpleSubListDesign,
  asChamelionSubList,
  withSubLists,
  withSubListDesign,
  asTitledItem,
  asSubList,
  asEditableList,
  asBasicSublist,
  asTestableList,
  withBasicSublist,
  withSublist,
  withDeleteSublistOnUnwrap,
  withListTitle,
  withToggle,
  withToggleTo,
  withToggleButton,
  withPlaceholder,
  asEditable,
  withMeta,
  withTitle,
  withMetaStatic,
  withMetaHtml,
  asBodilessHelmet,
  withEditPlaceholder,
  withEvent,
  withTagButton,
  TagButtonProps,
  asTaggableItem,
  withFilterByTags,
  useTagsAccessors,
  asBodilessYoutube,
  Youtube,
  PageDimensionsProvider,
  usePageDimensionsContext,
  withPageDimensionsContext,
  BreakpointsType,
  ifViewportIs,
  ifViewportIsNot,
  withMetaForm,
  withMetaSnippet,
  asBreadcrumb,
  useBreadcrumbContext,
};

export * from './Chamelion/index';

export type {
  FinalProps as ListProps,
  TitleProps as ListTitleProps,
  ListDesignableComponents,
} from './List/types';
export type { MetaFormFieldType };
