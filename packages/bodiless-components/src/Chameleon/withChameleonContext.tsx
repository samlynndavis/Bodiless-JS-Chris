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
  createContext, useContext, FC,
} from 'react';
import { WithNodeKeyProps, withSidecarNodes, withBodilessData } from '@bodiless/core';
import {
  ComponentOrTag, Token, Fragment, DesignableComponents, Design, HOC, asToken, replaceWith,
} from '@bodiless/fclasses';
import { SelectorComponents } from '@bodiless/layouts';

import omit from 'lodash/omit';
import type {
  ChameleonState, ChameleonData, ChameleonProps,
} from './types';
import { identity } from 'lodash';

const ChameleonContext = createContext<ChameleonState|undefined>(undefined);

export const DEFAULT_KEY = '_default';

/**
 * Gets the current chameleon context value.
 *
 * @see withChameleonContext
 */
const useChameleonContext = (): ChameleonState => {
  const value = useContext(ChameleonContext);
  if (!value) throw new Error('No active chameleon context');
  return value;
};

class ChameleonContextValue extends SelectorComponents implements ChameleonState {
  isOn: boolean;

  apply: HOC;

  activeComponent: string;

  setActiveComponent: (key: string | null) => void;

  constructor(props: ChameleonProps, DefaultComponent: ComponentOrTag<any>) {
    const { design = {}, startComponents, componentData: { component }, setComponentData } = props;
    const defaultDesign: Design<DesignableComponents> = {
      [DEFAULT_KEY]: identity,
    };
    super({
      DefaultComponent,
      selectedComponents: component ? [component, DEFAULT_KEY] : [DEFAULT_KEY],
      startComponents,
      design: {
        ...defaultDesign,
        ...design,
      }
    });
    this.activeComponent = component || DEFAULT_KEY;
    this.isOn = this.activeComponent !== DEFAULT_KEY;
    this.setActiveComponent = (component: string|null) => setComponentData({ component });
    const apply = design[this.activeComponent] || identity;
    this.apply = startComponents?.[this.activeComponent]
      ? asToken(replaceWith(startComponents[this.activeComponent]), apply) : apply;
  }

  getSelectableComponents() {
    const components = super.getSelectableComponents();
    // @ts-ignore Add metadata to DesignableCompoennts type
    return components[DEFAULT_KEY]?.title ? components : omit(components, DEFAULT_KEY);
  }

  get isToggle() {
    const { design, startComponents } = this.props;
    const keys = startComponents ? Object.keys(startComponents) : Object.keys(design);
    if (keys.length > 2) return false;
    if (!keys.includes(DEFAULT_KEY)) return false;
    if (!design[DEFAULT_KEY]) return true;
    const def = design[DEFAULT_KEY]!(Fragment);
    return def.title === undefined;
  }
}

const createChameleonContextValue = (props: ChameleonProps, DefaultComponent: ComponentOrTag<any>) => {
  return new ChameleonContextValue(props, DefaultComponent);
};

const withChameleonContext = (
  nodeKeys: WithNodeKeyProps,
  defaultData?: ChameleonData,
  /** */
  RootComponent: ComponentOrTag<any> = Fragment,
): Token => Component => {
  const WithChameleonContext: FC<any> = props => (
    <ChameleonContext.Provider value={createChameleonContextValue(props, RootComponent)}>
      <Component
        {...omit(
          props,
          'componentData', 'components', 'setComponentData', 'startComponents',
        ) as any}
      />
    </ChameleonContext.Provider>
  );

  return withSidecarNodes(
    withBodilessData(nodeKeys, defaultData),
  )(WithChameleonContext);
};

export default withChameleonContext;
export { useChameleonContext };
