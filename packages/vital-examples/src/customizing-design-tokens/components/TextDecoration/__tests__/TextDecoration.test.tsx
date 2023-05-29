/* eslint-disable jest/valid-describe */
import { Span } from '@bodiless/fclasses';
import { testTokens } from '@bodiless/vital-elements';
import { exampleTextDecoration } from '..';

// @todo Fix type matching on text decoration token collection.
describe('TextDecoration', testTokens(Span, exampleTextDecoration));
