/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Command, flags as commandFlags } from '@oclif/command';
import * as inquirer from 'inquirer';
import identity from 'lodash/identity';

export type WizardOptions = {
  [key: string]: any,
  automation?: boolean,
  verbose?: boolean,
  help?: boolean,
};

export type Flags<O extends WizardOptions> = Required<{
  [p in keyof O]: FlagDef<O>;
}>;

export type WizardInterface<O extends WizardOptions> = {
  getArg: <V extends keyof O>(flag: V, promptArg?: FlagDef<O>['prompt']) => Promise<O[V]>;
  getFlagDefs: () => Flags<O>;
};

type PromptFunc<O extends WizardOptions> =
  (c: WizardInterface<O>) => inquirer.DistinctQuestion<any>;

type FlagDef<O extends WizardOptions> = commandFlags.IFlag<any> & {
  validator?: inquirer.DistinctQuestion['validate'],
  prompt?: false | Partial<inquirer.DistinctQuestion<any>> | PromptFunc<O>,
};

const wizardFlags: Flags<WizardOptions> = {
  help: commandFlags.help({
    char: 'h',
  }),

  verbose: {
    ...commandFlags.boolean({
      description: 'Print extra debugging output',
      char: 'v',
      default: false,
    }),
    prompt: false,
    validator: () => true,
  },

  automation: commandFlags.boolean({
    description: 'Run in automation mode. Disable all interaction.',
    char: 'A',
    default: false,
  }),
};

/**
 * Extends the ocliff Command class to provide a wizard experience.
 */
// eslint-disable-next-line max-len
abstract class Wizard<O extends WizardOptions> extends Command implements WizardInterface<O> {
  protected options: Partial<O> = ({});

  static flags: any = wizardFlags;

  abstract getFlagDefs(): Flags<O>;

  async getArg<V extends keyof O>(flag: V, promptArg?: FlagDef<O>['prompt']): Promise<O[V]> {
    if (this.options[flag]) return this.options[flag]!;
    const flagDefs = this.getFlagDefs();
    const flagDef = flagDefs[flag];
    const { flags: flagValues } = this.parse<O, any>({ flags: flagDefs });
    const arg = flagValues[flag];
    const { prompt: promptFlag = {} } = flagDefs[flag];
    const { validator = Boolean } = flagDefs[flag];
    if (flagValues.automation
      || promptArg === false || (promptArg === undefined && promptFlag === false)
    ) {
      const validated = await validator(arg);
      if (validated !== true) {
        throw new Error(
          typeof validated === 'string' ? validated : `Invalid value "${arg}" for option "--${flag}"`,
        );
      }
      this.options[flag] = arg;
      return arg;
    }
    const finalPrompt: inquirer.DistinctQuestion = {
      name: flag as string,
      message: flagDef.description || flag as string,
      type: 'input',
      default: validator(arg) === true ? arg : undefined,
      validate: validator,
      filter: flagDef.parse || identity,
      ...(typeof promptFlag === 'function' ? promptFlag(this) : promptFlag),
      ...(typeof promptArg === 'function' ? promptArg(this) : promptArg),
    };
    const responses: any = await inquirer.prompt([finalPrompt]);
    this.options[flag] = responses[flag];
    return this.options[flag]!;
  }
}

export default Wizard;
