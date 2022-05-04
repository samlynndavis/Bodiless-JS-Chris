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

import { withMeta } from '@bodiless/components';
import { asElementToken } from '@bodiless/vital-elements';
import { vitalMetaHelmetBase } from '@bodiless/vital-meta';
import { Token, as } from '@bodiless/fclasses';

const asSimpleToken = (...tokens: Token[]) => asElementToken({
  Core: {
    _: Array.isArray(tokens) ? as(...tokens) : tokens,
  },
});

const WithMetaKeywords = asSimpleToken(withMeta({
  name: 'keywords',
  label: 'Keywords',
  placeholder: 'No more than 10 keyword phrases',
})('page-keywords'));

// Not rendering over the SEO form.
const SEO = asElementToken({
  ...vitalMetaHelmetBase.SEO,
  Compose: {
    ...vitalMetaHelmetBase.SEO.Compose,
    WithMetaKeywords,
  },
});

export default {
  ...vitalMetaHelmetBase,
  SEO,
};
