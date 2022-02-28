import {
  withApplyDesignContext, withTokensFromDesign, addProps, flowHoc, DesignableComponents,
} from '@bodiless/fclasses';
import type { HOC } from '@bodiless/fclasses';

/**
 * Used to create an element which can by styled by applying a design with
 * the specified key. The design of this component will be namespaced
 * `Element`, and will be processed by the global design registry.
 *
 * @param designKey
 * The key in the 'Element' design which will be used to style this component.
 *
 * @returns
 * A component which is stylable by applying a design with
 *
 * @example
 * ```
 * import { H1 } from '@bodiless/fclasses';
 *
 * const H1Clean = designableElement('H1')(H1);
 * const StyledH1 = withDesign({
 *   H1: 'text-2xl font-bold',
 * })(H1Clean);
 * const SpecificH1 = as('text-pink')(H1Clean);
 * ```
 *
 * // Create HOD which overrides Element:H1 design globally
 * const Element = () => ({
 *   H1: 'text-3xl font-semibold',
 * });
 * // Register it in the design context.
 * const DesignContextProvider = withRegisterDesignContext({ Element })(Fragment);
 *
 * <DesignContextProvider>
 *   ...
 *   <StyledH1 />
 *   <H1Clean />
 *   <SpecificH1 />
 * </DesignContextProvider>
 * ```
 * will produce the following markup
 * ```
 * <h1 class="text-3xl" />
 * <h1 class="text-3xl" />
 * <h1 class="text-3xl text-pink" />
 * ```
 * The first two examples both use the global styling registered in the design context.
 * The last example applies a token directly to the element (not to its design key),
 * so it will not be overridden by the globally registered HOD.
 */
export const designableElement = <C extends DesignableComponents = any>(
  designKey: keyof C,
): HOC => flowHoc(
    withTokensFromDesign,
    withApplyDesignContext('Element'),
    addProps({ designKeys: designKey }),
  );
