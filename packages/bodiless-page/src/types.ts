import {
  ComponentType,
  HTMLProps,
} from 'react';
import { AxiosPromise } from 'axios';
import type {
  BaseFieldProps,
  FormValue,
  FormValues,
  FormError,
} from 'informed';

const DEFAULT_PAGE_TEMPLATE = '_default';

enum PageState {
  Init,
  Pending,
  Complete,
  Errored,
}

type PageStatus = {
  status: PageState;
  pagePath?: string;
  errorMessage?: string;
  completeMessage?: string;
  titlePending?: string;
  formTitle?: string,
  linkId?: string,
  FormFields?: (Label: ComponentType<HTMLProps<HTMLLabelElement>>) => void,
};

type Client = {
  deletePage: (path: string) => AxiosPromise<any>;
  movePage: (origin: string, destination: string) => AxiosPromise<any>;
  savePage: (path: string, template?: string) => AxiosPromise<any>;
};

/**
 * props that can be passed to PageURLField
 * disallow overriding field prop
 * if we decide to allow overriding it in the future
 * then also we need to allow overriding the second PageURLField input
 */
type FieldProps = Omit<BaseFieldProps, 'field'>;
type FieldValidate = (value: FormValue, values: FormValues) => FormError;

export {
  DEFAULT_PAGE_TEMPLATE,
  PageState,
  PageStatus,
  Client,
  FieldProps,
  FieldValidate,
};
