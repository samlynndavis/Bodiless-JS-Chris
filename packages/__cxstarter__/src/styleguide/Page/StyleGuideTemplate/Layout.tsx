import React from 'react';
import { asStyleGuideTemplateToken, cxStyleGuideTemplate } from '@bodiless/cx-templates';
import { flowHoc, replaceWith } from '@bodiless/fclasses';

export const Layout = asStyleGuideTemplateToken(cxStyleGuideTemplate.StyleGuide, {
  Meta: flowHoc.meta.term('Token')('Layout'),
  Content: {
    Title: replaceWith(() => <>Layout</>),
  },
});
