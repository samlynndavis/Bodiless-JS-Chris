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
import {
  vitalMetaHelmetBase,
  // WithHtml,
  // WithHomePageSchemas,
  // WithPageDescription,
  // WithPageTitle,
  // WithSeoForm,
  WithShareForm,
  WithShareDescription,
  WithShareImage,
  WithShareTitle,
  WithShareType,
  WithShareUrl,
  WithSiteName,
  WithTwitterCard,
  WithTwitterTitle,
  WithUTMCampaign,
  WithUTMContent
} from '@bodiless/vital-meta';
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

/*
 * SHADOWTODO I think there order problem as this didn't work.
 * Recomposing the whole thing worked.
*/
const SEO = asElementToken({
  Compose: {
    ...vitalMetaHelmetBase.SEO.Compose,
    WithMetaKeywords,
  },
});

// const SEO = asElementToken({
//   Compose: {
//     WithHtml,
//     WithHomePageSchemas,
//     WithMetaKeywords, // Added
//     WithPageDescription,
//     WithPageTitle,
//     WithSeoForm,
//   },
// });

const WithTwitterDescription = asSimpleToken(withMeta({
  name: 'twitter:description', label: 'Twitter Description',
})('twitter-description'));

const Share = asElementToken({
  Compose: {
    WithUTMCampaign,
    WithSiteName,
    WithTwitterCard,
    WithShareType,
    WithTwitterDescription, // Added
    WithTwitterTitle,
    WithUTMContent,
    WithShareDescription,
    WithShareUrl,
    WithShareImage,
    WithShareTitle,
    WithShareForm,
  },
});

export default {
  ...vitalMetaHelmetBase,
  SEO,
  Share,
};
