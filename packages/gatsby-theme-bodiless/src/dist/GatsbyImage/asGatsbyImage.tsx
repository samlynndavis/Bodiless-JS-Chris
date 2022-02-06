/**
 * Copyright © 2021 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ComponentType as CT, HTMLProps } from 'react';
import omit from 'lodash/omit';
import {
  GatsbyImage as GatsbyPluginImage,
  GatsbyImageProps as GatsbyPluginImageProps,
  IGatsbyImageData,
  Layout,
} from 'gatsby-plugin-image';
import {
  ifEditable,
  withActivatorWrapper,
} from '@bodiless/core';
import {
  addClasses,
  DesignableComponentsProps,
  Div,
  withDesign,
  withoutProps,
  designable,
  HOC,
  flowHoc,
} from '@bodiless/fclasses';
import type { ImageData } from '@bodiless/components';
import type {
  FluidObject,
  FixedObject,
  GatsbyImageOptionalProps,
} from 'gatsby-image';
import GatsbyImagePresets from './GatsbyImagePresets';

type BodilessImageComponents = {
  GatsbyImage: CT<GatsbyPluginImageProps>,
  Image: CT<any>,
};

export type BodilessFluidObject = FluidObject & {
  srcSetType: string;
  presentationWidth: number;
  presentationHeight: number;
};
export type BodilessFixedObject = FixedObject;

export type GatsbyImageData = ImageData & {
  preset: GatsbyImagePresets;
  gatsbyImg?: { fluid: BodilessFluidObject | BodilessFluidObject[] }
  | { fixed: BodilessFixedObject | BodilessFixedObject[] };
};
export type GatsbyPluginImageData = Omit<GatsbyPluginImageProps, 'image' | 'alt'> & {
  image: IGatsbyImageData | undefined,
  alt?: string,
};

export type GatsbyImageProps = HTMLProps<HTMLImageElement>
& GatsbyImageData
& GatsbyImageOptionalProps & DesignableComponentsProps<BodilessImageComponents>;

export type BodilessGatsbyImageProps = HTMLProps<HTMLImageElement>
& GatsbyPluginImageData
& DesignableComponentsProps<BodilessImageComponents>;

/**
 * props GatsbyImageProps is defined for legacy GatsbyImage package
 * https://www.gatsbyjs.com/plugins/gatsby-image/
 * with data generated from gatsby node creation process using Sharp API.
 *
 * When replacing old GatsbyImage component with new gatsby-plugin-image
 * component, we convert legacy data into new format according to gatsby-plugin-image API:
 * https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#gatsbyimage
 *
 * @param props legacy GatsbyImage props.
 * @returns gatsby-plugin-image GatsbyImage props.
 */
const getGatsbyPluginImageProps = (props: GatsbyImageProps): BodilessGatsbyImageProps => {
  const {
    components,
    gatsbyImg,
    preset,
    backgroundColor: bgColor,
    alt = '',
    as,
    loading,
    durationFadeIn,
    crossOrigin,
    onError,
    onStartLoad,
    ...rest
  } = props;

  if (gatsbyImg !== undefined) {
    /**
     * fallback for placeholder, dominantColor | blurred | tracedSVG
     */
    let placeholderFallback: string;
    let layout: Layout = 'fullWidth';
    let width: number;
    let height: number;
    let images: IGatsbyImageData['images'];
    const backgroundColor = (typeof bgColor === 'string') ? bgColor : undefined;

    if ('fluid' in gatsbyImg) {
      const fluid = ((Array.isArray(gatsbyImg.fluid) && gatsbyImg.fluid.length)
        ? gatsbyImg.fluid[0] : gatsbyImg.fluid) as BodilessFluidObject;
      placeholderFallback = fluid.tracedSVG || fluid.base64 || '';
      layout = 'fullWidth';
      width = fluid.presentationWidth;
      height = fluid.presentationHeight;

      images = {
        fallback: {
          sizes: fluid.sizes,
          src: fluid.src,
          srcSet: fluid.srcSet,
        },
        sources: [
          {
            sizes: fluid.sizes,
            type: fluid.srcSetType,
            srcSet: fluid.srcSet,
          },
        ],
      };

      if (fluid.srcSetWebp) {
        const webp = {
          sizes: '',
          type: 'image/webp',
          srcSet: '',
        };
        webp.srcSet = fluid.srcSetWebp;
        webp.sizes = fluid.sizes;
        images.sources?.push(webp);
      }
    } else {
      const fixed = ((Array.isArray(gatsbyImg.fixed) && gatsbyImg.fixed.length)
        ? gatsbyImg.fixed[0] : gatsbyImg.fixed) as FixedObject;
      placeholderFallback = fixed.tracedSVG || fixed.base64 || '';
      layout = 'fixed';
      width = fixed.width;
      height = fixed.height;
      images = {
        fallback: {
          srcSet: fixed.srcSet,
          src: fixed.src,
        },
      };
    }

    const image: IGatsbyImageData = {
      layout,
      width,
      height,
      backgroundColor,
      images,
      placeholder: {
        fallback: placeholderFallback,
      },
    };

    return {
      components,
      image,
      alt,
      backgroundColor,
      ...rest,
    };
  }

  return {
    components,
    image: undefined,
    alt,
    ...rest,
  };
};

const asDesignableGatsbyImage = (ImageComponent: CT<any>) => {
  const startComponents: BodilessImageComponents = {
    GatsbyImage: GatsbyPluginImage,
    Image: ImageComponent,
  };

  const AsDesignableGatsbyImage = (props: GatsbyImageProps) => {
    const {
      components,
      image: imageData,
      alt = '',
      ...rest
    } = getGatsbyPluginImageProps(props);

    const {
      GatsbyImage,
      Image,
    } = components;

    if (imageData !== undefined) {
      return (
        <GatsbyImage {...omit(rest, 'canonicalPreset', '_nodeKey')} alt={alt} image={imageData} />
      );
    }

    const {
      components: componentsImg,
      gatsbyImg,
      preset,
      ...restImg
    } = props;

    return (
      <Image {...omit(restImg, 'canonicalPreset', '_nodeKey', 'imgStyle')} />
    );
  };
  return designable(startComponents, 'GatsbyImage')(AsDesignableGatsbyImage);
};

const withActivatorWrapperDefaultStyles = addClasses('bl-w-full');

const asGatsbyImage = flowHoc(
  // @todo this cast should not be necessary.
  asDesignableGatsbyImage as HOC,
  withDesign({
    GatsbyImage: ifEditable(
      withActivatorWrapper(
        'onClick',
        withActivatorWrapperDefaultStyles(Div),
      ),
    ),
  }),
);

export const isGatsbyImage = ({ gatsbyImg }: GatsbyImageProps) => gatsbyImg !== undefined;

/**
 * hoc to remove props configured for GatsbyImage in image data
 * and to remove props added during image gatsby nodes creation
 *
 * it can be useful for cases when an image is processed by gatsby
 * but Gatsby Image is not enabled for the image
 */
export const withoutGatsbyImageProps = withoutProps([
  'preset',
  'gatsbyImg',
]);

export default asGatsbyImage;
