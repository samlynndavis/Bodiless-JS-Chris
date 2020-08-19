/**
 * Copyright © 2020 Johnson & Johnson
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

import { flow } from 'lodash';
import {
  withTitle,
  withDesc,
} from '@bodiless/layouts';
import {
  replaceWith,
  withDesign,
} from '@bodiless/fclasses';
import { withType } from './Categories';
import { WantToLearnMore, GivingBackToCommunity } from '../Contentful/Tout';
import { withOrientationFacet, withStructureFacet } from './withToutVariations';

const contentfulTouts = {
  GivingBackToCommunity: flow(
    replaceWith(GivingBackToCommunity),
    withType('Contentful')(),
    withType('Tout')(),
    withOrientationFacet('Horizontal')(),
    withStructureFacet('With Title and Body')(),
    withStructureFacet('With CTA')(),
    withTitle('Giving Back To Community'),
    withDesc('Custom content for community campaign.'),
  ),
  WantToLearnMore: flow(
    replaceWith(WantToLearnMore),
    withType('Contentful')(),
    withType('Tout')(),
    withOrientationFacet('Horizontal')(),
    withStructureFacet('With Title and Body')(),
    withStructureFacet('With CTA')(),
    withTitle('Want To Learn More?'),
    withDesc('Custom content for doc campaign.'),
  ),
};

export default withDesign(contentfulTouts);
