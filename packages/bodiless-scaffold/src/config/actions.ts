/**
 * Copyright © 2023 Johnson & Johnson
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

import type { Actions } from 'node-plop';

const defaultActions: Actions = [
  {
    type: 'add',
    path: '{{destinationPath}}/{{properCase componentName}}/index.ts',
    templateFile: './templates/component/index.ts.hbs',
  },
  {
    type: 'add',
    path: '{{destinationPath}}/{{properCase componentName}}/token/index.ts',
    templateFile: './templates/component/tokens/index.ts.hbs',
  },
  {
    type: 'add',
    path: '{{destinationPath}}/{{properCase componentName}}/token/{{camelCase libraryName}}{{properCase componentName}}.ts',
    templateFile: './templates/component/tokens/libraryComponent.ts.hbs',
  },
  {
    type: 'add',
    path: '{{destinationPath}}/{{properCase componentName}}/token/{{camelCase libraryName}}Base{{properCase componentName}}.ts',
    templateFile: './templates/component/tokens/libraryBaseComponent.ts.hbs',
  },
  {
    type: 'add',
    path: '{{destinationPath}}/{{properCase componentName}}/token/{{camelCase libraryName}}Variant1{{properCase componentName}}.ts',
    templateFile: './templates/component/tokens/libraryVariantComponent.ts.hbs',
  },
  {
    type: 'add',
    path: '{{destinationPath}}/{{properCase componentName}}/token/{{camelCase libraryName}}Variant2{{properCase componentName}}.ts',
    templateFile: './templates/component/tokens/libraryVariantComponent.ts.hbs',
  },
];

const actions: Actions = (data) => {
  const actionsToRun = [...defaultActions];
  if (!data) return actionsToRun;
  const {
    tokensOnly = true,
    shadow = false,
    static: isStatic
  } = data;

  if (!tokensOnly) {
    actionsToRun.push({
      type: 'add',
      path: '{{destinationPath}}/{{properCase componentName}}/{{properCase componentName}}Clean.ts',
      templateFile: './templates/component/Clean.tsx.hbs',
    });
  }
  if (shadow) {
    actionsToRun.push({
      type: 'add',
      path: '{{shadowPath}}/{{sourcePackageName}}'
        + '/{{properCase componentName}}.ts',
      templateFile: './templates/shadow/component.ts.hbs',
    });
  }
  if (isStatic) {
    actionsToRun.push({
      type: 'add',
      path: '{{destinationPath}}/{{properCase componentName}}'
         + '/index.static.ts',
      templateFile: './templates/component/index.static.ts.hbs',
    });
  }
  return actionsToRun;
};

export default actions;
