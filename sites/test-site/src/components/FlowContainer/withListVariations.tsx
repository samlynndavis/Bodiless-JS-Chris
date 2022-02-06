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
import {
  withTitle,
  withDesc,
} from '@bodiless/layouts';
import {
  varyDesign,
  replaceWith,
  withDesign,
  flowHoc,
} from '@bodiless/fclasses';

import ChameleonListDemo from '../../data/pages/list2/ChameleonListDemo';
import { withType } from './Categories';

const listVariations = {
  ChameleonList: flowHoc(
    replaceWith(ChameleonListDemo),
    withType('List')(),
    withTitle('Chameleon LIst'),
    withDesc('Multi-level list with choice between bullets and numbers.\n'),
  ),
};

export default withDesign(varyDesign(
  listVariations,
)());
