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

export type BackendClient = {
  savePath(resourcePath: string, data: any): Promise<any>;
  deletePath(resourcePath: string): Promise<any>;
};

export type BodilessStoreConfig = {
  client: BackendClient,
  slug: string | null,
};
