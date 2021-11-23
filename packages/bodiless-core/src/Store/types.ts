export enum ItemStateEvent {
  UpdateFromServer,
  UpdateFromBrowser,
  DeleteFromBrowser,
  OnLockTimeout,
  OnRequestEnd,
  OnRequestStart,
  OnRequestError,
}

export enum ItemState {
  Clean,
  Flushing,
  Locked,
  Queued,
}

export type BodilessStoreBackend = {
  savePath(resourcePath: string, data: any): Promise<any>;
  deletePath(resourcePath: string): Promise<any>;
};

export type BodilessStoreConfig = {
  client: BodilessStoreBackend,
  slug: string | null,
};

export type BodilessStore<D> = {
  updateData: (rawData: D) => void,
  setNode: (keyPath: string[], value: any, event?: ItemStateEvent) => void,
  deleteNode: (keyPath: string[]) => void,
  getNode: <D = any>(keyPath: string[]) => D,
  getKeys: () => string[],
  hasError: () => boolean,
};
