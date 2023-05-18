/* eslint-disable jest/valid-describe */
import { Span } from '@bodiless/fclasses';
import { testTokens } from '@bodiless/vital-elements';
import Typography from '../tokens';

describe('Typography', testTokens(Span, Typography));
