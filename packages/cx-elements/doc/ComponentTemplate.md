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
            {Component}Clean.tsx
            /tokens
              index.ts
              {brand}{Component}.ts
                 
```
## Static Exports

Bodiless supports a performance optimization which helps remove unused code from your
production bundle through selective hydration. There are two supported use-cases:
- Components which *never* need to be hydrated (those that do not contain any
  interactivity, and require React only for editing and/or rendering).  Examples are
  *text fields* (with plain or rich text editors) and *images*.
- Components which *sometimes* need to be hydrated (those whose children may require
  React for interactivity in the browser).  Examples are *anchors*, *cards*, etc.
Note that this technique does not apply to components which *always* need to be
hydrated (*search*, *product filters*, etc).

Both supported use-cases are implemented by implementing the following steps:
- In your webpack config,  defining a webpack conditional export
using the custom condition "bodiless:static".  In your pack
- Create a static version of 

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
  