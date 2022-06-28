# Design Element Concepts

In this guide, we will continue the gallery tutorial to learn how to use
Bodiless Design API tooling to build a design system package. You can
[read more about it here](../../Design/DesignSystem), but at a high level, 
is a set of tools and patterns for applying a *Design System* to a React site.
It encourages defining the building blocks of the system (tokens, elements,
components) at the site level, and then applying them consistently across your
site--or even abstracting them to a reusable package, allowing you to apply the
same design system to multiple sites, extending it as needed.

## Prerequisites

* Complete the [Intro to Bodiless Concepts](./IntroToBodilessConcepts) tutorial.
  * Alternatively, if you already have a fair understanding of BodilessJS
    fundamentals and want to fast-forward to this tutorial, copy over the
    [gallery folder & contents](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/sites/minimal-demo/src/data/pages/gallery)
    and place in a [new site](../../About/GettingStarted?id=creating-a-new-site) at
    `src/data/pages/gallery`.
* Read through the high level introduction to the
  [Bodiless Design System](../../Design/DesignSystem). Even if you don't
  follow everything, it will give essential insight into the "why" of
  what you will do in this tutorial.
* Acquire a basic understanding of utility first CSS (aka "Atomic" or "Functional" CSS)
  and the [Tailwind](https://tailwindcss.com/) library.  There are many excellent
  articles on the web on this topic.  While you can use the Bodiless design system
  with other css-in-js paradigms, this is the one we recommend.

## 1. Typography

In this step we are going to move typography token definitions from
page level to a package, to ensure consistency across the site.

It would be possible to create our design system entirely at site level, for
example, in a `/src/components` directory. However, we consider it a best
practice to place all code (components and tokens) into a design system package.
This has several advantages:
- it is easy to publish this package so the design system can be used by other sites
- it is easy to reorganize the internal structure of the package without changing imports
  in site level files.
- it is possible to use [Bodiless Token Shadowing]() to override token collections from
  upstream packages.
- there are performance penalties due to incomplete tree-shaking if you use typescript and
  import core bodiless packages directly from your Gatsby site.

To facilitate creating a design system package, most Bodiless sites are structured as 
a *monorepo*, and this is what is created by the `@bodiless/cli new` command you
used to create a new site in the first tutorial.  Your new site should already
contain a stub design system package at `/packages/{your-site-name}`, and that is
where we'll be implementing our design system.

> Note: in the examples below, we assume you have created a new site called `mysite`
> using the `__minimal__` template.

1. Create a file called `mysiteElement.ts` inside your design system package at
   `packages/mysite/src/components/Element/tokens`, and put the following lines there:

   ```ts
   import { asTokenSpec } from '@bodiless/fclasses';

   const Bold = asTokenSpec()('font-bold');
   const Underline = asTokenSpec()('underline');
   const Italic = asTokenSpec()('italic');
   const SuperScript =  asTokenSpec()('align-baseline');
   const Link = asTokenSpec()('text-blue-400', Underline);
   const H1 = asTokenSpec()('text-3xl', Bold);
   const H2 = asTokenSpec()('text-2xl', Bold);
   const H3 = asTokenSpec()('text-xl');
   
   export default {
     Bold,
     Underline,
     Italic,
     Link,
     SuperScript,
     H1,
     H2,
     H3,
   };
   ```

1. Now export these tokens from your package by creating the following files:

   *packages/mysite/src/components/Element/tokens/index.ts*
   ```ts
   import mysiteElement from './mysiteElement';
   
   export default mysiteElement;
   ```
   
   *packages/mysite/src/components/Element/index.ts*
   ```ts
   import mysiteElement from './tokens';
   
   export { mysiteElement };
   ```
   
   *packages/mysite/src/index.ts*
   ```ts
   export * from './components/Element';
   ```

   > Note: There are many ways to organize exports from component packages. Choosing a
   > standard pattern such as the one described above will help keep your code organized
   > and make it easier to maintain. Following this pattern will also allow you to
   > take advantage of some BodilessJS tools for extending and optimizing your design
   > system, like [Token Shadowing]() and [Static Replacement]().

1. Add your package as a dependency in `/sites/mysite/package.json`:
   ```json
   "dependencies:" {
     ...,
     "mysite": "^0.0.0",
   }
   ```

1. Run `npm run setup` from the root of your repository to build your package and link it
   to your site.

1. Now let's use these tokens in our Gallery page. Add the following import to
   `/sites/mysite/src/data/pages/gallery/index.tsx`:
   ```ts
   import { mysiteElement } from 'mysite';
   ```
   And replace the definition of the `PrimaryHeader` component:
   ```ts
   const PrimaryHeader = as(
     asEditable('title', 'Title'),
     mysiteElement.H1,
   )(H1);
   ```

1. Finally, remove the corresponding typography tokens (`asBold`, etc) from
   `/sites/mysite/src/data/pages/gallery/withSimpleEditor.tsx`, and refactor the `simpleDesign`
   to use the tokens we have just created:
   
   ```ts
   const simpleDesign = {
     Bold: mysiteElement.Bold,
     Italic: mysiteElement.Italic,
     Underline: mysiteElement.Underline,
     Link: as(mysiteElement.Link, asBodilessLink()),
   };
   ```
   Be sure to import `mysiteElement` as before.

In the code above we have created a collection of *element tokens* which apply classes to
basic HTML elements, exported this collection as an object (`mysiteElement`), and used the
tokens to apply typography styling to our text editor and primary header. These
*element tokens* correspond roughly to *atoms* in the parlance of atomic
design. They are usually simple HOC's which add classes or props to the element
(though they may also add behaviors).

Note the use of `asTokenSpec` to define our tokens. Bodiless tokens are normally
expressed as React higher order components (HOCs). However, Bodiless provides an
extended format for describing tokens known as a *Token Specification*. The
`asTokenSpec()('font-bold')` utility produces a token in this format:
```ts
{
  Core: {
    _: 'font-bold',
  },
};
```
This  can be converted to a simple HOC via the Bodiless `as` utility:
```ts
const BoldSpan = as(mysiteElement.Bold)(Span);
```
which is identical to:
```ts
const BoldSpan = addClasses('font-bold')(Span);
```
We will go into the uses of token specifications in more detail in a later
section. For now, you can think of `asTokenSpec` as a utility for creating
tokens.

### Providing a site-wide rich text editor.
To complete the standardization of our site's typography, let's add to the design
system package a rich text editor which uses the standard typography tokens.
Create `packages/mysite/src/components/RichText/tokens/mysiteRichText.ts`:

```ts
import { asTokenSpec, as, stylable } from '@bodiless/fclasses';
import { asBodilessLink } from '@bodiless/components-ui';
import { withPlaceholder } from '@bodiless/components';
import { mysiteElement } from '../../Element';

const Simple = asTokenSpec<any>()({
  Core: {
    _: as(stylable, withPlaceholder('Rich text...')),
    Bold: mysiteElement.Bold,
    Italic: mysiteElement.Italic,
    Underline: mysiteElement.Underline,
    Link: as(mysiteElement.Link, asBodilessLink()),
  },
});

export default {
  Simple,
};
```

Export the tokens from the package as you did before for `mysiteElement`:

   *packages/mysite/src/components/RichText/tokens/index.ts*
   ```ts
   import mysiteRichText from './mysiteRichText';
   
   export default mysiteRichText;
   ```
   
   *packages/mysite/src/components/RichText/index.ts*
   ```ts
   import mysiteRichText from './tokens';
   
   export { mysiteRichText };
   ```
   
   *packages/mysite/src/index.ts*
   ```ts
   export * from './components/RichText';
   ```
Rebuild your package (execute `npm run build` from the package directory or
`npm run build:packages` from outside it), and use these tokens in the Gallery.
In `sites/mysite/src/data/pages/gallery/index.tsx`, add these imports:
```ts
import { RichText } from '@bodiless/richtext-ui';
import { withPlaceholder } from '@bodiless/components';
import { mysiteElement, mysiteRichText } from 'mysite';
```
and then change:
```ts
const Body = withSimpleEditor('body', 'Body')(Div);
```
to
```ts
const Body = as(
  mysiteRichText.Simple,
  withPlaceholder('Body'),
  withNodeKey('body'),
)(RichText);
```
Similarly, in `sites/mysite/src/data/pages/Gallery/CaptionedImage.tsx`, add the imports
and change
```ts
const Body = withSimpleEditor('caption', 'Caption')(Div);
```
to
```ts
const Body = as(
  mysiteRichText.Simple,
  withPlaceholder('Caption'),
  withNodeKey('caption'),
)(RichText);
```

First, let's look at the `mysiteRichText` token collection. It contains a single
token, `Simple`, expressed as a *token specification*. A token described in this
notation is a 2-level nested object. The inner keys of this object are simply
the design keys of the component to which the token applies, and their values
are higher-order components which should be applied to each element. The top
level keys represent "domains" -- pieces of the token which might be selectively
reused, extended or overridden by a downstream consumer. Here we are using just
a single domain, `Core`. We'll show later on how to define and use multiple
domains to facilitate extension and customization.

In this case, the design keys represent the components which are available in
the editor to render different text formats, as described in [the first tutorial](../IntroToBodilessConcepts#6-configuring-the-rich-text-editor). We apply our
typography tokens to each, thus ensuring that any changes will propagate to all
simple rich text editors on the site. 

Note the special design key `_`. Tokens supplied in this key apply to the editor
as a whole. Here we make the editor `stylable` -- that is capable of receiving
classes via the FClasses API. We alo supply a placeholder to be used as a
default, though this will usually be overridden where the editor is used. This is
because the placeholder--like the node key--is usually defined by the context
in which the token is placed, and therefore not reusable.

Applying our token with `as(mysiteRichText.Simple)` is equivalent to the following:

```ts
as(
  withPlaceholder('Rich text...'),
  withDesign({
    Bold: mysiteElement.Bold,
    Italic: mysiteElement.Italic,
    Underline: mysiteElement.Underline,
    Link: as(mysiteElement.Link, asBodilessLink()),
  }),
);
```

## 2. Make the Gallery reusable

If you have components which may appear on more than one page in your site, you
can export them from your design system package, and make them
"designable" so that they can be easily styled to implement different variations.

In a Bodiless design system, *components* are usually bare templates which do
little or nothing in themselves until one or more *tokens* are applied to them.
They are often referred to as "clean" components. Such a component is always
"designable" via the
[Bodiless Design API](../Architecture/FClasses?id=the-design-api). That is, it
exposes an api which allows tokens to be applied to constituent elements within
the component. This is very similar to the basic
[slots pattern](https://daveceddia.com/pluggable-slots-in-react-components/) in
React. The key difference is that, with the Design API, we don't inject the
actual React nodes which should be rendered in a particular slot. Instead we
provide a higher order component (a "token") which will be applied to the
component in that slot. This allows us to *layer* styling or behavior for
individual elements.

#### Creating a clean component.

Let's create "clean" versions of our `CaptionedImage` and `Gallery` components.
In `packages/mysite/src/componants/CaptionedImage`, create `CaptionedImageClean.tsx`:

```tsx
import React from 'react';
import type { FC, HTMLProps } from 'react';
import {
  ComponentOrTag, DesignableComponentsProps, Img, Section, designable, asTokenSpec
} from '@bodiless/fclasses';
import { RichText } from '@bodiless/richtext-ui';

type CaptionedImageComponents = {
  Wrapper: ComponentOrTag<any>,
  Image: ComponentOrTag<any>,
  Body: ComponentOrTag<any>,
};

type CaptionedImageProps =
  HTMLProps<HTMLElement> & DesignableComponentsProps<CaptionedImageComponents>;

const CaptionedImageBase: FC<CaptionedImageProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Image />
    <C.Body />
  </C.Wrapper>
);

const captionedImageComponents: CaptionedImageComponents = {
  Wrapper: Section,
  Image: Img,
  Body: RichText,
};

const CaptionedImageClean = designable(captionedImageComponents, 'CaptionedImage')(CaptionedImageBase);

const asCaptionedImageToken = asTokenSpec<CaptionedImageComponents>();

export default CaptionedImageClean;
export { asCaptionedImageToken };
```

This exemplifies the 3-step process involved in creating a clean component:
1. Define the "design" of the component. This is a set of base components which
   will be used in the component itself, and which can be targeted by the bodiless
   `withDesign` function (or as inner keys in a token specification).  In the
   `CaptionedImage` component, we define  a design consisting of three components:
   ```ts
   type CaptionedImageComponents = {
     Wrapper: ComponentOrTag<any>,
     Image: ComponentOrTag<any>,
     Body: ComponentOrTag<any>,
   };
   ```
2. Write the jSX code for the component itself.  Usually, this has no styling and
   very little functionality.  It is just a bare template on which styles and
   behaviors can be hung:
   ```ts
   type CaptionedImageProps =
     HTMLProps<HTMLElement> & DesignableComponentsProps<CaptionedImageComponents>;
   const CaptionedImageBase: FC<CaptionedImageProps> = ({ components: C, ...rest }) => (
     <C.Wrapper {...rest}>
       <C.Image />
       <C.Body />
     </C.Wrapper>
   );
   ```
   We use the Bodiless generic type `DesignableComponentsProps` to help define
   the props of our component, which will now include a `components` prop captaining
   the fully styled constituent components which make up the clean component.

3. Make the component "designable":
   ```ts
   const captionedImageComponents: CaptionedImageComponents = {
     Wrapper: Section,
     Image: Img,
     Body: RichText,
   };
   
   const CaptionedImageClean = designable(captionedImageComponents, 'CaptionedImage')(CaptionedImageBase);
   ```
   In this step, we first define the starting sub-components in our design.
   These are the base components to which any HOC's provided by `withDesign` will
   be applied. Here we use stylable HTML elements exported by
   `@bodiless/fclasses`. Such stylable elements are capable of having their
   `className` prop modified by the [FClasses API]().

   Then, we pass this set of starting components to the Bodiless `designable`
   HOC. A component so wrapped can receive a `design` prop (usually provided by
   `withDesign` or `as`) containing the HOC's which should be applied to each
   constituent. So, for example:
   ```ts
   withDesign({
     Image: 'border',
   });
   ```
   or
   ```ts
   as(
     asTokenSpec<CaptionedImageComponents>)()({
       Core: {
         Image: 'border'
       },
    }),
   );
   ```
   would both apply the `border` class to the `Image` element.

   The second parameter to `designable` is an string which can be used
   to identify the element in the rendered markup.

#### Adding styling

As you can see, our clean component has no styling or behavior.  Let's create a
token collection to provide it.

As usual, create `mysiteCaptionedImage.ts` in
`packages/mysite/src/components/CaptionedImage/tokens`:

```ts
import { as } from '@bodiless/fclasses';
import { asBodilessImage } from '@bodiless/components-ui';
import { withNodeKey } from '@bodiless/core';
import { withPlaceholder } from '@bodiless/components';
import { mysiteRichText } from '../../RichText';
import { asCaptionedImageToken } from '../CaptionedImageClean';

const Base = asCaptionedImageToken({
  Core: {
    Wrapper: 'mx-2 border-8 rounded-t-lg h-full flex flex-col',
    Image: as(
      asBodilessImage(),
      'w-full',
      withNodeKey('image'),
    ),
    Body: as(
      mysiteRichText.Simple,
      withPlaceholder('Caption'),
      withNodeKey('caption'),
      'text-white bg-black p-2 flex-grow',
    ),
  },
});

const WithBlueBorder = asCaptionedImageToken({
  Core: {
    Wrapper: 'border-blue-400',
  },
  Meta: {
    categories: {
      Border: ['Blue'],
    },
  },
});

const WithTealBorder = asCaptionedImageToken({
  Core: {
    Wrapper: 'border-teal-400',
  },
  Meta: {
    categories: {
      Border: ['Teal'],
    },
  },
});

const WithOrangeBorder = asCaptionedImageToken({
  Core: {
    Wrapper: 'border-orange-400',
  },
  Meta: {
    categories: {
      Border: ['Orange'],
    },
  },
});

export default {
  Base,
  WithBlueBorder,
  WithOrangeBorder,
  WithTealBorder,
};
```

By now, this should look very familiar.  A few things to note:
- We use `asCaptionedImageToken` to define the token specifications.  This is a
  utility we exported from our clean component and provides both type safety and
  autocompletion of the design keys in our token specification.
- We create a set of tokens to produce different color variations, and attach
  necessary metadata (for the flow container component selector) via the
  reserved `Meta` domain. These tokens are not intended to be used alone, but
  rather *composed* with the `Base` token to produce the actual
  variations (by convention, such tokens are often prefixed by `With...` or
  `As...`).

#### Use the CaptionedImage token

To finish up, export the clean component from your package as before:

   *packages/mysite/src/components/CaptionedImage/tokens/index.ts*
   ```ts
   import mysiteCaptionedImage from './mysiteCaptionedImage';
   
   export default mysiteCaptionedImage;
   ```
   
   *packages/mysite/src/components/CaptionedImage/index.ts*
   ```ts
   import CaptionedImageClean, { asCaptionedImageToken } from './CaptionedImageClean';
   import mysiteCaptionedImage from './tokens';
   
   export { CaptionedImageClean, mysiteCaptionedImage, asCaptionedImageToken };
   ```
   
   *packages/mysite/src/index.ts*
   ```ts
   ...
   export * from './components/CaptionedImage';
   ```

Now use it in the gallery. Remove the tokens which apply to the captioned image
(`with...Border`), and replace the `design` with:

```ts
const design = {
  BlueImageTile: on(CaptionedImageClean)(
    mysiteCaptionedImage.Base,
    mysiteCaptionedImage.WithBlueBorder,
  ),
  TealImageTile: on(CaptionedImageClean)(
    mysiteCaptionedImage.Base,
    mysiteCaptionedImage.WithTealBorder,
  ),
  OrangeImageTile: on(CaptionedImageClean)(
    mysiteCaptionedImage.Base,
    mysiteCaptionedImage.WithOrangeBorder,
  ),
};
```

Rebuild your package and reload the gallery page.  It should look and function exactly
as before.

> Extra Credit: Refactor and move the Gallery component itself (`Gallery.tsx`)
> using the same patterns.

## 3. Extending Tokens using Token Domains

Let's look again at our `Base` captioned image token:

```ts
const Base = asCaptionedImageToken({
  Core: {
    Wrapper: 'mx-2 border-8 rounded-t-lg h-full flex flex-col',
    Image: as(
      asBodilessImage(),
      'w-full',
      withNodeKey('image'),
    ),
    Body: as(
      mysiteRichText.Simple,
      withPlaceholder('Caption'),
      withNodeKey('caption'),
      'text-white bg-black p-2 flex-grow',
    ),
  },
});
```
What if we wanted to reuse this token to create a differently styled gallery
page, say one without the inverted colors in the caption. As it stands, all the
styling and behavior of our component are mixed together into a single token.
This makes it difficult to customize one aspect of the styling without recomposing
the whole token.  To simplify the process, Bodiless token specifications introduce
the notion of token "domains".

As mentioned previously, domains serve to divide a token into pieces which can
be selectively extended or overridden.  Let's rewrite the token above to separate
behavior (our editors), layout and theme:
```ts
const Base = asCaptionedImageToken({
  Core: {
    Image: as(
      asBodilessImage(),
      withNodeKey('image')
    ),
    Body: as(
      mysiteRichText.Simple,
      withPlaceholder('Caption'),
      withNodeKey('caption'),
    ),
  },
  Layout: {
    Wrapper: 'mx-2 h-full flex flex-col',
    Image: 'w-full',
    Body: 'p-2 flex-grow',
  },
  Theme: {
    Wrapper: 'border-8 rounded-t-lg',
    Body: 'text-white bg-black',
  },
});
```

Notice that if you try to compile `mysiteCaptionedImage.ts` now, you'll get a typescript
error.  This is because the set of allowed domains is constrained. By default, Bodiless
only allows a single `Core` domain -- but usually a design system will define its own
set of domains once and reuse them in all their tokens.  For the sake of demonstration,
we will create a system that allows three.

Create `packages/mysite/src/asTokenSpec.ts` with the following contents:
```ts
import { DesignableComponents, asTokenSpec as asTokenSpecBase } from '@bodiless/fclasses';

const domains = {
  Core: {},
  Schema: {},
  Layout: {},
  Theme: {},
};

type D = typeof domains;

const asTokenSpec = <C extends DesignableComponents>() => asTokenSpecBase<C, D>(domains);

export { asTokenSpec };
```

And make sure this is exported from your package by adding the following to
`packages/mysite/src/index.ts`:
```ts
export { asTokenSpec } from './asTokenSpec';
```

Now, modify the import of `asTokenSpec` in every file in your package which uses it,
so that your custom version is imported instead of the default.  This should include:
- packages/mysite/src/components/CaptionedImage/CaptionedImageClean.tsx
- packages/mysite/src/components/Element/tokens/mysiteElement.ts
- packages/mysite/src/components/Gallery/GalleryClean.tsx
- packages/mysite/src/components/RichText/tokens/mysiteRichText.ts


In the above example, we defined three custom domains. In general, this choice
will be based on an understanding of how the token would likely be reused or
extended by downstream consumers. In this case, we separate "editors" (the
way the component behaves to content editors), "layout" (how the individual parts
of the component are laid out within the outer container), and "theme" (the
look and feel of the component, which is most likely to be overridden).

Now, if we want to create a variation on the captioned image without the
inverted caption, we can simply override the `Body` key from the 'Theme' domain. 
```ts
```
Everything else about the token will remain the same, so we don't have to worry about
recreating the layout or plugging in the editors.

Another example:

```ts
import omit from 'lodash/omit';
const Custom2 = omit(Base, 'Editors');
```
Here we remove all Bodiless editors from the token. We can now use our design
system in a context where content comes from another source, like an external
CMS:
```ts
const useContentFromCMS = () => { ... } // Fetch content, eg using Gatsby useStaticQuery()
const WithContentFromCMS = asCaptionedImageToken({
  Core: {
    // Replace the default RichText starting component. 
    Body: startWith(Div),
  },
  Editors: {
    Body: addProps(() => ({
      children: useContentFromCMS().caption,
    })),
    Image: addProps(() => 
      src: useContentFromCMS().imgSrc,
    })),
  },
});
```

The above example has some limitations.  The image and caption both need to know where
to get their own data

## 3. Creating reusable page templates.




## 3. Create a re-useable Primary Header for the site

In the `index.tsx` on the two pages you created in the previous tutorial,
you can see we duplicate the same `PrimaryHeader` component.
quite match: the one on the gallery page is bold. Let's bring them both into the
design system using a shared set of tokens. This way if we change the style of
the primary header, it will apply throughout the site instead of having to be
fixed on each page.

1. In `src/components/Elements/token.ts` let's define some new primary header tokens:

    ```ts
    export const withPrimaryHeaderStyles = asElementToken('Header')(
      addClasses('text-3xl'),
      asBold,
    );

    export const withPrimaryHeaderEditor = asElementToken('Text Editor')(
      asEditable('title', 'Page Title'),
    );

    export const asPrimaryHeader = flowHoc(
      withPrimaryHeaderEditor,
      withPrimaryHeaderStyles,
    );
    ```
  
    The first of these defines the styles that should be applied to an `h1` when
    used as a page title, and is a standard design token. The second defines
    the kind of editor which should be used for page titles, and is another example
    of what we call "behavioral" tokens -- tokens which express behavior or
    functionality rather than visual design.  We export these separately to
    facilitate placing *non-editable* page titles on pages where that may
    be appropriate. For convenience, we also export an `asPrimaryHeader` token
    which composes them.
  
1. Remember to add imports needed & export these new tokens.

1. Import these tokens into the `index.tsx` on both pages, and replace the
   current `PrimaryHeader` definitions and references:
   ```ts
   const PrimaryHeader = asPrimaryHeader(H1);
   ```

1. Run your site and visit the homepage & gallery page
   (http://localhost:8000/gallery) and it should run exactly as it did before,
   except the gallery title is not bold.

1. In `src/components/Element/token.ts` add a tailwind class to `asBold`. 
    ```ts
    const asBold = asElementToken('Font Weight')(
      addClasses('font-bold'),
    );
    ```
1. Visit the homepage & gallery page (http://localhost:8000/gallery) and both
   `h1` titles should be bold.

HOC's like `asBold()` apply a design token (expressed as a collection of utility
classes) to a single HTML element. Every token in your design system should have
a corresponding HOC. This will:
* allow them to be reused throughout the site.
* ensure consistency.
* make them easy to extend or modify.
* allow them to be published as a package to be shared among sites with similar designs.

> Note on naming conventions: In general, we being HOC's with `as...` or
> `with...`, but it's sometimes hard to know when to use each. One rule of thumb
> we've found helpful is to use `with...` when your token is adding something
> (`withLinkStyles`, `withLinkEditors `), and `as...` when it is defining a
> complete, composed variation of a component (`asLink`) -- though we sometimes
> also use `as...` for primitive tokens which toggle state (`asBold`, `asItalic`).

### Changing or customizing an element token

Let's imagine that the design system for your site was updated, to decrease the
Font Weight for "bold" text. If the `asBold()` token HOC is used consistently
across your site, then implementing this change is as easy as replacing:

```ts
  const asBold = asElementToken('Font Weight')(
    addClasses('font-bold'),
  );
```
with
```ts
  const asBold = asElementToken('Font Weight')(
    addClasses('font-semibold'),
  );
```

Similarly - let's say you are extending or customizing a design system from
another site and want to make the same change. If the tokens of that design
system are exported from a package, then in your own `Elements.token.tsx` you
can simply:

```ts
  import { asBold as asBoldBase } from 'some-design-system';
  export asBold = asElementToken('Font Weight')(
    asBoldBase,
    addClasses('font-semibold'),
    removeClasses('font-bold')
  );
```

Of course, this is a bit of a contrived example, since the token only adds a
single class, but imagine that the base design system dictated that all bolded
text had a particular color, e.g.:

```ts
  const asBold = asElementToken('Font Weight', 'Text Color')(
    addClasses('font-bold text-blue'),
  );
```

you could then extend it to change the font weight but retain the color
as defined in the parent design system.

> NOTE: Using `removeClasses` as described above is no longer recommended.
> Instead, we recommend assigning consistent metadata and using token filtering
> to replace selected tokens.
> [Read More](../Architecture/FClasses#metadata-and-filters).

### The FClasses API

The `addClasses()` and `removeClasses()` functions used in the examples above
are part of the Bodiless "FClasses" (Functional Classes) API. You can
[read more about this here](../Architecture/FClasses). Briefly, it's
a pair of simple utility HOC's which allow you to manipulate the `className` prop
of a React element. When you make an element "stylable" by the FClasses API, you
can wrap it with these HOC's to add and remove classes. In so doing, you are
applying tokens to create a styled version of the component. You can then wrap
it again, and again, to extend or customize its style (as we did above) - for
example, to create a local variant of a design system.

## 4. Refactor `CaptionedImage` to use the Bodiless Design API

The `CaptionedImage` is a small component that combines an image and caption
text inside a wrapper. Let's go ahead and incorporate it into our Design System
to make it more flexible and reusable.

1. Within `CaptionedImage.tsx`, the first step is to define all the individual
   sub-components of our `CaptionedImage` and ensure that they are *stylable*
   via the [FClasses API](../Architecture/FClasses#). 

   * First, we define the expected type of each individual component. Here we
     require that each be stylable via FClasses (i.e., accept `StylableProps`).
     ```ts
     export type CaptionedImageComponents = {
       Wrapper: ComponentType<StylableProps>,
       Image: ComponentType<StylableProps>,
       Body: ComponentType<StylableProps>,
     };
     ```
    
   * Then we define what to render by default for each component; we use the
     stylable versions of basic HTML elements exported by
     [`@bodiless/fclasses`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/fclasses/src/StyledHTML.tsx).
     ```ts
     const captionedImageComponents:CaptionedImageComponents = {
       Wrapper: Section,
       Image: Img,
       Body: Div,
     };
     ```

1. Now that we have our sub-components, let's define how they go together to
   make a captioned image. This is really the base template for our component.
   Combining the defaults defined above with this layout, we will render an
   `img` & `div` wrapped in a `section`.
    ```ts
    type CaptionedImageBaseProps = DesignableComponentsProps<CaptionedImageComponents> & { };
    const CaptionedImageBase: FC<CaptionedImageBaseProps> = ({ components, ...rest }) => {
      const {
        Wrapper,
        Image,
        Body,
      } = components;

      return (
        <Wrapper {...rest}>
          <Image />
          <Body />
        </Wrapper>
      );
    };
    ```
    
    Note: that the actual sub-components here are *injected*; that is, they
    are passed into the component via a `components` prop. We defined
    the defaults for these components above (`captionedImageComponents`), but
    we will actually render whatever we are passed.

    > For convenience, we pass the rest of the props through to our `Wrapper`
    > component. This will allow our component to behave as expected when it
    > receives normal html element props (like `className` or `id`).
    
1. The usual pattern, however, is not to pass these components directly.
   Instead, let's wrap our component with `designable` to allow consumers to
   provide styling through *higher order components* (HOC's) which will be
   applied to the defaults. (Note, we are also using `withNode` to give our
   component a place to store its data. This is unrelated to the design, and you
   should already be familiar with this pattern from the previous tutorial.
   ```ts
   const CaptionedImageClean = flow(
     designable(captionedImageComponents, 'CaptionedImage'),
     withNode,
   )(CaptionedImageBase);
   ```
   > Note the second argument to `designable`.  It is a human-readable label
   > which can appear in the markup to help you identify what design keys are
   > producing a specific element.
    
1. Next, let's pass in some HOC's via `withDesign` to make our component editable.
   ```ts
   export const asCaptionedImageToken = (...attributes: string[]) => (...defs: TokenDef<any>[]) => flowHoc(
     ...defs,
     {
       categories: {
         Component: ['CaptionedImage'],
         Attribute: attributes,
       },
     },
   );

   const withCaptionedImageTitleEditor = asElementToken('Text Editor')(
     withSimpleEditor('body', 'Caption'),
   );

   const withCaptionedImageImageEditor = asElementToken('Image Editor')(
     asBodilessImage('image'),
   );

   const withCaptionedImageEditors = asCaptionedImageToken('Editor')(
     withDesign({
       Image: withCaptionedImageImageEditor,
       Body: withCaptionedImageTitleEditor,
     }) as HOC,
   );
   ```

   You will notice that this token (`withCaptionedImageEditors()`) is a very
   similar to the "behavior token" we used earlier to make a text field
   editable (`withSimpleEditor()`). Only here, the token applies to a *compound*
   component, not to a single element. This is accomplished through `withDesign()`.
  
   `withDesign()` takes a a "Design": object whose keys are the names of the
   sub-components which belong to our `CaptionedImage`, and whose values are
   tokens (higher-order components) which should be applied to each. It returns
   a token which can be applied to our `CaptionedImage` to style (or otherwise
   alter) its sub-components.

   Note: in the above example we create *element* level tokens
   (`withCaptionedImageTitleEditor`, `withCaptionedImageImageEditor`) which we
   then use in `withDesign`. This is to facilitate later *re-composition* of the
   compound component (see below).

1. Now let's add styling tokens:
   ```ts
   const withFullWidth = asElementToken('Width')(
     addClasses('w-full'),
   );
  
   const withCaptionedImageImageStyles = asElementToken('Styles')(
     withFullWidth,
   );
  
   const withCaptionedImageStyles = asCaptionedImageToken('Styles')(
     withDesign({
       Image: withCaptionedImageImageStyles,
     }) as HOC,
   );
   ```
   These are very similar to the tokens we created for the primary header.

   Note that `withFullWidth` is probably reusable and belongs in `src/components/Element`.  
   Note also that `withCaptionedImageStyles` is not strictly necessary (it simply
   repeats `withFullWidth`), but creating it now will make it easier should
   we wish to apply other image styles in the future.

1. Finally, lets combine these together and export. 

    ```ts
    const asCaptionedImage = flowHoc(
      withCaptionedImageEditors,
      withCaptionedImageStyles,
    );
    
    const CaptionedImage = asCaptionedImage(CaptionedImageClean);
    
    export default CaptionedImage;
    export {
      withCaptionedImageImageEditor,
      withCaptionedImageTitleEditor,
      withCaptionedImageImageStyles,
      withCaptionedImageEditors,
      withCaptionedImageStyles,
      asCaptionedImage,
      CaptionedImageClean,
    };
    ```
    It's worth looking at exactly what we're exporting:
  
    * `CaptionedImageClean` is the most basic version of our component. It will
      serve as the base to which design tokens can be applied, and can be used in
      contexts where we don't want to allow the content to be edited.
    * Element level tokens for each design element.
    * `withCaptionedImageEditors` is a *component level* token which makes our
      clean component editable, and can be applied wherever we do want to allow
      the content to be edited.
    * `withCaptionedImageStyles` is a *component level* token which adds
      default styles.
    * `asCaptionedImage` and `CaptionedImage` combine the above and are exported
      for convenience, since we expect that in most cases we'll want the
      component to be editable.

1. As a final step in this file, we make sure the imports are correct. This is
   pretty self explanatory. If you forget one you will be warned and it won't
   work!
    ```ts
    import React, { FC, ComponentType } from 'react';
    import { asBodilessImage } from '@bodiless/components-ui';
    import { withNode } from '@bodiless/core';
    import {
      Img, Section, Div, addClasses, designable, flowHoc, withDesign, HOC
    } from '@bodiless/fclasses';
    import type {
      StylableProps, DesignableComponentsProps, TokenDef
    } from '@bodiless/fclasses';
    import flow from 'lodash/flow';
    import { withSimpleEditor, asElementToken } from '../Element';
    ```


## 5. Combine `CaptionedImage` & `PrimaryHeader` 

Let's take the components we have just created and combine them. Imagine that
our design calls for a page header block with image and a header text.

1. Create a directory at `src/components/PageHeader`, and add an `index.ts` with the
   following:
   ```ts
   import { CaptionedImage } from '../Gallery/CaptionedImage';
   import { withPrimaryHeaderStyles } from '../Element';

   export const asPageHeader = flowHoc(
     withDesign({
       Body: flowHoc(
         startWith(H1),
         withPrimaryHeaderStyles,
       ),
     }),
   );
   const PageHeader = asPageHeader(CaptionedImage);
   ```

    You can see we "modified the design" of the original captioned image, first
    replacing the base element with an `H1` tag, and then applying 
    the styles we previously defined for primary headers.

    > Note on `startWith` and `replaceWith`.  Bodiless offers these two helper
    > functions to swap out a component. Both take a replacement component as
    > an argument, and return an HOC which renders the replacement component
    > instead of the original, but there is one critical difference.  `startWith`
    > replaces the base component (usually a tag), but leaves any tokens which
    > had previously been applied intact. `replaceWith` on the other hand,
    > replaces the original along with any tokens. For example:
    > ```js
    > const ExampleBase = ({ components: C, ...rest }) => <C.Tag {...rest} />;
    > const ExampleClean = designable({ Tag: Span })(ExampleBase);
    > const Example = withDesign({
    >   Tag: addClasses('text-blue'),
    > })(Example); // <span className="text-blue" />
    > const StartWith = withDesign({
    >   Tag: startWith(Div),
    > })(Example) // <div className="text-blue" />
    > const ReplaceWith = withDesign({
    >   Tag: replaceWith(Div),
    > })(Example) // <div />
    > ```
    > here we use `startWith` because we want to preserve the editor tokens
    > which were applied to this element by `asCaptionedImage`.
    >
    > **Important Note**: `startWith` can only be used in the context of
    > `withDesign`. 

    Note that so far we have only applied *styling* to the image caption, we
    have not changed its *behavior*: It is still editable using the rich text
    editor that was originally defined in `withCaptionedImageEditors`, not the
    plain text editor that we want to use for our page titles.

    To swap out the editors we have three options:

    1. Replace.
       ```ts
       const PageHeader = flowHoc(
         withDesign({
           Body: replaceWith(PrimaryHeader),
         }),
       )(CaptionedImage);
       ```

       Note the use of the `replaceWith` HOC here. This will remove any tokens
       previously applied to the design key.  It's a good option if you know
       (as here) exactly how and where your component will be used.

    2. Recompose.

       But what if we want to create a reusable token, `asPageHeader`, which can be
       composed with other tokens to make a captioned image into a special page
       header? Then, using `replaceWith` could have unpredictable results, for
       example:

       ```ts
       const withBlueBody = withDesign({
         Body: addClasses('text-blue'),
       });
       const BluePageHeader = flowHoc(
         withBlueBody,
         asPageHeader,
       )(CaptionedImage);
       ```
       Here, the `asPageHeader` token will silently replace the body, removing the
       blue text style applied by `withBlueBody`;

       In such cases, it is much better practice to create a token which
       *recomposes* the original and is designed to apply to the clean version.

       ```ts
       const asPageHeader = flowHoc({
         withDesign({
           Body: asPrimaryHeader,
           Image: flowHoc(
             withCaptionedImageImageEditor,
             withCaptionedImageImageStyles,
           ),
         }),
       });
       ...
       const BluePageHeader = flowHoc(
         withBlueBody,
         asPageHeader,
       )(CaptionedImage);
       ```

       This has the advantage of clearly specifying from the ground up how the
       page topper should look and behave, but it's a bit verbose and requires
       you to recompose the image editor as well as the text editor.

    3. Reset

       If you have defined consistent token metadata, a third option is to reset
       the editor applied by the original token and add your own:
  
       ```ts
       import { withTokenFilter } from '@bodiless/fclasses';

       const asPageHeader = withDesign({
         Body: flowHoc(
           withTokenFilter((t: Token) => !t.categories.Attribute.includes('Editor')),
           asPrimaryHeader,
         ),
       });
       ...
       const PageHeader = flowHoc(
         asPageHeader,
       )(CaptionedImage);
  
       const CustomPageHeader = flowHoc(
         withBlueBody,
         asPageHeader,
       )(CaptionedImage);
       ```

       Here, `withTokenFilter` will selectively reset any tokens which match the
       filter function, in this case allowing us to remove any previously defined
       editor and supply a new one.

       Try all three of these alternatives in your `PageHeader/index.ts`.
    
1. Next, on the gallery page, remove the `PrimaryHeader` and the linkable image:
   ```jsx
   <Link><Image /></Link>
   <PrimaryHeader />
   ```
   and replace with 
   ```tsx
     <PageHeader />
   ```
   
   Reload the homepage and make sure it renders as expected. We could take
   this a step farther and move our `HeaderImage` to `src/components` and reuse
   it across all the pages. It could also have linkable header image, apply the title
   over the image, etc. We will leave this as exercise for you to do on your own.

While this a simple component we are wrapping in the design, proceeding in this
manner as the components grow in either functionality or complexity gives us a
few benefits:

* Design is separated from the internal markup of the component.
* Simplified Styling: this simplifies styling of components and eliminates the normal
css cascade that builds and grows over time.
* Isolation: it keeps the styling isolated to the specific item minimizing the risk
of affecting other non-related items.
* Reusability as is or with extending.

These benefits apply during the initial build and future changes benefit as well.
For example, if there is a request to change a rendered H1 to H2 for SEO purposes,
this can easily be achieved.

## 6. Continue with wrapping the `Gallery` with Design API

1. The current files in Gallery folder contain the templates defining how your
   component functions. Let's create a `token.tsx` and move the design styles to
   a separate file.

    ```ts
    import {
      withDesign,
      addClasses,
      flowHoc,
    } from '@bodiless/fclasses';
  
    export const withGalleryDesign = (...attributes: string[]) => (design: Design<GalleryComponents>) => flowHoc(
      withDesign(design),
      categories: {
        Component: ['Gallery'],
        Attribute: attributes,
      },
    );

    export const withGalleryMargin = withGalleryDesign('Margin')({
      Wrapper: addClasses('my-2'),
    });
  
    export const withGalleryTypography = withGalleryDesign('Font Size')({
      Header: addClasses('text-2xl'),
    });

    export const withImageTileStyles = withGalleryDesign('Margin', 'Border')({
      Wrapper: addClasses('mx-2 border-8'),
      Image: addClasses('w-full'),
    });

    export const withBlueBorder = withGalleryDesign('Color', 'Border Color')({
      Wrapper: addClasses('border-blue-400'),
    });

    export const withRedBorder = withGalleryDesign('Color', 'Border Color')({
      Wrapper: addClasses('border-red-400'),
    });

    export const withGreenBorder = withGalleryDesign('Color', 'Border Color')({
      Wrapper: addClasses('border-emerald-400'),
    });

    ```
    
    These HOC's themselves can be considered "Component Tokens" which describe
    design elements which can be applied to the components as a whole. In other
    words, "Component Tokens" are no different than normal Element tokens except
    they apply to multiple sub-components. In `withImageTileStyles`, you can see
    we added margin, border to the wrapper and made sure the image shows
    full-width. All tokens here were taken from the existing `Gallery/index.tsx`
    file.

1. Let's update the `Gallery/index.tsx` and use the component tokens in place
of the current styling. In addition, let's wrap the Gallery Component in the
Design API as well, using the same method we just did.

    ```ts
    import React, { FC } from 'react';
    import {
      H2,
      Section,
      Div,
      stylable,
      designable,
      withDesign,
      varyDesign,
      replaceWith,
    } from '@bodiless/fclasses';
    import { withNode } from '@bodiless/core';
    import { withTitle, withFacet } from '@bodiless/layouts';
    import { FlowContainer } from '@bodiless/layouts-ui';
    import { withSimpleEditor } from './Element';
    import CaptionedImage from './CaptionedImage';
    import {
      withImageTileStyles,
      withGreenBorder,
      withBlueBorder,
      withRedBorder,
      withGalleryMargin,
      withGalleryTypography,
    } from './token';

    const galleryDesign = varyDesign(
      {
        ImageTile: flow(
          replaceWith(CaptionedImage),
          withImageTileStyles,
          stylable,
          withTitle('ImageTitle'),
        ),
      },
      {
        Red: withFacet('Color')('Red')(withRedBorder as HOC),
        Green: withFacet('Color')('Green')(withGreenBorder as HOC),
        Blue: withFacet('Color')('Blue')(withBlueBorder as HOC),
      },
    )();
  
    const GalleryBody: FC = () => (
      <FlowContainer nodeKey="body" design={galleryDesign} />
    );

    export type GalleryComponents = {
      Wrapper: ComponentType<StylableProps>,
      Header: ComponentType<StylableProps>,
      Body: ComponentType<StylableProps>,
    };

    const galleryComponents:GalleryComponents = {
      Wrapper: Section,
      Header: H2,
      Body: GalleryBody,
    };

    type Props = DesignableComponentsProps<GalleryComponents> & { };

    const GalleryBase: FC<Props> = ({ components }) => {
      const {
        Wrapper,
        Header,
        Body,
      } = components;

      return (
        <Wrapper>
          <Header />
          <Body />
        </Wrapper>
      );
    };

    const GalleryClean = flow(
      designable(galleryStart),
      withNode,
    )(GalleryBase);
  
    const withGalleryEditors = withDesign({
      Header: withSimpleEditor('header', 'Gallery Header),
    });

    const asGallery = flow(
      withGalleryMargins,
      withGalleryTypography,
      withGalleryEditors,
    );

    const GalleryDefault = asGallery(GalleryClean);
    export default Gallery;
    export {
      Gallery,
      GalleryClean,
      asGallery,
      withGalleryEditors,
    };
    export * from './token';
    ```

All of this should look familiar now and shouldn't need more explanation.

The `Gallery` naming & functionality remained the same so there is no need to
update the gallery page.

For more information, read about [FClasses](../Architecture/FClasses).
