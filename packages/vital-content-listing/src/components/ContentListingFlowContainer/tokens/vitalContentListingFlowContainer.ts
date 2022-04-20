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

import omit from 'lodash/omit';
import { Img, on } from '@bodiless/fclasses';
import { asFilterableByGroup } from '@bodiless/filtering';
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalFlowContainer } from '@bodiless/vital-flowcontainer';
import { vitalImage } from '@bodiless/vital-image';
import { withNodeKey } from '@bodiless/core';

const Default = asFluidToken({
  ...omit(vitalFlowContainer.Base, 'Spacing'),
  Core: {
    ComponentWrapper: asFilterableByGroup(),
  },
  Components: {
    // @TODO: Replace with cards once vital-cards has been implemented.
    FilterableContentImageVariations: on(Img)(
      vitalImage.WithEditorPlain,
      vitalImage.WithLink,
      // Needs to provide key since WinLink invalidates default one.
      withNodeKey('image'),
    ),
  },
  Layout: {
    ComponentWrapper: 'flex flex-shrink',
  },
  Spacing: {
    ComponentWrapper: 'p-3',
    Wrapper: '-m-3',
  },
});

export default {
  Default,
};
