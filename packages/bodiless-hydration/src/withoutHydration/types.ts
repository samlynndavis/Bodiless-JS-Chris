import { HOC } from '@bodiless/fclasses';

type WithoutHydrationOptions = {
  onUpdate?: (props: Record<string, any>, element: HTMLElement | null) => void
  disableFallback?: boolean
};

export type WithoutHydrationProps = {
  forceHydration?: boolean
};

export type HydrationHOC = HOC<{}, WithoutHydrationProps>;

// eslint-disable-next-line max-len
export type WithoutHydrationFunction = (options?: WithoutHydrationOptions) => HydrationHOC;
