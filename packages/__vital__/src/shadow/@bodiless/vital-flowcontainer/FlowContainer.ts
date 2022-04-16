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

import { asFluidToken } from '@bodiless/vital-elements';
import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer';
import { addProps } from '@bodiless/fclasses';

class __vital__FlowContainer extends vitalFlowContainerBase {
  constructor() {
    super();
    this.Default = asFluidToken(
      this.Default,
      {
        Content: {
          Wrapper: addProps({ 'data-shadowed-by': '__vital__FlowContainer' }),
        }
      },
    );
  }
}

export default new __vital__FlowContainer();
