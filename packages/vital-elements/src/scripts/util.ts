import fs from 'fs';
import path from 'path';
import { Data, Variable } from './types';

export const readData = async (): Promise<Data> => {
  const file = process.env.VITAL_TOKENS_JSON || './assets/vital-tokens.json';
  const json = await fs.promises.readFile(file);
  return JSON.parse(json.toString());
};

export const findVariables = (data: Data, condition: (v: Variable) => boolean): Variable[] => {
  const result: Variable[] = [];
  data.collections.forEach(collection => {
    collection.modes.forEach(mode => {
      const vars = mode.variables.map(
        (v: Variable): Variable => ({ ...v, collection: collection.name, mode: mode.name })
      ).filter(v => condition(v));
      result.push(...vars);
    });
  });
  return result;
};

export const writeTokenCollection = async ({
  libraryName = 'vital',
  collectionPath = './src/generated',
  imports = {
    '../util': ['asTokenGroup']
  },
  group,
  tokens,
  type = 'Element',
}: {
  libraryName?: string,
  collectionPath?: string,
  imports?: Record<string, string[]>,
  group: string,
  type?: string
  tokens: Record<string, string>,
}) => {
  const finalName = `${libraryName || 'vital'}${group}`;
  const finalPath = path.join(collectionPath, `${finalName}.ts`);
  const entries = Object.entries(tokens).map(
    ([key, value]) => `  ${key}: ${value},`
  ).join('\n');

  const importString = Object.keys(imports).map(key => (
    `import { ${imports[key].join(', ')} } from '${key}';`
  )).join('\n');

  const content = `${importString}

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['${group}'],
  },
};

export default asTokenGroup(meta)({
${entries}
});
`;
  return fs.promises.writeFile(finalPath, content);
};
