# FClasses Design System Framework

The FClasses Design System Framework was created to facilitate the
implementation of an *extensible* Design System in a React application. It
enables reuse of core, white-label components across multiple sites with widely
varying requirements. It is the foundation of the
[VitalDS component library](https://johnsonandjohnson.github.io/Bodiless-JS/#/VitalDesignSystem/).

## Additional Reading

- Before diving into the technical details below, it might make sense to read
  our
  [high level overview of the Vital Design System](https://johnsonandjohnson.github.io/Bodiless-JS/#/VitalDesignSystem/)
  to better understand the general patterns at work.
- You may also want to start with the introductory lessons in the
  [VitalDS Curriculum](https://johnsonandjohnson.github.io/Bodiless-JS/#/VitalDesignSystem/Curriculum/Introduction/)
  which will give you hands-on experience in using the API.
- You may also want to refer to [the full [API Documentation]()

## Introduction

This library expresses *Design Tokens* as structured collections of React
higher-order components, and provides utilities which allow you to apply them to
both simple elements and compound components. Although it can be used with any
styling paradigm, FClasses works best in conjunction with "atomic" or
"functional" CSS (eg. [TailwindCSS]()), defining units of design as collections
of utility classes.

The FClasses library is composed of several separate API's which can be used
independently or together. These are described in the sections below. For each,
we provide an overview of the API and its relationship to other common patterns
in the modern React ecosystem, along with an explanation of its intended uses
and benefits.

## AddClasses API

At the simplest level we have the AddClasses API. This just a set of functions
which can be used to add or remove classes from an HTML element.

### Overview

These functions are fairly self-explanatory.

```
import { stylable, addClasses, removeClasses, addClassesIf } from '@bodiless/fclasses';

const Span = stylable('span');

const StyledSpan = addClasses('foo')(Span) // <span className="foo" />
const UnstyledSpan = removeClasses('foo')(WithFoo); // <span />
const FooIfLoggedIn = addClassesIf(useIsUserLoggedIn)('foo')(Span);
```

Note that these functions must be applied to elements or components which are
wrapped in the `stylable` HOC.  For convenience, the fclasses library exports
stylable versions of all basic HTML elements:

```ts
import { Span } from '@bodiless/fclasses'
```

### Purposes

#### Economy
One advantage is simplicity and economy, leading tp code which is easier to
understand and maintain. Compare the above with an implementation in "normal"
React:

```ts
import classnames from 'classnames'; // Would be even more complex without this external library.
const StyledSpan = ({ className, ...rest }) => (
  <span {...rest} className={classnames(className, 'foo')} />);
);
```

#### Layering
A more significant benefit is that these can be layered, permitting an element
to be fully or partially restyled:

```ts
const NormalSpan = addClasses('text-red-500 underline')(Span)
const CustomSpan = as(removeClasses('text-red-500'), addClasses('text-blue-500'))(Base);
<NormalSpan /> // <span className="text-red-500 underline" />
<CustomSpan /> // <span className="text-blue-500 underline" />
```

## HOC Pattern

The AddClasses API is an instance of the well-established React Higher Order
Components Pattern, which is a form of Functional Composition. This pattern is
at the heart of the approach taken in FClasses.

### Overview

Functional Programming is a widely used and highly regarded paradigm in the
Javascript world. Much of the core Javascript API is functional, and immensely
popular utility libraries like lodash are built on this paradigm.

The application of functional programming principles to React is not unique to
FClasses - in fact it was borrowed from the once-popular Recompose library. LIke
that library, FClasses provides some utilities to make functional composition
simpler; most are fairly self explanatory:

```ts
const NewTabLink = addProps({ target: '_blank' })('a'); // <a target="_blank" />
const IconLink = withChild(MyIcon)('a'); // <a><MyIcon /></a>
const HiddenLinkIfUserIsLoggedIn = flowIf(userIsLoggedIn)(replaceWith(() => null))('a');

etc,,,
```

### Purpose

#### Maintainability

The advantages of functional programming in general have been eloquently
extolled by many authors (like this one). Code written according to this
paradigm generally has fewer bugs, and is easier to read, test and reason about.

In React, the HOC pattern allows bits of functionality to be composed
independently onto components. Because they are separated and encapsulated, your
component code is cleaner and simpler.

```ts
// With HOC Pattern & FClasses
const WithExternalTreatment = as(
  addProps({ target: '_blank' }),
  withppendChild(ExternalIcon),
);

const WithDownloadTreatment = as(
  withAppendChild(DownloadIcon)
);

const Link = as(
  flowIf(isDownloadLink)(WithDownloadTreatment),
  flowIf(isExternalLink)(WithExternalTreatment),
  addClassesIf(useIsUserLoggedIn)('hidden'),
)('a');

// Witout HOC Pattern
const SpecialLink = props => {
  const { children, variant, ...rest } = props;
  // Only visible for logged in users.
  const linkProps = props;
  if (useIsUserLoggedIn()) {
    linkProps.className = classNames(linkProps.className, 'hidden');
  } else {
    if (isExternalLink(props)) {
      linkProps.target = '_blank';
      addProps.children = (
        <>
          {linkProps.children}
          ExternalIcon
        </>
      );
    }
    if (isDownloadLink(props)) {
      linkProps.children = (
        <>
          {linkProps.children}
          DownloadIcon
        </>
      );
    }
 }
}
  return <a {...linkProps} />;
};
```
  
Like Typescript, the HOC pattern is a tool which helps you write cleaner, more
maintainable code.

#### Reusability and Extensibility

More importantly, the HOC pattern allows core component styling and behavior to
be reused and extended without forking (the Distribution Model) or bloat (the
Monolithic Model), Styling and behavior are encapsulated and distributed in
smaller more atomic pieces, so that a brand or market can override at a lower
level than the component.

Consider the link example above. Imagine that on your site, there is a second,
related domain, and that links to that domain should not open in a new tab. To
accomplish this, you must override the logic of isExternalLink to take the new
domain into account. In the "traditional" example, you must re-write the whole
Link component to use your new logic. With the HOC Pattern, you need only
recompose it.

```ts
const Link = as(
  flowIf(isDownloadLink)(WithDownloadTreatment),
  flowIf(customIsExternalLink)(WithExternalTreatment),
  addClassesIf(useIsUserLoggedIn)('hidden'),
)('a');
```

All the other behaviors and styles remain intact and will continue to receive
enhancements and bug fixes from the core library.

## Design API

This is an implementation of the standard React
[Component Injection Pattern](https://reactpatterns.js.org/docs/component-injection/),
which is itself a variation of the classic slots pattern. It is a form of
Dependency Injection.

### Overview

Again, this is fairly straightforward if you understand the idea of slots (which
is a standard pattern in many front-end frameworks). FClasses extends standard
component injection by combinding it with the HOC pattern. Instead of injecting
React components, you inject higher order components which act on the components
in each slot. That is, instead of:

```ts
<Component components={{ Header: MyHeader, Body: MyBody }) />
```

you have

```ts
<Component design={{ Header: addClasses('text-2xl'), Body: addClasses('text-sm') }) />
```

Or, more commonly using the HOC Pattern:

```ts
withDesign({ Header: addClasses('text-2xl'), Body: addClasses('text-sm') })(Component)
```

Again, this is only an extension of Component Injection, and can be reduced to
it using replaceWith :

```ts
withDesign({ Header: replaceWith(MyHeader), Body: replaceWith(MyBody) })(Component) // same as <Component components={{ Header: MyHeader, Body: MyBody }} />
```

### Purpose

#### Slots

Some form of the slots pattern is critical to enable isolated customization.
Consider the case of a brand which wants to customzie a button. Without slots,
every component which uses that button must be forked to use the custom version:

```ts
const CustomCard = props => (
  // ,,,copy code from core card
  <CustomButton />
);

const CustomSection = props => (
  // ...copy code from core section
  <CustomCard />
);

const CustomPage = props => (
  // ...copy code from core page
  <CustomSection />
);

etc...
```

If changes are made to the core card, section or page, they will not propagate
to your custom versions. In effect, you have forked the whole design system in
order to customize a single button.

With slots, on the other hand, you can still maintain a link to the core components:

```ts
const CustomCard = withDesign({ Button: replaceWith(CustomButton) ))(CoreCard);
const CustomSection = withDesign({ Card: replaceWith(CustomCard) })(CoreSection);
const CustomPage = withDesign({ Section: replaceWith(CustomSection) })(CorePage);
```

You still need custom versions of the enclosing componens, but they retain their
connection to the orginal versions and will still inherit enhancements and
bug-fixes. This can be improved even further with Shadowing (see below).

#### HOC Injection

By allowing for HOC Injection rather than simple component injection, the Design
API brings the benefits of the HOC pattern to complex components. A good example
is the case of layout variants:

```ts
const WithHorizontalLayout = withDesign({
  Wrapper: 'flex flex-row w-full', // Equivalent to `addClasses('flex')
  Title: 'w-1/4 pr-4',
  Body: 'flex-grow',
});

const WithHorizontalRightLayout = withDesign({
  Wrapper: 'flex flex-row-reverse w-full',
  Title: 'w-1/4 pl-4',
  Body: 'flex-grow',
});
```

These two HOC's can now be applied to our card independently to add the desired
layout while preserving all other aspects of the card. Further, they can be
customized independently (much like the isExternalLink logic was customized in
the example above), allowing a brand or site to implement a new layout while
preserving functionality, styling and behavior from the upstream library.

## Token Objects

This is the only pattern in the FCasses library which is (as far as we know) not
borrowed from or employed extensively in the "standard" React ecosystem. In
essence, it is a way of structuring a set of Higher Order Components to make
them extensible in a more standardized way.

### Overview

A Token Object is a structured set of Higher Order Components. The top level
keys (called "Domains" divide the HOC's into functional groups. The inner keys
are simply the "slots" exposed by the component according to the Design API. For
example:

```ts
const ProductCard = asCardToken({
  SEO: {
    Wrapper: addProps({ itemscope: 'true', itemtype: 'https://schema.org/Product'),
    ...
 },
 Layout: {
    Wrapper: 'flex flex-row w-full', // Equivalent to `addClasses('flex')
    Title: 'w-1/4 pr-4',
    Body: 'flex-grow',
  },
  Theme: {
    Wrapper: as(Tokens.Padding.Card.Product, Tokens.Color.Card.Product, ...), // Compose the design tokens which apply to a card
    ...,
  },
  Content: {
    Title: addProps(() => { children: useContentFromCMS('title') }),
    Body: addProps(() => { children: useContentFromCMS('body') }),
 },
 ...
});
```

Then `as(ProdutCard)` is exactly equivalent to

```
as(
  withDesign({
   Wrapper: addProps({ itemscope: 'true', itemtype: 'https://schema.org/Product'),
   ...
  }),
  withDesign({
    Wrapper: 'flex flex-row w-full', // Equivalent to `addClasses('flex')
    Title: 'w-1/4 pr-4',
    Body: 'flex-grow',
  }),
  withDesign({
    Wrapper: as(Tokens.Padding.Card.Product, Tokens.Color.Card.Product, ...), // Compose the design tokens which apply to a card
    ...,
  }),
  withDesign({
    Title: addProps(() => { children: useContentFromCMS('title') }),
    Body: addProps(() => { children: useContentFromCMS('body') }),
 },
});
```

The only difference is that the first example is structured while the second is flat.

> Note the FClasses `as` utility is used to apply tokens to components. It
> converts token objects into normal HOC's, and can also be used to compose
> multiple tokens very much like functional composition utilities in other
> libraries (eg Lodash `flow`).

It's important to note that a Token Object is nothing soecial. It is just a
standard Javascript object whose values are Higher Order Components. It can be
manipulated using standard Javascript object composition (spread, rest, etc):

```ts
const ProductCardWithCustomLayout = asCardToken({|
  ...ProductCard, // Spread all members of the original token
  Layout: {
    // ...override SEO  
  },
});
```

### Advantages

The original iteration of the FClasses library did not include the Token Object API.  Instead, developers made their own choices about how to structure the HOCs.  For example, the above might have been written as

```ts
const WithProductCardSEO =  withDesign({
   Wrapper: addProps({ itemscope: 'true', itemtype: 'https://schema.org/Product'),
   ...
  }),
});

const WIthProductCardLayout = withDesign({
    Wrapper: 'flex flex-row w-full', // Equivalent to `addClasses('flex')
    Title: 'w-1/4 pr-4',
    Body: 'flex-grow',
  }),
});

// etc...
```

We discovered through experience building and extending several sites in this
way that it led to a proliferation of different patterns for organizing the
tokens. Each developer made different choices, and this made it very difficult
to understand what could be extended and how. Often, in the interest or
expediency, developers mashed unrelated styling and functionality into the same
HOC, defeating the purpose of the HOC pattern. Also, once a set of HOC's were
applied to slots via the Design API, it was not possible to override a specific
slot - eg once you had written:

```ts
const WIthProductCardLayout = withDesign({
    Wrapper: 'flex flex-row w-full', // Equivalent to `addClasses('flex')
    Title: 'w-1/4 pr-4',
    Body: 'flex-grow',
  }),
});
```

It was not easy to change (for example) the width and padding of the title while
leaving everything else intact.

By exporting thee HOC's as standard Javascript objects, which could be
manipulated using standard Javascript object mutations, we accomplised two
goals:

- We standardized the way they were broken up, making their structure more
  predictable and easier to extend and override
- We allowed overriding the individual slots in a component's design.