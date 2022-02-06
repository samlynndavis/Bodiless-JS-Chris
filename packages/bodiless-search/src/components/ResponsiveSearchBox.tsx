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

import React, {
  FC, ComponentType, useState, HTMLProps, createContext, useContext,
} from 'react';
import {
  I,
  Div,
  Button,
  addClasses,
  designable,
  withDesign,
  DesignableComponentsProps,
  StylableProps,
  flowHoc,
} from '@bodiless/fclasses';

import {
  SearchBox,
  SearchProps,
  searchComponents,
  SearchComponents,
} from './Search';

export type ResponsiveSearchComponents = {
  Wrapper: ComponentType<StylableProps>,
  ToggleButton: ComponentType<HTMLProps<HTMLButtonElement>>,
  ToggleIcon: ComponentType<HTMLProps<HTMLElement>>
} & SearchComponents;

export type ResponsiveSearchProps = DesignableComponentsProps<ResponsiveSearchComponents> &
SearchProps;

const withResponsiveDesign = withDesign({
  Wrapper: addClasses('lg:hidden'),
  ToggleButton: addClasses('h-full'),
});

const responsiveSearchComponents: ResponsiveSearchComponents = {
  ...searchComponents,
  Wrapper: Div,
  ToggleButton: Button,
  ToggleIcon: addClasses('material-icons cursor-pointer align-middle')(I),
};

type ToggleButtonContext = {
  isExpanded: boolean,
  setExpanded: Function,
};
const searchToggleButtonContext = createContext<ToggleButtonContext>({
  isExpanded: false,
  setExpanded: () => false,
});
export const useSearchToggleButtonContext = () => useContext(searchToggleButtonContext);
export const isSearchToggleButtonExpanded = () => useSearchToggleButtonContext().isExpanded;

const ResponsiveSearchBoxBase: FC<ResponsiveSearchProps> = (props) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);

  const { components } = props;
  const { Wrapper, ToggleButton, ToggleIcon } = components;

  return (
    <Wrapper>
      <searchToggleButtonContext.Provider value={{ isExpanded, setExpanded }}>
        <ToggleButton onClick={() => setExpanded(!isExpanded)}>
          <ToggleIcon>{ isExpanded ? 'close' : 'search' }</ToggleIcon>
        </ToggleButton>

        <SearchBox
          {...props}
          style={{ display: isExpanded ? 'flex' : 'none' }}
          onSubmit={() => setExpanded(false)}
        />
      </searchToggleButtonContext.Provider>
    </Wrapper>
  );
};

export const ResponsiveSearchBox = flowHoc(
  designable(responsiveSearchComponents, 'ResponsiveSearchBox'),
  withResponsiveDesign,
)(ResponsiveSearchBoxBase) as ComponentType<SearchProps>;
