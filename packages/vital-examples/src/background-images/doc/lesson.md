# Background Images

<!-- OPENING NOTE & REMINDER TO THE DEVELOPERS:

    - The most important thing in these curriculum lessons is INFORMATION.
      - Do not worry about prettiness (e.g., formatting) or spelling/punctuation.
        The technical writer will take these and clean them up later.
    - Some tasks may not need to use all the sections listed below, and that is ok.
-->

<!-- INTRODUCTION

    Use this section to _introduce_ the topic/task.
    What this looks like may differ depending on the task.

    - Keep in mind that the next section is the "Overview," which will describe what you are doing,
      and why.
      So, this should set up the reader for what they'll read in the "Overview," and provide them
      with any necessary context.
    - For example, you could provide links to any resources necessary/beneficial to getting started.
    - Don't use an "Introduction" header — just roll into your intro.
-->

@TODO Link to shadowing documentation and Bodiless documentation section on using Tailwind for background images.

## Overview

<!-- Describe what you'll be doing in this task and why (if relevant). -->
In this task we'll be customizing the default vital footer to include a new brand-specific SVG logo, as well an SVG wave image on both desktop and mobile.

## Assignment

<!--
    Explain, using Bodiless terminology, how a developer should accomplish this task.

    - Feel free to reference other documents or examples.
      - If there aren't existing examples showcasing what you want, then provide some.
      - If there isn't documentation discussing a particular topic or detail that is relevant to
        your task, you may need to write it and add it to the appropriate location in documentation.
        - Ultimately, this curriculum should just be an onboarding tool, and all the _actual_
          documentation should live outside of this curriculum and be in its appropriate place. This
          curriculum can then link to any of that relevant documentation.
-->
To begin, we will create a react component from our SVG to be used to replace the brand logo on the default vital footer. Using your SVG-to-React conversion app of choice (SVGR Playground), inlcude your SVG in the body of a functional component as illustrated below:

```jsx
import { stylable } from '@bodiless/fclasses';
import * as React from 'react';

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  // Insert your SVG element here
);

const LogoIcon = stylable(Logo);

export default LogoIcon;

```

Next, you'll need to create the folder that will house your new footer component `ExampleFooter` that will be used to override the default vital footer.

You can structure this component's folder in a similar fashion to that of the vital component found [here](packages/vital-layout/src/components/Footer), or make use of the component scaffolder to create this component structure automatically.

- TODO: Add more details on import chain and/or refer to new shadow documentation to avoid verbosity here?

### Adding our custom brand logo

In our 'Footer' token collection -- named `exampleFooter.ts` -- you'll replace the `Rewards` slot of the footer component with your new custom brand logo, using the `startWith` HOC.

NOTE: You may have noticed that a similar HOC, `replaceWith`, can be used to achieve the same result, but `startWith` is the preferred method in this instance, as it replaces a component while still retaining any tokens previously applied to it. `replaceWith` is most often used to remove a component or slot in its entirety (`replaceWith(() => null)`).

### Creating a new CSS rule in Tailwind for our wave SVG image mask

Using the `addComponents` function provided by Tailwind, we can create a new class containing our image mask path, size, and position, and apply it to our new footer in the next section.

NOTE: In most instances, the utility classes provided out of the box by Tailwind will be enough to satisfy all of your styling needs. However, in cases such as this one where our footer wave must be implemented through the use of an image mask (a CSS property for which no default Tailwind utility class exists), we can construct a CSS rule directly in our Tailwind configuration file.

@TODO for JONES: use the technique you discovered to embed actual code snippets here rather than inlining them

```js
plugin(({ addComponents }) => {
      addComponents({
        '.footer-wave': {
          maskImage: "url('vital-examples/src/background-images/assets/images/desktopwave.svg')",
          maskPosition: 'bottom center',
          maskSize: '100%',
        },
      });
    }),

```

### Adding our 'wave' svg asset and mobile wave to the footer wrapper

@TODO for JONES -- break this into 3steps following the guide from UsingTailwind Background Images

In our `exampleFooter.ts`, we will construct a `WithTopWave` token, in which we will apply to the [appropriate domains](https://johnsonandjohnson.github.io/Bodiless-JS/#/VitalDesignSystem/Components/VitalElements/Tokens/TokenDomains?id=token-domains) the tailwind classes needed to render an SVG wave to the top of the footer.

On the `Wrapper` slot, we will apply our `.footer-wave` CSS rule, and on the `Column2Wrapper` slot, we will apply the tailwind classes necessary to render a similar SVG wave to the top of the footer on mobile and tablet devices.

 We will then construct a `Default` token for our custom footer and apply our newly-created `WithTopWave` token to this token's `Compose` domain.

## Practice

@TODO

<!--
    Come up with a new task for the reader to perform that is similar in nature to the lesson they
    just completed, allowing them to practice what they've learned.
-->

## Resources

@TODO

- [Adding components in Tailwind](https://tailwindcss.com/docs/plugins#adding-components)
- [SVGR - For converting SVGs to React components](https://react-svgr.com/playground/)
- [Using Tailwind for Background Images](https://johnsonandjohnson.github.io/Bodiless-JS/#/Development/Guides/BuildingSites/TailwindGuide?id=using-tailwind-for-background-images)
-

<!--
    Link to any resources you found/used to help you accomplish this task.

    - Link to pages/sections within the Bodiless documentation or the API docs.

    TIP: When searching for resources in the Bodiless documentation, don't rely on the Docsify
         search; instead, use the search in VS Code.
-->

## FAQ

@TODO

<!--
    If you remember any of the questions you had when completing this task — or can think of any
    questions a new developer may have — document the Questions and Answers here.
-->

### [ QUESTION 1 ]

<!-- Answer to QUESTION 1 -->

### [ QUESTION 2 ]

<!-- Answer to QUESTION 2 -->