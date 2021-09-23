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

/* eslint-disable react/jsx-indent */
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  createContext,
  FC,
} from 'react';
import { v1 } from 'uuid';
import { uniqBy } from 'lodash';
import { Injector, addProps, Enhancer } from '@bodiless/fclasses';
import {
  FBGContextOptions,
  SuggestionsRefType,
  FBGContextType,
  TagType,
  FilteredItemType,
  RegisterItemContextType,
} from './types';
import { useFilterByGroupStore, Tag } from './FilterByGroupStore';
import { useTagsAccessors } from './FilterModel';
import { TagButtonProps } from '../TagButton';

const RegisterItemContext = React.createContext<RegisterItemContextType>({
  registerItem: () => undefined,
});

const FilterByGroupContext = createContext<FBGContextType>({
  getSuggestions: () => [],
  useRegisterSuggestions: () => () => undefined,
  selectTag: () => { },
  getSelectedTags: () => [],
  unSelectTag: () => { },
  isTagSelected: () => false,
  clearSelectedTags: () => { },
  multipleAllowedTags: false,
  getFilteredItems: () => [],
  filtersInitialized: false,
});

const useFilterByGroupContext = () => useContext(FilterByGroupContext);
const useIsFilterTagSelected = () => {
  const { tag } = useTagsAccessors();
  return useFilterByGroupContext().isTagSelected(tag);
};

const itemsEventBus = {
  on(event: string, callback: (data: FilteredItemType[]) => void) {
    document.addEventListener(event,
      ((e: CustomEvent) => { callback(e.detail); }) as EventListener);
  },
  dispatch(event: string, data: FilteredItemType[]) {
    if (typeof window !== 'undefined') {
      const eventCustom = new CustomEvent(event, { detail: data });
      document.dispatchEvent(eventCustom);
    }
  },
  off(event: string, callback: (data: FilteredItemType[]) => void) {
    document.removeEventListener(event,
      ((e: CustomEvent) => { callback(e.detail); }) as EventListener, false);
  },
};

const FilterByGroupProvider: FC<FBGContextOptions> = ({
  children,
  suggestions,
  multipleAllowedTags,
  items,
}) => {
  const {
    selectTag,
    unSelectTag,
    getSelectedTags,
    isTagSelected,
    clearSelectedTags,
    filtersInitialized,
  } = useFilterByGroupStore({ multipleAllowedTags });

  const refs = useRef<any>([]);

  const getSuggestions = (): TagType[] => {
    const allSuggestions: TagType[] = refs.current.reduce(
      (acc: any, ref: any) => [...acc, ...ref.current.tags],
      suggestions || [],
    );
    return uniqBy(allSuggestions, 'id').sort((a, b) => a.name.localeCompare(b.name));
  };

  const useRegisterSuggestions = () => {
    const newRef = useRef<SuggestionsRefType>({
      id: v1(),
      tags: [] as TagType[],
    });

    if (!refs.current.find((ref: any) => ref.current.id === newRef.current.id)) {
      refs.current.push(newRef);
    }

    return (tags: TagType[]) => {
      newRef.current.tags = [...tags];
    };
  };

  const newValue = {
    getSuggestions,
    useRegisterSuggestions,
    selectTag,
    getSelectedTags,
    unSelectTag,
    isTagSelected,
    multipleAllowedTags: multipleAllowedTags || false,
    clearSelectedTags,
    getFilteredItems: items ? () => items : () => [],
    filtersInitialized,
  };
  return (
    <FilterByGroupContext.Provider value={newValue}>
      {children}
    </FilterByGroupContext.Provider>
  );
};

const FBGNotificationProvider: FC<any> = ({
  children,
  itemsRegistered,
  items,
  setItems,
}) => {
  const registerItem = (newItem: FilteredItemType) => setItems(
    (items: FilteredItemType[]) => {
      const itemIndex = items.findIndex(x => x.id === newItem.id);

      if (itemIndex === -1) {
        items.push(newItem);
      } else {
        items[itemIndex] = newItem;
      }

      return [...items];
    }
  );

  const notifyContextValue = useMemo(() => ({ registerItem }), [setItems]);
  itemsEventBus.dispatch('ItemsRegistered', items);

  return (
    <RegisterItemContext.Provider value={notifyContextValue}>
      {children}
    </RegisterItemContext.Provider>
  );
};

const withFilterByGroupContext: Enhancer<FBGContextOptions> = Component => props => {
  const { suggestions, multipleAllowedTags, ...rest } = props;
  const [items, setItems] = useState<FilteredItemType[]>([]);

  return (
      <FilterByGroupProvider
        suggestions={suggestions}
        multipleAllowedTags={multipleAllowedTags}
        items={items}
      >
        <FBGNotificationProvider
          setItems={setItems}
          items={items}
        >
          <Component {...rest} />
        </FBGNotificationProvider>
      </FilterByGroupProvider>
  );
};

type DefaultTagProps = {
  getSuggestions: () => TagType[],
  registerSuggestions: (tags: TagType[]) => void,
  selectedTags: TagType[],
};

const withTagProps = (
  suggestionOptions?: TagButtonProps,
): Injector<DefaultTagProps> => Component => (props: any) => {
  const {
    getSuggestions,
    useRegisterSuggestions,
    getSelectedTags,
  } = useFilterByGroupContext();
  const registerSuggestions = useRegisterSuggestions();

  const defaultProps: DefaultTagProps = {
    getSuggestions,
    registerSuggestions,
    selectedTags: getSelectedTags(),
  };

  const suggestionProps = Object.assign(defaultProps, suggestionOptions);

  return <Component {...props} {...suggestionProps} />;
};

const withFBGSuggestions = ({ suggestions }: FBGContextOptions) => addProps({ suggestions });

const useRegisterItem = (
  item: FilteredItemType, isDisplayed: boolean, selectedTags: Tag[]
) => {
  const owner = useRef(v1()).current;
  const { registerItem } = useContext(RegisterItemContext);
  const { filtersInitialized } = useFilterByGroupContext();
  useEffect(
    () => {
      if (filtersInitialized) {
        registerItem({ ...item, selectedTags, isDisplayed });
      }
    },
    [registerItem, owner, filtersInitialized, selectedTags, isDisplayed],
  );
};

export default FilterByGroupContext;
export {
  FilterByGroupContext,
  useFilterByGroupContext,
  withFilterByGroupContext,
  withFBGSuggestions,
  withTagProps,
  useIsFilterTagSelected,
  useRegisterItem,
  itemsEventBus,
};
