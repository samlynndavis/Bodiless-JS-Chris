import fs from 'fs';
import { getSemanticColors, getComponentColors, writeComponentTokens } from './parseTokens/parseV2J';
import { Brands } from './parseTokens/types';
import { readData, writeTokenCollection } from './parseTokens/util';

export const main = async () => {
  const brand = process.argv[2] || Brands.Kenvue;
  const data = await readData();
  const semantic = getSemanticColors(data, brand);
  const promises: Promise<any>[] = [];
  promises.push(writeTokenCollection({
    group: 'Color',
    tokens: semantic,
  }));
  const tokens = getComponentColors(data, brand);
  promises.push(writeComponentTokens(tokens));
  promises.push(fs.promises.writeFile('./src/generated/semantic.ts',
    `import vitalColor from './vitalColor';

export { vitalColor };
`));
  await Promise.all(promises);
};

main();
