# Vital Component Template

Every component/package in the Vital Design System (or one which extends it) should follow the
directory structure and conventions described below. This ensures consistency, enables
[Token Shadowing](/Development/Guides/Shadowing) and [Static Replacement](./StaticReplacement).

## Component Scaffolding

Vital provides a tool for scaffolding new components which makes it easier to ensure the standards
are met. You should use it anytime you are creating a new component or extending an existing token
collection.

To use it, run the following command from a local directory:

  ```bash
  npx @bodiless/vital-scaffold@next
  ```

Follow the prompts to create the new component. The tool will generate the file structure based on
the answers provided and populate it with the necessary files.

Below is a list of prompts and their descriptions, please note that some prompts are conditional on
previous answers.
- `Path to "src" directory where component should be created [Required]`

  Relative or absolute path to the `src` directory of the package in which the new component should
  be created. If the directory does not exist, it will show warning message. For example, if current
  working directory is project root, provide a relative path for new component: `./packages/{package
  name}/src/`, and code will be generated inside `src`.

- `Component name [Required]`

  Name of the component to create, with underscore or alphanumeric and case insensitive characters,
  e.g., `card`.  If you are extending an existing token collection, this should be the name of the
  upstream component to which that applies.

- `Library name [Required]`

  The library name to which new component will belong, with underscore or alphanumeric and case
  insensitive characters e.g., `myBrand`.

- `Upstream package to extend`

  If you plan to extend a token collection from an existing package, e.g., `@bodiless/vital-card`,
  specify the source package name here. In this case, only a token collection will be provisioned,
  and it will apply to the upstream clean component. If you are creating a new component rather than
  extending, leave it blank, and a clean component will be generated.

- `Upstream library name`

  The name of the library to which the upstream component you're extending belongs. Defaults to
  `vital`.

- `Shadow the upstream token collection (Y/n)`

  If you want to shadow the upstream token collection, type `Y` or `y` to generate shadow file
  templates. In most cases you should answer 'yes'.

- `Is the component is always static and never hydrated?`

  If you want to create a component that never hydrates, type `Y` or `y` to generate static version
  only. Otherwise, both static and dynamic versions will be created. In general, you should only
  answer 'yes' if you know that your component will never contain interactive functionality. For
  more information, see [Static Replacement](./StaticReplacement).

## File Structure

Using the scaffolding tool will produce the following file structure. Some files are optional; see
below for full details.

```
package.json
tsconfig.json
bodiless.docs.json
/doc
/src
    base.ts
    index.ts
    /components
        /{Component}
            index.ts
            index.bl-edit.ts
            index.static.ts
            {Component}Clean.tsx
            types.ts
            __tests__/
                {Component}.test.tsx
            tokens/
                index.ts
                {brand}{Component}.ts
    /shadow
        {sourcePackage}/
            {Component}.ts
```

This structure is intended to facilitate two build-time webpack optimizations:

- [Static Replacement](./StaticReplacement): Removes unnecessary code from the production bundle.
- [Token Shadowing](/Development/Guides/Shadowing): Allows a downstream package to define an
  override of any Vital token collection.

The files and directories are described in more detail below:

### Component-Level Files

#### `{Component}Clean.tsx`

Provides the clean component (if any) as a default export. It should also export the type of the
component's design keys ("slots"), and an `as...Token` function used to create token specifications.
For example:

**File `FooClean.tsx`:**

```tsx
import React from 'react';
import type { ComponentOrTag, DesignableComponentsProps } from '@bodiless/fclasses';
import { Div, Fragment, designable } from '@bodiless/fclasses';
import type { FC } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';

export type FooComponents = {
  Wrapper: ComponentOrTag<any>,
  Body: ComponentOrTag<any>,
};

const FooBase: FC<DesignableComponentsProps<FooComponents>> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Body />
  </C.Wrapper>
);

const fooComponents: FooComponents = {
  Wrapper: Div,
  Body: Fragment,
};

export default designable(fooComponents, 'Foo')(FooBase);
export const asFooToken = asVitalTokenSpec<FooComponents>();
```

If your component is _always_ static, wrap it in `withoutHydration()` (or `withoutHydrationInline()`
for components which produce inline elements):

```js
export default withoutHydration()(FooClean);
```

If your component is _sometimes_ static, export a similarly wrapped static version:

```js
export const FooStatic = withoutHydration()(FooClean);
```

?> **Note:** In some cases, there will be no clean component; for example, if a package is merely
providing tokens for a component defined elsewhere.  In such cases, this file may be omitted.

#### `tokens/{brand}{Component}.ts`

Provides the component's token collection as a default export. For example:

**File `vitalFoo.ts`:**

```js
const Default = asFooToken({ ... });
const Special = asFooToken({ ... });
// A token which is intended to be composed with other tokens should be prefixed with `With...`.
const WithSomething = asFooToken({ ... });

export default { Default, Special, WithSomething };
```

May extend a token collection from another package, for example:

```js
import { otherFooBase } from 'some-package';
const Default = asFooToken(otherFooBase.Default, { ... })
export default { ...otherFooBase, Default };
```

?> **Note:** Here we extend `otherFooBase` and **not** `otherFoo`. This is to allow shadowing of
`otherFoo` (see below).

#### `tokens/index.ts`

Simply re-exports the token collection defined in `{brandComponent}.ts`:

```js
import tokens from './vitalFoo';

export default tokens;
```

#### `index.bl-edit.ts`

This file is used in static token replacement (see below). It holds the version of a static token
and/or clean component which should be rendered in Edit Mode. This will be replaced by empty code in
the static, production bundle.

If your token collection is _always_ static, export it and the associated clean component (if any)
from this file:

```js
export { default as FooClean } from './FooClean';
// Note this export will be shadowable.
export { default as mybrandFoo } from './tokens';
```

If your token collection is _sometimes_ static, export the static version:

```js
export { FooStatic } from './FooClean';
export { default as mybrandFooStatic } from './tokens';
```

#### `index.static.ts`

If your token is always static, export empty versions of the token and clean component:

```js
import {
  StaticBlock as FooClean,  // Use `StaticInline` if your component renders inline elements.
  staticTokenCollection as mybrandFoo,
} from '@bodiless/hydration';

export { FooClean, mybrandFoo };
```

If you have both static and dynamic versions of your token collection:

```js
import {
  StaticBlock as FooStatic,  // Use `StaticInline` if your component renders inline elements.
  staticTokenCollection  as mybrandFooStatic,
  } from '@bodiless/hydration';

export { FooStatic, mybrandFooStatic };
```

?> **Note:** If your token does not have a static version, omit both `index.bl-edit.ts` and
`index.static.ts`.

#### `index.ts` (component-level)

Re-export everything from `index.bl-edit.ts`, along with any other utilities or types. Also export
the "Base" version of the token collection directly from its location.

```js
export { asFooToken, FooComponents } from './FooClean';
// This export will not be shadowable, because it is exported
// directly from `vitalFoo`.
export { default as mybrandFooBase } from './tokens/vitalFoo';
// ... any other exports or utilities.

// These exports will be excluded from the static bundle.
export * from './index.bl-edit';
```

If your token collection is not _always_ static, also export the non-static version here:

```js
export { default as vitalFooClean } from './FooClean';
export { default as vitalFoo } from './tokens';
```

#### `__tests__/{Component}.test.tsx` (component-level)

Unittest template for component and token with snapshot testing.

#### `shadow/{sourcePackage}/{Component}.ts` (component-level)

Token collection shadowing template. This file is used to shadow a token collection from upstream
package token collection.

### Top-Level Files

#### `package.json`

This should include, at a minimum, the following keys:

- `name`: Should be namespaced to `@bodiless` for Vital packages.
- `version`: This field is managed by Lerna. Currently, all Bodiless packages.
- `license`: Set to `Apache 2.0` for all Bodiless packages. maintain a common version line.
- `description`
- `author`
- `repository`
- `files`: Be sure to include all resources exported by the package.
- `sideEffects`: Usually set to `false` unless your package has them.
- `main`: Usually `./lib/index.js`.
- `typings`: Usually `./lib/index.d.ts`.
- `scripts`: Usually the following should suffice:
  ```json
    "build": "run-p build:lib build:api-doc",
    "build:api-doc": "typedoc --out doc/api src",
    "build:lib": "tsc -p ./tsconfig.json",
    "build:watch": "npm run build:lib -- --watch",
    "clean": "rimraf \"lib/*\" && rimraf tsconfig.tsbuildinfo && rimraf \"doc/api\"",
  ```
  Do not include lint or test scripts, as these are generally defined at monorepo root.
- `dependencies`, `peerDependencies`: List only packages which are specifically required.

#### `index.ts` (top-level)

Expose exports from all components:

```js
export * from './components/{ComponentA}';
export * from './components/{ComponentB}';
// ... additional utilities or types defined in your package.
// ...
```

#### `base.ts` (top-level)

Exports "base" or un-shadowed version of token collections to allow downstream consumers to extend
them. This file could exist already with other component token exports. If so, scaffold will just
append new token exports to the file.

```js
export { default as {brand}{ComponentA}Base } from '../components/{ComponentA}/tokens/{brand}{ComponentA}';
export { default as {brand}{ComponentB}Base } from '../components/{ComponentB}/tokens/{brand}{ComponentB}';
```

