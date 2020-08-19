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

import React, { ConsumerProps, FC } from 'react';
import { Observer } from 'mobx-react';
import { v1 } from 'uuid';
import { action, computed, observable } from 'mobx';
import {
  DefinesLocalEditContext,
  PageEditContextInterface,
  PageEditStore as PageEditStoreInterface,
  TMenuOption,
  TMenuOptionGetter,
  TPageOverlayStore,
} from './types';
import { TOverlaySettings } from '../Types/PageOverlayTypes';
import {
  getFromSessionStorage,
  saveToSessionStorage,
} from '../SessionStorage';

export const reduceRecursively = <T extends any>(
  accumulator: T[],
  callback: (c: PageEditContext) => T[],
  context?: PageEditContext,
): T[] => {
  if (!context) return [];
  const newItems = callback(context);
  const newAccumulator = [...newItems, ...accumulator];
  return context.parent
    ? reduceRecursively(newAccumulator, callback, context.parent)
    : newAccumulator;
};
// Helper function to aggregate information from all nested contexts.
// @TODO Convert to private method

// A Page Edit Context represents a particular state of the page editor, usually
// defined by what element of the page is "active" or "focused". Currently, the
// only bit of state tracked in the context are context menu options (along with
// whether a context is "active", which can be used to highlight the component
// which registered the context.
// - Contexts are nested (so that a parent context is "active" when any of
// its child contexts are active).
// - Contexts are established using the React context API - and each PageEditContext
// instance is a "value".
// - The PageEditContext instance also contains a reference to the page edit store,
// which tracks editor UI state (eg the currently active context).
// - The react context container (created by React.createContext) of which the
// PageEditContext instance is a value is available as a static property of the class via:
//    - PageEditContext.context (the context object, suitable for use as a component contextType).
//    - PageEditContext.Consumer (an observable version of PageEditContext.context.Consumer).
//    - PageEditContext.Provider (equivalent to PageEditContext.context.Provider).
// Singleton store.

const defaultOverlaySettings: TOverlaySettings = {
  isActive: false,
  hasCloseButton: false,
  hasSpinner: true,
  message: '',
  maxTimeoutInSeconds: null,
  onClose: () => {},
};

export class PageEditStore implements PageEditStoreInterface {
  @observable activeContext: PageEditContext | undefined = undefined;

  @observable contextMenuOptions: TMenuOption[] = [];

  @observable isEdit = getFromSessionStorage('isEdit', false);

  @observable isPositionToggled = getFromSessionStorage('isPositionToggled', false);

  @observable pageOverlay: TPageOverlayStore = {
    data: {
      ...defaultOverlaySettings,
    },
    timeoutId: 0,
  };

  @observable areLocalTooltipsDisabled = false;

  @action
  setActiveContext(context?: PageEditContext) {
    if (context) this.activeContext = context;
    this.contextMenuOptions = reduceRecursively<TMenuOption>(
      [],
      (passedContext: PageEditContext) => passedContext
        .getMenuOptions()
        // Inject the context id into the map
        .map(option => ({ ...option, group: passedContext.id })),
      this.activeContext,
    );
  }

  @action toggleEdit(on? : boolean) {
    if (on === undefined) {
      this.isEdit = !this.isEdit;
    } else {
      this.isEdit = Boolean(on);
    }

    saveToSessionStorage('isEdit', this.isEdit);
  }

  @action togglePosition(on? : boolean) {
    if (on === undefined) {
      this.isPositionToggled = !this.isPositionToggled;
    } else {
      this.isPositionToggled = Boolean(on);
    }

    saveToSessionStorage('isPositionToggled', this.isPositionToggled);
  }

  @action toggleLocalTooltipsDisabled(isDisabled?: boolean) {
    if (isDisabled === undefined) {
      this.areLocalTooltipsDisabled = !this.areLocalTooltipsDisabled;
    } else {
      this.areLocalTooltipsDisabled = isDisabled;
    }
  }

  @computed get contextTrail() {
    return reduceRecursively<string>([], context => [context.id], this.activeContext);
  }
}

export const defaultStore = new PageEditStore();

// tslint:disable-next-line:max-line-length
class PageEditContext implements PageEditContextInterface {
  readonly id: string = v1();

  readonly name: string = 'PageEditContext';

  readonly getMenuOptions: TMenuOptionGetter = () => [];

  readonly parent: PageEditContext | undefined;

  private store: PageEditStore = defaultStore;

  hasLocalMenu = false;

  // When called with no argument this creates a new store and react context.
  constructor(values?: DefinesLocalEditContext, parent?: PageEditContext) {
    if (values) {
      this.id = values.id;
      this.name = values.name;
      if (values.getMenuOptions) this.getMenuOptions = values.getMenuOptions;
    }
    if (parent) {
      this.parent = parent;
      this.store = parent.store;
    }
  }

  static context = React.createContext(
    new PageEditContext() as PageEditContextInterface,
  );

  // Make our context consumer observable.
  // See https://github.com/mobxjs/mobx-react/issues/471.
  // eslint-disable-next-line react/prop-types
  static Consumer: FC<ConsumerProps<PageEditContextInterface>> = ({ children }) => (
    <PageEditContext.context.Consumer>
      {value => <Observer>{() => children(value)}</Observer>}
    </PageEditContext.context.Consumer>
  );

  static Provider = PageEditContext.context.Provider;

  // Create a new context value with this as its parent.
  spawn(values: DefinesLocalEditContext): PageEditContextInterface {
    return new PageEditContext(values, this);
  }

  // Make this the "current" context.
  activate() {
    this.store.setActiveContext(this);
  }

  refresh() {
    this.store.setActiveContext();
  }

  // Tests whether this context is "active" - i.e. whether it or one of its descendants is the
  // "current" context.
  get isActive() {
    return this.store.contextTrail.includes(this.id);
  }

  get isInnermost() {
    return Boolean(
      this.store.activeContext && this.store.activeContext.id === this.id,
    );
  }

  get isInnermostLocalMenu() {
    const getId = (context: PageEditContext):string => {
      if (context.hasLocalMenu) return context.id;
      if (context.parent) return getId(context.parent);
      return '';
    };
    return Boolean(
      this.hasLocalMenu
      && this.store.activeContext
      && getId(this.store.activeContext) === this.id,
    );
  }

  get isEdit() {
    return this.store.isEdit;
  }

  toggleEdit(on?: boolean) {
    this.store.toggleEdit(on);
  }

  get isPositionToggled() {
    return this.store.isPositionToggled;
  }

  togglePosition(on?: boolean) {
    this.store.togglePosition(on);
  }

  get contextMenuOptions() {
    return this.store.contextMenuOptions;
  }

  get pageOverlay() {
    return this.store.pageOverlay;
  }

  showPageOverlay(passedSettings: TOverlaySettings | undefined) {
    clearTimeout(this.store.pageOverlay.timeoutId);
    const settings = {
      ...defaultOverlaySettings,
      isActive: true,
      ...passedSettings,
    };
    this.store.pageOverlay.data = settings;

    if (settings.maxTimeoutInSeconds) {
      this.store.pageOverlay.timeoutId = window.setTimeout(() => {
        this.showError({
          message: `The application encountered an issue.
Please try your operation again if it was not successful.`,
        });
      }, settings.maxTimeoutInSeconds * 1000);
    }
  }

  hidePageOverlay() {
    this.showPageOverlay({
      isActive: false,
    });
  }

  showError(passedSettings: TOverlaySettings | undefined) {
    const settings = {
      message: 'An error has occurred.',
      hasCloseButton: true,
      hasSpinner: false,
      ...passedSettings,
    };
    this.showPageOverlay(settings);
  }

  get areLocalTooltipsDisabled() {
    return this.store.areLocalTooltipsDisabled || !this.store.isEdit;
  }

  toggleLocalTooltipsDisabled(isDisabled?: boolean) {
    this.store.toggleLocalTooltipsDisabled(isDisabled);
  }
}

export default PageEditContext;
