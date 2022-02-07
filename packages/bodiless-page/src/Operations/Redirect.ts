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
  convertAliasJsonToText,
  convertAliasTextToJson,
  useGetRedirectAliases,
} from '@bodiless/components';
import { ContentNode } from '@bodiless/core';

const createRedirect = (node: ContentNode<object>, origin: string, destination: string) => {
  const initialAliases = convertAliasJsonToText(useGetRedirectAliases(node));
  const aliases = `${initialAliases}\n${origin} ${destination} 301`;

  // Saves json file.
  node.setData(convertAliasTextToJson(aliases as string));
};

export default createRedirect;
