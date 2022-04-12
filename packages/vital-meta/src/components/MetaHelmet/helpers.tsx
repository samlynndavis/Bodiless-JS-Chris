/**
 * Copyright © 2022 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { useFieldApi } from 'informed';
import { addClasses, Div, HOC } from '@bodiless/fclasses';
import { TImagePickerUI, ImageDropZone, withMetaForm } from '@bodiless/components';
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

const DropZoneWrapper = addClasses('my-2')(Div);

const DropZoneDesign = {
  UploadArea: addClasses('w-full bg-gray-600 text-center p-2')(Div),
};

const DropZoneUploadArea = DropZoneDesign.UploadArea;

const dropZoneUI: Partial<TImagePickerUI> = {
  UploadArea: () => <DropZoneUploadArea>Drag a file or click here to upload.</DropZoneUploadArea>,
};

export const SocialShareFormImage = () => {
  const { ComponentFormText } = useMenuOptionUI();
  const fieldApi = useFieldApi(metaSocialShareImageName);
  return (
    <DropZoneWrapper>
      <ComponentFormText field={metaSocialShareImageName} id="social-share-img-src" />
      <ImageDropZone
        fieldApi={fieldApi}
        targetFieldName={metaSocialShareImageName}
        ui={dropZoneUI}
      />
    </DropZoneWrapper>
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
