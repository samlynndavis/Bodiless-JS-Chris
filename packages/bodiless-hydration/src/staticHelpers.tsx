import React from 'react';
import { HOC } from '@bodiless/fclasses';
import { withoutHydration } from './withoutHydration';

const staticWarning = () => {
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.warn('You are rendering a static component in the browser. Did you forget to wrap it in withoutHydration()?');
  }
};

export const staticToken: HOC = Component => props => {
  staticWarning();
  return <Component {...props} />;
};

export const staticHOC = staticToken;

export const staticTokenCollection = new Proxy({}, {
  get: () => staticToken,
});

export const StaticComponent = withoutHydration()(() => null);

export const staticFunction = (func: Function) => (...args: any) => {
  staticWarning();
  return func(args);
};
