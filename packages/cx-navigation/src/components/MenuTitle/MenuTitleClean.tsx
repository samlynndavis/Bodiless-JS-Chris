import React, { FC } from 'react';
import type { HTMLProps } from 'react';
import type { ComponentOrTag, DesignableComponentsProps } from '@bodiless/fclasses';
import { designable, A } from '@bodiless/fclasses';
import { EditorPlainClean } from '@bodiless/cx-editors';
import { asCxTokenSpec } from '@bodiless/cx-elements';

type MenuTitleComponents = {
  Link: ComponentOrTag<any>,
  Title: ComponentOrTag<any>,
};

type MenuTitleProps = DesignableComponentsProps<MenuTitleComponents> & HTMLProps<HTMLAnchorElement>;

const MenuTitleBase: FC<MenuTitleProps> = ({ components, ...rest }) => {
  const { Link, Title } = components;
  return (
    <Link {...rest}>
      <Title />
    </Link>
  );
};

const MenuTitleComponents: MenuTitleComponents = {
  Link: A,
  Title: EditorPlainClean,
};

/**
 * Clean component that renders Menu Titles.
 *
 * @see MenuTitleComponents for a list of design components.
 */
const MenuTitle = designable(MenuTitleComponents, 'MenuTitle')(MenuTitleBase);

export default MenuTitle;

export const asMenuTitleToken = asCxTokenSpec<MenuTitleComponents>();
