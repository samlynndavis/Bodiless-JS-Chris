import React, {
  useState, useLayoutEffect, FC, useMemo
} from 'react';
import { StaticPage, WithNodeKeyProps } from '@bodiless/core';
import { GatsbyNodeProvider, PageProps } from '@bodiless/gatsby-theme-bodiless';

import { DesignableComponentsProps } from '@bodiless/fclasses';

type RawComponentDemoProps = {
  component?: string,
  nodeKey?: WithNodeKeyProps,
};

export const RawComponentDemo: FC<DesignableComponentsProps & RawComponentDemoProps> = props => {
  const { components, component, ...rest } = props;
  console.log(components, component);
  if (!component || !components[component]) {
    return <div>loading... </div>;
  }
  const C = components[component];
  return (
    <C {...rest} />
  );
};

const RawComponentUpdater: FC<DesignableComponentsProps> = props => {
  const [state, setState] = useState<RawComponentDemoProps|undefined>();
  console.log('state', state);

  const p = new URLSearchParams(window.location.search);
  const nodeKey = p.get('nodeKey');
  const nodeCollection = p.get('nodeCollection');
  const component = p.get('component');

  useLayoutEffect(() => {
    console.log('effect');
    setState({
      component,
      nodeKey: {
        nodeKey: p.get('nodeKey'),
        nodeCollection: p.get('nodeColection') || 'Site'
      }
    });
  }, [nodeKey, nodeCollection, component]);

  return <RawComponentDemo {...props} {...state} />;
};

export const RawComopnentPage: FC<DesignableComponentsProps & PageProps> = props => {
  const { components, ...rest } = props;
  return (
    <GatsbyNodeProvider {...rest}>
      <StaticPage>
        <RawComponentUpdater components={components} />
      </StaticPage>
    </GatsbyNodeProvider>
  );
};
