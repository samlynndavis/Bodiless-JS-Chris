/* eslint-disable class-methods-use-this */
import React, { FC, useEffect } from 'react';
import { HOC, as, Enhancer } from '@bodiless/fclasses';
import {
  BodilessStoreProvider, PageEditor, useEditContext, BodilessMobxStore,
  BodilessStoreBackend, BodilessStore, getStoreKeyFromResourcePath,
} from '@bodiless/core';
import { LocalContextMenu } from '@bodiless/core-ui';

class SbClient implements BodilessStoreBackend {
  slug: string;

  constructor(slug: string) {
    this.slug = slug;
  }

  /**
   * Posts a message back to the parent window containing the data to be serialized.
   * Note - these data should be **merged** with data which were previously serialized.
   */
  savePath(resourcePath: string, data: any): Promise<any> {
    const storeData = getDataFromSessionStorage(this.slug);
    storeData[resourcePath] = data;
    writeDataToSessionStorage(this.slug, storeData);
    return Promise.resolve();
  }

  deletePath(): Promise<any> {
    // No need to worry about deleting items.
    return Promise.resolve();
  }
}

class SbStore extends BodilessMobxStore<any> {
  constructor(slug: string) {
    super({ slug, client: new SbClient(slug) });
  }

  protected parseData(data: object): Map<string, any> {
    const parsedData = new Map<string, any>();
    Object.entries(data).forEach(
      ([resourcePath, value]) => {
        const key = getStoreKeyFromResourcePath(resourcePath);
        parsedData.set(key, value);
      }
    );
    return parsedData;
  }
}

const getDataFromSessionStorage = (slug: string) => {
  try {
    const json = window.sessionStorage.getItem(slug) || '{}';
    const data = JSON.parse(json);
    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Unable to initialize data for', slug);
    return {};
  }
};

const writeDataToSessionStorage = (slug: string, data: object) => {
  try {
    const json = JSON.stringify(data);
    window.sessionStorage.setItem(slug, json);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Unable to write data for', slug, data);
  }
};

type SbSessionStoreProviderProps = Pick<
React.ComponentProps<typeof BodilessStoreProvider>,
'pageContext'
>;

const SbSessionStoreProvider: FC<SbSessionStoreProviderProps> = props => {
  const { pageContext: { slug } } = props;
  const data = getDataFromSessionStorage(slug);
  return <SbStoreProvider {...props} data={data} />;
};

class SbStoreProvider extends BodilessStoreProvider {
  protected createStore(): BodilessStore<any> {
    const { pageContext: { slug } } = this.props;
    return new SbStore(slug);
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

export const withBodilessStore: Enhancer<SbSessionStoreProviderProps> = Component => props => {
  const { pageContext, ...rest } = props;
  return (
    <SbSessionStoreProvider pageContext={pageContext}>
      <Component {...rest as any} />
    </SbSessionStoreProvider>
  );
};

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
