# Vital Hero Component

The Vital Hero component provides a primary focal point on landing and sublanding pages,
introducing their content by combining a brief description of the goals of that section 
along with a visually impactful graphic.

<!-- TODO: we could add some screenshots -->

## Content Editor Details

The Vital Hero component is generally included as part of a page template. Usage vary based on its
variation.

All variations of the Hero component span the full width of their container. On some page templates,
the Hero component might fill the entire screen width, bleeding the edge of the page container.

### Hero Image

A Hero Image is often used to briefly convey the content of the page for the user. Apart from its
graphic content, it is not interactive to the user.

<!-- TODO: maybe we should add screenshots of the hero component instead of linking to the image component here -->

See [Bodiless Image: Select and Configure an Image](/Components/Image/?id=select-and-configure-an-image)
for more details on how to update the Hero image.

### Hero Video

A Hero Video may be used to present a product, quickly summarize its page content, or just serve as
decoration. The video is provided by an YouTube integration, and the user can interact with video
controls and other visible elements within the YouTube frame.

<!-- TODO: add how-to after adding the hero video component -->

## Site Builder Details

The Vital Hero component is generally included as part of a page template, but it can also be placed
within any component you want.

### Usage

Setting up is as simple as applying the desired Token variation on top of the `HeroClean` component.
For instance, the example below places a Hero Image inside an example template token:

```ts
import { HeroClean } from '@bodiless/vital-hero';
import { cxImage } from '@bodiless/cx-image';
import { asCxTokenSpec } from '@bodiless/cx-elements';

const Default = asCxTokenSpec({
  Components: {
    Hero: on(HeroClean)(cxImage.Hero),
  },
  // Other tokens...
});
```

Hero variations are provided by other Bodiless packages, as described below.

### Available variations

#### Hero Image

Provided by the `@bodiless/cx-image` package. Example:

<!-- TODO: maybe we should add an example of how to configure the inner bodiless image -->

```js
import { HeroClean } from '@bodiless/vital-hero';
import { cxImage } from '@bodiless/cx-image';
import { as } from '@bodiless/fclasses';

const Hero = as(cxImage.Hero)(HeroClean);

const ExamplePage = () => (
  <ExampleWrapper>
    <Hero />
    ...
  </ExampleWrapper>
);
``` 

#### Hero Video

<!-- TODO: add video example -->

TBD