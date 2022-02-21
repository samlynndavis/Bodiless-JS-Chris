import { as } from '@bodiless/fclasses';
import {
  asBodilessChameleon,
} from '@bodiless/components';
import { asElementToken } from '@bodiless/cx-elements';
import { asBodilessPage } from '../asBodilessPage';

const Default = asElementToken({
  Core: {
    _: as(
      asBodilessChameleon('template', undefined, () => ({
        root: true,
        label: 'Template',
        icon: 'grid_view',
        group: 'page-group',
        formTitle: 'Choose a template for this page',
      })),
    ),
  },
  // @todo restore tools
  // Behavior: {
  //   _: withTools,
  // },
  Schema: {
    _: asBodilessPage,
  },
  // Override this to set nonstandard breakpoints.
  // @todo revisit breakpoints after responsive refactor
  // Layout: {
  //   _: withPageDimensionsContext({ breakpoints }),
  // },
  // @todo add GTM
  // Analytics: {
  //   _: withGTMDesignKeys,
  // },
});

export default { Default };
