export const createLogger = (log = true) => (message: string) => {
  // eslint-disable-next-line no-console
  if (log) console.log(message);
};

type ExcludeSetting = string[] | RegExp;

export type PluginOptions = {
  enabled?: boolean
  logging?: boolean
  exclude?: ExcludeSetting;
};

export const requestIsExcluded = (requestedFile: string, exclude?: ExcludeSetting) => {
  if (!exclude || (Array.isArray(exclude) && !exclude.length)) return false;

  return requestedFile.match(exclude instanceof RegExp ? exclude : new RegExp(exclude.join('|')));
};
