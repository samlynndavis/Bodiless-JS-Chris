/* eslint-disable class-methods-use-this */
import React, { useEffect } from 'react';
import path from 'path';
import { HOC, as } from '@bodiless/fclasses';
import {
  BodilessStoreProvider, PageEditor, useEditContext, BodilessMobxStore,
  BodilessStoreBackend, BodilessStore,
} from '@bodiless/core';
import { LocalContextMenu } from '@bodiless/core-ui';

class SbClient implements BodilessStoreBackend {
  /**
   * Posts a message back to the parent window containing the data to be serialized.
   * Note - these data should be **merged** with data which were previously serialized.
   */
  savePath(resourcePath: string, data: any): Promise<any> {
    // The resource path includes the page path, which is extraneous here
    const nodeKey = path.basename(resourcePath);
    const payload = {
      type: 'var',
      data: {
        [nodeKey]: data,
      },
    };
    const jsonPayload = JSON.stringify(payload, undefined, 2);
    console.log('emit', jsonPayload);
    // if (window?.parent)
    //   window.parent.postMessage(jsonPayload);
    return Promise.resolve();
  }

  deletePath(): Promise<any> {
    // No need to worry about deleting items.
    return Promise.resolve();
  }
}
class SbStore extends BodilessMobxStore<any> {
  constructor() {
    super({ slug: '', client: new SbClient() });
  }

  protected parseData(): Map<string, any> {
    // Our store is always empty, component will be provided with
    // data via `withDefaultcontent`
    return new Map<string, any>();
  }
}
class SbStoreProvider extends BodilessStoreProvider {
  protected createStore(): BodilessStore<any> {
    return new SbStore();
  }
}
const ui = {
  GlobalContextMenu: () => null,
  LocalContextMenu,
  PageOverlay: () => null,
};

export const withPageEditor: HOC = Component => props => (
  <PageEditor ui={ui}>
    <Component {...props} />
  </PageEditor>
);

export const withAlwaysEditable: HOC = Component => props => {
  const c = useEditContext();
  useEffect(() => c.toggleEdit(true), []);
  return <Component {...props} />;
};

export const withBodilessStore: HOC = Component => props => (
  <SbStoreProvider
    data={new Map()}
    pageContext={{ slug: './demo' }}
  >
    <Component {...props} />
  </SbStoreProvider>
);

export const SbEditProvider = as(
  withPageEditor,
  withAlwaysEditable,
  withBodilessStore,
)('div');

export const withSbEditProvider: HOC = Component => props => (
  <SbEditProvider>
    <Component {...props} />
  </SbEditProvider>
);
