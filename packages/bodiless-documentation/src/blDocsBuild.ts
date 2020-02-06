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
import path from 'path';
import { flow } from 'lodash';
import fs from 'fs-extra';
// import cleanSymlinks from './cleanSymlinks';
import locateFiles from './locateFiles';
import { withTreeFromFile } from './tree';
import writeSymlinksFromTree from './writeSymlinksFromTree';
import { writeSideBars, writeNavBar } from './createBar';
import defaultToc from './defaultToc';
import { Tree } from './type';

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
  const docPath = './doc';
  let toc: any;
  try {
    const tocPath = path.resolve('./bodiless.docs.toc.js');
    // eslint-disable-next-line global-require
    toc = require(tocPath).default(); // eslint-disable-line import/no-dynamic-require
  } catch (e) {
    console.warn('No local TOC. Falling back on bodiless default.');
    toc = defaultToc();
  }

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

  // Then the tres are combined into a single tree with the nameSpace as the top level folder.
  // const updates = nameSpaces.map(
  //   (nameSpace, i) => {
  //     //console.log(nameSpace, pathsList[i]);
  //     console.log(prependPath(nameSpace)(pathsList[i]));
  //     return withTree(prependPath(nameSpace)(pathsList[i]));
  //   },
  // );
  const paths: Tree = nameSpaces.reduce(
    (acc, nameSpace, i) => ({ ...acc, [nameSpace]: pathsList[i] }),
    {},
  );
  // const paths: Tree = flow(updates)({});

  // Now we use the tree we created above to write symlinks, sidebar and navbar.
  console.log('Writing symlinks');
  try {
    await writeSymlinksFromTree({
      paths,
      loc: docPath,
    });
  } catch (error) {
    console.log(error.name, 'writing symlinks');
  }
  console.log('Writing sidebars');
  try {
    await writeSideBars(docPath, paths);
  } catch (error) {
    console.log(error.name, 'writing sidebars');
  }
  console.log('Writing navbar');
  try {
    await writeNavBar(docPath, paths);
  } catch (error) {
    console.log(error.name, 'writing navbar');
  }
  console.log('Done');
};
export default blDocsBuild;
