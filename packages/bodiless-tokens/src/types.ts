import type {
  TokenCollection,
} from '@bodiless/fclasses';
import type { Meta } from '@storybook/react/types-6-0';

/**
 * Defines how token examples should be generated.
 */
export type TokenDemoSpec<D extends object = {}> = Meta & {
  tokens: TokenCollection<any, D>,
  /** Tokens which should be applied by default to all stories and not be toggled */
  defaultTokens?: string[],
  /** The exported name that is passed to `tokens` */
  tokensExportName: string,
  /** The exported name that is passed to `component` */
  componentExportName: string,
  /** Slots used, keys are slot names */
  // slots: Partial<
  // Record<
  // keyof C,
  // {
  //   title: string;
  //   description?: string;
  //   /**
  //    * to restrict which patterns can be used in this slot, supply an array
  //    * of patternIds. If empty, NO patterns are allowed, if `null`,
  //    * all patterns are allowed.
  //    */
  //   allowedPatternIds?: string[];
  // }
  // >
  // >;
};
