/* eslint-disable no-console */
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
import pathUtil from 'path';
import fs from 'fs';
import { ensureDirSync } from 'fs-extra';
import locateFiles from './locateFiles';
import type { Copier } from './write';
import { Tree } from './type';

require('dotenv').config({ path: '.env.site' });

// determine if api doc generation is enabled
// when enabled, api doc files are copied to doc server and a link is added to navigation bar.
const isEnabled = () => process.env.BODILESS_DOCS_API_ENABLED === '1';
// directory that contains api docs of a package.
const API_DOC_PACKAGE_PATH = 'doc/api';
// path of the doc server that stores documentation
const API_DOC_DOCSERVER_PATH = '/Development/API';
// name of index file from typedoc
const API_DOC_INDEX_FILE_NAME = 'README';

/**
 * adds API link to the navigation tree.
 */
const updateNavigation = (docPath: string, paths: Tree) => {
  const paths$1 = paths;
  if (paths$1.Development !== undefined) {
    // we need to ensure target directory exists
    // otherwise an error will be thrown during navbar creation
    ensureDirSync(pathUtil.join(docPath, API_DOC_DOCSERVER_PATH));
    // adds an api link to the tree
    (paths$1.Development as Tree).API = {
      'README.md': 'README.md',
    };
  }
  return paths$1;
};

/**
 * reads package.json and returns name of the package
 * returns undefined if package.json does not exist or if there is a file parsing error
 * @param packageJsonPath path to package.json.
 */
const getPackageNameFromPackageJson = (packageJsonPath: string): string | undefined => {
  let packageName;
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageName = packageJson.name;
  } catch {
    console.log(`Error reading package.json from ${packageJsonPath}`);
  }
  return packageName;
};

/**
 * finds all packages containing api docs.
 */
const findApiDocPaths = async () => locateFiles({
  // assuming globals.md is a documentation index file generated by doc generator.
  filePattern: new RegExp(`${API_DOC_PACKAGE_PATH}/${API_DOC_INDEX_FILE_NAME}.md$`),
  // filePattern: /docs.json$/,
  startingRoot: './',
  action: filePath => {
    console.log(filePath);
    // filePath is a path to index file, navigating up to get api doc root.
    const apiDocPath = pathUtil.resolve(filePath, '..');
    // determine based on settings how many levels should we navigate up to get package path.
    const resolveTo = new Array(API_DOC_PACKAGE_PATH.split('/').length).fill('..').join('/');
    const packagePath = pathUtil.resolve(apiDocPath, resolveTo);
    const packageNameFromPackageJson = getPackageNameFromPackageJson(pathUtil.resolve(packagePath, 'package.json'));
    const packageName = packageNameFromPackageJson || pathUtil.basename(packagePath);
    return Promise.resolve({
      [packageName]: apiDocPath,
    });
  },
});

type Props = {
  copier: Copier;
  targetDocPath: string;
};
type Paths = {
  [key: string]: string;
};

const copyApiDocs = async ({ paths, targetDocPath, copier }: Props & { paths: Paths }) => {
  const promises = [] as Promise<any>[];
  Object.keys(paths).forEach((packageName: any) => {
    const apiDocPath = paths[packageName];
    const targetPath = pathUtil.join(targetDocPath, API_DOC_DOCSERVER_PATH, packageName);
    ensureDirSync(pathUtil.dirname(targetPath));
    promises.push(copier(apiDocPath, targetPath));
  });
  return Promise.all(promises);
};

/**
 * Copies API docs to doc server.
 * Generates index page and navigation bar for API docs.
 */
const buildApiDoc = async (props: Props) => {
  if (!isEnabled()) {
    console.warn('API doc build is disabled. Set BODILESS_DOCS_API_ENABLED environment variable to "1" to enable it');
  }
  const { copier, targetDocPath } = props;
  const paths = await findApiDocPaths();
  // combine array of objects into one object
  const paths$1 = paths.reduce((prevVal, curVal) => ({ ...prevVal, ...curVal }), {});

  // copying docs to doc server
  await copyApiDocs({ copier, targetDocPath, paths: paths$1 });

  // generating navigation links
  const APINavBarContent = Object.keys(paths$1)
    .map(pkg => `* [${pkg}](${API_DOC_DOCSERVER_PATH}/${pkg}/${API_DOC_INDEX_FILE_NAME})`)
    .join('\n');

  // writing sidebar
  const sideBarPath = pathUtil.join(targetDocPath, API_DOC_DOCSERVER_PATH, '_sidebar.md');
  fs.writeFileSync(sideBarPath, APINavBarContent);

  // writing index file
  const indexFilePath = pathUtil.join(targetDocPath, API_DOC_DOCSERVER_PATH, 'README.md');
  fs.writeFileSync(indexFilePath, APINavBarContent);
};

export default buildApiDoc;
export { updateNavigation };
