import omit from 'lodash/omit';
import React, { createContext, FC, useContext } from 'react';
import {
  DesignableProps, HOC, HOD
} from './types';

export type DesignContextValue<D extends object = any> = Record<string, HOD<any, D>>;

const DesignContext = createContext<DesignContextValue>({});

const withApplyDesignContext = (
  key: string
): HOC<DesignableProps> => Component => {
  const WithApplyDesignContext: FC<any> = props => {
    const context = useContext(DesignContext);
    if (context[key]) {
      const { design, ...rest } = props as DesignableProps;
      const design$ = context[key](design);
      return <Component {...rest as any} design={design$} />;
    }
    return <Component {...props} />;
  };
  return WithApplyDesignContext;
};

const withRegisterDesignContext = (
  key: string,
  hod: HOD<any, any>,
): HOC => Component => {
  const WithRegisterDesignContext: FC<any> = props => {
    const value = useContext(DesignContext);
    const newValue = { ...value, [key]: hod };
    return (
      <DesignContext.Provider value={newValue}>
        <Component {...props} />
      </DesignContext.Provider>
    );
  };
  return WithRegisterDesignContext;
};

const withResetDesignContext = (
  key?: string,
): HOC => Component => {
  const WithResetDesignContext: FC<any> = props => {
    let newValue: DesignContextValue = {};
    if (key) {
      const value = useContext(DesignContext);
      newValue = omit(value, key);
    }
    return (
      <DesignContext.Provider value={newValue}>
        <Component {...props} />
      </DesignContext.Provider>
    );
  };
  return WithResetDesignContext;
};

export {
  withApplyDesignContext,
  withRegisterDesignContext,
  withResetDesignContext,
};
