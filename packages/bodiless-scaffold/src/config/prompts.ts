import type { Prompts } from 'node-plop';
import {
  pathValidator,
  componentNameValidator,
  libraryNameValidator,
  packageNameValidator,
} from './validator.js';

const prompts: Prompts = [
  {
    type: 'input',
    name: 'destinationPath',
    message: `Path to components directory [Required],
e.g. "./", "./src/components/", "/absolute/path/to/" etc. Default to current directory.
> `,
    validate: pathValidator,
  },
  {
    type: 'input',
    name: 'componentName',
    message: 'Name of the component [Required]',
    validate: componentNameValidator,
  },
  {
    type: 'input',
    name: 'libraryName',
    message: 'Name of the library [Required]',
    validate: libraryNameValidator,
  },
  {
    type: 'input',
    name: 'sourcePackageName',
    message: 'Source package if extending (e.g. `@bodiless/vital-card`)',
    validate: packageNameValidator,
  },
  {
    type: 'input',
    name: 'sourceLibraryName',
    message: 'Source library name (eg `vital`) - default `vital`',
    validate: libraryNameValidator,
    when: ({ sourcePackageName }) => !!sourcePackageName,
    default: 'vital',
  },
  {
    type: 'confirm',
    name: 'tokensOnly',
    message: 'Tokens only? otherwise includes a clean component (Y/n)',
  },
  {
    type: 'confirm',
    name: 'shadow',
    message: 'Shadow the source component? otherwise just extend it',
    default: false,
    when: ({ sourcePackageName }) => !!sourcePackageName,
  },
  {
    type: 'confirm',
    name: 'static',
    message: 'Whether or not the component is always static (Y/n)',
  },
  {
    type: 'input',
    name: 'shadowPath',
    message: 'Path to shadow directory, e.g. "./src/shadow", ',
    when: ({ shadow }) => shadow,
    validate: pathValidator,
  },
];

export default prompts;
