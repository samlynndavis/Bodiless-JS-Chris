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
    index.static.ts
    /components
        /{Component}
            index.ts
            index.static.ts
            {Component}Clean.tsx
            /tokens
              index.ts
              {brand}{Component}.ts
                 
```
## Static Exports

Bodiless supports a performance optimization which helps remove unused code from
your production bundle through selective hydration. There are two supported
use-cases:
- Components which *never* need to be hydrated (those that do not contain any
  interactivity, and require React only for editing and/or rendering). Examples
  are *text fields* (with plain or rich text editors) and *images*.
- Components which *sometimes* need to be hydrated (those whose children may
  require React for interactivity in the browser). Examples are *anchors*,
  *cards*, etc. Note that this technique does not apply to components which
  *always* need to be hydrated (*search*, *product filters*, etc).

Both supported use-cases are implemented by following the following steps:
- Add the custom condition to your webpack configuration using the
  `addStaticExportsCondition` function from `@bodiless/webpack`:
  ```
  const newConfig = addStaticExportsCondition(existingConfig);
  ```
  This should be added only when building production bundles, and *must not* be
  added for server-side rendering HTML.

  **Note: you can skip this step when using `gatsby-theme-bodiless`***

- Define a conditional export in your `package.json` which tells webpack to use
  a different module when building the prodction bundle:
  ```

  "exports": {
      ".": {
          "bodiless:static": "./lib/index.static.js",
          "default": './lib/index.js"
      }
  }
  ```
- Create an `index.static.ts` at the top level of your `/src` directory, with an
  export from each of the components defined in your package.
  ```
  export * from './components/{ComponentA}/index.static';
  export * from './components/{ComponentB}/index.static';
  ...
  ```
- Create an 'index.static.ts' for each of your components. This will be slightly
  different depending on whether the component/tokens may *sometimes* require
  hydration.

### Components which *never* require hydration

For these components, you will need to do the following. *(Note: in the examples below
replace `MyComponent` with the name of your component, and `mybrand` with the name of your
brand or design system.)*
- Ensure the clean version of your component is wrapped in the bodiless `withoutHydration`
  HOC.  In your `MyComponentClean.tsx`
  ```
  import { withoutHydration } from '@bodiless/hydration';
  // Define your base clean component as usual.
  const MyComponentClean$ = ...;
  // wrap in withoutHydration
  export const MyComponentClean = withoutHydration(MyComponentClean$);
  ```
- Export static versions of the component and its token collection. In your
  `index.static.ts`:
  ```
  import { StaticComponent, staticTokenCollection } from '@bodiless/hydration';
  export const MyComponentClean = StaticComponent;
  export const mybrandMyComponent = staticTokenCollection;
  // Be sure to include any other exports which should not be removed in static mode.
  export { asComponentToken, ... } from './ComponentClean';
  ```
  > you may want to collect exports (if any) which should not be replaced in
  > static mode into a common file which can be included in both `index.ts` and
  > `index.static.ts`.


## Notes on files/directories

### `package.json`
This should include, at a minimum, the following keys:
- **name**. Should be namespaced to `@bodiless` for CanvasX packages.
- **version**. This field is managed by lerna.  Currently all bodiless packages
- **license**. Set to `Apache 2.0` for all Bodiless packages.
  maintain a common version line.
- **description**
- **author**
- **repository**.
- **files**. Be sure to include all resources required by the package.
- **sideEffects**. Usually set to `false` unless your package has them.
- **main**. Usually `./lib/index.js`
- **typings**. Usually `./lib/index.d.ts`
- **exports**. Should include at least the following:
  ```
  "exports": {
    ".": {
      "bodiless:static": "./lib/index.static.js",
      "default": "./lib/index.js"
    }
  ```
  If your package exports any other files or assets, be sure to add them as sell.
- **scripts**. Usually the following should suffice:
  ```
    "build": "run-p build:lib build:api-doc",
    "build:api-doc": "typedoc --out doc/api src",
    "build:lib": "tsc -p ./tsconfig.json",
    "build:watch": "npm run build:lib -- --watch",
    "clean": "rimraf \"lib/*\" && rimraf tsconfig.tsbuildinfo && rimraf \"doc/api\"",
  ```
  Do not incluce lint or test scripts as these are generally defined at monorepo root.
- **dependencies**, **peerDependencies**.  List only packages which are specifically
  required.
  