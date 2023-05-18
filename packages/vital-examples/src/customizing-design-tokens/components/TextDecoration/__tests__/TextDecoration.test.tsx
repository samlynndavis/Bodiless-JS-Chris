/* eslint-disable jest/valid-describe */
import { Span, TokenCollection } from '@bodiless/fclasses';
import { DefaultDomains, testTokens } from '@bodiless/vital-elements';
import TextDecoration from '../tokens';

const tokenCollection = TextDecoration as any as TokenCollection<any, DefaultDomains>;
describe('TextDecoration', testTokens(Span, tokenCollection));
