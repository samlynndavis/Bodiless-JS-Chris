import { as } from '@bodiless/fclasses';
import { asButtonToken } from '@bodiless/vital-buttons';
import { vitalButtonsBase } from '@bodiless/vital-buttons/src/base';
import {
  vitalColor,
  vitalFontSize,
  vitalTextDecoration,
} from '@bodiless/vital-elements';

const WithPrimary = asButtonToken({
  ...vitalButtonsBase.Primary,
  Theme: {
    ...vitalButtonsBase.Primary.Theme,
    Wrapper: as(
      vitalColor.BgPrimaryBrand,
      vitalColor.TextWhite,
      vitalTextDecoration.Bold,
      vitalTextDecoration.Uppercase,
      vitalFontSize.Base,
      'rounded hover:bg-vital-primary-interactive transition-colors duration-400',
    ),
  },
});

const WithBigButton = asButtonToken({
  ...vitalButtonsBase.Default,
  Spacing: {
    ...vitalButtonsBase.Default.Spacing,
    Wrapper: 'px-12 py-6',
  },
});

export default {
  ...vitalButtonsBase,
  WithPrimary,
  WithBigButton,
};
