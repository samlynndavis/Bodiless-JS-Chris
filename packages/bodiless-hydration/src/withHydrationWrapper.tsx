import React, { createElement } from 'react';
import { HOC } from '@bodiless/fclasses';

type WithHydrationWrapperFunc = <P extends React.HTMLAttributes<T>, T extends HTMLElement>(
  element?: keyof React.ReactHTML,
  props?: React.ClassAttributes<T> & P | null
) => HOC;

export const withHydrationWrapper: WithHydrationWrapperFunc = (element, props) => {
  const wrapperProps = {
    ...props,
    'data-no-hydrate': true,
  };

  return (Component) => props => (
    createElement(element ?? 'span', wrapperProps, <Component {...props} />)
  );
};
