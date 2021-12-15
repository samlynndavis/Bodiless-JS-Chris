import { applyDesign, Fragment } from '@bodiless/fclasses';
import type { Design, ComponentOrTag, DesignableComponents } from '@bodiless/fclasses';
import pick from 'lodash/pick';

/**
 * Interface for an object which exposes two sets of components: those
 * needed to render the flow container or chameleon, and those needed to
 * render the component selector.
 */
export type SelectorComponentsInterface = {
  /**
   * The components needed to render the flow container itself
   */
  components: DesignableComponents;
  /**
   * The components neededd to render the component selector.
   */
  selectableComponents: DesignableComponents;
};

/**
 * Properties which must be passed to the constructor of the
 * SelectorComponents class.
 */
export type SelectorComponentsProps = {
  startComponents?: DesignableComponents | undefined;
  DefaultComponent: ComponentOrTag<any>;
  design: Design;
  selectedComponents: string[];
};

/**
 * @private
 */
const selectorComponentsDefaultProps: SelectorComponentsProps = {
  design: {},
  DefaultComponent: Fragment,
  selectedComponents: [],
};

export class SelectorComponents implements SelectorComponentsInterface {
  props: SelectorComponentsProps;

  protected _components: DesignableComponents | undefined;

  protected _selectableComponents: DesignableComponents | undefined;

  constructor(props: Partial<SelectorComponentsProps>) {
    this.props = { ...selectorComponentsDefaultProps, ...props };
  }

  get components() {
    if (!this._components) this._components = this.getComponents();
    return this._components;
  }

  get selectableComponents() {
    if (!this._selectableComponents) this._selectableComponents = this.getSelectableComponents();
    return this._selectableComponents;
  }

  protected getComponents(): DesignableComponents {
    const {
      design, startComponents = {}, selectedComponents, DefaultComponent
    } = this.props;
    const start = selectedComponents.reduce(
      (acc, next) => ({
        ...acc,
        [next]: startComponents[next] || DefaultComponent,
      }),
      {},
    );
    return applyDesign(start)(pick(design, Object.keys(start)));
  }

  protected getSelectableComponents(): DesignableComponents {
    const {
      design, startComponents, DefaultComponent
    } = this.props;
    const start: DesignableComponents = {
      ... Object.keys(design).reduce(
        (acc, next) => ({
          ...acc,
          [next]: DefaultComponent,
        }),
        {}),
      ...startComponents,
    };
    // @ts-ignore
    const name = DefaultComponent.name || DefaultComponent.displayName;
    // console.log('getSelectableComponents', name, Object.keys(start).length);
    // console.trace();
    return applyDesign(start)(design);
  }
}
