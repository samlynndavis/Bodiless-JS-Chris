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
import { cxElement } from '@bodiless/cx-elements';
import { as } from '@bodiless/fclasses';
import { asHelmetToken } from './HelmetClean';

const Default = asHelmetToken({
  Components: {
    /*
    SeoHelmet: TBD,
    SocialShareHelmet: TBD,
    LanguageHelmet: TBD,
    GtmHelmet: TBD,
    */
  },
  Theme: {
    HTMLHelmet: as(
      cxElement.DMSans,
      cxElement.WithTextPrimaryBodyCopyColor,
      cxElement.WithNormal,
    ),
  }
});

export const cxHelmet = { Default };
