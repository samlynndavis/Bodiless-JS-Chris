import React from 'react';
import { HOC } from '@bodiless/fclasses';
import { withMetaForm } from '@bodiless/components';
import { useMenuOptionUI, useNode } from '@bodiless/core';

/**
 * isHomePage verify if the page is a home page.
 *
 * @return true or false if the page to be a home page.
 */
export const useIsHomePage = () => {
  const { node } = useNode();
  const pageTypeNode = node.peer<any>(['Page', 'meta', 'page-type']);
  return pageTypeNode.data?.content === 'home';
};

const seoFormHeader = {
  title: 'SEO Data Management',
  description: `Enter the page level data used for SEO.
  This is metadata needed for SEO that will go in the page header.`,
};

const socialShareFormHeader = {
  title: 'Social Share Management',
  description: 'Enter the page level Open Graph data used for Social Share.',
};

const useSeoMenuOptions = () => [
  {
    name: 'seo',
    icon: 'category',
    label: 'SEO',
    group: 'page-group',
  },
];

const useShareMenuOptions = () => [
  {
    name: 'share',
    icon: 'share',
    label: 'Share',
    group: 'page-group',
  },
];

const metaSocialShareImageName = 'og-image';

export const SocialShareFormImage = () => {
  const { ComponentFormText, ComponentFormDescription } = useMenuOptionUI();
  return (
    <>
      <ComponentFormText field={metaSocialShareImageName} id="social-share-img-src" />
      <ComponentFormDescription>
        Provide an absolute image url.
      </ComponentFormDescription>
    </>
  );
};

export const withSeoMetaForm = withMetaForm(useSeoMenuOptions, seoFormHeader);

export const withShareMetaForm = withMetaForm(useShareMenuOptions, socialShareFormHeader);

export const withMetaHtmlAttributes = (
  lang: string,
  dir: string,
  nodeKey: string,
  nodeCollection: string | undefined,
): HOC => HelmetComponent => props => {
  const { children, ...rest } = props;
  const { node } = useNode(nodeCollection);
  const childNode = node.child(nodeKey);
  return (
    <HelmetComponent {...rest as any}>
      {children}
      <html lang={lang} dir={dir} {...childNode.data} />
    </HelmetComponent>
  );
};
