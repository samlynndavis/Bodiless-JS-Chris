import { cxHeader, asHeaderToken } from '@bodiless/cx-layout';

const Default = asHeaderToken({
  ...cxHeader.Default,
  Components: {
    ...cxHeader.Default.Components,
  },
});

export const __cxstarter__Header = {
  ...cxHeader,
  Default,
};
