import React from 'react';
import { FlowContainer as FlowContainerClean } from '@bodiless/layouts-ui';
import { asFluidToken } from '@bodiless/cx-elements';
import { withApplyDesignContext } from '@bodiless/fclasses';

const FlowContainerPreview = () => (
  <div className="bl-bg-black">Content Region</div>
);

const withDesignRegistryName = (name: string) => asFluidToken({
  Components: {
    _: withApplyDesignContext(name),
  },
});

export { FlowContainerClean, FlowContainerPreview, withDesignRegistryName };
