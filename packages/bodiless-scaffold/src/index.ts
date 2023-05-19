import { Plop, run } from 'plop';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const dir = dirname(fileURLToPath(import.meta.url));

const cwd = process.cwd();
const configPath = join(dir, 'plopFile.js');
const preload = process.env.PLOP_PRELOAD || '';
const completion = process.env.PLOP_COMPLETION || '';

// @todo: remove debug
//
// console.log(
//   'cwd',
//   cwd,
//   'configPath',
//   configPath,
//   'preload',
//   preload,
//   'completion',
//   completion,
// );

const execute = (env: any) => {
  Plop.prepare(
    {
      cwd,
      configPath,
      preload: preload || [],
      completion,
    },
    (env) => {
      const options = {
        ...env,
        dest: cwd,
      };
      run(options, undefined, true);
    },
  );
};

// execute({});

export { execute };
