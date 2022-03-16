import React from 'react';
// @todo add after static-replacement merges.
// import { withoutHydration } from '@bodiess/hydration';
import { FlowContainer as FlowContainerClean } from '@bodiless/layouts-ui';

const FlowContainerPreview = () => (
  <div className="bl-bg-black">Content Region</div>
);

export default FlowContainerClean;

// @todo add after static replacement merges.
// export const FlowContainerStatic = withoutHydration(FlowContainerClean);

export { FlowContainerPreview };
