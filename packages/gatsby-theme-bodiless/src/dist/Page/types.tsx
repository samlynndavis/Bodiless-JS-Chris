import { Props as NodeProviderProps } from '../GatsbyNodeProvider';
import { PageProviderProps } from '../GatsbyPageProvider';
import { UI } from './Page.edit';

export type PageProps = NodeProviderProps & PageProviderProps & {
  ui?: UI;
};
