import React, { FC } from 'react';
import { HOC } from '@bodiless/fclasses';

export const withoutHydration: HOC = Component => {
  const WithoutHydration: FC<any> = props => {
    const isServer = typeof window === 'undefined';
    if (process.env.NODE_ENV !== 'production' || isServer) {
      return (
        <div>
          <Component {...props} />
        </div>
      );
    }
    return (
      <div
        suppressHydrationWarning
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: '' }}
      />
    );
  };
  return WithoutHydration;
};

const staticToken: HOC = Component => props => {
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    console.warn('You are rendering a static component in the browser.  Wrap it in withoutHydration');
  }
  return <Component {...props} />;
};

export const staticTokenCollection = new Proxy({}, {
  get: () => staticToken,
});

export const StaticComponent = withoutHydration(() => null);
