import { asToken, replaceWith, withDesign } from '@bodiless/fclasses';
import { CuratorClean, asCurator } from '@bodiless/curator';
import { withDesc } from '@bodiless/layouts';
import { withType } from './Categories';

const baseVariation = {
  Curator: asToken(
    replaceWith(CuratorClean),
    withDesc('A way to promote a Social wall'),
    withType('Curator')(asCurator),
  ),
};

export default withDesign(
  baseVariation,
);
