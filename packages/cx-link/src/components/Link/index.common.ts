/**
 * Copyright © 2022 Johnson & Johnson
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

// The following exports are the same for both static and edit apps
export { default as cxLink } from './tokens';
export {
  useExternalLinkToggle, useIsDownloadLink, asEditableLink, anchorTo,
} from './util';
export { LinkClean, asLinkToken } from './LinkClean';
export type { LinkComponents, LinkBaseProps } from './types';
