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

import { flowRight } from 'lodash';
// import { withoutPointerEvents } from '@bodiless/components';
import {
  asBodilessComponent,
  // ifEditable,
  // ifEditable, withNode, withNodeKey,
} from '@bodiless/core';
import { addClasses, withDesign } from '@bodiless/fclasses';
import { useCuratorOptions } from './CuratorFormOptions';

const asBodilessCurator = asBodilessComponent({
  ...useCuratorOptions(),
  defaultData: {
    'feed-id': 'b59be9ca-afe7-47cf-9199-c2123491ca41',
    'container-id': 'curator-feed-default-feed-layout',
  },
});

const asCurator = flowRight(
  withDesign({
    Wrapper: addClasses('block'),
    Content: flowRight(
      // ifEditable(withoutPointerEvents),
      asBodilessCurator(),
    ),
  }),
);

export {
  asBodilessCurator,
  asCurator,
};
