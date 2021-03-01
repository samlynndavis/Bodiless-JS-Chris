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
  ComponentType, createContext, useContext, useState,
} from 'react';

/**
 * Type of a Burger Menu Context.
 */
type BurgerMenuContextType = {
  isVisible: boolean,
  toggle: React.Dispatch<React.SetStateAction<boolean>>,
};

const BurgerMenuContext = createContext<BurgerMenuContextType>({
  isVisible: false,
  toggle: () => null,
});

const useBurgerMenuContext = () => useContext(BurgerMenuContext);

/**
 * @private
 * Wraps component with the BurgerMenuContext and creates two state variables
 * that are passed to the provider:
 *  - `isVisible` - Boolean to toggle Burger Menu visibility.
 *  - `toggle()` - Visibility toggle function.
 *
 */
const withBurgerMenuProvider = <P extends object>(Component: ComponentType<P>) => (props: P) => {
  const [isVisible, toggle] = useState<boolean>(false);

  return (
    <BurgerMenuContext.Provider value={{ isVisible, toggle }}>
      <Component {...props} />
    </BurgerMenuContext.Provider>
  );
};

/**
 * Hook which can be used to determine if Burger Menu is visible.
 *
 * @return true if the Burger Menu is visible, false otherwise.
 */
const useIsBurgerMenuVisible = () => useBurgerMenuContext().isVisible;

/**
 * Hook which can be used to determine if Burger Menu is hidden.
 *
 * @return true if the Burger Menu is hidden, false otherwise.
 */
const useIsBurgerMenuHidden = () => !useBurgerMenuContext().isVisible;

export {
  withBurgerMenuProvider,
  useBurgerMenuContext,
  useIsBurgerMenuVisible,
  useIsBurgerMenuHidden,
};
