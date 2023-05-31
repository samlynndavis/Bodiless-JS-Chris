/* eslint-disable jest/valid-describe */
import { Button } from '@bodiless/fclasses';
import { testTokens } from '@bodiless/vital-elements';
import { exampleButtons } from '..';

describe('Buttons', testTokens(Button, exampleButtons));
