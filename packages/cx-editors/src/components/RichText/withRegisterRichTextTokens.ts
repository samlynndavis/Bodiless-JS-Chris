import { withRegisterTokens } from '@bodiless/fclasses';
import { cxRichText } from './tokens';

export const withRegisterRichTextTokens = withRegisterTokens({
  cxRichText__WithComponents: cxRichText.WithComponents,
});
