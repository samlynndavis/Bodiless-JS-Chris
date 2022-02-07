const BASE_PATH_EMPTY_VALUE = '/';
const BASE_PATH_FIELD_NAME = 'basePath';
const PAGE_URL_FIELD_NAME = 'pagePath';
const PAGE_URL_INVALID_MESSAGE = 'No special characters, capital letters or spaces allowed, no beginning or ending with - or _';

const DEFAULT_PAGE_TEMPLATE = '_default';
const DEFAULT_PAGE_REDIRECT_STATUS = '301';

const INPUT_FIELD_DEFAULT_CLASSES = 'bl-text-gray-900 bl-bg-gray-100 bl-text-xs bl-min-w-xl-grid-1 bl-my-grid-2 bl-p-grid-1';
const INPUT_FIELD_INLINE_CLASSES = INPUT_FIELD_DEFAULT_CLASSES.concat(' bl-inline');
const INPUT_FIELD_BLOCK_CLASSES = INPUT_FIELD_DEFAULT_CLASSES.concat(' bl-block bl-w-full');

export {
  BASE_PATH_EMPTY_VALUE,
  BASE_PATH_FIELD_NAME,
  PAGE_URL_FIELD_NAME,
  PAGE_URL_INVALID_MESSAGE,
  DEFAULT_PAGE_TEMPLATE,
  DEFAULT_PAGE_REDIRECT_STATUS,
  INPUT_FIELD_DEFAULT_CLASSES,
  INPUT_FIELD_INLINE_CLASSES,
  INPUT_FIELD_BLOCK_CLASSES,
};
