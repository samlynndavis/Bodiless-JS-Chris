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

import { on } from '@bodiless/fclasses';
import { asElementToken } from '@bodiless/cx-elements';
import { GenericTemplateClean, cxPage } from '@bodiless/cx-templates';
import { __cxstarter__GenericTemplate } from '../../GenericTemplate';

const Default = asElementToken({
  ...cxPage.Default,
  Components: {
    // @todo fix Type error
    _default: on(GenericTemplateClean)(__cxstarter__GenericTemplate.cxGenericTestStyleGuide),
  },
});

export default {
  ...cxPage,
  Default,
};
