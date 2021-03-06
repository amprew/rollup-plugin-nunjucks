import nunjucks from 'nunjucks';

import { resolve, isAbsolute } from 'path';
import fs from 'fs';

import Logger from './logger';

const PLUGIN_NAME = 'nunjucks-plugin';

const actualPath = (path) => {
  return isAbsolute(path) ? path : resolve(path);
};

export default function NunjucksPlugin({
  input,
  output,
  vars = {},
  opts = {},
  preRenderEnvironment
} = {}) {
  if (!input) Logger.error('no input file specified');
  if (!output) Logger.error('no output file specified');

  const handleTemplateContent = async (templateContent, bundlePath) => {
    nunjucks.configure(opts);
    const environment = new nunjucks.Environment();
    if (preRenderEnvironment) preRenderEnvironment(environment);
    const rendered = environment.renderString(templateContent, {
      ...vars,
      bundlePath
    });

    const actualPathOut = actualPath(output);
    await fs.promises.writeFile(actualPathOut, rendered);
  };

  return {
    name: PLUGIN_NAME,
    async buildStart() {
      this.addWatchFile(actualPath(input));
    },
    async writeBundle(bundle) {
      const { file: bundlePath } = bundle;

      const actualPathIn = actualPath(input);
      const templateContent = await fs.promises.readFile(actualPathIn, 'utf-8');
      await handleTemplateContent(templateContent, bundlePath);
    }
  };
}
