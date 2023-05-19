/* eslint-disable jest/valid-describe */
import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import { SectionClean } from '@bodiless/vital-section';
import { exampleSection } from '..';

jest.mock('slate', () => ({
  Editor: () => (<div>Heal the world!</div>),
  Raw: {
    deserialize: jest.fn(),
    serialize: jest.fn()
  }
}));

describe('Dialog Tokens', testTokens(SectionClean, exampleSection));
