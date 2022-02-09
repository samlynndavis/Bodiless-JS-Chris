import { ComponentType } from 'react';
import path from 'path';
import { withDefaultContent, withResetButton, useNode } from '@bodiless/core';
import { withContentLibrary } from '@bodiless/layouts';
import { ComponentSelector } from '@bodiless/layouts-ui';
import { getImageContentFrom } from '@bodiless/gatsby-theme-bodiless';
import { AsBodilessImage, withImagePlaceholder } from '@bodiless/components';
import { asBodilessImage } from '@bodiless/components-ui';
import { asToken, Token, asTokenSpec } from '@bodiless/fclasses';
// import { asCxTokenSpec } from '@bodiless/cx-elements';
import type { ContentNode, ContentNodePath } from '@bodiless/core';

type ImageComponents = {
  Image: ComponentType<any>,
};

/**
* Compose asEditableImage hoc with default meta.
*
* @return asEditableImage hoc.
*/
const asEditableImageClean: AsBodilessImage = (
  nodeKey?, placeholder?, useOverrides?,
) => asToken(
  asBodilessImage(nodeKey, undefined, useOverrides),
  withImagePlaceholder(placeholder),
);

const asImageToken = asTokenSpec<ImageComponents>();

/**
* Util function generating a token which add the default content to the base image token.
*
* @return token.
*/
const WithDefaultContentImage = (nodePath: ContentNodePath) => asToken(
  withDefaultContent({
    image: getImageContentFrom(nodePath),
  }),
  withResetButton('image'),
);

/**
* Util function generating a token which add the library to the base image token.
*
* @return token.
*/
const WithImageLibrary = (libraryNodeKey: string): Token => {
  const useImageLibraryNode = () => {
    const { node } = useNode();
    return { node: node.peer(libraryNodeKey) };
  };

  const useImageMeta = (node: ContentNode<any>) => {
    const { data } = node;
    if (!data.src) return null;
    return {
      title: path.basename(data.src),
      description: data.alt || '',
    };
  };

  return asToken(
    withContentLibrary({
      Selector: ComponentSelector,
      useLibraryNode: useImageLibraryNode,
      useMeta: useImageMeta,
    }),
  );
};

export {
  asImageToken,
  asEditableImageClean,
  WithDefaultContentImage,
  WithImageLibrary,
};
