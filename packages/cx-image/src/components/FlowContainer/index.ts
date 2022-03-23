import { asFluidToken, asMetaToken } from '@bodiless/cx-elements';
import {
  Img, on, varyDesigns, withDesign, as, flowHoc
} from '@bodiless/fclasses';
import { cxImage } from '../Img';

// For the base variation, we apply the default token to the design key of
// the designable element. This can be overridden from the design context.
const baseVariation = {
  Image: on(Img)(withDesign({
    Image: cxImage.Default,
  })),
};

// For variations, we apply tokens directly (not to the design key). These will
// not be overridden from the design context. This allows a site to override
// the base image globally, while still preserving variations in the flow container.
const placeholderVariations = {
  Square: as(
    cxImage.Default,
    asMetaToken(flowHoc.meta.term('Placeholder')('Square')),
  ),
  Landscape: as(
    cxImage.Default,
    cxImage.WithLandscapePlaceholder,
  ),
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
