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

import React, { FC, useEffect } from 'react';
import { designable, A, Div } from '@bodiless/fclasses';
import { CuratorComponents, CuratorProps } from './types';
import withCuratorLoader from './CuratorLoader';

const CuratorComponentsStart: CuratorComponents = {
  Wrapper: Div,
  Content: Div,
};

const CuratorBase: FC<CuratorProps> = ({
  components,
}) => {
  const { Wrapper, Content } = components;

  const script = `(function(){
    var i, e, d = document, s = "script";i = d.createElement("script");i.async = 1;
    i.src = "https://cdn.curator.io/published/b59be9ca-afe7-47cf-9199-c2123491ca41.js";
    e = d.getElementsByTagName(s)[0];e.parentNode.insertBefore(i, e);
    })();`;
  const scriptId = 'curator-feed-default-feed-layout';

  useEffect(() => {
    withCuratorLoader(script, scriptId);
  });

  return (
    <Wrapper>
      <Content>
        <>
          <Div id={scriptId}>
            <A href="https://curator.io" target="_blank" className="crt-logo crt-tag">Powered by Curator.io</A>
          </Div>
        </>
      </Content>
    </Wrapper>
  );
};

const CuratorClean = designable(CuratorComponentsStart, 'Curator')(CuratorBase);

export {
  CuratorBase,
  CuratorClean,
};
