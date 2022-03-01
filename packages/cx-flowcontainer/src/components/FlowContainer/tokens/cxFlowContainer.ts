import omit from 'lodash/omit';
import {
  addProps, replaceWith, as, on, flowHoc,
} from '@bodiless/fclasses';
import {
  withMandatoryCategories, withAllTitlesFromTerms, ifComponentSelector,
} from '@bodiless/layouts';
import { asFluidToken } from '@bodiless/cx-elements';
import { cxImageFlowContainer } from '@bodiless/cx-image';
import { cxEditorsFlowContainer } from '@bodiless/cx-editors';

import { FlowContainerPreview, FlowContainerClean, withDesignRegistryName } from '../FlowContainerClean';

// import { RichTextClean, cxRichText } from '../RichText';
// import { ListClean, cxList } from '../List';
// import { cxCompoundList } from '../CompoundList';
// import { withComponentId } from './WithComponentId';

const blacklistCategories = ['Group'];
const mandatoryCateogries = ['Type'];

/**
 * Token which creates the CanvasX Default Base for a Flow Container
 */
const Base = asFluidToken({
  Core: {
    _: as(
      withAllTitlesFromTerms({ blacklistCategories }),
      withMandatoryCategories(mandatoryCateogries),
      addProps({ blacklistCategories }),
    ),
    // @todo restore tools and component id badge
    // ComponentWrapper: flowIf(() => useInfoContext().enabled)(withComponentId),
  },
  Spacing: {
    // @todo what is this class?
    // Wrapper: 'flow-container-wrapper',
    Wrapper: '-px-5',
    // @todo Should there be an element token for these gutters?
    ComponentWrapper: 'p-5',
  },
});

/**
 * @private
 * SnapData function to use for a full width constrained flow container.
 */
const snapData = () => ({
  width: 100,
  className: 'w-full',
  currentMediaTuples: [{
    width: 100,
    className: 'w-full',
    media: '0px',
  }],
});

/**
 * Token which constrains a flow container to full width.
 */
const WithFullWidthConstraint = asFluidToken({
  Core: {
    _: addProps({ snapData }),
  },
});

/**
   * Token which constrains a flow container so that items are 1/3 width on tablet.
   */
const WithTabletOneThirdConstraint = asFluidToken({
  Core: {
    Wrapper: 'w-full',
    ComponentWrapper: 'w-full md:w-1/3',
  },
});

/**
   * Token which defines a "ContentRegion" (a default nested flow container).
   * another flow contaienr.
   */
const AsFlowContainerItem = asFluidToken({
  Meta: flowHoc.meta.term('Type')('Content Region'),
  Core: {
    _: as(
      addProps({ itemButtonGroupLabel: 'Content Block', buttonGroupLabel: 'Content Block' }),
      ifComponentSelector(
        replaceWith(FlowContainerPreview),
      ),
    ),
  },
});

const WithBaseVariations = asFluidToken(
  cxImageFlowContainer.WithImageVariations,
  cxEditorsFlowContainer.WithEditorVariations,
);

/**
 * A content region is a flow container designed to be nested
 * inside another flow container.
 */
const ContentRegion = asFluidToken(
  omit(Base, 'Spacing'),
  withDesignRegistryName('ContentRegion'),
  WithBaseVariations,
  {
    Compose: {
      AsFlowContainerItem,
    },
  },
);

/**
 * Adds a content region to a flow container.
 */
const WithContentRegionVariations = asFluidToken({
  Components: {
    ContentRegion: on(FlowContainerClean)(ContentRegion),
  },
});

const Default = asFluidToken(
  Base,
  withDesignRegistryName('FlowContainerDefault'),
  WithBaseVariations,
  WithContentRegionVariations,
);

export default {
  Base,
  Default,
  ContentRegion,
  WithContentRegionVariations,
  AsFlowContainerItem,
  WithFullWidthConstraint,
  WithTabletOneThirdConstraint,
};
