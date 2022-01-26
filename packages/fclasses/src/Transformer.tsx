import React, { ComponentType } from 'react';
// type TransformerFunction = (a:object) => object;
type WithTransformerProps<P, Q, X> = {
  transformFixed: (p: P) => X;
  transformPassthrough: (p: P) => Q;
};
type TransformerProps<P, Q, X> = WithTransformerProps<P, Q, X> & {
  Component: ComponentType<X & Q>;
  passedProps: P;
};
class Transformer<P, Q, X> extends React.Component<TransformerProps<P, Q, X>> {
  fixedProps: Object = {};

  constructor(props: TransformerProps<P, Q, X>) {
    super(props);
    const { transformFixed, passedProps } = props;
    this.fixedProps = transformFixed(passedProps) as X;
  }

  render() {
    const { Component, transformPassthrough, passedProps } = this.props;
    const props = { ...this.fixedProps as X, ...transformPassthrough(passedProps) };
    return <Component {...props} />;
  }
}

export const withTransformer = <P, Q, X extends Object>(funcs: WithTransformerProps<P, Q, X>) => (
  (Component: ComponentType<Q & X>) => (props: P) => {
    const {
      transformFixed,
      transformPassthrough,
    } = funcs;
    const tprops = {
      Component,
      transformFixed,
      transformPassthrough,
      passedProps: props,
    };
    return <Transformer {...tprops} />;
  }
);
