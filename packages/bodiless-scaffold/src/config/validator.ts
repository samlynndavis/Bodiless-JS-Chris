import fs from 'fs';
import path from 'path';

// ref: Inquirer.Question.validate
export type PromptValidator = (
  input: any,
  answers?: any,
) => (boolean | string | Promise<boolean | string>);

export const pathValidator: PromptValidator = inputPath => {
  const resolvedPath = path.resolve(process.cwd(), inputPath);
  if (
    fs.existsSync(resolvedPath)
    && !fs.lstatSync(resolvedPath).isDirectory()
  ) {
    return 'Please enter a valid path.';
  }
  try {
    fs.accessSync(resolvedPath, fs.constants.W_OK);
  } catch (err) {
    return `Path (${resolvedPath}) is not writable.`;
  }
  return true;
};

export const componentNameValidator: PromptValidator = (
  input, answers
) => {
  if (input.match(/[^_a-zA-Z0-9]/)) {
    return 'Component/Library name must be underscore or alphanumeric.';
  }
  if (answers && answers.destinationPath) {
    const componentPath = path.join(answers.destinationPath, input);
    if (fs.existsSync(componentPath)) {
      return 'Components directory already exists.';
    }
  }
  return true;
};

export const libraryNameValidator: PromptValidator = (
  input
) => {
  if (input.match(/[^_a-zA-Z0-9]/)) {
    return 'Component/Library name must be underscore or alphanumeric.';
  }
  return true;
};

export const packageNameValidator: PromptValidator = input => {
  if (input.match(/[^_@/\-a-zA-Z0-9]/)) {
    return 'Invalid package name';
  }
  return true;
};
