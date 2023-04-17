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

import React from 'react';
import type { FC, ComponentProps } from 'react';
import type { Enhancer, DesignableProps } from '@bodiless/fclasses';
import StackbitPage from '@bodiless/gatsby-theme-bodiless/dist/StackbitPage.bl-edit';

export type PageProps = DesignableProps & ComponentProps<typeof StackbitPage>;

export const asBodilessPage: Enhancer<PageProps, DesignableProps<any>> = Component => {
  const AsBodilessPage: FC<any> = (props: PageProps) => {
    const { design, ...rest } = props;
    const designProp: any = { design };
    return (
      <StackbitPage {...rest}>
        <Component {...designProp} />
      </StackbitPage>
    );
  };
  return AsBodilessPage;
};
