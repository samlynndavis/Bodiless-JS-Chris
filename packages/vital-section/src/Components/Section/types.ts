import { ComponentType, HTMLProps } from 'react';
import {
  DesignableComponents,
  DesignableComponentsProps,
  StylableProps,
  DesignableProps,
} from '@bodiless/fclasses';

/**
 * @category Component
 */
export interface SectionComponents extends DesignableComponents {
  Wrapper: ComponentType<StylableProps>;
  TitleWrapper: ComponentType<StylableProps>;
  Title: ComponentType<StylableProps>;
  DescriptionWrapper: ComponentType<StylableProps>;
  Description: ComponentType<StylableProps>;
  LinkWrapper: ComponentType<StylableProps>;
  Link: ComponentType<StylableProps>;
  ContentWrapper: ComponentType<StylableProps>;
  Content: ComponentType<StylableProps>;
}

export type SectionProps = DesignableProps<SectionComponents> & HTMLProps<HTMLElement>;

// eslint-disable-next-line max-len
export type SectionBaseProps = DesignableComponentsProps<SectionComponents> & HTMLProps<HTMLElement>;
