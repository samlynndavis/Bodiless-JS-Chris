[@bodiless/vital-layout](../README.md) / VitalHeader

# Interface: VitalHeader

Tokens for the vital header

**`see`** [HeaderClean](../README.md#headerclean)

## Table of contents

### Properties

- [Default](VitalHeader.md#default)
- [WithLanguageSelector](VitalHeader.md#withlanguageselector)

## Properties

### Default

• **Default**: `TokenSpec`<[`HeaderComponents`](HeaderComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Default applies the following as defaults:
- Logo
- Togglers: BurgerMenu, Search
- Defines the components: Logo, Menu, BurgerMenu, Search, WhereToBuy

**`example`** Will remove Search components & Where to Buy components
```js
import { vitalHeaderBase, asHeaderToken, } from '@bodiless/vital-layout';
import { replaceWith } from '@bodiless/fclasses';

const Default = asHeaderToken({
  ...vitalHeaderBase.Default,
  Components: {
    ...vitalHeaderBase.Default.Components,
    DesktopSearch: replaceWith(() => null),
    MobileSearch: replaceWith(() => null),
    WhereToBuy: replaceWith(() => null),
    SearchToggler: replaceWith(() => null),
  },
}),

export default {
  ...vitalHeaderBase,
  Default,
};
```

#### Defined in

[vital-layout/src/components/Header/tokens/vitalHeader.ts:128](https://github.com/wodenx/Bodiless-JS/blob/cfb0cb51a/packages/vital-layout/src/components/Header/tokens/vitalHeader.ts#L128)

___

### WithLanguageSelector

• **WithLanguageSelector**: `TokenSpec`<[`HeaderComponents`](HeaderComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Extendable token that adds language selector

#### Defined in

[vital-layout/src/components/Header/tokens/vitalHeader.ts:132](https://github.com/wodenx/Bodiless-JS/blob/cfb0cb51a/packages/vital-layout/src/components/Header/tokens/vitalHeader.ts#L132)
