import omit from 'lodash/omit';
import { withDefaultContent } from '@bodiless/data';
import { addProps, on } from '@bodiless/fclasses';
import { vitalSection, asSectionToken } from '@bodiless/vital-section';

import { ElementsListClean, elementsList } from '../../ElementsList';

/**
 * Hook to provide the default content for the `EditorPlainClean` Title element.
 * It returns the object where key is the nodeKey expected for the component (`title` in this case)
 * and the value is the data expected by the underlying component.
 */
export const useTitleContent = () => ({
  title: { text: 'Hello Section Title!' },
});

/**
 * Hook to provide the default content for the `EditorPlainClean` Description element.
 * It returns the object where key is the nodeKey expected ('description' in this case)
 * and the value is the data expected by the underlying component.
 */
export const useDescriptionContent = () => ({
  description: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
});

/**
 * Default example token for the Section component which adds Section Content.
 * Note how we Omit 'Content' and 'Components' domains from the original `vitalSection.Default`.
 *
 * This is done to illustrate another way to change the original vital token.
 * Here we want to make sure we don't inherit the Title and Description from `vitalSection.Default`.
 * We will add `WithTitle` and `WithDescription` as standalone tokens.
 */
const Default = asSectionToken(omit(vitalSection.Default, 'Content', 'Components'), {
  Spacing: {
    Content: 'mt-4'
  },
});

/**
 * Token that extends the Default and adds the Link to the Section.
 * Note that `vitalSection.WithLink` is a token that meant to be layered
 * on top of other tokens.
 *
 * This token *does not* have `With...` in it's name and it indicates that this token is meant
 * to be used as a standalone token which can be used *instead* of the `Default` token.
 *
 * Think of it as a Noun, the token is sufficent by itself to render the component,
 * and not just adding a small piece of functionality.
 */
const SectionLink = asSectionToken(Default, {
  ...vitalSection.WithLink,
  Content: {
    /**
     * Another quick way way to add content such as link text is to add
     * children directly to the element like so:
     */
    Link: addProps({ children: 'Section Link' }),
  }
});

/**
 * A token that adds a Link to the Section Component.
 *
 * Note that the name of this token *starts with* `With...`. That means that the token is meant
 * to be layered on top of other tokens and not used by itself. The big difference here is that
 * this token *does not extend* the Default token. It is very limited in what this token can do.
 *
 * Think of it as an Adjective, something that reflects behaviour or additional functionality.
 *
 * This is the preffered Token pattern since it encourages composition
 * and results in a better overall code structure as well as simplifying testing.
 */
const WithSectionLink = asSectionToken({
  /**
   * The `vitalSection.WithLink` token is also starts with `With...` that indicates that it is
   * limited in functionality and meant to enhance the main Token. We take `vitalSection.WithLink`
   * and just add default text to the link.
   */
  ...vitalSection.WithLink,
  Content: {
    /**
     * Another quick way way to add content such as link text is to add
     * children directly to the element like so:
     */
    Link: addProps({ children: 'Section Link' }),
  },
});

/**
 * A token that adds a Section Description.
 * Description editor setings are inherited from `...vitalSection.WithDescription` Token.
 *
 * Note that the name of this token *starts with* `With...`. That means that the token is meant
 * to be layered on top of other tokens and not used by itself. The big difference here is that
 * this token *does not extend* the Default token. It is very limited in what this token can do.
 *
 * Think of it as an Adjective, something that reflects behaviour or additional functionality.
 *
 * This is the preffered Token pattern since it encourages composition
 * and results in a better overall code structure as well as simplifying testing.
 */
const WithSectionDescription = asSectionToken({
  /**
   * The `vitalSection.WithDescription` token is also meant to enhance the main Token.
   * It provides the Editor for the Section Description and sets `DescriptionWrapper` to `<P>`.
   */
  ...vitalSection.WithDescription,
  Content: {
    /**
     * We use `withDefaultContent` and the `useDescriptionContent` hook to add the default text
     * to the Section Description under the `Content` Domain.
     */
    Description: withDefaultContent(useDescriptionContent),
  }
});

/**
 * A token that adds a Section Title.
 * Title editor setings are inherited from `...vitalSection.WithTitle` Token.
 *
 * Note that the name of this token *starts with* `With...`. That means that the token is meant
 * to be layered on top of other tokens and not used by itself. The big difference here is that
 * this token *does not extend* the Default token. It is very limited in what this token can do.
 *
 * Think of it as an Adjective, something that reflects behaviour or additional functionality.
 *
 * This is the preffered Token pattern since it encourages composition
 * and results in a better overall code structure as well as simplifying testing.
 */
const WithSectionTitle = asSectionToken({
  /**
   * The `vitalSection.WithLink` token is also meant to enhance the main Token.
   * It provides the Editor for the Section Title and makes `TitleWrapper` h2.
   */
  ...vitalSection.WithTitle,
  Content: {
    /**
     * We use `withDefaultContent` and the `useTitleContent` hook to add the default text
     * to the Section Title under the `Content` Domain.
     */
    Title: withDefaultContent(useTitleContent),
  }
});

/**
 * A token that adds a list of cards as Content of the Section Component.
 *
 * Note that the name of this token *starts with* `With...`. That means that the token is meant
 * to be layered on top of other tokens and not used by itself. The big difference here is that
 * this token *does not extend* the Default token. It is very limited in what this token can do.
 *
 * Think of it as an Adjective, something that reflects behaviour or additional functionality.
 *
 * This is the preffered Token pattern since it encourages composition
 * and results in a better overall code structure as well as simplifying testing.
 */
const WithSectionCards = asSectionToken({
  /**
   * Here we will replace the default Section Content with the `ElementsListClean`
   * which just repeats it's `ElementToUse` n times. You can specify the number of
   * repeats by providing `times` prop.
   */
  Components: {
    Content: on(ElementsListClean)(elementsList.Default),
  },
});

/**
 * Export a default `exampleSection` token collection for the Example Section Component.
 */
export default {
  Default,
  SectionLink,
  WithSectionLink,
  WithSectionTitle,
  WithSectionDescription,
  WithSectionCards,
};
