import { ComponentType, createElement } from 'react';

type WithoutHydrationFunc = <P extends React.HTMLAttributes<T>, T extends HTMLElement>(
  element?: keyof React.ReactHTML,
  props?: React.ClassAttributes<T> & P | null
) => ComponentType;

export const withoutHydration: WithoutHydrationFunc = (element, props) => {
  const Wrapper = createElement(element ?? 'span', {
    ...props,
    dangerouslySetInnerHTML: { __html: '' },
    suppressHydrationWarning: true,
  });

  return () => Wrapper;
};
