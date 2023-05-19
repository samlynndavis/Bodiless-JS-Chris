import React, { FC } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import {
  DesignableComponentsProps, Ul, Li, designable, ComponentOrTag, Fragment,
} from '@bodiless/fclasses';

export type ElementsListComponents = {
  Wrapper: ComponentOrTag<any>,
  ElementWrapper: ComponentOrTag<any>,
  ElementToUse: ComponentOrTag<any>,
};

export const elementsListComponents: ElementsListComponents = {
  Wrapper: Ul,
  ElementWrapper: Li,
  ElementToUse: Fragment,
};

const ElementsListBase: FC<DesignableComponentsProps & { times: number }> = props => {
  const { times = 4, components } = props;
  const { Wrapper, ElementToUse, ElementWrapper } = components;

  const items = Array.from(Array(times).keys()).map((val) => (
    <ElementWrapper key={val}>
      <ElementToUse />
    </ElementWrapper>
  ));

  return (
    <Wrapper>
      {items}
    </Wrapper>
  );
};

const ElementListClean = designable(elementsListComponents, 'ElementsList')(ElementsListBase);

export const asElementListToken = asVitalTokenSpec<ElementsListComponents>();
export default ElementListClean;
