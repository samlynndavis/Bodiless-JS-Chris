import React, { ComponentType } from 'react';
import { createHash } from 'crypto';
import {
  useMenuOptionUI, WithNodeKeyProps, withNodeKey, withNode, ifEditable,
  withLocalContextMenu, withContextActivator, withEditButton, withNodeDataHandlers,
  EditButtonProps,
  EditButtonOptions,
  UseBodilessOverrides,
} from '@bodiless/core';
import { ComponentOrTag, TokensProps } from '@bodiless/fclasses/lib/withTokensFromProps';
import { flowRight, pick } from 'lodash';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from 'uuid';
import type { Token } from './TokenMap';
import TokenMap from './TokenMap';

export type Tokens = {
  [key: string]: Token,
};

export type TokenSelectorProps = {
  availableTokens: Tokens,
};

export type TokenSelectorData = {
  tokens: string[],
};

const initialValueHandler = (
  data: TokenSelectorData,
) => (data.tokens || []).reduce((acc, next) => ({
  ...acc,
  [next]: true,
}), {});

const submitValueHandler = (data: { [field: string]: boolean }) => ({
  tokens: Object.keys(data).reduce((acc, next) => (
    data[next] ? [...acc, next] : [...acc]
  ), [] as string[]),
});

// const useCheckboxes = (map: TokenMap<any>) => map.names.map(name => {
//   const { ComponentFormLabel, ComponentFormCheckBox } = useMenuOptionUI();
//   return (
//     <ComponentFormLabel>
//       <ComponentFormCheckBox field={name} />
//       {name}
//     </ComponentFormLabel>
//   );
// });

const useCategoryCheckboxes = (map: TokenMap<any>) => {
  const { ComponentFormLabel, ComponentFormCheckBox } = useMenuOptionUI();
  return map.categories.map(cat => (
    <>
      <ComponentFormLabel>{cat}</ComponentFormLabel>
      {map.namesFor(cat).map(name => (
        <ComponentFormLabel>
          <ComponentFormCheckBox field={name} />
          {name}
        </ComponentFormLabel>
      ))}
    </>
  ));
};

const useEditButtonOptions = (
  useOverrides: UseBodilessOverrides<any, any> = () => ({}),
) => <P extends object>(props: P & TokenSelectorProps): EditButtonOptions<any, any> => {
  const { availableTokens } = props;
  const map = new TokenMap<P>();
  map.add(availableTokens);
  const renderForm = () => {
    const { ComponentFormTitle } = useMenuOptionUI();
    return (
      <>
        <ComponentFormTitle>Tokens</ComponentFormTitle>
        {useCategoryCheckboxes(map)}
      </>
    );
  };
  const defaults: EditButtonOptions<any, any> = {
    icon: 'construction',
    name: `token-selector-${v4()}`,
    groupLabel: 'Tokens',
    label: 'Choose',
    groupMerge: 'merge',
    activateContext: false,
    global: false,
    local: true,
    renderForm,
    initialValueHandler,
    submitValueHandler,
  };
  return { ...defaults, ...useOverrides(props) };
};

export const withTokensFromData = <P extends TokensProps<P>>(Component: ComponentOrTag<P>) => {
  const WithTokensFromData = (
    props: P & EditButtonProps<TokenSelectorData> & TokenSelectorProps,
  ) => {
    const { componentData, availableTokens, ...rest } = props;
    const { tokens: names } = componentData;
    const tokens = Object.values(pick(availableTokens, names));
    return <Component {...rest as P} tokens={tokens} />;
  };
  return WithTokensFromData;
};

export const withTokenNamesFromData = <P extends TokensProps<P>>(Component: ComponentOrTag<P>) => {
  const WithTokenNamesFromData = (
    props: P & EditButtonProps<TokenSelectorData> & TokenSelectorProps,
  ) => {
    const { componentData, ...rest } = props;
    const { tokens } = componentData;
    return <Component {...rest as P} tokens={tokens} />;
  };
  return WithTokenNamesFromData;
};

/**
 * Forces a remount of the component when its data change.
 * This allows tokens and designs to be applied dynamically,
 * since they are only applied in the component constructor.
 *
 * @param Component The component to remount
 */
export const withKeyFromData = <P extends { componentData: any }>(Component: ComponentType<P>) => {
  const WithKeyFromData = (props: P) => {
    const { componentData } = props;
    const json = JSON.stringify(componentData);
    const key = createHash('md5').update(json).digest('hex');
    return <Component {...props} key={key} />;
  };
  return WithKeyFromData;
};

const withTokenSelector = (
  nodeKey?: WithNodeKeyProps,
  defaultData?: TokenSelectorData,
  useOverrides?: UseBodilessOverrides<any, any>,
) => flowRight(
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(defaultData),
  ifEditable(
    withEditButton(useEditButtonOptions(useOverrides)),
    withContextActivator('onClick'),
    // withActivatorWrapper('onClick', 'div'),
    withLocalContextMenu,
  ),
  withKeyFromData,
  withTokensFromData,
);

export default withTokenSelector;
