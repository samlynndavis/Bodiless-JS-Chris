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

import { ComponentType, HTMLProps } from 'react';
import { StylableProps, DesignableComponentsProps } from '@bodiless/fclasses';

export type FilterByGroupComponents = {
  Wrapper: ComponentType<StylableProps>,
  FilterWrapper: ComponentType<StylableProps>,
  ContentWrapper: ComponentType<StylableProps>,
  ResetButton: ComponentType<StylableProps & HTMLProps<HTMLButtonElement>>,
  Filter: ComponentType<StylableProps>,
  FilterCategory: ComponentType<StylableProps>,
  FilterGroupItem: ComponentType<StylableProps & HTMLProps<HTMLInputElement>>,
  FilterGroupsWrapper: ComponentType<StylableProps>,
  FilterInputWrapper: ComponentType<StylableProps>,
};

export type FilterComponentProps = {
  tags: string[],
}

export type FilterByGroupProps = DesignableComponentsProps<FilterByGroupComponents>;
