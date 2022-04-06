import {
  ComponentOrTag,
  TokenCollection,
  DesignableComponents,
} from '@bodiless/fclasses';

/**
 * Defines how token examples should be generated.
 */
export type TokenDemoSpec<C extends DesignableComponents> {
  tokens: TokenCollection<any, any>,
  /** The exported name that is passed to `tokens` */
  tokensExportName: string,
  component: ComponentOrTag<any>,
  /** The exported name that is passed to `component` */
  componentExportName: string,
  /** Slots used, keys are slot names */
  slots: Partial<
    Record<
      keyof C,
      {
        title: string;
        description?: string;
        /** to restrict which patterns can be used in this slot, supply an array of patternIds. If empty, NO patterns are allowed, if `null`, all patterns are allowed. */
        allowedPatternIds?: string[];
      }
    >
  >;
}
