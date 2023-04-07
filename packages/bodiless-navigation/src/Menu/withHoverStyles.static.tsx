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

import { useListContext } from '@bodiless/components';
import {
  addClasses,
  addClassesIf,
  withDesign,
  flowHoc,
} from '@bodiless/fclasses';

import { useIsMenuOpen, useMenuContext } from './withMenuContext';

/*
 * Utility Styles
 * ===========================================
 */
const isMenuContextActive = () => false;

const isMenuContextNotActive = () => true;

const useIsSubmenuExpanded = () => {
  const { activeSubmenu } = useMenuContext();
  const { currentItem } = useListContext();
  return activeSubmenu === currentItem;
};

const useIsHoverEnabled = () => !useIsMenuOpen() && useMenuContext().activeSubmenu === undefined;

const useIsSubmenuContracted = () => {
  const isActive = false;
  const isEdit = false;
  const { activeSubmenu } = useMenuContext();
  const { currentItem } = useListContext();
  const isNotActive = isEdit ? !isActive : true;
  return (activeSubmenu !== currentItem) && isNotActive;
};

const withHoverStyles = withDesign({
  OuterWrapper: flowHoc(
    addClassesIf(useIsHoverEnabled)('group'),
  ),
  Wrapper: flowHoc(
    addClasses('group-hover:flex'),
    addClassesIf(useIsSubmenuContracted)('hidden'),
    addClassesIf(useIsSubmenuExpanded)('flex'),
  ),
});

export default withHoverStyles;
export {
  isMenuContextActive,
  isMenuContextNotActive,
  useIsSubmenuExpanded,
  useIsSubmenuContracted,
  useIsHoverEnabled,
};
