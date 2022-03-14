# CanvasX Component Template

Every component/package in the CanvasX design system (or one which extends it)
should follow these conventions.

## File structure

Packages defining CanvasX components and/or tokens should use the following
file structure.
```
package.json
tsconfig.json
bodiless.docs.json
/doc
/src
    index.ts
    /components
        /{Component}
            index.ts
            index.bl-edit.ts 
            index.static.ts
            {Component}Clean.tsx
            /tokens
              index.ts
              {brand}{Component}.ts
                 
```
These are described in more detail below:

### Component Level files

#### `{Component}Clean.tsx`

Provides the clean component (if any) as a default export. It should also export
the type of the component's design keys ("slots"), and an `as...Token` function
used to create token specifications. For example:

File `FooClean.tsx`:

```ts
import React from 'react';
import type { ComponentOrTag, DesignableComponentsProps } from '@bodiless/fclasses';
import { Div, Fragment, designable } from '@bodiless/fclasses';
import type { FC } from 'react';
import { asCxTokenSpec } from '@bodiless/cx-elements';

export type FooComponents = {
  Wrapper: ComponentOrTag<any>,
  Body: ComponentOrTag<any>,
};

const FooBase: FC<DesignableComponentsProps<FooComponents>> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Body />
  <C.Wrapper>
);

const fooComponents: FooComponents = {
  Wrapper: Div,
  Body: Fragment,
};

export default designable(fooComponents, 'Foo')(FooBase);
export const asFooToken = asCxTokenSpec<FooComponents>();
```

> In some cases, there will be no clean component; for example, if a package is
> merely providing tokens for a component defined elsewhere.

#### `tokens/{brand}{Component}`

Provides the actual token collection as a default export. For example:

File `tokens/mybrandFoo`

```js
const Default = asFooToken({ ... });
export default { Default };
```

May extend a token collection from another package, for example:

```js
import { baseFoo } from 'some-package';
const Default = asFooToken(baseFoo.Default, { ...})
export default { ...baseFoo, Default };
```

#### `tokens/index.ts`

Simply re-export the default export from the token collection:
```
import tokens from './mybrandFoo';
export default tokens;
```

#### `index.bl-edit.ts`

Export the clean component and any tokens.

```js
export { default as FooClean } from './FooClean';
export { default as mybrandFoo } from './tokens';
```

Note, in many cases you will also want to export a static version of your token
collection:

```js
export { default as mybrandFoo, default as mybrandFooStatic } from './tokens';
export { default as mybrandFoo } from './tokens';
```

#### 'index.static.ts`

If your token is always static, export empty versions of the token and clean component:

```js
import {
  staticTokenCollection as mybrandFoo,
  StaticComponent as FooClean,
} from '@bodiless/hydration';

export { FooClean, mybrandFoo };
```

If you have both static and a dynamic versions of your token:

```js
import { staticTokenCollection  as mybrandFooStatic } from '@bodiless/hydration';

export { mybrandFooStatic };
export { default mybrandFoo } from './tokens';
export { default as FooClean } from './FooClean';
```

> If your token does not have a static version, omit this file.

#### `index.ts`

Re-export everything from `index.bl-edit.ts`, along with any other utilities or types:

```js
export * from './index.bl-edit';
export { asFooToken, FooComponents } from './FooClean';
// ... any other exports or utilities.
```

### Top level

#### `package.json`
This should include, at a minimum, the following keys:
- **name**. Should be namespaced to `@bodiless` for CanvasX packages.
- **version**. This field is managed by lerna.  Currently all bodiless packages
- **license**. Set to `Apache 2.0` for all Bodiless packages.
  maintain a common version line.
- **description**
- **author**
- **repository**.
- **files**. Be sure to include all resources exported by the package.
- **sideEffects**. Usually set to `false` unless your package has them.
- **main**. Usually `./lib/index.js`
- **typings**. Usually `./lib/index.d.ts`
- **scripts**. Usually the following should suffice:
  ```json
    "build": "run-p build:lib build:api-doc",
    "build:api-doc": "typedoc --out doc/api src",
    "build:lib": "tsc -p ./tsconfig.json",
    "build:watch": "npm run build:lib -- --watch",
    "clean": "rimraf \"lib/*\" && rimraf tsconfig.tsbuildinfo && rimraf \"doc/api\"",
  ```
  Do not include lint or test scripts as these are generally defined at monorepo root.
- **dependencies**, **peerDependencies**.  List only packages which are specifically
  required.

### `index.ts` (top level)

Expose exports from all components, 
```ts
export * from './components/{ComponentA}';
export * from './components/{ComponentB}';
// ... additional utilities or types defined in your package.
...
```

## Static Replacements

Bodiless supports a performance optimization which helps remove unused code from
your production bundle through selective hydration. There are two supported
use-cases:
- Components which *never* need to be hydrated (those that do not contain any
  interactivity, and require React only for editing and/or rendering). Examples
  are *text fields* (with plain or rich text editors) and *images*.
- Components which *sometimes* need to be hydrated (those whose children may
  require React for interactivity in the browser). Examples are *links*,
  *cards*, etc.
  
Note that this technique does not apply to components which *always* need to be
hydrated (*search*, *product filters*, etc).

Both supported use-cases are implemented by following the following steps:
- Add the bodiless static file replacement plugin to your webpack configuration
  using the `addStaticReplacementPlugin` function from `@bodiless/webpack`:
  ```
  const newConfig = addStaticReplacementPlugin(existingConfig);
  ```
  This should be added only when building production bundles, and *must not* be
  added for server-side rendering.

  **Note: you can skip this step when using `gatsby-theme-bodiless`***

- Create an `index.bl-edit.ts` and matching `index.static.ts` at the top level
  of each component. different depending on whether the component/tokens may
  *sometimes* require hydration.

### Components which *never* require hydration

For these components, you will need to do the following. *(Note: in the examples
below replace `MyComponent` with the name of your component, and `mybrand` with
the name of your brand or design system.)*
- Ensure the clean version of your component is wrapped in the bodiless
  `withoutHydration` HOC. In your `MyComponentClean.tsx`
  ```
  import { withoutHydration } from '@bodiless/hydration';
  // Define your base clean component as usual.
  const MyComponentClean$ = ...;
  // wrap in withoutHydration
  export const MyComponentClean = withoutHydration(MyComponentClean$);
  ```
- Export normal versions of the component and its token collection in your
  `index.bl-edit.ts`:
  ```
  export { default as MyComponentClean } from './MyComponentClean';
  export { default as mybrandMyComponent } from './tokens';
  // Be sure to include any other exports
  export { asComponentToken, ... } from './ComponentClean';

- Export static versions of the component and its token collection. In your
  `index.static.ts`:
  ```
  export { StaticComponent as MyComponentClean } from '@bodiless/hydration';
  export { staticTokenCollection as mybrandMyComponent } from './tokens';
  // Be sure to include any other exports which should not be removed in static mode.
  export { asComponentToken, ... } from './ComponentClean';
  ```
  > You may want to collect exports (if any) which should not be replaced in
  > static mode into a common file which can be included in both `index.ts` and
  > `index.static.ts`.

- Add an `index.ts` file which just exports everything from `index.bl-edit.ts`:
  ```
  export * from './index.bl-edit';
  ```

Now, when the production bundle is built, your `index.bl-edit.ts` will be
replaced by `index.static.ts`, which will cause all your component and token
code (along with its dependencies) to be excluded from the bundle.

## Token Shadowing

Bodiless provides a mechanism to override the tokens provided by a CanvasX
package, changing their effect wherever they are used in the CanvasX design
system. The method, known as "Token Shadowing" is similar to
[Gatsby Component Shadowing](https://www.gatsbyjs.com/blog/2019-04-29-component-shadowing/),
but more restrictive. In particular, only token collections are shadowable using
this technique, and the package to be shadowed must be structured specifically
to enable this feature.

### Creating a shadowable token collection

