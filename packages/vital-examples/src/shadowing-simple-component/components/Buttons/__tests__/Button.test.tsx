/* eslint-disable jest/valid-describe */
import { Button, TokenCollection } from '@bodiless/fclasses';
import { DefaultDomains, testTokens } from '@bodiless/vital-elements';
import Buttons from '../tokens';

const tokenCollection = Buttons as any as TokenCollection<any, DefaultDomains>;
describe('Buttons', testTokens(Button, tokenCollection));
