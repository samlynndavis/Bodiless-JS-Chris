# Learn how to Customize Design Tokens

In this lesson we will learn how to shadow the design elements, these are the base elements for customizing a website, in it we will define colors, fonts, typography and the like.

## Overview

In this lesson we will:

- Shadow the vital colors with [this palette](https://coolors.co/ccfbfe-cdd6dd-cdcacc-cdaca1-cd8987).
- Shadow vital text decoration to customize the font weight
- Shadow H1 and H2 element tokens to use our custom font and it's properties.


## Assignment

First, we'll need to edit the `tailwind.config.js` file to add the custom variable, colors, font and sizes for examples. You can follow [the naming convention from tailwind](https://tailwindcss.com/docs/customizing-colors#naming-your-colors).
Note that we use the `vital-` prefix to define our colors, our tailwind file will look like this

#### `tailwind.config.js`
```js
module.exports = {
  theme: {
    colors: {
        'vital-primary': {
            brand: '<COLOR>',
            // ...
        },
        // ...
    }
  }
}
```
**PS:** With this, the colors should be already overrided.
You can find all vital colors [in here](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-elements/src/components/Color/tokens/vitalColor.ts).

Then under the `src/component` folder, we'll create the files with the Components names, in our case, we'll override the `Typography` and `TextDecoration`, so we create theses files.

### TextDecoration

The `TextDecoration` class is easier to do, since we just export some tokens with only a class for each tokens, our file will look like this.

#### `src/component/TextDecoration.ts`
```ts
import { asTokenGroup, TextDecorationMeta } from '@bodiless/vital-elements';
import { vitalTextDecorationBase } from '@bodiless/vital-elements/src/base';

export default asTokenGroup(TextDecorationMeta)({
  ...vitalTextDecorationBase,
  Book: 'font-book',
  Bold: 'font-black',
});

```

**PS:** the `asTokenGroup` function creates a group of element tokens that share the same meta.

In this example we overwrite the the `Bold` token to set a bolder font and also create the new `Book` font weight, which is lighter than the vital text decoration tokens.

### Typography

For the typography, we will have to do some more work, each typography element should be a instance of `asElementToken`, so we can rely on Domains to help us to define our tokens. Our typography file will be something like this.

#### `src/component/Typography.ts`
```ts
import { asElementToken, vitalColor, vitalTextDecoration } from '@bodiless/vital-elements';
import { vitalTypographyBase } from '@bodiless/vital-elements/src/base';

const H1 = asElementToken({
  Core: {
    _: as(vitalTextDecoration.Normal, 'text-5xl'),
  },
  Theme: {
    _: vitalColor.TextPrimaryBrand,
  },
});

const H2 = asElementToken({
  Core: {
    _: as(vitalTextDecoration.ExtraBold, 'text-3xl'),
  },
  Theme: {
    _: vitalColor.TextPrimaryBodyCopy,
  },
});

export default {
    ...vitalTypographyBase,
    H1,
    H2
}
```

In this example, we create a custom H1 and H2 Tokens and exporting them with the vital typography base.

## Practice

Now you can try to create you own shadow files, try to customize some vital text decorations tokens, or even create a new typography token.

## FAQ

<!--
    If you remember any of the questions you had when completing this task — or can think of any
    questions a new developer may have — document the Questions and Answers here.
-->

### [ QUESTION 1 ]

<!-- Answer to QUESTION 1 -->

### [ QUESTION 2 ]

<!-- Answer to QUESTION 2 -->
