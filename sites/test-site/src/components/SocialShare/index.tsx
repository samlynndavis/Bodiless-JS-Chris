/**
 * Copyright © 2020 Johnson & Johnson
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
import React, { FunctionComponent as FC, MouseEvent } from 'react';
import Helmet from 'react-helmet';
import flowRight from 'lodash/flowRight';
import { useMenuOptionUI } from '@bodiless/core';
import {
  withMeta,
  asBodilessHelmet,
  withMetaForm,
  withMetaStatic,
  ImageDropZone,
  TImagePickerUI,
} from '@bodiless/components';
import { flowHoc } from '@bodiless/fclasses';
import { SocialShare as SocialShareClean } from '@bodiless/organisms';
import type { SocialShareProvider } from '@bodiless/organisms';
import { useFieldApi } from 'informed';
import asSimpleSocialShare, {
  asOrangeSocialShare,
  DropZoneWrapper,
  StyledIcon,
  WhiteStyledIcon,
  StyledLabel,
  LogoWrapper,
  Logo,
  LogoNoBackground,
  DropZoneDesign,
} from './token';
// @ts-ignore Cannot find module
import imgFacebook from './images/facebook.png';
// @ts-ignore Cannot find module
import imgFacebookRnd from './images/facebookimg.png';
// @ts-ignore Cannot find module
import imgTwitter from './images/twitter.png';
// @ts-ignore Cannot find module
import imgTwitterRnd from './images/twitterimg.png';
// @ts-ignore Cannot find module
import imgEmail from './images/email.png';
// @ts-ignore Cannot find module
import imgEmailRnd from './images/emailimg.png';

type ProviderProps = {
  name: string,
  icon: string,
  onclick: (event: MouseEvent) => void,
};

const Icon = (): JSX.Element => (
  <StyledLabel>
    <WhiteStyledIcon />
  </StyledLabel>
);
const IconWithLabel = (label?: string): JSX.Element => (
  <StyledLabel>
    <StyledIcon />
    {label}
  </StyledLabel>
);

/**
 * Popup window props type.
 *
 * Ref:
 *   https://developer.mozilla.org/en-US/docs/Web/API/Window/open
 */
type WindowOpenerProps = {
  name: string;
  url: string;
  toolbar?: boolean;
  scrollbars?: boolean;
  resizable?: boolean;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
};

const Provider: FC<any> = (props: ProviderProps) => {
  const { name, icon, onclick } = props;
  return (
    <LogoWrapper data-label={name} data-icon={icon} onClick={onclick}>
      <Logo src={icon} alt={name} />
    </LogoWrapper>
  );
};
const ProviderCustomized: FC<any> = (props: ProviderProps) => {
  const { name, icon, onclick } = props;
  return (
    <LogoWrapper data-label={name} data-icon={icon} onClick={onclick}>
      <LogoNoBackground src={icon} alt={name} />
    </LogoWrapper>
  );
};

/**
 * Popup window opener
 */
const popupOpen = (props: WindowOpenerProps) => {
  const {
    url, name, toolbar, resizable, top, left, width, height,
  } = props;
  const features = `toolbar=${toolbar ? 'yes' : 'no'},\
    resizable=${resizable ? 'yes' : 'no'},\
    top=${top || '500'},\
    left=${left || '500'},\
    width=${width || '400'},\
    height=${height || '400'}`;
  window.open(url, name, features);
};

const pageResources = (): {url: string, title: string, desc: string} => {
  let sharedUrl = '';
  let sharedTitle = '';
  let sharedDescription = '';
  if (typeof document !== 'undefined') {
    const linkElem = document.querySelector("link[rel='canonical']");
    const linkUrl = linkElem ? linkElem.getAttribute('href') || '' : '';
    const ogUrlMeta = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    const ogUrl = ogUrlMeta ? ogUrlMeta.content : '';
    if (linkUrl) {
      sharedUrl = linkUrl;
    } else if (ogUrl) {
      sharedUrl = ogUrl;
    } else if (typeof window !== 'undefined') {
      sharedUrl = window.location.href;
    }
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    sharedTitle = ogTitle ? ogTitle.content : '';
    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    sharedDescription = ogDesc ? ogDesc.content : '';
  }

  return {
    url: sharedUrl,
    title: sharedTitle,
    desc: sharedDescription,
  };
};

/**
 * FaceBook social share provider.
 */
const facebookShare = () => {
  const { url } = pageResources();
  const facebookSrc = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&amp;src=sdkpreparse`;
  popupOpen({
    url: facebookSrc,
    name: 'share',
  });
};
const facebook: SocialShareProvider = {
  id: 'facebook',
  element: <Provider
    name="FaceBook"
    icon={imgFacebook}
    onclick={facebookShare}
  />,
};
const facebookRound: SocialShareProvider = {
  id: 'facebook',
  element: <ProviderCustomized
    name="FaceBook"
    icon={imgFacebookRnd}
    onclick={facebookShare}
  />,
};

/**
 * Twitter social share provider.
 */
const twitterShare = () => {
  const { url } = pageResources();
  const twitterSrc = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
  popupOpen({
    url: twitterSrc,
    name: 'share',
  });
};
const twitter: SocialShareProvider = {
  id: 'twitter',
  element: <Provider
    name="Twitter"
    icon={imgTwitter}
    onclick={twitterShare}
  />,
};
const twitterRound: SocialShareProvider = {
  id: 'twitter',
  element: <ProviderCustomized
    name="Twitter"
    icon={imgTwitterRnd}
    onclick={twitterShare}
  />,
};

/**
 * Email share provider.
 */
const emailShare = () => {
  const { title, url, desc } = pageResources();
  const emailSrc = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(desc)}%0A%0ARead at: ${encodeURIComponent(url)}`;
  window.location.href = emailSrc;
};
const email: SocialShareProvider = {
  id: 'email',
  element: <Provider
    name="Email"
    icon={imgEmail}
    onclick={emailShare}
  />,
};
const emailRound: SocialShareProvider = {
  id: 'email',
  element: <ProviderCustomized
    name="Email"
    icon={imgEmailRnd}
    onclick={emailShare}
  />,
};

const providers: SocialShareProvider[] = [
  facebook,
  twitter,
  email,
];
const providersCustomized: SocialShareProvider[] = [
  facebookRound,
  twitterRound,
  emailRound,
];
const providersEmailOnly: SocialShareProvider[] = [
  emailRound,
];

const SimpleSocialShare = flowHoc(asSimpleSocialShare)(SocialShareClean);
const CustomizedSocialShare = flowHoc(asOrangeSocialShare)(SocialShareClean);
const IconOnlySocialShare = () => (
  <CustomizedSocialShare providers={providersCustomized} buttonContent={Icon()} />
);
const EmailOnlySocialShare = () => (
  <SimpleSocialShare providers={providersEmailOnly} buttonContent={IconWithLabel('Email Share')} />
);
export default () => (
  <SimpleSocialShare providers={providers} buttonContent={IconWithLabel('Share')} />
);
export { IconOnlySocialShare, EmailOnlySocialShare };

/**
 * Social Share menu.
 */
const socialShareFormHeader = {
  title: 'Social Share Management',
  description: 'Enter the page level Open Graph data used for Social Share.',
};
const useMenuOptions = () => [
  {
    name: 'share',
    icon: 'share',
    label: 'Share',
    group: 'page-group',
  },
];
const withSocialShareTitle = withMeta({
  name: 'og:title',
  label: 'Title',
  attribute: 'property',
});
const metaSocialShareImageName = 'og:image';

const DropZoneUploadArea = DropZoneDesign.UploadArea;
const dropZoneUI: Partial<TImagePickerUI> = {
  UploadArea: () => <DropZoneUploadArea>Drag a file or click here to upload.</DropZoneUploadArea>,
};

const SocialShareFormImage = () => {
  const { ComponentFormText } = useMenuOptionUI();
  const fieldApi = useFieldApi(metaSocialShareImageName);
  return (
    <DropZoneWrapper>
      <ComponentFormText field={metaSocialShareImageName} id="social-share-img-src" />
      <ImageDropZone fieldApi={fieldApi} ui={dropZoneUI} />
    </DropZoneWrapper>
  );
};

const withSocialShareImage = withMeta({
  name: 'og:image',
  label: 'Image',
  useFormElement: () => SocialShareFormImage,
  attribute: 'property',
});

const withSocialShareDescription = withMeta({
  name: 'og:description',
  useFormElement: () => useMenuOptionUI().ComponentFormTextArea,
  label: 'Description',
  attribute: 'property',
});
const withSocialShareUrl = withMeta({
  name: 'og:url',
  label: 'Url',
  attribute: 'property',
});
const withSocialShareType = withMetaStatic({
  name: 'og:type',
  attribute: 'property',
});
const withSocialShareSitename = withMetaStatic({
  name: 'og:site_name',
  attribute: 'property',
});
const withSocialShareTwitterCard = withMetaStatic({
  name: 'twitter:card',
});
const withSocialShareTwitterSite = withMetaStatic({
  name: 'twitter:site',
});

const SocialShareHelmet = flowRight(
  withMetaForm(useMenuOptions, socialShareFormHeader),
  asBodilessHelmet('meta'),
  withSocialShareTitle('og-title', ''),
  withSocialShareImage('og-image', ''),
  withSocialShareUrl('og-url', ''),
  withSocialShareDescription('og-description', ''),
  withSocialShareType({ nodeKey: 'og-type', nodeCollection: 'site' }),
  withSocialShareSitename({ nodeKey: 'og-sitename', nodeCollection: 'site' }),
  withSocialShareTwitterCard({ nodeKey: 'twitter-card', nodeCollection: 'site' }),
  withSocialShareTwitterSite({ nodeKey: 'twitter-site', nodeCollection: 'site' }),
)(Helmet);

export { SocialShareHelmet };
