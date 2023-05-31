import { withNode, withNodeKey } from '@bodiless/data';
import {
  as, on, withDesign
} from '@bodiless/fclasses';
import { asAccordionToken } from '@bodiless/vital-accordion';
import { vitalAccordionBase } from '@bodiless/vital-accordion/lib/base';
import { asFluidToken } from '@bodiless/vital-elements';
import { FlowContainerClean } from '@bodiless/vital-flowcontainer';
import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer/lib/base';
import { vitalYouTube, YouTubeClean } from '@bodiless/vital-youtube';

const WithFAQSchema = asAccordionToken(
  vitalAccordionBase.WithFAQSchema, {
    SEO: {
      Title: withDesign({
        Label: 'uppercase',
      }),
    },
    Schema: {
      ...vitalAccordionBase.WithFAQSchema.Schema,
      _: as(
        withNode,
        withNodeKey('TESTNODE - FAQ'),
      ),
    },
  },
);

const WithOnlyVideo = asAccordionToken(vitalAccordionBase.Default, {
  Components: {
    ...vitalAccordionBase.Default.Components,
    Body: withDesign({
      Content: on(FlowContainerClean)(asFluidToken(vitalFlowContainerBase.Default, {
        Components: {
          YouTube: on(YouTubeClean)(vitalYouTube.Default),
        },
      },)),
    }),
  },
});

export default {
  ...vitalAccordionBase,
  WithFAQSchema,
  WithOnlyVideo,
};
