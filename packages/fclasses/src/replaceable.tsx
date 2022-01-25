import React, {
  ComponentType,
  FC,


  useContext
} from 'react';
import { HOC, ComponentOrTag, Token } from './types';
import { asToken } from './Tokens';
const designContextDefault = undefined as undefined | ComponentType<any>;
const DesignContext = React.createContext(designContextDefault);
export const replaceable = <P extends object>(Component: ComponentOrTag<P>): ComponentType<any> => {
  const Replaceable = (props: P) => {
    const UpstreamComponent = React.useContext(DesignContext);
    const FinalComponent = UpstreamComponent || Component;
    return (
      <DesignContext.Provider value={undefined}>
        <FinalComponent {...props} />
      </DesignContext.Provider>
    );
  };
  return Replaceable;
};
/**
 * Creates an HOC which replaces a base component with a specified replacement.
 * Unlike `replaceWith`, this function replaces the base component but leaves
 * any previously applied tokens intact.
 *
 * > **Important Note** `startWith` can only be used in the context of `withDesign`
 *
 * @param ReplacementComponent
 * The component to use as a replacement
 *
 * @return
 * HOC which removes the original component and renders the replacement instead.
 *
 * @see `replaceWith`
 * @example
 *  ```js
 *  const ExampleBase = ({ components: C, ...rest }) => <C.Tag {...rest} />;
 *  const ExampleClean = designable({ Tag: Span })(ExampleBase);
 *  const Example = withDesign({
 *    Tag: addClasses('text-blue'),
 *  })(Example); // <span className="text-blue" />
 *  const StartWith = withDesign({
 *    Tag: startWith(Div),
 *  })(Example) // <div className="text-blue" />
 *  const ReplaceWith = withDesign({
 *    Tag: replaceWith(Div),
 *  })(Example) // <div />
 *  ```
 */

export const startWith = (ReplacementComponent: ComponentType<any>): HOC => Component => {
  const StartWith: FC<any> = props => {
    const UpstreamComponent = useContext(DesignContext);
    return UpstreamComponent
      ? <Component {...props} />
      : (
        <DesignContext.Provider value={ReplacementComponent}>
          <Component {...props} />
        </DesignContext.Provider>
      );
  };
  return StartWith;
};
/**
 * Returns a Token which replaces the component to which it is applied with another.
 * Unlike `startWith`, this replaces the component along with any hoc's which
 * had previously been applied.
 *
 * @param Replacement
 * The component or tag to use as a replacement.
 *
 * @returns
 * An HOC which renders the replacement in place of the target.
 *
 * @see `startWith`
 *
 * @example
 * ```js
 * import { Div, replaceWith } from `@bodiless/fclasses`;
 * const StartBase = Div; // <div />
 * const Start = addClasses('text-blue')(Start); // <div className="text-blue" />
 * const Replaced = replaceWith('span')(Start); // <span />
 * ```
 */

export const replaceWith = <P extends object>(Replacement: ComponentOrTag<P>) => asToken(
  (() => {
    const ReplaceWith = (props: P) => <Replacement {...props} />;
    return ReplaceWith;
  }) as Token);
/**
 * HOC which replaces the component with a fragment.  Note that the children of
 * the component (if any) will still be rendered.  If you want to completely remove
 * a component and all its children, use `replaceWith(() => null)`
 *
 * @param Component
 * The component to replace
 *
 * @returns
 * A fragment.
 */

export const remove = <P extends React.HTMLAttributes<HTMLBaseElement>>() => (props: P) => {
  const { children } = props;
  return <>{children}</>;
};
