/* eslint-disable jest/valid-describe */
import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import { FooterClean } from '@bodiless/vital-layout';
import { customFooter } from '..';

describe('Footer Tokens', testTokens(FooterClean, customFooter));
