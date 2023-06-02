# Tailwind Responsiveness

In this lesson we will learn how to define our site breakpoints and shadow the vital spacing.

## Overview

This is a very quick lesson, first, we will define our breakpoints on the `tailwind.config.js` file, then we will shadow vital-spacing to override the tokens we want.
In this case, we will:
1. Define our breakpoint base on the [Bootstrap Breakpoint](https://getbootstrap.com/docs/5.0/layout/breakpoints/)
2. Define responsive container margins
3. Define site max width.

## Assignment

### Define our breakpoints.

Let's start by taking a look into the bootstrap breakpoint values.

|Breakpoint|Class infix|Dimensions|
|----------|-----------|----------|
|X-Small|None|<576px|
|Small|sm|≥576px|
|Medium|md|≥768px|
|Large|lg|≥992px|
|Extra large|xl|≥1200px|
|Extra extra large|xxl|≥1400px|

Bootstrap also implement mobile first concept, so the values are the min-width where that breakpoint should start as well,What will make our work easier, we will only have to define the values in our configuration file, so we will have something like this.

```js
...
theme: {
  screens: {
    // @media (min-width: 576px) { ... }
    sm: '576px',
    // @media (min-width: 768px) { ... }
    md: '768px',
    // @media (min-width: 992px) { ... }
    lg: '992px',
    // @media (min-width: 1200px) { ... }
    xl: '1200px',
    // @media (min-width: 1400px) { ... }
    xxl: '1400px',
  },
}
...
```

Since we are shadowing vital elements, we should import the base version of the component.

```ts
...
import { vitalSpacingBase } from '@bodiless/vital-elements/src/base';
...
```
And once we have the base all the base variations from the vital package, we can spread `vitalSpacingBase.Primary` to preserve the domains that we don't want to change.
As we're going to add a transition to our button, we're going to use the Theme domain once again, spreading this domain from `vitalSpacingBase.Primary` to preserve the button's settings and prevent unintentional modifications.

```ts
...
const WithPrimary = asButtonToken({
  ...vitalSpacingBase.Primary,
  Theme: {
    /**
     * Spreading Theme here prevents unwanted changes, keeping all tokens other than the wrappers.
     */
    ...vitalSpacingBase.Primary.Theme,
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
...
```
Here we rely on the `asButtonToken` function to help us with the tokens convention. This function extends from [asVitalTokenSpec](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-elements/src/util/tokenSpec.ts#L48) to create the token definition utility for te [ButtonClean](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-Spacing/src/components/Spacing/ButtonClean.tsx) component.

**PS:** As you can notice, we use a mix of `vital-elements` tokens and tailwind classes to compose our token.

Now, let's create a new button variation, a bigger button, with extra padding, for this, we should follow the naming convetion, variations tokens should be prefixed by `With`, so our new variation will look like this.

```ts
/**
 * Here we follow the same logic, but this time, we'll create a new variation of button, a big
 * button with extra padding.
 */
const WithBigButton = asButtonToken({
  ...vitalSpacingBase.Default,
  Spacing: {
    ...vitalSpacingBase.Default.Spacing,
    Wrapper: 'px-12 py-6',
  },
});
```
After we're done with the tokens, we should export these tokens alongside the ones from vital Spacing.

```ts
// Exporting the vitalSpacingBase with our custom Primary with hover, and our new big variation.
export default {
  ...vitalSpacingBase,
  WithPrimary,
  WithBigButton,
};
```


### Shadowing

And now, to shadow the our tokens, create a `Spacing.ts` file with the same path of the package, in our case, since we are shadowing the `@bodiles/vital-Spacing` package, we'll have this structure.

```bash
├── shadow
│   ├── @bodiless
│   │   ├── vital-Spacing
│   │   |   └─ Spacing.ts
```

<!-- Waiting for the actual function to be available; -->
Each file must only export the tokens from the components folder with the our helper `shadow` function. You can see more about this function [here](TBD).

Our whole file will only have 3 lines.

```ts
import { shadow } from '@bodiless/vital-elements';
import { exampleSpacing } from '../../../components/Spacing';

export default shadow(exampleSpacing, 'Example:Spacing');
```

That's all, with this done, ou primary button will have a nice looking transition, and we will also have a new variation, a bigger button with extra padding, which can go with all other existing tokens.

## Practice

Now you can try to create you own shadow files, try to customize some vital text decorations tokens, or even create a new typography token.
