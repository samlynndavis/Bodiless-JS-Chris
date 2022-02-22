import React, { FC } from 'react';
import flow from 'lodash/flow';
import identity from 'lodash/identity';
import { HOC } from '@bodiless/fclasses';

export const withAutoSuperscript = (chars: string = '®™'): HOC => Component => {
  const superscriptSanitizer = (html: string) => html
    .split('')
    .map(c => (chars.includes(c) ? `<sup>${c}</sup>` : c))
    .join('');
  const WithAutoSuperscript: FC<any> = props => {
    const { useOverrides = () => ({}), ...rest } = props;
    const {
      sanitizer: sanitizerFromOptions = identity, ...restOverridesProps
    } = useOverrides(props);
    const sanitizer = flow(
      superscriptSanitizer,
      sanitizerFromOptions,
    );
    const finalUseOverrides = () => ({
      sanitizer,
      ...restOverridesProps,
    });
    return <Component {...rest} useOverrides={finalUseOverrides} />;
  };
  return WithAutoSuperscript;
};
