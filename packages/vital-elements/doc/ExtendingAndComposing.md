# Extending and Composing Tokens

Vital tokens are designed to be customized.  They provide a starting point for the style and
behavior of a component, but in almost every case you will extend or compose them to meet hte
specific requirements of your site, reusing what fits your use case, and overriding or extending
what does not.

There are several strategies for implementing these customizations; these are described in detail in
this article.

In the examples below, we'll use [the simple `Dialog` component from the `Getting Started` guide](()
as our base componnent.

```ts
const Default = asDialogToken({
  Theme: {
    Border: 'p-2 border-2 rounded-lg',
    TitleWrapper: 'text-2xl bold',
    MessageWrapper: 'italic',
  },
  Spacing: {
    Border: 'p-2',
  },
  Components:
    Title: on(EditorPlainClean)(vitalEditorPlain.Default),
    Message: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Schema: {
    Title: withChildNode('title').
    Message: withChildNode('message'),
  },
});
```

## Extending

Vital tokens are structured collections of React Higher Order Components (HOC's). They are
Javascript objects with predefined keys, and the most straightforward way to customize them is to
use basic Javascript object manipulation:


```ts
const Custom = asDialogToken({
  // Reuse everything from the default token...
  ...Default,
  // ...Except the `Theme` domain which we override
  Theme: {
    // Reuse everything from the `Theme` domain
    ...Default.Theme,
    // ...except the `TitleWrapper` styling which we override.
    TitleWrapper: 'text-3xl',
  }
})
```

This will result in an object which is exactly the same as the original `Default` token except for
the value at `Custom.Theme.TitleWrapper`, which will have changed from `text-2xl bold` to
`text-3xl`.  There's no magic here, it is just plain Javascript.

You can also use this strategy to *extend* part of a token rather than overriding:

```ts
const Custom = asDialogToken({
  // Reuse everything from the default token...
  ...Default,
  // ...Except the `Theme` domain which we override
  Theme: {
    // Reuse everything from the `Theme` domain
    ...Default.Theme,
    // ...but extend the `TitleWrapper` to add underlining.
    TitleWrapper: as(Default.Theme.TitleWrapper, 'underline'),
  }
});
```

Or to remove a portion of the token entirely:

```ts
const Custom = asDialogToken({
  // Reuse everything from the default token...
  ...Default,
  // ...Except the `Theme` domain which we override
  Theme: {
    // Reuse everything from the `Theme` domain
    ...Default.Theme,
    // ...but remove any styling applied to the `TitleWrapper`
    TitleWrapper: undefined,
  }
});
```

pr using th `omit` utility from Lodash:

```ts
const Custom = asDialogToken({
  // Reuse everything from the default token...
  ...Default,
  // ...Except the `Theme` domain which we override, reusing everything
  // but omitting the TitleWrapper styling.
  Theme: omit(Default.Theme, 'TitleWrapper'),
});
```

You could use the same technique to exclude an entire domain:

```ts
const custom = asdialogtoken(
  // remove all styling applied in the default `theme` domain.
  omit(default, 'theme'),
);
```
or, without `omit`:

```ts
const custom = asdialogtoken({
  ...Default,
  // remove all styling applied in the default `theme` domain.
  Theme: undefined,
}
```

## Merging Tokens

The above examples demonstrate the simplest and most straightforward method of extending a token
using vanilla Javascript object manipulation. They have the virtue of being explicit: you can tell
at a glance exactly what is being added to or removed.  However, they are also a bit verbose--you
must remember to spread the default values within each domain, and use `as` in any slot you want to
extend, eg

```ts
TitleWrapper: as(Default.Theme.TitleWrapper, 'underline')
```

Vital provides some token merge helpers to keep your code leaner and more readable.

### `as...TokenSpec`

You will recall that when you create a clean component, you also define an `as...TokenSpec` utility
which is used to create tokens which apply to that component. This utilty helps ensure type safety
and also that the domains are applied in the correct order. It can also be used to extend a base
token, by providing multiple arguments. Consider our extension example above:

```ts
const Custom = asDialogToken({
  ...Default,
  Theme: {
    ...Default.Theme,
    TitleWrapper: as(Default.Theme.TitleWrapper, 'underline'),
  }
});
```

This could be written more simply using the `asDialogToken` helper, which will *merge* all of its
arguments into a single token:

```ts
const Custom = asDialogToken(Default, {
  Theme: {
    TitleWrapper: 'underline',
  }
});
```

The two forms are identical, and which you use is a matter of personal preference, but remember:

- If you use the explicit method, you must spread any domain from the orignal token or it will be
  excluded, and whene extending a specific slot, you must use `as`.
- If you use the shorthand method, you cannot remove styling from a domain or slot. In our example
  above, the `Custom` token inclues everything from the Theme domain of the original token, whereas
  if we had written
  ```ts
  const Custom = asDialogToken({
    ...Default,
    Theme: {
      TitleWrapper: 'underline',
    }
  });
  ```
  everything from the Theme domain would be *excluded*.

### `extendDomain`

Sometimes you want to combine the explicit method with the shorthand

> @TODO Example

## Composition

Where extension takes an existing token and modifies it's effect, *Composition* takes several
existing tokens and *combines* them.  The most basic form of composition is performed using the `as`
utility:

```ts
const WithGreenBorder = asDialogToken({
  Theme: {
    Border: 'border-green-500',
  },
});

const GreenDialog = as(Default, WithGreenBorder)(DialogClean);
```

`as` takes one or more tokens and combines them into an HOC which applies the tokens one after the
other in the order specified. In addition to full token objects, `as` can also take strings (which
will be interpreted as lists of classes to apply to the component as a whole) and functions (which
will be intepreted as HOC's to apply to the component as a whole).  Since the `DialogClean`
component passes all props to the `Border`, the above could also have been writen:

```ts
const GreenDialog = as(Default, 'border-green-500')(DialogClean);
```

>  Note that the order in which tokens are composed can be important
>  ```
>  as(addProps({ foo: 'bar' }), removeProps('foo'))
>  ```
>  will result in the prop `foo` being present, while
>  ```
>  as(removeProps('foo'), addProps({ foo: 'bar' }));
>  ``
>  will not.  This is clearer if you understand that
>  ```ts
>  as(a, b)(Component)
>  ```
>  is actually equivalent to
>  ```ts
>  b(a(Component))
>  ```
>  That is - the first token listed is applied to the component first, then the second, and so on.
>  In a sense, the first token is "inside" the second. So, in our first example:
>  ```ts
>  as(addProps({ foo: 'bar' }), removeProps('foo'))
>  ```
>  The `addProps` is applied inside the removeProps, so the prop is not yet present when
>  `removeProps` is executed.

## When to use composition.

You are probably asking yourself what's the difference between composing in this manner as opposed
to extending as we did earlier:

```ts
const GreenDialog = asDialogToken(Default, {
  Theme: {
    Border: 'border-green-500',
  },
});
```

Indeed, both will have the same effect when applied to a `DialogClean`:

```html
<div data-layer-region="Dialog:Border" className="p-2 border-2 rounded-lg border-green-500">
    ...
```

The difference lies in the way downstream consumers can use the `WithGreenBorder` token.  In the
extension example, the color is bundled into the complete variation; it's wrapped up in the `Theme`
domain along with the border width and border radius. You can't easily change the border color of
`GreenDialog` without reconstructing it.

This is not that big a deal when, as here, we just want to add a single class. But there are several
use-cases in which this makes a big difference.

### Layering

Imagine that in addition to varying the border color, we also wanted to be able to vary other
aspects of the default dialog:

```ts
const WithDashedBorder = asDialogToken({
  Theme: {
    Border: 'border-dashed',
  },
});
const WithRedTitle = asDialogToken({
  Components: {
    TitleWrapper: 'text-red-500',
  },
});
```

Now we've introduced 8 different combinations. We could use extension to create each combination and
add them all to our token collection, eg:

```ts
const GreenDialogWithRedTitleAndDashedBorder = asDialogToken(Default, {
  Theme: {
    Border: 'border-green-500 border-dashed',
    TitleWrapper: 'text-red-500',
  }
});

const GreenDialogWithRedTitleAndSolidBorder = asDialogToken(Default, {
  Theme: {
    Border: 'border-green-500',
    TitleWrapper: 'text-red-500',
  }
});
```
and so on.

However, if we export our `With...`  tokens instead, then a downstream consumer can compose them to
produce the desired variation:

```ts
const GreenDialogWithRedTitleAndSolidBorder = as(Default, WithGreenBorder, WithRedTitle);
```

This pattern is useful when your component has many dimensions of variation. You can see it in full
force with [vitalCard](). Let's call this kind of token, one intended to be composed with another
token to produce a variation, a "Variator".

### Complex Variators

Of course, nothing stops a downstream consumer from constructing these variations herself through
extension -- but providing pre-defined, composable "variators" can be a good way of encouraging
consistency. It's also very useful when the Variator includes modifications to multiple slots and/or
domains, as is often the case with layout related tokens.

```ts
const WithHorizontalOrientation = asDialogToken({
  Layout: {
    Border: 'flex flex-col lg:flex-row',
    TitleWrapper: 'w-full lg:w-1/4',
    ContentWrapper: 'w-full lg:w-3/4',
  },
  Spacing: {
    TitleWrapper: 'lg:pr-2',
  },
});
```

### The `Compose` domain.

Sometimes, you want to provide a fully composed token with several Variators which can be used
as-is, while allowing one or more of the Variators to be easily removed. For this purpose, Vital
provides the special `Compose` domain. Unlike those in other domains, the keys inside the `Compose`
domain do not refer to slots; rather they refer to named variators.

Let's imagine we want our default dialog to be horizontal with a green border

```ts
const Default = asDialogToken({
  ...Plain, // The old `Default` token defined above.
  Compose: {
    WithGreenBorder,
    WithHoriontalOrientation,
  },
```
Then `as(Default)` is identical in effect to `as(Plain, WithGreenBorder,
WithHorizontalOrientation)`, but a downstream consumer can easily remove or replace the variators:

```ts
const Custom = asDialogToken({
  ...Default,
  Compose: omit(Default.Compose, 'WithGreenBorder'),
})
```

### Avoid extending with a Variator

You may be tempted to use a Variator to extend a base token, eg:

```ts
const Green = asDialogToken(Default, WithGreenBorder);
```

This should generally be avoided. Remember that Variators are intended to encapsulate some bit of
styling or functionality which can be applied (or removed) as a unit.  When you extend with a
Variator, you are spreading its effects across the domains and slots of the token you are extending,
which make sit harder to extricate.

Also, while in many cases (including this example), extending will have the same effect as
composing, this is not always true. The reason, again, is that the order in which HOC's are applied
can make a difference.

> @TODO Example

### Removing with Composiiton

The composition pattern is great when you want to add some styling or functionality to an existing
token, but it's not so effective when you want to *remove* something. Variators are usually applied
"outside" the tokens they extend, so they 

> @TODO Examples of `removeClasses` and `replaceWith`


## Extension is really re-composition.

In fact, you can think of a normal token as a composition in itself of its constituent domains. That
is:

```ts
as(Default)
```
is equivaltent to
```ts
as(
  asDialogToken(pick(Default, 'Components')), 
  asDialogToken(pick(Default, 'Spacing')),
  asDialogToken(pick(Default, 'Theme')),
  asDialogToken(pick(Default, 'Schema')),
);
```
or even more granularly:
```ts
as(
  Default.Components._,
  withDesign(pick(Default.Componehts, 'Border')),
  withDesign(pick(Default.Componehts, 'TitleWrapper')),
  ,,,
);
```
Token objects are just a way of expressing these compositions in a structured way, and *extending* a
token is really just re-composing it.

> Note: The order in which domains are composed is fixed (you can see the full list of domains in
> order in [Token Domains]()).  It doesn't matter which order you specify them when defining the
> token; they will always be applied in the canonical order.
