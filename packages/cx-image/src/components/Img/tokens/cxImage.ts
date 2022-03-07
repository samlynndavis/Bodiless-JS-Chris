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
  flowHoc,
  stylable,
  addProps,
  A,
  extendMeta,
  as,
} from '@bodiless/fclasses';
import { withImagePlaceholder } from '@bodiless/components';
import { asBodilessLink, asBodilessImage } from '@bodiless/components-ui';
import { asElementToken, withoutHydration } from '@bodiless/cx-elements';

// @ts-ignore Cannot find module
import landscapeImage from '../../../../assets/landscape_image.png';

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
      withoutHydration,
    ),
  },
  Meta: flowHoc.meta.term('Type')('Image'),
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
  Meta: flowHoc.meta.term('Optimization')('Plain'),
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
    flowHoc.meta.term('Optimization')('Optimized'),
    flowHoc.meta.term('Effect')('BlurUp'),
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
    flowHoc.meta.term('Optimization')('Optimized'),
    flowHoc.meta.term('Effect')('Traced'),
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
    flowHoc.meta.term('Optimization')('Optimized'),
    flowHoc.meta.term('Effect')('No Effect'),
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
  Meta: flowHoc.meta.term('Link')('With Link'),
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

export default {
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
