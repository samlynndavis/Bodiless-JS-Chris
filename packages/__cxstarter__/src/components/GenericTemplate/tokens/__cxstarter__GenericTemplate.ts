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

import {
  cxGenericTemplate,
  asGenericTemplateToken,
} from '@bodiless/cx-templates';
import { as } from '@bodiless/fclasses';
import { __cxstarter__Layout } from '../../Layout';
import { __cxstarter__FlowContainer } from '../../FlowContainer';
import { StyleGuide } from './Styleguide';

const Default = asGenericTemplateToken({
  ...cxGenericTemplate.Default,
  Components: {
    ...cxGenericTemplate.Default.Components,
    PageWrapper: as(__cxstarter__Layout.Default),
    // TopContent: as(__cxstarter__FlowContainer.Default),
    // Content: as(__cxstarter__FlowContainer.Default),
    // BottomContent: as(__cxstarter__FlowContainer.Default),
  },
  Meta: { title: 'Default' },
});

export default {
  ...cxGenericTemplate,
  Default,
  StyleGuide,
};
