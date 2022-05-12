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

import { asTokenGroup } from '../../../util';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['Spacing'],
  },
};

/*
 * Tailwind's container is specifically not used due to its feature it set's max-width
 * to min-width of breakpoint.  So instead rely on ContainerWrapper to margin percent
 * to contain content (WithSiteMargin) until we get to xl and then constrain by
 * max-width (WithSiteXLConstraint).
 */
export default asTokenGroup(meta)({
  WithSiteMargin: 'mx-site-percent md:mx-md-site-percent 2xl:px-40',
  WithSiteXLConstraint: '2xl:container 2xl:mx-auto',
  Gutter: 'p-1 md:p-2 lg:p-3',
  GutterOffset: '-mx-1 md:-mx-2 lg:-mx-3',
});
