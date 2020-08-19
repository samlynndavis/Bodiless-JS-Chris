import React, { ComponentType } from 'react';
import { observer } from 'mobx-react-lite';
import { TMenuOption } from '../../src/Types/ContextMenuTypes';
import { useEditContext } from '../../src/hooks';

type ItemProps = {
  option: TMenuOption,
  id: string,
  group: string|undefined,
  global: boolean,
};

const itemRendered = jest.fn();
const Item = observer(({
  option, group, global, ...rest
}: ItemProps) => {
  itemRendered(option.name);
  const optionAttributes = Object.getOwnPropertyNames(option).reduce((acc, next) => {
    const key = `data-option-property-${next.toLowerCase()}`;
    return {
      ...acc,
      // @ts-ignore No index signature on TMenuOption
      [key]: typeof option[next] === 'string' ? option[next] : option[next].toString(),
    };
  }, {});
  return (
    <span
      {...rest}
      {...optionAttributes}
      id={option.name}
    >
      {option.label || option.name}
    </span>
  );
});

const menuRendered = jest.fn();
const Menu = observer(({ ItemProp }: any) => {
  menuRendered();
  const FinalItem = ItemProp || Item;
  const items = useEditContext().contextMenuOptions.map(option => (
    <FinalItem
      id={option.name}
      key={option.name}
      option={option}
      group={option.group}
      global={option.local || true}
    />
  ));
  return (
    <>
      {items}
    </>
  );
});

const withMenu = (Component: ComponentType<any>) => (props: any) => (
  <>
    <Component {...props} />
    <Menu />
  </>
);

export {
  Menu, Item, menuRendered, itemRendered, withMenu,
};
