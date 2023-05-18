/* eslint-disable jest/valid-describe */
import React from 'react';
import { as, Span, TokenCollection } from '@bodiless/fclasses';
import { DefaultDomains, testTokens } from '@bodiless/vital-elements';
import FontSize from '../tokens';

const tokenCollection = FontSize as any as TokenCollection<any, DefaultDomains>;
describe('FontSize', testTokens(Span, tokenCollection));
