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

import { withDefaultContent, withResetButton } from '@bodiless/core';
import type { DefaultNodeContent } from '@bodiless/core';
import { flowHoc } from '@bodiless/fclasses';
import identity from 'lodash/identity';
import type { AsBodilessImage, Data } from './Image';

/**
 * Adds default content to an asEditableImage hoc
 */
const withDefaultImageContent = (
  asEditableImage: AsBodilessImage,
) => <D extends {} = Data>(nodeContent: DefaultNodeContent<D>): AsBodilessImage => (
  nodeKey,
  placeholder,
  useOverrides,
) => {
  const asImageHoc = asEditableImage(nodeKey, placeholder, useOverrides);
  return flowHoc(
    asImageHoc.meta,
    flowHoc.meta.term('Category')('Contentful'),
    asImageHoc,
    typeof nodeKey === 'string' ? withDefaultContent({
      [nodeKey]: nodeContent,
    }) : identity,
    withResetButton(nodeKey),
  );
};

export default withDefaultImageContent;
