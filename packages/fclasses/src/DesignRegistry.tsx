import React, {
  createContext, FC, useContext, useRef
} from 'react';
import type { Design, HOC } from './types';
import { withDesign } from './tokenSpec';

export type DesignRegistryValue = Record<string, Design<any, any>>;

export const DesignRegistryContext = createContext<DesignRegistryValue>({});

/**
 * Applies a design from the global design registry.
 *
 * @param key
 * The key identifying th globally defined design you wish to apply.
 * The design must previously have been added to the registry via
 * `withRegisterGlobalDesign`.
 */
export const withDesignFromRegistry = (key: string): HOC => Component => {
  const WithDesignFromRegistry: FC<any> = props => {
    const design = useContext(DesignRegistryContext)[key];
    const wrappedComponent = useRef(Component);
    if (design) {
      wrappedComponent.current = withDesign(design)(Component);
    }
    const WrappedComponent = wrappedComponent.current;
    return <WrappedComponent {...props} />;
  };
  return WithDesignFromRegistry;
};

/**
 * Adds the design prop of a component to the global design registry.
 * The design prop will be removed.
 *
 * @param key
 * The key identifying this design for downstream consumers.
 *
 * @param design
 * The default design to add if the component has no design prop.
 */
export const withRegisterDesign = (
  key: string,
  defaultDesign?: Design<any, any>,
): HOC => Component => {
  const withRegisterGlobalDesign: FC<any> = props => {
    const { design, ...rest } = props;
    // @todo should we use extendDesign here?
    const finalDesign = design || defaultDesign;
    if (!finalDesign) {
      return <Component {...rest} />;
    }
    const newValue = {
      ...useContext(DesignRegistryContext),
      // @todo should we use extendDesign here if the key already exists?
      [key]: finalDesign,
    };
    return (
      <DesignRegistryContext.Provider value={newValue}>
        <Component {...rest} />
      </DesignRegistryContext.Provider>
    );
  };
  return withRegisterGlobalDesign;
};
