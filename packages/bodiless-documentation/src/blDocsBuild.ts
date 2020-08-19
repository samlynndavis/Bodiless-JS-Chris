#!/usr/bin/env node
/**
 * Copyright © 2019 Johnson & Johnson
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

/* eslint-disable no-console */
import { flow } from 'lodash';
import fs from 'fs-extra';
// import cleanSymlinks from './cleanSymlinks';
import locateFiles from './locateFiles';
import { withTreeFromFile, getSimplePaths, validatePaths } from './tree';
import {
  writeTree, writeResources, copyFile, symlinkFile,
} from './write';
import { writeSideBars } from './createBar';
import { Tree } from './type';
import readSettings from './readSettings';
import buildApiDoc, { updateNavigation as apiDocUpdateNavigation } from './blApiDocsBuild';

const buildSubTree = async (toc: any, namespace: string) => {
  // We start by using locateFiles and withTreeFromFile to build up an array of TreeHO and
  // at the same time we clean up the symlinks
  const updates = await locateFiles({
    filePattern: new RegExp(`${namespace}.docs.json$`),
    // filePattern: /docs.json$/,
    startingRoot: './',
    action: withTreeFromFile,
  });
  const paths = flow(updates)(toc) as Tree;
  return paths;
};

const blDocsBuild = async () => {
  const copier = process.env.BODILESS_DOCS_COPYFILES ? copyFile : symlinkFile;
  const docPath = './doc';
  const { toc } = readSettings();

  console.log('Building documentation tree');
  // The top level keys of the toc are namespaces defining which docs.json files to parse.
  // All packages are scanned for files matching `${namespace}.docs.json` - and a tree is
  // created for each namespace.
  const nameSpaces = Object.getOwnPropertyNames(toc);
  const buildPromises = nameSpaces.map(ns => buildSubTree(toc[ns], ns));
  const pathsList = await Promise.all([
    ...buildPromises,
    // Need to cast this to preserve type of pathsList. We are discarding the last value anyway.
    fs.emptyDir(docPath) as any as Promise<Tree>,
  ]);
  const paths: Tree = nameSpaces.reduce(
    (acc, nameSpace, i) => (i === 0 ? acc : { ...acc, [nameSpace]: pathsList[i] }),
    pathsList[0],
  );

  // Validate the paths for letter-case typos.
  validatePaths(getSimplePaths(paths));

  // Now we use the tree we created above to write symlinks, sidebar and navbar.
  console.log('Writing symlinks');
  try {
    await writeTree({
      paths,
      loc: docPath,
    }, copier);
  } catch (error) {
    console.warn('Error writing symlinks', error);
  }

  // Let api doc builder to update navigation links in runtime
  const navigationPaths = apiDocUpdateNavigation(docPath, paths);

  try {
    await writeSideBars(docPath, navigationPaths);
  } catch (error) {
    console.warn('Error writing sidebars', error);
  }

  console.log('Writing resources');
  try {
    await writeResources(docPath, copier);
  } catch (error) {
    console.warn('Error writing resources', error);
  }
  console.log('Building API docs');
  try {
    await buildApiDoc({ targetDocPath: docPath, copier });
  } catch (error) {
    console.warn('Error building API docs', error);
  }
  console.log('Done');
};
export default blDocsBuild;
