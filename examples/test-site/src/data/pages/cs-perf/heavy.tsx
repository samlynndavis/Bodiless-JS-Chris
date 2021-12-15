import React from 'react';
import {
  asToken, addClasses, Div, addProps, startWith, varyDesigns, HOC, withDesign
} from '@bodiless/fclasses';
import type { FC, ReactNode } from 'react';
import { pick } from 'lodash';
import { FlowContainer } from '@bodiless/layouts/src';
import { asBodilessChameleon } from '@bodiless/components';
import { withNodeKey } from '@bodiless/core';

const colors = ['red', 'blue', 'teal', 'green', 'yellow', 'purple', 'orange'];
const createColorDesign = (prefix: string) => colors.reduce(
  (acc, next) => ({
    ...acc,
    [`${prefix}${next}4`]: asToken(addClasses(`${prefix}-${next}-400`), asToken.meta.term(prefix)(`${prefix}-${next}`)),
  }),
  {},
);
const Box = asToken(
  addClasses('w-12 h-12 p-2 border-2'),
)(Div);

const createTextDesign = (n: number) => {
  const design: any = {};
  for (var i = 0; i < n; i++) {
    design[`Text${i}`] = asToken(
      addProps({ children: `Foo ${i}` }),
      asToken.meta.term('Copy')(`${i}`),
    );
  }
  return design;
};

const baseDesign = {
  Box: startWith(Box),
};

export const heavyDesign = varyDesigns(
  baseDesign,
  createColorDesign('bg'),
  createColorDesign('border'),
  createColorDesign('text'),
  createTextDesign(10),
);

export const withPrunedDesign: HOC = Component => {
  const WithPrunedDesign: FC<any> = props => {
    const { design } = props;
    const newDesign = pick(design, 'Wrapper', 'ComponentWrapper');
    return <Component {...props} design={newDesign} />;
  };
  return WithPrunedDesign;
};

export const createHeavyFlowContainer = (n: number = 1) => asToken(
  // withPrunedDesign,
  withDesign(heavyDesign),
  withNodeKey(`fc-${n}`),
  addProps({ key: `fc-${n}` }),
)(FlowContainer);

export const createHeavyChameleon = (n: number = 1) => asToken(
  asBodilessChameleon(`chameleon-${n}`),
  // withPrunedDesign,
  withDesign(heavyDesign),
  addProps({ key: `chameleon-${n}` }),
)(Box);

export const createHeavyElements = (type: 'fc'|'chameleon', n: number = 1) => {
  const nodes: ReactNode[] = [];
  for (var i = 0; i < n; i++) {
    const C =  type === 'fc' ? createHeavyFlowContainer(i) : createHeavyChameleon(i);
    nodes.push(<C />);
  }
  return nodes;
};
