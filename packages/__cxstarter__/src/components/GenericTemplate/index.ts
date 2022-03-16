import {
  cxGenericTemplate,
  asGenericTemplateToken,
} from '@bodiless/cx-templates';
import { as } from '@bodiless/fclasses';
import { __cxstarter__Layout } from '../Layout';
// @todo define __cxstarter__FlowContainer;
// import { __cxstarter__FlowContainer } from '../FlowContainer';

const Default = asGenericTemplateToken({
  ...cxGenericTemplate.Default,
  Components: {
    ...cxGenericTemplate.Default.Components,
    PageWrapper: as(__cxstarter__Layout.Default),
    // TopContent: as(__cxstarter__FlowContainer.Default),
    // Content: as(__cxstarter__FlowContainer.Default),
    // BottomContent: as(__cxstarter__FlowContainer.Default),
  },
  Meta: { title: 'Default' },
});

export const __cxstarter__GenericTemplate = {
  ...cxGenericTemplate,
  Default,
};
