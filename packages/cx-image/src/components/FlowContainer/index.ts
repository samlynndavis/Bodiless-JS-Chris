import { asFluidToken, asMetaToken } from '@bodiless/cx-elements';
import {
  flowHoc, on, varyDesigns, withDesign
} from '@bodiless/fclasses';
import { cxImage, ImageClean } from '../Img';

// For the base variation, we apply the default token to the design key of
// the designable element. This can be overridden from the design context.
const baseVariation = {
  Image: on(ImageClean)(withDesign({
    Image: cxImage.Default,
  })),
};

// For variations, we apply tokens directly (not to the design key). These will
// not be overridden from the design context. This allows a site to override
// the base image globally, while still preserving variations in the flow container.
const placeholderVariations = {
  Square: asMetaToken(flowHoc.meta.term('Placeholder')('Square')),
  Landscape: cxImage.WithLandscapePlaceholder,
};

/**
 * Token which adds image variations to a flow container.
 */
const WithImageVariations = asFluidToken({
  Components: varyDesigns(
    baseVariation,
    placeholderVariations,
  ),
});

export const cxImageFlowContainer = { WithImageVariations };
