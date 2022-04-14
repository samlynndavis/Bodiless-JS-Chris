import type { Meta } from '@storybook/react/types-6-0';
import { DesignableComponents, DesignableProps, asToken, HOC, Token } from '@bodiless/fclasses';
import { TokenMap, withTokensFromProps } from '@bodiless/tokens';
import React, { FC, useContext } from 'react';
import { as, KsEditProvider, TokenCollection } from '@canvasx/elements';
import omit from 'lodash/omit';
import { ComponentType } from 'enzyme';
import JSXParser from 'jsx-parser';
import { DocsContext } from '@storybook/addon-docs';

/**
 * Gets the 'Group' property of the token's metadata.
 *
 * @param token
 * The token with metadata.
 */
const getGroupsForToken = (token: Token) => {
  // @todo Here we apply token to produce metadata. We should probably get it from the token itself.
  const test = token(() => null);
  const groups = Array.isArray(test.categories?.Group) ? test.categories.Group : [];
  return groups.length ? groups : ['Other'];
}

/**
 * Builds a token map from a token collection.
 *
 * @param collection
 */
export const buildTokenMap = <C extends DesignableComponents>(
  collection: TokenCollection<C>
): TokenMap<DesignableProps<C>> => {
  const tokens = Object.keys(collection).reduce(
    (toks, key) => ({
      ...toks,
      [key]: as(collection[key]),
    }),
    {}
  );
  const map = new TokenMap<DesignableProps<C>>(getGroupsForToken);
  map.add(tokens);
  return map;
};

/**
 * Generates the storybook argTypes descriptor from a token map.
 *
 * @param tokenMap
 */
export const getSbArgTypes = (tokenMap: TokenMap<any>) => (
  tokenMap.groups.reduce((acc, cat) => ({
    ...acc,
    [cat]: {
      control: {
        // type: 'multi-select',
        type: 'check',
        options: tokenMap.namesFor(cat),
      },
    },
  }), {})
);

/**
 * Creates an HOC which converts storybook template props (grouped collections
 * of token names) to an array of token HOCs.
 *
 * Each "group" in the token map becomes a prop to the template. Here, we
 * pull the token names out of those props and use them to select token HOCs
 * token HOCs from the supplied map.
 *
 * @param tokenMap
 */
const withTokensPropFromSbTemplateProps = (tokenMap: TokenMap<any>): HOC => Component => {
  const WithTokensPropFromSbTemplateProps: FC<any> = props => {
    // Filter out props which are not defined in the token map.
    const groups: string[] = Object.keys(props).filter(
      group => tokenMap.groups.includes(group) && Array.isArray(props[group])
    );
    // Create a single array of all token names.
    const tokenNames: string[] = groups.reduce(
      (names, next) => [
        ...names,
        ...props[next],
      ],
      []
    );
    // We flow all the tokens together here and pass a single token.
    const tokens: HOC[] = [tokenMap.flow(tokenNames)];
    // Update the key to force component to remount if selected tokens change.
    // const key = createHash('md5').update(tokenNames.join(',')).digest('hex');
    const key = tokenNames.join(';');
    return <Component {...omit(props, groups) as any} tokens={tokens} key={key} />;
  };
  return WithTokensPropFromSbTemplateProps;
};

/**
 * Creates an HOC which creates a storybook token story template from
 * a component, using the supplied token map.
 *
 * @param tokenMap 
 */
export const asSbTemplate = (tokenMap: TokenMap<any>) => asToken(
  withTokensFromProps,
  withTokensPropFromSbTemplateProps(tokenMap)
);

/**
 * Extends the Storybook Meta type to include tokens.
 */
export type TokenStoryDef = Meta & {
  tokens: TokenCollection<any>,
  tokenCollectionName: string,
  componentName: string,
};

const groupsFor = (tokenMap: TokenMap<any>, name: string): string[] => tokenMap.groups.reduce(
  (groups, group) => (tokenMap.namesFor(group).includes(name) ? [...groups, group] : groups),
  [],
);

type BuildSourceParams = {
  tokenNames: string[],
  componentName: string,
  tokenCollectionName: string,
};

const buildSource = ({
  tokenNames,
  componentName,
  tokenCollectionName,
}: BuildSourceParams) => {
  const lines = [];
  lines.push('as(');
  tokenNames.forEach(
    n => lines.push(`  ${tokenCollectionName}.${n},`)
  );
  lines.push(`)(${componentName});`);
  return lines.join('\n');
}

/**
 * Creates the Storybook template and story metadata for a component
 * and a set of tokens.
 *
 * @param def 
 */
export const createTokenStories = (def: TokenStoryDef) => {
  const { tokens, tokenCollectionName, componentName, ...meta } = def;
  const { component } = meta;
  const tokenMap = buildTokenMap(tokens);
  const Template = asSbTemplate(tokenMap)(component);

  const withEditProvider = (Story: ComponentType<any>) => (
    <KsEditProvider>
      <Story  />
    </KsEditProvider>
  );

  const story = (...tokenNames: string[]) => {
    const Story = Template.bind({});
    Story.parameters = {
      docs: {
        transformSource: (input: string, story: any) => {
          const context = useContext(DocsContext);
          const storyContext = context.getStoryContext(story);
          const { args } = storyContext;
          console.log('sc', args);
          const tokenNames = Object.values(args).reduce(
            (acc, next) => [
              ...acc,
              ...next,
            ],
            [],
          );
          return buildSource({
            tokenNames, tokenCollectionName, componentName,
          });

          // const cleanInput = input.toLowerCase().replace('\n', ' ');
          // console.log(JSON.stringify(cleanInput));
          // const cleanInput = `<Stylable Other={['default']} />`;
          // try {
          //   const parsed = JSXParser(cleanInput);
          //   console.log(parsed);
          // } catch(e) {
          //   console.log('could not parse', cleanInput, e);
          // }
          // const sc = React.useContext(SourceContext);
          // console.log('sc', sc);
          // console.log(input, story);
          // return 'FOO' + input;
        },
      },
    };
    // Story.parameters = {
    //   docs: {
    //     source: {
    //       code: buildSource({
    //         tokenNames,
    //         tokenCollectionName,
    //         componentName,
    //       }),
    //     },
    //   },
    // };
    Story.args = tokenNames.reduce(
      (args, name) => {
        const groups = groupsFor(tokenMap, name);
        if (!groups.length) return args;
        const groupName = groups[0];
        const tokens = args[groupName] ? [...args[groupName], name] : [name];
        return {
          ...args,
          [groupName]: tokens,
        };
      },
      {},
    );
    return Story;
  };

  return {
    meta: {
      ...meta,
      argTypes: getSbArgTypes(tokenMap),
      decorators: [withEditProvider],
    },
    Template,
    story,
  };
};
