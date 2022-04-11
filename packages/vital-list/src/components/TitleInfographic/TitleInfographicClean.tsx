import React from 'react';
import type { ComponentOrTag } from '@bodiless/fclasses';
import {
  designable,
  Div,
  Img,
  Fragment,
  DesignableComponentsProps,
} from '@bodiless/fclasses';
import { asCxTokenSpec } from '@bodiless/cx-elements';
import { RichTextClean } from '@bodiless/cx-editors';
import { withoutHydration } from '@bodiless/hydration';

export type TitleInfographicComponents = {
  Wrapper: ComponentOrTag<any>,
  ImageWrapper: ComponentOrTag<any>,
  Image: ComponentOrTag<any>,
  Title: ComponentOrTag<any>,
  TitleWrapper: ComponentOrTag<any>,
};

const titleInfographicComponents:TitleInfographicComponents = {
  Wrapper: Div,
  ImageWrapper: Fragment,
  Image: Img,
  TitleWrapper: Fragment,
  Title: RichTextClean,
};

type Props = DesignableComponentsProps<TitleInfographicComponents> & { };

const TitleInfographicBase = (props: Props) => {
  const { components: C } = props;

  return (
    <C.Wrapper>
      <C.ImageWrapper>
        <C.Image />
      </C.ImageWrapper>
      <C.TitleWrapper>
        <C.Title />
      </C.TitleWrapper>
    </C.Wrapper>
  );
};

const TitleInfographicClean = designable(titleInfographicComponents, 'Title Infographic')(TitleInfographicBase);

export const asTitleInfographicToken = asCxTokenSpec<TitleInfographicComponents>();

export default withoutHydration()(TitleInfographicClean);
