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

import identity from 'lodash/identity';
import withContentLibrary$ from './withContentLibrary';

export const withContentLibrary: typeof withContentLibrary$ = process.env.NODE_ENV !== 'production'
  ? withContentLibrary$ : () => identity;

export { withLibraryComponents } from './withLibraryComponents';
export { useIsLibraryItem, useLibraryItemContext } from './withLibraryContext';
