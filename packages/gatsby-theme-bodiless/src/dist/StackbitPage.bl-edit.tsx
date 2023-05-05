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

import React, {
  FC, Fragment, PropsWithChildren, useEffect
} from 'react';
import {
  OnNodeErrorNotification,
  useEditButton,
  useEditContext,
  observer,
} from '@bodiless/core';
import {
  useGitButtons,
  GitContextProvider,
} from '@bodiless/git';
import { ContextWrapper, PageEditor } from '@bodiless/core-ui';
import {
  PageDataProvider, withPageMenuGroup,
} from '@bodiless/page';
import { withPageDisableButton } from '@bodiless/components';
import { flowHoc } from '@bodiless/fclasses';
import GatsbyNodeProvider from './GatsbyNodeProvider.bl-edit';
import { FinalUI, UI, PageProps } from './types';
import ShowDesignKeys from './ShowDesignKeys';
import StaticPage from './Page.static';

const defaultUI: FinalUI = {
  ContextWrapper,
  PageEditor,
};

const getUI = (ui: UI = {}): FinalUI => ({ ...defaultUI, ...ui });

// const RedirectAliasButton = withRedirectAliasButton(Fragment);

const GitButtons: FC = () => {
  useGitButtons();
  return <></>;
};

const EditButtons: FC = () => {
  useEditButton();
  const context = useEditContext();
  useEffect(() => context.togglePosition(true), []);
  return <></>;
};

const DisablePageButton = flowHoc(
  withPageMenuGroup,
  withPageDisableButton,
)(Fragment);

const EditPage: FC<PropsWithChildren<PageProps>> = observer(({ children, ui, ...rest }) => {
  const { PageEditor: Editor, ContextWrapper: Wrapper } = getUI(ui);
  const { pageContext } = rest;
  const {
    // @ts-ignore non-existing gitInfo, subPageTemplate, and template, types in pageContext.
    gitInfo, slug, subPageTemplate, template,
  } = pageContext;

  const pageData = {
    pagePath: slug,
    subPageTemplate,
    template,
  };

  return (
    <GatsbyNodeProvider {...rest}>
      <ShowDesignKeys>
        <PageDataProvider pageData={pageData}>
          <GitContextProvider gitInfo={gitInfo}>
            <Editor>
              <EditButtons />
              <OnNodeErrorNotification />
              <GitButtons />
              <DisablePageButton />
              <Wrapper clickable>
                {children}
              </Wrapper>
              {/* <RedirectAliasButton /> */}
            </Editor>
          </GitContextProvider>
        </PageDataProvider>
      </ShowDesignKeys>
    </GatsbyNodeProvider>
  );
});

const Page = process.env.BODILESS_DISABLE_EDITOR === '1' ? StaticPage : EditPage;

export default Page;
