# FClasses Design API

The Design API provides a mechanism for applying higher order components (including those
provided by the FClasses API) to individual elements within a compound component.

### Exposing the Design API

Consider the following component:
```javascript
const Card: FC<{}> = () => {
  return (
    <div className="wrapper">
      <h2 className="title">This is the title</h2>
      <div className="body">This is the body</h2>
      <a href="http://foo.com" className="cta">This is the CTA</a>
    </div>
  );
)
```

With the Design API, rather than providing classes which a consumer can style
using CSS, we provide a way for consumers to replace or modify the individual
components of which the Card is composed:

```ts
export type CardComponents = {
  Wrapper: ComponentType<StylableProps>,
  ImageWrapper: ComponentType<StylableProps>,
  ImageLink: ComponentType<StylableProps>,
  Image: ComponentType<StylableProps>,
  ContentWrapper: ComponentType<StylableProps>,
  Title: ComponentType<StylableProps>,
  Body: ComponentType<StylableProps>,
  Link: ComponentType<StylableProps>,
};

type Props = DesignableComponentsProps<CardComponents> & { };

const CardBase: FC<Props> = ({ components }) => {
  const {
    Wrapper,
    ImageWrapper,
    Image,
    ImageLink,
    ContentWrapper,
    Title,
    Body,
    Link,
  } = components;

  return (
    <Wrapper>
      <ImageWrapper>
        <ImageLink>
          <Image />
        </ImageLink>
      </ImageWrapper>
      <ContentWrapper>
        <Title />
        <Body />
        <Link />
      </ContentWrapper>
    </Wrapper>
  );
};
```

Here we have defined a type of the components that we need, a starting point for
those components and then we have create a componant that accepts those
compoents. Next we will combine the Start point as well as the CardBase to make
a designable card that can take a Design prop.

``` js
const cardComponents: CardComponents = {
  Wrapper: Div,
  ImageWrapper: Div,
  ImageLink: A,
  Image: Img,
  ContentWrapper: Div,
  Title: H2,
  Body: Div,
  Link: A,
};
const CardDesignable = designable(cardComponents, 'Card')(CardBase);
```

### Design Key Annotations

Note the second parameter to `designable` above; it is a label which will be used
to identify the component and its design keys is in the markup.  This can make
it easier to locate the specific design element to which styles should be
applied, for example:

```
<div bl-design-key="Card:Wrapper">
  <div bl-design-key="Card:ImageWrapper">
  ...
```

Generation of these attributes is disabled by default.  To enable it, wrap the section
of code for which you want the attributes generated in the `withShowDesignKeys` HOC:

```js
const CardWithDesignKeys = withShowDesignKeys()(CardDesignable);
```

or, to turn it on for a whole page, but only when not in production mode,

```js
const PageWithDesignKeys = withDesignKeys(process.env.NODE_ENV !== 'production')(Fragment);
<PageWithDesignKeys>
  ...
</PageWithDesignKeys>
```

## Consuming the Design API

A consumer can now style our Card by employing the `withDesign()` API method to
pass a `Design` object as a prop value. This is simply a set of higher-order
components which will be applied to each element. For example:

```js
const asBasicCard = withDesign({
  Wrapper: addClasses('font-sans'),
  Title: addClasses('text-sm text-green'),
  Body: addClasses('my-10'),
  Cta: addClasses('block w-full bg-blue text-yellow py-1'),
});

const BasicCard = asBasicCard(Card);
```

In ths example, we could simply have provided our design directly as a prop:

```js
const BasicCard: FC = () => <Card design={{
  Wrapper: addClasses('font-sans'),
  Title: addClasses('text-sm text-green'),
  Body: addClasses('my-10'),
  Cta: addClasses('block w-full bg-blue text-yellow py-1'),
}} />
```

However, by using `withDesign()` instead, our component itself will expose its own
design prop, allowing other consumers to further extend it:

```javascript
const asPinkCard = withDesign({
  Cta: addClasses('bg-pink').removeClasses('bg-blue'),
});
const PinkCard = asPinkCard(BasicCard);
```

In these examples, we are *extending* the default components. If we wanted
instead to *replace* one, we could write our HOC to ignore its argument
(or use the provided shortcut HOC `replaceWith()`):

```ts
const StylableH2 = stylable<JSX.IntrinsicElements['h2']>('h2');
const StandardH2 = addClasses('text-xl text-blue')(StylableH2);

const StandardCard = withDesign({
  Title: replaceWith(StandardH2), // same as () => StandardH2
})(BasicCard);
```

We can also use the `startWith()` HOC, instead of replacing the whole component,
it will only replace the base component but still use any hoc that might have
wrapped it.

As with FClasses, HOC's created via `withDesign()` are themselves reusable, so
we can write:

``` js
const asStandardCard = withDesign({
  Title: replaceWith(StandardH2), // same as () => StandardH2
});
const StandardCard = asStandardCard(Card);
const StandardPinkCard = asStandardCard(PinkCard);
const StandardRedCard = asStandardCard(RedCard);
```

And, also as with FClasses, the HOC's can be composed:

``` js
const StandardPinkAndGreenCard = asRight(
  withGreenCtaText,
  asStandardCard,
  asPinkCard,
)(BasicCard);
```

## Conditional Tokens

It is sometimes useful to apply classes conditionally, based on props passed to
a component and/or some enclosing state. The FClasses design API includes
some helper methods which make this easier.

### Conditional styling based on passed props

Imagine we have a button which has different variants depending on whether it is
active and/or whether it is the first in a list of buttons. We can use the
`addClassesIf()`, `removeClassesIf()`, `withoutProps()` and `hasProp()` helpers
to accomplish this:

``` js
type VariantProps = {
  isActive?: boolean,
  isFirst?: boolean,
  isEnabled?: boolean,
};

const Div = stylable<HTMLProps<HTMLDivElement>>('div');
const isActive = (props: any) => hasProp('isActive')(props);
const isFirst = (props: any) => hasProp('isFirst')(props);

const ContextMenuButton = as(
  withoutProps<VariantProps>(['isActive', 'isFirst'),
  addClasses('cursor-pointer pl-2 text-gray'),
  addClassesIf(isActive)('text-white'),
  removeClassesIf(isActive)('text-gray'),
  removeClassesIf(isFirst)('pl-2'),
)(Div);
```
> Note: Our innermost HOC is `withoutProps()`. This guarantees that the props used to
> control styling won't be passed to the `div` element. We must explicitly type
> the generic `withoutProps()`. This ensures that the type of the resulting
> component will include these props.

### Conditional styling based on context

Imagine we have a button which consume some state from a react context. We can
use `addClassesIf` and `removeClassesIf` helpers to add classes to the button
conditionally:

```js
const ToggleContext = React.createContext({
  state: false,
  toggleState: () => undefined,
});

const useIsToggled = () => React.useContext(ToggleContext).state;
const useToggle = () => React.useContext(ToggleContext).toggleState;

const ToggleContextProvider: FC = ({ children }) => {
  const [state, setState] = React.useState(false);
  const value = {
    state,
    toggleState: React.useCallback(() => setState(s => !s), []),
  };
  return (
    <ToggleContext.Provider value={value}>
      {children}
    </ToggleContext.Provider>
  );
};

const Toggle = ({ children, ...rest }) => <Button {...rest} onClick={useToggle()}>{children || 'Click Me'}</Button>;

const StyledToggle = addClassesIf(useIsToggled)('bg-emerald-200')(Toggle);
```
Here we pass a custom hook (`useIsToggled`) to `addClassesIf`. This hook consumes
the toggle state from the context, and applies the classes only if toggled on.

### Modifying props conditionally

You can use the similar `addPropsIf` hoc to add props as well as styles to a
component conditioonally:

```js
const StyledToggle = as(
  addClassesIf(useIsToggled)('bg-emerald-200'),
  addPropsIf(useIsToggled)({ children: 'On' }),
  addPropsIf(() => !useIsToggled())({ children: 'Off' }),
);
```
  
### flow toggles

A more general version of the above pattern is provided by th `flowIf` utility.
This takes a condition hook (like `addClassesIf`) and returns a version of
`as` which applies only if the condition evaluates to true. The above
example could be rewritten using a flow toggle as:
```js
const StyledToggle = as(
  flowIf(useIsToggled)(
    addClasses('bg-emerald-200'),
    addProps({ children: 'On' }),
  ),
  flowIf(() => !useIsToggled)(
    addProps({ children: 'Off' }),
  ),
)(Toggle);
```

This is more powerful than `addClassesIf` since you can pass any collection of
tokens to the function returned by `flowIf`. For example, we could use it
to replace the component entirely:

```js
const ReplacedToggle = flowIf(useIsToggled)(
  replaceWith(SomeOtherComponent),
)(Toggle);
```

Note howeer that unlike `addClassesIf` and `addPropsIf`, 
this will cause the enhanced component to be recreated (and
thus lose state) whenever the condition changes. For example, imagine
our base Toggle kept a counter:

```js
const Toggle = ({ children, ...rest }) => {
  const [count, setCount] = React.useState(1);
  const toggle = useToggle();
  const onClick = React.useCallback(() => {
    setCount(c => c + 1);
    toggle();
  }, [toggle]);
  return <Button {...rest} onClick={onClick}>Count is {count}</Button>;
}
```
Now compare
```js
const StyledToggle = flowIf(useIsToggled)(addClasses('bg-emerald-200'))(Toggle);
```
with
```js
const StyledToggle = addClassesIf(useIsToggled)('bg-emerald-200')(Toggle);
```
The first will lose the counter state every time the button is clicked, while
the second will properly retain it.

#### Reusable flow toggles.

For convenience, Bodiless packages often export a reusable flow toggle which
encapsulates its condition. One example is the `ifEditable` flow toggle
exported by `@bodiless/core`, which allows you to apply tokens only when
in edit mode.

## Design Variants

One of the most powerful features of the Design API is the ability to create
multiple variants of a component by composing different tokens onto it. These
variants can then be fed to component selectors like the
[as Container](../../Components/asContainer/) or
[Chameleon](../../Components/Chameleon)) to provide a content editor with a
range of options.

Such component selectors themselves accept a "fluid" or 'flexibe" design; that
is, a design which can accept any number of arbitrary keys, rather than one with
a fixed set of keys corresponding to fixed "slots" in the designable component.
Each key in this flexible design represents one variant.

You can use th `varyDesigns` helper to simplify the process of creating a large
number of variants. `varyDesigns` accepts any number of designs, and produces a
new design created by composing the keys of each design with each key of the
other designs (essentially a matrix multiplication). It's easiest to explain
with an example:

```js
import { varyDesigns } from '@bodiless/fclasses';
const base = {
  Box: as(startWith(Div), asBox),
};

const borders = {
  Rounded: asRounded,
  Square: asSquare,
};

const bgColors = {
  Orange: asOrange,
  Blue: asBlue,
  Teal: asTeal,
};

const variations = varyDesigns(
  base,
  borders,
  bgColors,
);
```
Here we first define a base design, which contains the tokens to be shared among
all variants. Then we create a separate design for each dimension of variation.
Finally, we combine them to produce our set of variations, which in this case
will be:
```js
{
  BoxRoundedOrange: as(startWith(Box), asBox, asRounded, asOrange),
  BoxRoundedBlue: as(startWith(Box), asBox, asRounded, asBlue),
  BoxRoundedRed: as(startWith(Box), asBox, asRounded, asRed),
  BoxSquareOrange: as(startWith(Box), asBox, asRounded, asOrange),
  BoxSquareBlue: as(startWith(Box), asBox, asRounded, asBlue),
  BoxSquareRed: as(startWith(Box), asBox, asRounded, asRed),
}
```

In some cases, you may want to restrict the options.  For example, if we
introduce border color into the mix, we may not want to allow certain
combinations of backgrounds and borders. This can be done by creating
an intermediate design with the exact variations we want:
```js
import pick from 'lodash/pick';

const borderColors = {
  Blue: withBlueBorder,
  Teal: withTealBorder,
};

const colors = {
  ...varyDesigns(
    pick(bgColors, 'Orange'),
    borderColors,
  ),
  ...varyDesigns(
    pick(bgColors, 'Blue'),
    pick(borderColors, 'Teal'),
  ),
  ...varyDesigns(
    pick(bgColors, 'Teal'),
    pick(borderColors, 'Blue'),
  ),
};
```
This will produce
```js
{
  OrangeBlue: as(asOrange, withBlueBorder),
  OrangeTeal: as(asOrange, withTealBorder),
  BlueTeal: as(asBlue, withTealBorder),
  TealBlue: as(asTeal, withBlueBorder),
}
```
which can then be composed with our border styles to produce the final
set of variations:
```js
const variations = varyDesigns<any>(
  base,
  borders,
  colors,
);
```
which produces
```js
{
  BoxRoundedOrangeBlue: as(startWith(Box), asBox, asRounded, asOrange, withBlueBackground),
  BoxRoundedOrangeTeal: as(startWith(Box), asBox, asRounded, asOrange, withTealBackground),
  BoxRoundedBlueTeal: as(startWith(Box), asBox, asRounded, asBlue, withTealBackground),
  BoxRoundedTealBlue: as(startWith(Box), asBox, asRounded, asTeal, withBlueBackground),
  BoxSquareOrangeBlue: as(startWith(Box), asBox, asSquare, asOrange, withBlueBackground),
  BoxSquareOrangeTeal: as(startWith(Box), asBox, asSquare , asOrange, withTealBackground),
  BoxSquareBlueTeal: as(startWith(Box), asBox,  asSquare, asBlue, withTealBackground),
  BoxSquareTealBlue: as(startWith(Box), asBox, asSquare, asTeal, withBlueBackground),
}
```
Note in all the above examples, the design keys produced by `varyDesign` are
constructed simply by concatenating the keys of all the keys which are composed
in each.

Note also that all the tokens composed above could *themselves* be designs which
apply to on the base component which is being varied. For example, if
instead of
```js
const base = as(startWith(Div), asBox);
```
we had
```js
const base = as(startWith(SomeDesignableComponentWithAWrapper), ...);
```
Then our individual style tokens might look like this:
```js
const asOrange = withDesign({
  Wrapper: addClasses('bg-orange'),
});
```
