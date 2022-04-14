import {
  withDesign, stylable, addClasses, HOC,
} from '@bodiless/fclasses';
import { flow } from 'lodash';
import asToken from '../components/asToken';
import { asTxtPink } from '../components/Elements.token';

export const asSmall = asToken('Size')(withDesign({
  Wrapper: flow(stylable, addClasses('w-1/4 foo')),
}) as HOC);

export const asMedium = asToken('Size')(addClasses('w-1/2'));

export const asLarge = asToken('Size')(addClasses('w-full'));

export const asToutPinkTitle = asToken('Appearance')(withDesign({ Title: asTxtPink }) as HOC);
