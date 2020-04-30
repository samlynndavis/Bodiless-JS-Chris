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
  FC,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import { throttle } from 'lodash';

type PageDimensions = {
  width: number,
  height: number,
  size: string,
};

type BreakpointsType = {
  [size: string]: number;
};

type PageDimensionsProviderProps = {
  breakpoints: BreakpointsType,
};

const PageDimensionsContext = createContext<PageDimensions>({
  width: 0,
  height: 0,
  size: 'sm',
});

const mapBreakpointsSize = (breakpoints: BreakpointsType, width: number) => (
  Object.keys(breakpoints).find(item => width <= breakpoints[item]) || 'xxl'
);

const usePageDimensionsContext = () => useContext(PageDimensionsContext);

const PageDimensionsProvider: FC<PageDimensionsProviderProps> = ({ children, breakpoints }) => {
  const [dimensions, setDimensions] = useState<PageDimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
    size: mapBreakpointsSize(breakpoints, window.innerWidth),
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        size: mapBreakpointsSize(breakpoints, window.innerWidth),
      });
    };

    window.addEventListener('resize', throttle(handleResize, 500));

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <PageDimensionsContext.Provider value={dimensions}>
      { children }
    </PageDimensionsContext.Provider>
  );
};

export default PageDimensionsProvider;
export {
  usePageDimensionsContext,
};
