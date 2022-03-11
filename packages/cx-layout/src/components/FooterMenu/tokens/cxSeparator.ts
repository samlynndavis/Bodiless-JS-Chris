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

import { asTokenGroup } from '@bodiless/cx-elements';
import { as } from '@bodiless/fclasses';

const meta = {
  categories: {
    Type: ['Element'],
  },
};

// @TODO: Right now, default is implemented for footer, but this can potentially
// be extended to other components, then the separator should be moved to higher scope.
export default asTokenGroup(meta)({
  Default: as(
    // Separator borders.
    'border-white-400 border-b last:border-0',
    'md:border-b-0 md:border-l md:last:border-l md:first:border-0',
    'lg:first:border-l',
    // Separator spacings.
    'mb-9 pb-9 last:mb-0 last:pb-0',
    'md:mb-0 md:pb-0 md:px-10 md:first:pl-0 md:last:pr-0',
    'lg:px-12 lg:first:pl-12',
  ),
});
