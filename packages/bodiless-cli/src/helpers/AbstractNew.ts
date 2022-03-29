/**
 * Copyright © 2020 Johnson & Johnson
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

import { flags as commandFlags } from '@oclif/command';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs-extra';
import * as tar from 'tar';
import * as inquirer from 'inquirer';
import { v1 } from 'uuid';
import { SpawnOptions } from 'child_process';
import Wizard, { Flags, WizardOptions } from './Wizard';
import Spawner from './Spawner';
import { listVersionsSync, listBranchesSync } from './git';
import { recursiveRename } from './recursiveRename';

const replaceInFile = require('replace-in-file');
const findGitRoot = require('find-git-root');
const ora = require('ora');

const NO_TEMPLATE = '*** NONE';

const abstractNewFlags: Flags<AbstractNewOptions> = {
  ...Wizard.flags,

  name: {
    ...commandFlags.string({
      description: 'Name of the new site',
      char: 'n',
      parse: d => d.trim(),
    }),
    validator: s => s && s.trim().length > 0,
  },

  dest: {
    ...commandFlags.string({
      description: 'Path to the directory where the new site will be created.',
      char: 'd',
      parse: d => {
        const d$ = d.trim();
        return d$.charAt(0) === '~'
          ? path.join(os.homedir(), d$.substr(1))
          : path.resolve(d$);
      },
    }),
    validator: (arg: string) => {
      if (!arg) return 'Desitination is required';
      if (fs.existsSync(arg)) return 'Destination already exists';
      return true;
    },
  },

  url: {
    ...commandFlags.string({
      description: 'Url of remote git repository to clone (omit to use current local directory)',
      char: 'u',
      parse: r => (r || '').trim(),
    }),
    validator: r => r !== undefined,
  },

  revision: {
    ...commandFlags.string({
      description: 'Revision of source monorepo on which new site will be based',
      char: 'r',
      parse: d => d.trim(),
    }),
  },

  'site-template': commandFlags.string({
    char: 's',
    parse: d => d.trim(),
    description: 'Name of the starter site to copy',
  }),

  'sites-dir': {
    ...commandFlags.string({
      description: 'Directory in source monorepo containg sites',
      parse: d => d.trim(),
      default: 'sites',
    }),
    prompt: false,
  },

  'package-template': commandFlags.string({
    description: 'Name of the starter package to copy',
    char: 'p',
    parse: d => d.trim(),
  }),

  'packages-dir': {
    ...commandFlags.string({
      parse: d => d.trim(),
      description: 'Directory in source monorepo containg packages',
      default: 'packages',
    }),
    prompt: false,
  },

  setup: {
    ...commandFlags.string({
      description: 'Name of setup script',
      default: 'setup',
      parse: d => d.trim(),
    }),
    prompt: false,
  },

  'no-setup': {
    ...commandFlags.boolean({
      description: 'Skip npm setup',
    }),
    validator: () => true,
    prompt: false,
  },

  namespace: {
    ...commandFlags.string({
      description: 'NPM Namespace for starter package',
      parse: d => {
        const d$ = d.trim();
        if (d$.length > 0) return `@${d$}/`;
        return '';
      },
    }),
    default: NO_TEMPLATE,
    prompt: false,
    validator: () => true,
  },
};

export type AbstractNewOptions = WizardOptions & {
  name: string,
  dest: string,
  url: string,
  revision: string,
  'sites-dir': string,
  'site-template': string,
  'packages-dir': string,
  'package-template': string,
  'namespace': string,
  setup: string,
  'no-setup': boolean,
};

abstract class AbstractNew<O extends AbstractNewOptions> extends Wizard<O> {
  static flags: any = abstractNewFlags;

  // eslint-disable-next-line class-methods-use-this
  getFlagDefs() { return abstractNewFlags as Flags<O>; }

  async replaceTemplatePackageName() {
    const jsTemplateName = await this.getArg('package-template');
    if (jsTemplateName === NO_TEMPLATE) return Promise.resolve();
    const pkgTemplateName = jsTemplateName.replace(/_/g, '-');
    const packagesDir = await this.getArg('packages-dir');
    const sitesDir = await this.getArg('sites-dir');
    const name = await this.getArg('name');
    const newName = await this.getArg('name');
    const newTokenName = newName.replace(/-([a-z])/g, g => g[1].toUpperCase());
    const ns = await this.getNamespace();
    const cwd = path.resolve(await this.getArg('dest'));
    console.log('ptn', pkgTemplateName, cwd);
    const commonOptions = {
      cwd,
      files: [
        `${cwd}/**/*.ts`,
        `${cwd}/**/*.tsx`,
        `${cwd}/**/*.js`,
        `${cwd}/**/*.jsx`,
        `${cwd}/**/*.json`,
      ],
      ignore: [
        `${cwd}/package-lock.json`,
      ],
      allowEmptyPaths: true,
    };
    // First replace imports with the package name. We do this synchronously so that
    // all matches are replaced before replacing the token names.
    const conf1 = {
      ...commonOptions,
      from: new RegExp(pkgTemplateName, 'g'),
      to: `${ns}${newName}`,
    };
    await replaceInFile(conf1);
    // Now replace token names.
    const conf2 = {
      ...commonOptions,
      from: new RegExp(jsTemplateName, 'g'),
      to: newTokenName,
    };
    // And site name in READMEs
    const conf3 = {
      ...commonOptions,
      files: [
        `${cwd}/README.md`,
        `${cwd}/${packagesDir}/${name}/README.md`,
        `${cwd}/${sitesDir}/${name}/site-docs/About/AboutThisSite.md`,
      ].filter(f => fs.existsSync(f)),
      from: new RegExp(jsTemplateName, 'g'),
      to: newName,
    };
    return Promise.all([replaceInFile(conf2), replaceInFile(conf3)]);
  }

  async cloneSourceRepo(): Promise<string> {
    const url = await this.getArg('url');
    if (url?.length === 0) {
      const repo = findGitRoot(process.cwd());
      return repo;
    }

    const tmpDir = path.resolve(os.tmpdir(), v1());
    const spawner = new Spawner();
    if (!await this.getArg('verbose', false)) {
      (spawner.options as SpawnOptions).stdio = ['ignore', 'ignore', 'ignore'];
    }
    const spinner = ora(`Cloning ${url}...`).start();
    await spawner.spawn('git', 'clone', url as string, tmpDir);
    spinner.stop();
    return tmpDir;
  }

  async getRevision(repo: string): Promise<string> {
    const versions = listVersionsSync(repo);
    const choices = [];
    if (versions.length) choices.push(`${versions[0]} (latest)`);
    choices.push('HEAD (unstable)');
    if (versions.length > 1) choices.push(...versions.slice(1));
    choices.push(...listBranchesSync(repo));
    const rev = await this.getArg('revision', {
      type: 'list',
      choices,
      loop: false,
    } as inquirer.ListQuestion<any>);
    // Remove any extra text added to the rev in the choices list.
    return Promise.resolve(rev.split(' ')[0]);
  }

  async clone() {
    const repo = await this.cloneSourceRepo();
    const rev = await this.getRevision(repo);
    const dest = await this.getArg('dest');
    const tmpFile = path.resolve(os.tmpdir(), v1());
    const spawner = new Spawner();
    spawner.options.cwd = repo;
    await Promise.all([
      spawner.spawn('git', 'archive', rev, '--output', tmpFile),
      fs.mkdirp(dest),
    ]);
    return tar.x({
      file: tmpFile,
      cwd: dest,
    });
  }

  async cleanSites(type: 'site'|'package' = 'site') {
    const directory = await this.getArg('dest');
    const sitesDirName = await this.getArg(type === 'site' ? 'sites-dir' : 'packages-dir');
    const sitesDir = path.resolve(directory, sitesDirName);
    const sites = fs.readdirSync(sitesDir)
      .map(n => path.join(sitesDir, n))
      .filter(p => fs.lstatSync(p).isDirectory())
      .map(n => path.basename(n));

    const templateFlag = type === 'site' ? 'site-template' : 'package-template';
    const {
      default: defaultTemplateName,
      prompt: defaultPrompt,
    } = this.getFlagDefs()[templateFlag];
    const choices = !sites.includes(defaultTemplateName)
      ? [NO_TEMPLATE, ...sites]
      : [defaultTemplateName, ...sites.filter(s => s !== defaultTemplateName), NO_TEMPLATE];
    const prompt = defaultPrompt !== false && {
      type: 'list',
      choices,
      loop: false,
    } as inquirer.ListQuestion;
    const template = await this.getArg(templateFlag, prompt);
    const promises = sites.filter(s => s !== template)
      .map(s => path.join(sitesDir, s))
      .map(s => fs.remove(s)) as Promise<any>[];
    if (template !== NO_TEMPLATE) {
      const name = await this.getArg('name');
      await fs.rename(path.join(sitesDir, template), path.join(sitesDir, name));
      promises.push(recursiveRename({
        rootPath: path.join(sitesDir, name),
        search: template,
        replace: name,
        exclude: pathName => /node_modules/.test(pathName) || /lib/.test(pathName),
      }));
    }
    return promises;
  }

  async updatePackageJson(type: 'root'|'site'|'package') {
    const rootDir = await this.getArg('dest');
    const name = await this.getArg('name');
    const sitesDir = await this.getArg('sites-dir');
    const packagesDir = await this.getArg('packages-dir');
    const dir = type === 'site' ? sitesDir : packagesDir;
    const file = type === 'root'
      ? path.join(rootDir, 'package.json')
      : path.join(rootDir, dir, name, 'package.json');
    const packageName = await this.getPackageName();
    const siteName = `@sites/${name}`;
    const template$ = await this.getArg(type === 'site' ? 'site-template' : 'package-template');
    if (template$ === NO_TEMPLATE) return Promise.resolve();
    const template = template$.replace(/_/g, '-');
    const json = await fs.readFile(file);
    const data = JSON.parse(json.toString());
    if (type === 'root') {
      data.name = `${name}-monorepo`;
      data.scripts.start = `lerna run start --stream --scope ${siteName}`;
      data.scripts.serve = `lerna run serve --stream --scope ${siteName}`;
      data.scripts.docs = `lerna run build:doc --stream --scope ${siteName} && docsify serve ./${sitesDir}/${name}/doc`;
    } else if (type === 'site') {
      data.name = siteName;
      // Find the old dependency on the template package (if any) and delete it.
      const key = Object.keys(data.dependencies).find(k => new RegExp(template).test(k));
      if (key) delete data.dependencies[key];
      data.dependencies[packageName] = '^0.0.0';
    } else {
      data.name = packageName;
    }
    data.description = '';
    data.author = '';
    data.version = '0.0.0';
    return fs.writeFile(file, JSON.stringify(data, undefined, 2));
  }

  async getNamespace(): Promise<string> {
    const ns = await this.getArg('namespace');
    return (ns === NO_TEMPLATE) ? '' : ns;
  }

  async getPackageName(): Promise<string> {
    const ns = await this.getNamespace();
    const name = await this.getArg('name');
    return `${ns}${name}`;
  }

  async updateTsConfig() {
    const template = await this.getArg('package-template');
    if (template === NO_TEMPLATE) return Promise.resolve();
    const dest = await this.getArg('dest');
    const packagesDir = await this.getArg('packages-dir');
    const file = path.join(dest, 'tsconfig.settings.json');
    if (!fs.existsSync(file)) return Promise.resolve();
    const json = await fs.readFile(file);
    const data = JSON.parse(json.toString());
    const name = await this.getArg('name');
    const pathName = path.join(packagesDir, name, 'src');
    const packageName = await this.getPackageName();
    data.compilerOptions.paths = {
      [packageName]: [pathName],
    };
    return fs.writeFile(file, JSON.stringify(data, undefined, 2));
  }

  async cleanMisc() {
    const dest = await this.getArg('dest');
    const packagesDir = await this.getArg('sites-dir');
    const sitesDir = await this.getArg('sites-dir');
    const name = await this.getArg('name');
    const files = [
      path.join(dest, 'jenkins'),
      path.join(dest, 'cypress'),
      path.join(dest, 'github'),
      // remove the starter eslintrcs.  They exist only to disable
      // rules which flag the underscores in the __starter__ template.
      path.join(dest, packagesDir, name, 'eslintrc.js'),
      path.join(dest, sitesDir, name, 'eslintrc.js'),
    ];
    return Promise.all(files.map(f => fs.remove(f)));
  }

  async moveReadMe() {
    const dest = await this.getArg('dest');
    const sitesDir = await this.getArg('sites-dir');
    const name = await this.getArg('name');
    const source = path.join(dest, sitesDir, name, 'README.md');
    const target = path.join(dest, 'README.md');
    try {
      fs.removeSync(target);
    // eslint-disable-next-line no-empty
    } catch (e) {}
    if (!fs.existsSync(source)) {
      return fs.writeFile(target, `# ${name}`);
    }
    return fs.move(source, target, { overwrite: true });
  }

  // eslint-disable-next-line class-methods-use-this
  async validate() {
    const v = process.version;
    if (!v.match(/^v16\./)) {
      throw new Error(`Unsupported node version: ${v}.  Must be v16.x`);
    }
  }

  async clean() {
    await this.cleanSites('site');
    await this.cleanSites('package');
    await this.cleanMisc();
    await this.updatePackageJson('root');
    await this.updatePackageJson('site');
    await this.updatePackageJson('package');
    await this.updateTsConfig();
    await this.moveReadMe();
    await this.replaceTemplatePackageName();
  }

  async setup() {
    this.log('Initializing new repository...');
    const dest = await this.getArg('dest');
    const spawner = new Spawner();
    spawner.options.cwd = dest;
    await spawner.spawn('git', 'init');
    await spawner.spawn('git', 'add', '.');
    await spawner.spawn('git', 'commit', '-m', '"Initial Commit"');
    if (await this.getArg('no-setup')) return Promise.resolve();
    const setup = await this.getArg('setup');
    const command = setup === 'install' ? ['npm', 'install'] : ['npm', 'run', 'setup'];
    this.log(`Running ${setup}...`);
    return spawner.spawn(...command);
  }

  async run() {
    try {
      // await this.loadProfile();
      await this.validate();
      await this.clone();
      await this.clean();
      await this.setup();
    } catch (e) {
      this.error(e as Error);
    }
  }
}

export default AbstractNew;
