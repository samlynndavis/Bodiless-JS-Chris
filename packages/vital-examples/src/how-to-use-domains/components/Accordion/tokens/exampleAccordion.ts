import {
  on, withDesign
} from '@bodiless/fclasses';
import { asAccordionToken } from '@bodiless/vital-accordion';
import { vitalAccordionBase } from '@bodiless/vital-accordion/lib/base';
import { asFluidToken } from '@bodiless/vital-elements';
import { FlowContainerClean } from '@bodiless/vital-flowcontainer';
import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer/lib/base';
import { vitalYouTube, YouTubeClean } from '@bodiless/vital-youtube';
import { exampleAccordionBody } from '../../AccordionBody';

/**
 * Here we extend the Default accordion's tokens using the merge pattern,
 * but use the spread operator to extend the 'Components' domain so that
 * we can replace the 'Body' slot with a custom flow container that will *only*
 * contain a YouTube video.
 */
const WithOnlyVideo = asAccordionToken(vitalAccordionBase.Default, {
  Components: {
    ...vitalAccordionBase.Default.Components,
    Body: withDesign({
      Content: on(FlowContainerClean)(asFluidToken({
        ...vitalFlowContainerBase.Default,
        Components: {
          YouTube: on(YouTubeClean)(vitalYouTube.Default),
        },
      },)),
    }),
  },
});

/**
 * Here we use the same pattern from above, this time replacing
 * our 'Body' slot with the 'WithSlidingDrawer' AccordionBody token
 * created in our exampleAccordionBody.ts file.
 */
const WithSlidingDrawer = asAccordionToken(vitalAccordionBase.Default, {
  Components: {
    ...vitalAccordionBase.Default.Components,
    Body: exampleAccordionBody.WithSlidingDrawer,
  },
});

export default {
  ...vitalAccordionBase,
  WithOnlyVideo,
  WithSlidingDrawer
};
