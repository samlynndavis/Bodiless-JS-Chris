/**
 * Copyright © 2019 Johnson & Johnson
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

import React, { HTMLProps, ComponentType } from 'react';
import {
  useMenuOptionUI,
  asBodilessComponent,
  withoutProps,
  ifEditable,
  withExtendHandler,
  UseBodilessOverrides,
} from '@bodiless/core';
import type { AsBodiless, BodilessOptions } from '@bodiless/core';
import { flowRight, identity } from 'lodash';
import DefaultNormalHref from './NormalHref';
import type { HrefNormalizer } from './NormalHref';

// Type of the data used by this component.
export type LinkData = {
  href: string;
};

type Props = HTMLProps<HTMLAnchorElement> & {
  unwrap?: () => void,
};

type ExtraLinkOptions = {
  normalizeHref: HrefNormalizer,
};

type UseLinkOverrides = UseBodilessOverrides<Props, LinkData, ExtraLinkOptions>;

const useLinkOverrides = (useOverrides: UseLinkOverrides = () => ({})): UseLinkOverrides => (
  props => {
    const overrides = useOverrides(props);
    const {
      submitValueHandler: submitValueHandler$ = identity,
      normalizeHref = (href?: string) => new DefaultNormalHref(href).toString(),
    } = overrides;
    const submitValueHandler = ({ href }: LinkData) => submitValueHandler$({
      href: normalizeHref(href),
    });
    return { ...overrides, normalizeHref, submitValueHandler };
  }
);

const options: BodilessOptions<Props, LinkData> = {
  icon: 'link',
  name: 'Link',
  label: 'Link',
  renderForm: ({ componentProps: { unwrap }, closeForm }) => {
    const {
      ComponentFormTitle,
      ComponentFormLabel,
      ComponentFormText,
      ComponentFormUnwrapButton,
      ComponentFormDescription,
    } = useMenuOptionUI();
    const removeLinkHandler = (event: React.MouseEvent) => {
      event.preventDefault();
      if (unwrap) {
        unwrap();
      }
      closeForm(event);
    };
    return (
      <>
        <ComponentFormTitle>Link</ComponentFormTitle>
        <ComponentFormLabel htmlFor="link-href">URL</ComponentFormLabel>
        <ComponentFormText field="href" id="link-href" aria-describedby="description" placeholder="/link" />
        <ComponentFormDescription id="description">
          Use a fully formed URL only for external links, e.g., https://www.example.com.
          Internal links should be specified without a protocol or domain. Internal
          links beginning with a &lsquo;.&rsquo; will be relative to the current page. Those not
          beginning with a &lsquo;.&rsquo; will be prefixed with &lsquo;/&rsquo; and be relative to
          the site root.  All links will have a trailing slash appended.
        </ComponentFormDescription>
        {unwrap && (
        <ComponentFormUnwrapButton type="button" onClick={removeLinkHandler}>
          Remove Link
        </ComponentFormUnwrapButton>
        )}
      </>
    );
  },
  global: false,
  local: true,
  defaultData: {
    href: '',
  },
};

const withNormalHref = (
  useOverrides: () => ExtraLinkOptions,
) => (Component : ComponentType<Props>) => {
  const WithNormalHref = ({ href, ...rest }: Props) => (
    <Component
      href={useOverrides().normalizeHref(href)}
      {...rest}
    />
  );
  return WithNormalHref;
};

export type AsBodilessLink = AsBodiless<Props, LinkData, ExtraLinkOptions>;

const asBodilessLink: AsBodilessLink = (
  nodeKeys, defaultData, useOverrides,
) => flowRight(
  // Prevent following the link in edit mode
  ifEditable(
    withExtendHandler('onClick', () => (e: MouseEvent) => e.preventDefault()),
  ),
  asBodilessComponent<Props, LinkData>(options)(
    nodeKeys, defaultData, useLinkOverrides(useOverrides),
  ),
  withoutProps(['unwrap']),
  withNormalHref(useLinkOverrides(useOverrides) as () => ExtraLinkOptions),
);

export default asBodilessLink;
