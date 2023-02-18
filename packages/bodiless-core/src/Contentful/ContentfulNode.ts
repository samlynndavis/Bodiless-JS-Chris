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

/* eslint-disable max-len */

import union from 'lodash/union';
import { DefaultContentNode, Path } from '../ContentNode';
import type { ContentNode } from '../ContentNode';

/**
 * provides data for a particular default content key
 * can be used for merging default content data with a node data
 * @param node - content node of the type equal to node at the time withDefaultContent is invoked
 * @returns data of the node
 */
export type GetContentFrom<D extends object, E extends object = D> = (node: ContentNode<D>) => E;

/**
 * Type of an entry in a default content map. May be an object representing the
 * default content, or a function which receives the existing node and returns,
 * the content for that node (this allows merging actual content with default content.)
 */
export type DefaultNodeContent<D extends {} = any, E extends {} = D> = E|GetContentFrom<D, E>;

/**
 * Type of default content which should be supplied to `withDefaultContent`.
 */
export type DefaultContent = {
  [nodePath: string]: DefaultNodeContent,
};

/**
 * Type of a function used to merge real content with default content.
 */
export type ContentMergeFunc = (
  node: ContentNode<any>,
  defaultContent: any,
) => any;

/**
 * Determines whether a node is empty.
 * @param data
 * The node data to test.
 *
 * @returns
 * True if the node is empty (has no data). False otherwise.
 */
const isNodeDataEmpty = <D extends object>(data: D) => {
  // Ensure that an empty array counts as existing data.
  if (Array.isArray(data)) return false;
  return !(data && Object.keys(data).length > 0);
};

export const getRelativeNodeKey = (basePath: Path, nodePath: Path) => {
  const delimiter = '$';
  const baseNodeKey = Array.isArray(basePath) ? basePath.join(delimiter) : basePath;
  const baseNodeKeyLength = baseNodeKey.length + delimiter.length;
  const nodeKey = Array.isArray(nodePath) ? nodePath.join(delimiter) : nodePath;
  return nodeKey.startsWith(baseNodeKey) ? nodeKey.substring(baseNodeKeyLength) : nodeKey;
};

export const getAbsoluteNodeKey = (basePath: Path, contentPath: Path) => {
  const delimiter = '$';
  const basePathArray = Array.isArray(basePath) ? basePath : basePath.split(delimiter);
  const contentPathArray = Array.isArray(contentPath) ? contentPath : contentPath.split(delimiter);
  return basePathArray.concat(contentPathArray).join(delimiter);
};

// TODO: this class should expose a method that allows to check if node has value in store
export default class ContentfulNode<D extends object, K extends object> extends DefaultContentNode<D> {
  protected mergeFunc?: ContentMergeFunc;

  // @ts-ignore has no initializer and is not definitely assigned in the constructor
  protected sourceNode: DefaultContentNode<K>;

  // @ts-ignore has no initializer and is not definitely assigned in the constructor
  private content: DefaultContent;

  static create(
    node: DefaultContentNode<object>,
    content: object,
    mergeFunc?: ContentMergeFunc,
  ) {
    const contentfulNode = new ContentfulNode(node.getActions(), node.getGetters(), node.path);
    contentfulNode.setContent(content);
    contentfulNode.setSourceNode(node);
    contentfulNode.setMergeFunc(mergeFunc);
    return contentfulNode;
  }

  private getContentKey() {
    return getRelativeNodeKey(this.sourceNode.path, this.path);
  }

  private getDefaultContent() {
    const contentKey = this.getContentKey();
    const contentValue = this.content[contentKey];
    return contentValue || {};
  }

  public setContent(content: DefaultContent) {
    this.content = content;
  }

  public setSourceNode(node: DefaultContentNode<K>) {
    this.sourceNode = node;
  }

  /**
   * Provides a custom content merge function, which will be used to combine
   * default content with actual content to produce the value of the node.
   *
   * @param mergeFunc
   * A function used to merge default content with actual content.
   */
  public setMergeFunc(mergeFunc?: ContentMergeFunc) {
    this.mergeFunc = mergeFunc;
  }

  /**
   * when default content is not a function
   * then take data from store
   * if data does not exist in store then return default content
   *
   * when default content is a function
   * then return data from the function
   * assuming the function is responsible for merging store data with default data
   */
  get data() {
    const defaultContent = this.getDefaultContent();
    if (typeof defaultContent === 'function') {
      // passing content node of the type equal to node at the time withDefaultContent is invoked
      return (defaultContent as GetContentFrom<D>)(this.sourceNode.peer(this.path));
    }
    const nodeData = this.sourceNode.peer(this.path).data;
    if (this.mergeFunc) return this.mergeFunc(nodeData, defaultContent);
    return isNodeDataEmpty(nodeData) ? defaultContent : nodeData;
  }

  get keys() {
    return union(
      this.sourceNode.peer(this.path).keys,
      Object.keys(this.content)
        .map(key => getAbsoluteNodeKey(this.sourceNode.path, key)),
    );
  }

  peer<E extends object>(path: Path) {
    const peerNode = new ContentfulNode<E, K>(this.actions, this.getters, path);
    peerNode.setContent(this.content);
    peerNode.setSourceNode(this.sourceNode);
    peerNode.setMergeFunc(this.mergeFunc);
    return peerNode;
  }
}
