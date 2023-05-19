import { HTMLProps } from 'react';
import {
  DesignableComponents,
  DesignableComponentsProps,
  DesignableProps,
  ComponentOrTag,
} from '@bodiless/fclasses';

/**
 * @category Component
 */
export interface SectionComponents extends DesignableComponents {
  Wrapper: ComponentOrTag<any>;
  TitleWrapper: ComponentOrTag<any>;
  Title: ComponentOrTag<any>;
  DescriptionWrapper: ComponentOrTag<any>;
  Description: ComponentOrTag<any>;
  LinkWrapper: ComponentOrTag<any>;
  Link: ComponentOrTag<any>;
  ContentWrapper: ComponentOrTag<any>;
  Content: ComponentOrTag<any>;
}

export type SectionProps = DesignableProps<SectionComponents> & HTMLProps<HTMLElement>;

export type SectionBaseProps = DesignableComponentsProps<SectionComponents>
& Omit<SectionProps, 'design'>;
