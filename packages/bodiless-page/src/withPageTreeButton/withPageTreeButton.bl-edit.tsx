import React, {
  useMemo, FC, useState, useRef, useLayoutEffect,
} from 'react';
import {
  withMenuOptions, ContextMenuFormProps, ContextMenuForm, useMenuOptionUI
} from '@bodiless/core';
import {
  addClasses, flowHoc, removeClasses, ComponentOrTag,
} from '@bodiless/fclasses';
import { pathsToTree, TreeNode } from './pathsToTree';

type FolderTreeProps = {
  data: TreeNode,
};

type FolderTreeNodeProps = {
  test: (data: TreeNode) => boolean,
} & FolderTreeProps;

const isNodeVisible = (data: TreeNode, testVisible: (data: TreeNode) => boolean): boolean => {
  const isVisible = data.children.reduce(
    (acc, next) => acc || isNodeVisible(next, testVisible),
    testVisible(data),
  );
  return isVisible;
};

const FolderTreeNode: FC<FolderTreeNodeProps>= ({ data, test }) => {
  if (!isNodeVisible(data, test)) return null;
  const { ComponentFormLink, ComponentFormList, ComponentFormListItem } = useMenuOptionUI();
  const Link = flowHoc(
    addClasses('bl-block hover:bl-text-yellow-500'),
    // addClasses('block hover:text-interactive-tertiary-hover'),
    removeClasses('bl-underline'),
  )(ComponentFormLink as ComponentOrTag<any>);
  // const ComponentFormList = 'ul';
  // const ComponentFormListItem = 'li';
  return (
    // @todo should use bl classes
    <ComponentFormListItem>
      <Link href={data.url}>{data.name}</Link>
      {data.children.length > 0 && (
      <ComponentFormList>
        {data.children.map(c => <FolderTreeNode data={c} test={test} />)}
      </ComponentFormList>
      )}
    </ComponentFormListItem>
  );
};

const FolderTree: FC<FolderTreeProps> = props => {
  const { ComponentFormList } = useMenuOptionUI();
  // const ComponentFormList = 'ul';
  const { ComponentFormText } = useMenuOptionUI();

  // Track the text in the filter input field
  const [match, setMatch] = useState<string|undefined>();
  const test = (data: TreeNode) => !match || new RegExp(match).test(data.name);

  // Ensure the height of the list div remains constent even when items are filtered
  const [height, setHeight] = useState<number|undefined>();
  const listDivRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    setHeight(listDivRef.current?.offsetHeight);
  });

  return (
    <>
      <ComponentFormText
        onChange={fieldState => {
          setMatch(fieldState.value as string);
        }}
        placeholder="Path..."
        name="match"
        autoFocus
      />
      <ComponentFormList>
        <div
          style={height ? { height } : undefined}
          ref={listDivRef}
        >
          <FolderTreeNode {...props} test={test} />
        </div>
      </ComponentFormList>
    </>
  );
};

export type withPageTreeButtonProps = {
  pages: string[],
};

const useForm = ({ pages }: withPageTreeButtonProps) => useMemo(() => (
  (props: ContextMenuFormProps) => {
    const {
      ComponentFormTitle,
      ComponentFormDescription,
    } = useMenuOptionUI();
    const tree = pathsToTree(pages);
    return (
      <ContextMenuForm {...props} hasSubmit={false}>
        <ComponentFormTitle>Navigate to Page</ComponentFormTitle>
        <ComponentFormDescription>
          <FolderTree
            data={tree}
          />
        </ComponentFormDescription>
      </ContextMenuForm>
    );
  }),
[pages]);
/**
 * Provide a menu Button to show the sitemap as a tree of links.
 *
 * @param children
 * @constructor
 */
const useMenuOptions = (props: withPageTreeButtonProps) => {
  const Form = useForm(props);
  return [{
    name: 'page-tree',
    label: 'Nav',
    icon: 'account_tree',
    handler: () => Form,
  }];
};

export const withPageTreeButton = withMenuOptions({
  useMenuOptions,
  name: 'Page Tree',
  root: true,
});
