import {
  withNode,
  withParent,
} from '@bodiless/core';
import {
  GatsbyImagePresets,
  withoutGatsbyImageProps,
  asGatsbyImage,
  withGatsbyImageLogger,
  withGatsbyImageNode,
} from '@bodiless/gatsby-theme-bodiless';
import {
  asToken,
  stylable,
  addProps,
  A,
  extendMeta,
  as,
} from '@bodiless/fclasses';
import { asBodilessImage, withImagePlaceholder } from '@bodiless/components';
import { asBodilessLink } from '@bodiless/components-ui';
import { asElementToken, asSimpleToken } from '@bodiless/cx-elements';

// @ts-ignore Cannot find module
import landscapeImage from '../assets/landscape_image.png';

/**
 * @private
 */
const objectFitContainProps = {
  imgStyle: { objectFit: 'contain' },
};

/**
 * @private
 */
const objectFitCoverProps = {
  imgStyle: { objectFit: 'cover' },
};

/**
 * Token which creates the CanvasX base Image.
 */
const Base = asElementToken({
  Core: {
    _: as(
      asGatsbyImage,
      stylable,
      withGatsbyImageLogger(),
    ),
  },
  Meta: asToken.meta.term('Type')('Image'),
});

/**
 * Token which apply the Plain image.
 */
const WithEditorPlain = asElementToken({
  Editors: {
    _: asBodilessImage(),
  },
  Behavior: {
    _: as(
      withNode,
      withoutGatsbyImageProps,
    ),
  },
  Meta: asToken.meta.term('Optimization')('Plain'),
});

/**
 * Token which apply the BlurUp Effect.
 */
const WithEditorBlurUp = asElementToken({
  Editors: {
    _: asBodilessImage(),
  },
  Behavior: {
    _: withGatsbyImageNode(GatsbyImagePresets.FluidWithWebp),
  },
  Meta: extendMeta(
    asToken.meta.term('Optimization')('Optimized'),
    asToken.meta.term('Effect')('BlurUp'),
  ),
  Layout: {
    _: addProps(objectFitCoverProps),
  },
});

/**
 * Token which apply the Traced Effect.
 */
const WithEditorTraced = asElementToken({
  Editors: {
    _: asBodilessImage(),
  },
  Behavior: {
    _: withGatsbyImageNode(GatsbyImagePresets.FluidWithWebpTracedSVG),
  },
  Meta: extendMeta(
    asToken.meta.term('Optimization')('Optimized'),
    asToken.meta.term('Effect')('Traced'),
  ),
  Layout: {
    _: addProps(objectFitContainProps),
  },
});

/**
 * Token which apply NoEffect.
 */
const WithEditorNoEffect = asElementToken({
  Editors: {
    _: asBodilessImage(),
  },
  Behavior: {
    _: withGatsbyImageNode(GatsbyImagePresets.FluidWithWebpNoBase64),
  },
  Meta: extendMeta(
    asToken.meta.term('Optimization')('Optimized'),
    asToken.meta.term('Effect')('No Effect'),
  ),
  Layout: {
    _: addProps(objectFitContainProps),
  },
});

/**
 * Token which apply a Landscape Placeholder.
 */
const WithLandscapePlaceholder = asElementToken({
  Content: {
    _: withImagePlaceholder({ src: landscapeImage }),
  },
});

const LinkBase = asBodilessLink('link')(A);

/**
 * Token which wrap the image in a link.
 */
const WithLink = asElementToken({
  Core: {
    _: withParent(LinkBase, 'ImageLink'),
  },
  Meta: asToken.meta.term('Link')('With Link'),
});

/**
 * Token which recompose the base image as Plain Image.
*/
const EditablePlain = asElementToken(Base, WithEditorPlain);

/**
* Token which recompose the base image as BlurUp Image.
*/
const Default = asElementToken(Base, WithEditorBlurUp);

/**
* Token which recompose the base image as Traced Image.
*/
const EditableTraced = asElementToken(Base, WithEditorTraced);

/**
* Token which recompose the base image as NoEffect Image.
*/
const EditableNoEffect = asElementToken(Base, WithEditorNoEffect);

const WithEager = asElementToken({
  Core: {
    _: addProps({ loading: 'eager'}),
  },
});

export const cxImage = {
  Base,
  Plain: EditablePlain,
  Default,
  WithEditorPlain,
  WithEditorBlurUp,
  WithEditorTraced,
  WithEditorNoEffect,
  EditableTraced,
  EditableNoEffect,
  WithLandscapePlaceholder,
  WithLink,
  WithEager,
};
