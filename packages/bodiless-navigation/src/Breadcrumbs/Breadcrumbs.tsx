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

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ComponentType, HTMLProps } from 'react';
import { useNode, withoutProps, withNode } from '@bodiless/core';
import type { WithNodeProps } from '@bodiless/core';
import {
  asComponent, designable, addProps, Fragment, withDesign, replaceWith,
} from '@bodiless/fclasses';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import { observer } from 'mobx-react-lite';
import { flowRight } from 'lodash';
import type { BreadcrumbItemType as BreadcrumbStoreItemType } from './BreadcrumbStore';
import { useBreadcrumbStore } from './BreadcrumbStoreProvider';
import { asStylableBreadcrumbs } from './Breadcrumb.token';

import MenuTitle from '../Menu/MenuTitles';

type BreadcrumbsComponents = {
  StartingTrail: ComponentType<any>,
  Separator: ComponentType<HTMLProps<HTMLSpanElement>>,
  Wrapper: ComponentType<HTMLProps<HTMLUListElement>>,
  Item: ComponentType<HTMLProps<HTMLLIElement> & {
    position: number;
    isCurrentPage: boolean;
  }>,
  Title: ComponentType<any>,
  FinalTrail: ComponentType<any>,
};

type CleanBreadcrumbItemType = {
  uuid: string | number;
  position: number;
  isCurrentPage: boolean;
} & WithNodeProps;

/**
 * contains breadcrumb item public properties
*/
type BreadcrumbItemType = Pick<BreadcrumbStoreItemType, 'uuid' | 'title' | 'link' | 'isFirst' | 'hasPath'>;

/**
 * reduces items retrieved from breadcrumb store
 *
 * @param items - a list of items retrieved from store
 * @param props - props passed to breadcrumb component
 *
 * @returns uuids - a collection of breadcrumb item uuids
 */
type BreadcrumbStoreItemsReducer = (
  items: BreadcrumbItemType[],
  props?: Pick<BreadcrumbsProps, 'hasStartingTrail' | 'hasFinalTrail'>,
) => string[];

type BreadcrumbsProps = DesignableComponentsProps<BreadcrumbsComponents> & {
  /**
   * whether starting custom item is enabled and should be rendered
   * default: disabled
   */
  hasStartingTrail?: boolean | (() => boolean),
  /**
   * list of breadcrumb items to render
   */
  items?: CleanBreadcrumbItemType[],
  /**
   * whether final custom item is enabled and should be rendered
   */
  hasFinalTrail?: boolean | (() => boolean),
  /**
   * allows to reduce items retrieved from breadcrumb store
   * default: firstItemHomeLinkReducer
   */
  itemsReducer?: BreadcrumbStoreItemsReducer,
  /**
   * whether the last breadcrumb item should not be rendered as a link
   * default: false
   */
  renderLastItemWithoutLink?: boolean | (() => boolean),
} & { };

/**
 * removes first item from the trail
 * when there is a custom starting trail and
 * when the first store item has frontpage path
 *
 * @param items - breadcrumb store items
 * @param props - breadcrumb component props
 *
 * @returns uuids - a list of item uuids
 */
const firstItemHomeLinkReducer = (
  items: BreadcrumbItemType[],
  { hasStartingTrail }: Pick<BreadcrumbsProps, 'hasStartingTrail' | 'hasFinalTrail'>,
) => items
  .filter(item => !(hasStartingTrail && item.isFirst() && item.hasPath('/')))
  .map(item => item.uuid);

const ItemNodeProvider = withNode(Fragment) as ComponentType<WithNodeProps>;

type CleanBreadcrumbsProps = Omit<BreadcrumbsProps, 'itemsReducer'>;
const BreadcrumbsClean$ = (props: CleanBreadcrumbsProps) => {
  const {
    hasStartingTrail = false,
    components,
    items = [],
    hasFinalTrail = false,
    renderLastItemWithoutLink = false,
  } = props;
  const hasStartingTrail$ = typeof hasStartingTrail === 'function' ? hasStartingTrail() : hasStartingTrail;
  const hasFinalTrail$ = typeof hasFinalTrail === 'function' ? hasFinalTrail() : hasFinalTrail;
  const renderLastItemWithoutLink$ = typeof renderLastItemWithoutLink === 'function'
    ? renderLastItemWithoutLink()
    : renderLastItemWithoutLink;
  const {
    StartingTrail,
    Separator,
    Wrapper,
    Item,
    Title,
    FinalTrail,
  } = components;
  const items$ = items.map((item: CleanBreadcrumbItemType, index: number) => {
    const isLastItem = index === (items.length - 1);
    const { position, isCurrentPage } = item;
    // increment position by 1 if there is starting trail item
    const position$ = hasStartingTrail$ ? position + 1 : position;
    if (isLastItem && renderLastItemWithoutLink$) {
      const TitleWithNoLink = withDesign({
        Link: replaceWith(Fragment),
      })(Title);
      return (
        <React.Fragment key={item.uuid}>
          <Item position={position$} isCurrentPage={isCurrentPage}>
            <ItemNodeProvider nodeKey={item.nodeKey} nodeCollection={item.nodeCollection}>
              <TitleWithNoLink />
            </ItemNodeProvider>
          </Item>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment key={item.uuid}>
        <Item position={position$} isCurrentPage={isCurrentPage}>
          <ItemNodeProvider nodeKey={item.nodeKey} nodeCollection={item.nodeCollection}>
            <Title />
          </ItemNodeProvider>
        </Item>
        {!isLastItem && <Separator key={`separator${item.uuid}`} />}
      </React.Fragment>
    );
  });
  const finalTrailItemPosition = (hasStartingTrail$ ? 1 : 0) + items$.length + 1;
  return (
    <Wrapper>
      { hasStartingTrail$
        && (
        <>
          <Item position={1} isCurrentPage={false} key="startingTrail">
            <StartingTrail />
          </Item>
          { (items$.length > 0 || hasFinalTrail$)
            && <Separator key="startingTrailSeparator" />}
        </>
        )}
      {items$}
      { hasFinalTrail$
        && (
        <>
          { items$.length > 0
            && <Separator key="finalTrailSeparator" />}
          <Item key="finalTrail" position={finalTrailItemPosition} isCurrentPage={false}>
            <FinalTrail />
          </Item>
        </>
        )}
    </Wrapper>
  );
};

const BreadcrumbStartComponents: BreadcrumbsComponents = {
  StartingTrail: MenuTitle,
  Separator: asComponent('span'),
  Wrapper: asComponent('ul'),
  Item: flowRight(
    withoutProps(['position', 'isCurrentPage']),
    asComponent,
  )('li'),
  Title: MenuTitle,
  FinalTrail: MenuTitle,
};

/**
 * Clean component that renders breadcrumbs.
 * @see BreadcrumbsComponents for a list of design components.
 */
const BreadcrumbsClean = designable(BreadcrumbStartComponents, 'Breadcrumbs')(BreadcrumbsClean$);

/**
 * HOC that populates a breadcrumb based component with data from breadcrumb store.
 * @param Component a breadcrumb based component
 */
// eslint-disable-next-line max-len
const withBreadcrumbItemsFromStore = (Component: ComponentType<BreadcrumbsProps & WithNodeProps>) => {
  const WithBreadcrumbItemsFromStore = (props: BreadcrumbsProps & WithNodeProps) => {
    const {
      nodeCollection,
      hasStartingTrail = false,
      hasFinalTrail = false,
      itemsReducer = firstItemHomeLinkReducer,
      renderLastItemWithoutLink = true,
      ...rest
    } = props;
    const store = useBreadcrumbStore();
    if (store === undefined) return <Component {...props} />;
    const { node } = useNode(nodeCollection);
    const basePath = node.path;
    const items = itemsReducer(store.breadcrumbTrail, { hasStartingTrail, hasFinalTrail })
      .map(uuid => store.getItem(uuid))
      // map items retrieved from store
      // into items expected by base breadcrumb component
      /* eslint-disable @typescript-eslint/indent */
      // eslint throws an indentation error for lines inside reduce body
      // automatic eslint fix brings code to unreadable state
      // probably that is an eslint plugin issue
      // the disabled rule is enabled back after reduce
      .reduce<CleanBreadcrumbItemType[]>(
        (prev, current, index) => {
          if (current === undefined) return prev;
          const titleNodePath = current.title.nodePath.replace(`${basePath}$`, '');
          // @todo probably a better way to get the nodeKey...
          const temp = titleNodePath.split('$');
          const nodeKey = temp.slice(0, temp.length - 1).join('$');
          prev.push({
            uuid: current.uuid,
            nodeKey,
            nodeCollection,
            position: index + 1,
            isCurrentPage: current.isLast() && store.hasCurrentPageItem(),
          });
          return prev;
        }, [],
      );
    /* eslint-enable @typescript-eslint/indent */
    const hasFinalTrail$0 = typeof hasFinalTrail === 'function' ? hasFinalTrail() : hasFinalTrail;
    const hasFinalTrail$1 = hasFinalTrail$0 && !store.hasCurrentPageItem();
    const lastItemWithoutLink = typeof renderLastItemWithoutLink === 'function'
      ? renderLastItemWithoutLink()
      : renderLastItemWithoutLink;
    const props$1 = {
      ...rest,
      items,
      hasFinalTrail: hasFinalTrail$1,
      hasStartingTrail,
      renderLastItemWithoutLink: lastItemWithoutLink
        && !hasFinalTrail$1
        && store.hasCurrentPageItem(),
    };
    return <Component {...props$1} />;
  };
  return WithBreadcrumbItemsFromStore;
};

/**
 * HOC that enables rendering of starting trail for a breadcrumb based component.
 * @param Component a breadcrumb based component
 */
const withStartingTrail = addProps({
  hasStartingTrail: true,
});

/**
 * HOC that disables rendering of starting trail for a breadcrumb based component.
 * @param Component a breadcrumb based component
 */
const withoutStartingTrail = addProps({
  hasStartingTrail: false,
});

/**
 * HOC that enables rendering of final trail for a breadcrumb based component.
 * @param Component a breadcrumb based component
 */
const withFinalTrail = addProps({
  hasFinalTrail: true,
});

/**
 * HOC that disables rendering of final trail for a breadcrumb based component.
 * @param Component a breadcrumb based component
 */
const withoutFinalTrail = addProps({
  hasFinalTrail: false,
});

/**
 * HOC that adds breadcrumb props retrieved from breadcrumb store.
 */
const asBreadcrumbs = flowRight(
  observer,
  withBreadcrumbItemsFromStore,
  asStylableBreadcrumbs,
);

/**
 * Component that renders breadcrumb items retrieved from breadcrumb store.
 */
const MenuBreadcrumbs = asBreadcrumbs(BreadcrumbsClean);

export {
  asBreadcrumbs,
  BreadcrumbsClean,
  MenuBreadcrumbs,
  withStartingTrail as withBreadcrumbStartingTrail,
  withoutStartingTrail as withoutBreadcrumbStartingTrail,
  withFinalTrail as withBreadcrumbFinalTrail,
  withoutFinalTrail as withoutBreadcrumbFinalTrail,
};

export type {
  BreadcrumbStoreItemsReducer,
};
