/* eslint-disable class-methods-use-this */
import React, { useEffect } from 'react';
import path from 'path';
import { as, HOC } from '@bodiless/fclasses';
import {
  BodilessStoreProvider, PageEditor, useEditContext, BodilessMobxStore,
  BodilessStoreBackend, BodilessStore,
} from '@bodiless/core';
import { LocalContextMenu } from '@bodiless/core-ui';

class KsClient implements BodilessStoreBackend {
  /**
   * Posts a message back to the parent window containing the data to be serialized.
   * Note - these data should be **merged** with data which were previously serialized.
   */
  savePath(resourcePath: string, data: any): Promise<any> {
    // The resource path includes the page path, which is extraneous here
    const nodeKey = path.basename(resourcePath);
    // stringifies the Proxy
    const payload = JSON.parse(
      JSON.stringify({
        extras: {
          [nodeKey]: data,
        },
      }),
    );

    if (window?.parent) {
      window.dispatchEvent(
        new CustomEvent('knapsack.updateExtras', {
          detail: payload,
        }),
      );
    }
    return Promise.resolve();
  }

  deletePath(): Promise<any> {
    // No need to worry about deleting items.
    return Promise.resolve();
  }
}
class KsStore extends BodilessMobxStore<any> {
  constructor() {
    super({ slug: '', client: new KsClient() });
  }

  protected parseData(): Map<string, any> {
    // Our store is always empty, component will be provided with
    // data via `withDefaultcontent`
    return new Map<string, any>();
  }
}
class KsStoreProvider extends BodilessStoreProvider {
  protected createStore(): BodilessStore<any> {
    return new KsStore();
  }
}
const ui = {
  GlobalContextMenu: (): React.ReactElement => null,
  LocalContextMenu,
  PageOverlay: (): React.ReactElement => null,
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
  <KsStoreProvider
    data={new Map()}
    pageContext={{ slug: './demo' }}
  >
    <Component {...props} />
  </KsStoreProvider>
);

export const KsEditProvider = as(
  withPageEditor,
  withAlwaysEditable,
  withBodilessStore,
)('div');

export const withKsEditProvider: HOC = Component => props => (
  <KsEditProvider>
    <Component {...props} />
  </KsEditProvider>
);
