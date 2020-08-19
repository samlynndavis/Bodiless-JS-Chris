# FlowContainer Component

The flowContainer component is a layout component that allows you to select from a set of components, place them on the page, and resize them.

## User Details

When an empty flowContainer is on the page you will only see a single empty line.

### Add a new component

When you activate a flowContainer you will be able to add a new component to the flowContainer via the menu.

By clicking on the component selector button you can scroll through all of the available components. You can filter the components by:

* Using search facets to filter out components that do not match the selection (you can undo this by clicking the "select all" checkbox at the top).
* Using the search box field to search across all of the component titles.

You can hover over the infomation icon to see a description of the component.

When you have found the right component, simply click on it, and it will be
added at the end of the activated flowContainer.

### Removing a component

When any component in the flowContainer is active it will provide a delete button to the context menu. Clicking on this icon will remove the component.

### Resizing a component

When any component in the flowContainer is active it will appear with a blue
border. You can resize the component by clicking on the right edge of the
border. Note: this can be done at different breakpoints to adjust the size of
the component at that breakpoint and above.

The sizes are finite and defined by the creator of that particular flowContainer.
Smaller breakpoints will offer fewer options for resizing.

### Reordering a component

When any component in the flowContainer is active it will appear with a blue
double line icon in the top left corner of the component. By clicking and
dragging this icon you can reorder components in the flowContainer.

### Replacing a Component

To change a component's type you must remove that component and replace it with the new component type.

## Technical Details

### Adding components to the FlowContainer

The FlowContainer uses the Design API to collect the components to make available for placement. This can be passed in using the `design` prop, or by using the higher order component: `withDesign`.

``` js
design = {
    Tout: flow(startWith(Tout), asDefaultTout),
    ToutVertical: flow(startWith(Tout), asVerticalTout, asDefaultTout),
  }
const SiteFlowContainer = withDesign(design)(FlowContainer);

or

<FlowContainer design={design} />
```

> *(Note: the last example should only be used if there is no more reuse.*
`withDesign` *can be used over and over)*.

In either case you can use the `startWith` HOC to declare the base component and then use any other hoc that will add to this specific version.

### Meta data HOCs

To add meta data (used by the flowContainer in its component selector) the following HOCs are available.

* **`withName`**: can be used to set the name that will appear in the component selector.

  ``` js
  {
    Tout:  flow(startWith(Tout), withName('Tout')),
  }
  ```

  > There is also an appended version of `withTitle` called `withAppendTitle` which will just add to the title that already exists.

---

* **`withDesc`**: can be used to set the description that is used in the component selector.

  ``` js
  {
    Tout:  flow(startWith(Tout), withDesc('The Tout touts something special on which an visitor can act.')),
  }
  ```

  >There is also an append version of `withDesc` called `withAppendDesc` which will add to the title that already exists.
  
---

* **`withTerm`**: can be used to add a term to a category that the component selector will use when giving facets.
  
  ``` js
  {
    Tout:  flow(startWith(Tout), withTerm('Type')('Tout')),
  }
  ```

---

* **`withFacet`**: is similar to `withTerm` but it appends the term to the title, and adds the category and term to the description as well as taking a hoc that will be applyed to the component.

  ``` js
  {
  Tout:  flow(startWith(Tout), withFacet('Color')('Red')(asRedTout)),
  }
  ```

  > *If you are going to use a lot of `withFacet`'s with the same category you can create a new function that defines the category.*
  >
  > *For example:*
  >
  > ``` js
  > const withType = withFacet('Type');
  > {
  >  Tout:  flow(startWith(Tout), withType('Tout')(asTout)),
  > } ```
  
---

Also one can use the Design API function to combine designs in diffent variations.

### Control Component Widths

The flowContainer controls the width of components by setting different classes on their wrapper component. The flowContainer uses a set of tailwind width classes by default. The `snapData` prop allows the user to provide a function that can set any set of classes.

This function should take an object with a className property (which is a string of the current classes) and a width property. It then returns an object with a className property (an updated version of the className) and a width property (the width to which it should snap). Both width properties are expressed in percentages (e.g. 50%, 75%).

#### Helper functions for snap Data

There are two helper functions for `snapData`.

* **`withTailwindClasses`**: takes a tailwind configuration and the the classes in that configuration you would like to use. It returns a snapData function using the data from the tailwind config.

   ``` js
   import tailwindConfig from '../tailwind.config';

   const snapData = withtailwindClasses(tailwindConfig)('w-full, md:w-full, md:w-1/2, lg:w-full, lg:w-1/2, lg:w-1/3, lg:w-1/4');
   ```
---

* **`getSnapFrom`**: can be used with `withTuple` to create a snapData as well. Each `withTuple` takes a mediaQuery at which it is active, a width to which it corresponds and a class to used.

  ``` js
  const defaultSnapData = getSnapFrom(
    withTuple('(min-width: 0px)')(100)('w-full'),
    withTuple('(min-width: 576px)')(50)('sm:w-1/2'),
    withTuple('(min-width: 576px)')(100)('sm:w-full'),
    withTuple('(min-width: 992px)')(25)('lg:w-1/4'),
    withTuple('(min-width: 992px)')(33.33)('lg:w-1/3'),
    withTuple('(min-width: 992px)')(50)('lg:w-1/2'),
    withTuple('(min-width: 992px)')(66.66)('lg:w-2/3'),
    withTuple('(min-width: 992px)')(75)('lg:w-3/4'),
    withTuple('(min-width: 992px)')(100)('lg:w-full'),
  );
  ```

---

#### Default Width

You can set the default width for a new item via the `defaultWidth` prop. This should be a number
from 0-100 expressing the desired default width as a percentage. The actual default width will be
the smallest *allowed* width which is greater than the value specified.  For example, if you set
allowed widths of 50% and 100%, specifying `defaultWidth="51"` will give you an actual default width
of 100%.

### Limit Number of Components

**`maxComponents`** will limit the number of components that can be added to the flowContainer. If the number of components equals the value of maxComponents then the add button will not be visible. If a component is removed and the number of components is less than the max value then the add button will reappear.