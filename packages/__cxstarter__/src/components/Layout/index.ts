import { cxLayout, asLayoutToken } from '@bodiless/cx-layout';
import { __cxstarter__Header } from '../Header';

const Default = asLayoutToken({
  ...cxLayout.Default,
  Components: {
    ...cxLayout.Default.Components,
    SiteHeader: __cxstarter__Header.Default,
  },
});

export const __cxstarter__Layout = {
  ...cxLayout,
  Default,
};

export * from '../Header';
