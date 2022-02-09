import {
  withNodeKey,
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
// import { t, extend, extendMeta } from '@bodiless/cx-elements';
import { withImagePlaceholder } from '@bodiless/components';
import { asBodilessLink } from '@bodiless/components-ui';
import { asEditableImageClean, asImageToken, WithImageLibrary } from './util';
// @ts-ignore Cannot find module
import landscapeImage from '../assets/landscape_image.png';

const ObjectFitContain = {
  imgStyle: { objectFit: 'contain' },
};

const ObjectFitCover = {
  imgStyle: { objectFit: 'cover' },
};

/**
 * Token which apply the ObjectFit Cover.
 */
const WithObjectFitCover = asImageToken({
  Theme: {
    _: addProps(ObjectFitCover),
  },
});

/**
 * Token which apply the Library from Page collection.
 */
const WithPageLibrary = asImageToken({
  Content: {
    _: WithImageLibrary('Page$__assetsImage'),
  },
});

/**
 * Token which apply the Library from Site collection.
 */
const WithSiteLibrary = asImageToken({
  Content: {
    _: WithImageLibrary('Site$__assetsImage'),
  },
});

/**
 * Token which creates the CanvasX base Image.
 */
const Base = asImageToken({
  Core: {
    _: as(
      asGatsbyImage,
      stylable,
      withGatsbyImageLogger(),
    ),
  },
  Editors: {
    _: {},
  },
  Content: {
    ...WithSiteLibrary.Content,
  },
  Behavior: {
    _: {},
  },
  Theme: {
    _: {},
  },
  Schema: {
    _: withNodeKey('image'),
  },
  Meta: asToken.meta.term('Type')('Image'),
});

/**
 * Token which apply the Plain image.
 */
const WithEditorPlain = asImageToken({
  Editors: {
    _: asEditableImageClean(),
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
const WithEditorBlurUp = asImageToken({
  Editors: {
    _: asEditableImageClean(),
  },
  Behavior: {
    _: withGatsbyImageNode(GatsbyImagePresets.FluidWithWebp),
  },
  Meta: extendMeta(
    asToken.meta.term('Optimization')('Optimized'),
    asToken.meta.term('Effect')('BlurUp'),
  ),
  Theme: {
    _: addProps(ObjectFitContain),
  },
});

/**
 * Token which apply the Traced Effect.
 */
const WithEditorTraced = asImageToken({
  Editors: {
    _: asEditableImageClean(),
  },
  Behavior: {
    _: withGatsbyImageNode(GatsbyImagePresets.FluidWithWebpTracedSVG),
  },
  Meta: extendMeta(
    asToken.meta.term('Optimization')('Optimized'),
    asToken.meta.term('Effect')('Traced'),
  ),
  Theme: {
    _: addProps(ObjectFitContain),
  },
});

/**
 * Token which apply NoEffect.
 */
const WithEditorNoEffect = asImageToken({
  Editors: {
    _: asEditableImageClean(),
  },
  Behavior: {
    _: withGatsbyImageNode(GatsbyImagePresets.FluidWithWebpNoBase64),
  },
  Meta: extendMeta(
    asToken.meta.term('Optimization')('Optimized'),
    asToken.meta.term('Effect')('No Effect'),
  ),
  Theme: {
    _: addProps(ObjectFitContain),
  },
});

/**
 * Token which apply a Landscape Placeholder.
 */
const WithLandscapePlaceholder = asImageToken({
  Content: {
    _: withImagePlaceholder({ src: landscapeImage }),
  },
});

const LinkBase = asBodilessLink('link')(A);

/**
 * Token which wrap the image in a link.
 */
const WithLink = asImageToken({
  Core: {
    _: withParent(LinkBase),
  },
  Meta: asToken.meta.term('Link')('With Link'),
});

/**
 * Token which recompose the base image as Plain Image.
*/
// const Plain = extend(Base, WithEditorPlain);
const Plain = { ...Base, ...WithEditorPlain };

/**
* Token which recompose the base image as BlurUp Image.
*/
const Default = { ...Base, ...WithEditorBlurUp };

/**
* Token which recompose the base image as Traced Image.
*/
const EditableTraced = { ...Base, ...WithEditorTraced };

/**
* Token which recompose the base image as NoEffect Image.
*/
const EditableNoEffect = { ...Base, ...WithEditorNoEffect };

/**
* Token which recompose the base image as BlurUp Image with Landscape placeholder.
*/
const LandscapePlain = { ...Plain, ...WithLandscapePlaceholder };

/**
* Token which recompose the base image as BlurUp Image with Landscape placeholder.
*/
const Landscape = { ...Default, ...WithLandscapePlaceholder };

/**
* Token which recompose the base image as BlurUp Image with Landscape placeholder.
*/
const LandscapeTraced = { ...EditableTraced, ...WithLandscapePlaceholder };

/**
* Token which recompose the base image as BlurUp Image with Landscape placeholder.
*/
const LandscapeNoEffect = { ...EditableNoEffect, ...WithLandscapePlaceholder };

export {
  Base,
  WithEditorPlain,
  WithEditorBlurUp,
  WithEditorTraced,
  WithEditorNoEffect,
  Plain,
  Default,
  EditableTraced,
  EditableNoEffect,
  WithSiteLibrary,
  WithPageLibrary,
  WithLandscapePlaceholder,
  LandscapePlain,
  Landscape,
  LandscapeTraced,
  LandscapeNoEffect,
  WithLink,
  WithObjectFitCover,
};
