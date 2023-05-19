import type { Actions } from 'node-plop';

const defaultActions: Actions = [
  // {
  //   type: 'add',
  //   path:
  // '{{destinationPath}}/{{properCase componentName}}/src/{{componentName}}.tsx',
  //   templateFile: './templates/component/Clean.tsx.hbs',
  // },
  {
    type: 'add',
    path: '{{destinationPath}}/{{properCase componentName}}/src/index.ts',
    templateFile: './templates/component/index.ts.hbs',
  },
  {
    type: 'add',
    path: '{{destinationPath}}/{{properCase componentName}}/src/token/index.ts',
    templateFile: './templates/component/tokens/index.ts.hbs',
  },
  {
    type: 'add',
    path: '{{destinationPath}}/{{properCase componentName}}/src/token/{{camelCase libraryName}}{{properCase componentName}}.ts',
    templateFile: './templates/component/tokens/libraryComponent.ts.hbs',
  },
  {
    type: 'add',
    path: '{{destinationPath}}/{{properCase componentName}}/src/token/{{camelCase libraryName}}Base{{properCase componentName}}.ts',
    templateFile: './templates/component/tokens/libraryBaseComponent.ts.hbs',
  },
  {
    type: 'add',
    path: '{{destinationPath}}/{{properCase componentName}}/src/token/{{camelCase libraryName}}Variant1{{properCase componentName}}.ts',
    templateFile: './templates/component/tokens/libraryVariantComponent.ts.hbs',
  },
  {
    type: 'add',
    path: '{{destinationPath}}/{{properCase componentName}}/src/token/{{camelCase libraryName}}Variant2{{properCase componentName}}.ts',
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
      path: '{{destinationPath}}/{{properCase componentName}}/src/{{properCase componentName}}Clean.ts',
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
