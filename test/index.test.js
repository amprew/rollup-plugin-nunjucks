import fs from 'fs';
import fsExtra from 'fs-extra';
import nunjucks from 'nunjucks';
import { rollup } from 'rollup';
import NunjucksPlugin from '../src/index';
import { getAllTemplateFixtures } from './utils/test';

jest.mock('nunjucks', () => ({
  ...jest.requireActual('nunjucks'),
  configure: jest.fn()
}));

process.chdir(`${__dirname}/fixtures`);

async function build(pluginConfig) {
  const bundle = await rollup({
    input: './src/index.js',
    plugins: [NunjucksPlugin(pluginConfig)]
  });

  const meta = await bundle.write({
    format: 'cjs',
    exports: 'auto',
    output: { file: './dist/index.js' }
  });
  await bundle.close();

  const outPath = pluginConfig.output;
  const templateFileContents = await fs.promises.readFile(outPath, 'utf-8');

  return {
    meta,
    fileContent: templateFileContents,
    path: outPath
  };
}

afterEach(async () => {
  if (!fs.existsSync('./dist')) return;

  await fsExtra.remove('./dist');
});

describe('NunjucksPlugin', () => {
  describe('broken config', () => {
    test('when no input specified it throws an error', async () => {
      expect(build()).rejects.toThrowError(/no input file specified$/);
    });

    test('when no output specified it throws an error', async () => {
      expect(build({ input: './src/index.js' })).rejects.toThrowError(
        /no output file specified$/
      );
    });
  });

  test('pass options to nunjucks configuration', async () => {
    await build({
      input: './templates/basic-html.njk',
      output: './dist/index.html',
      opts: {
        test: 'option'
      }
    });

    expect(nunjucks.configure).toHaveBeenCalledWith({
      test: 'option'
    });
  });

  describe('nunjucks templating', () => {
    test('render basic HTML', async () => {
      const { fileContent } = await build({
        input: './templates/basic-html.njk',
        output: './dist/index.html'
      });

      expect(fileContent).toMatchSnapshot();
    });

    test('can loop', async () => {
      const { fileContent } = await build({
        input: './templates/loop.njk',
        output: './dist/index.html'
      });

      expect(fileContent).toMatchSnapshot();
      expect(fileContent).toMatch(/12345/);
    });

    test('if statement', async () => {
      const { fileContent } = await build({
        input: './templates/if-statement.njk',
        output: './dist/index.html'
      });

      expect(fileContent).toMatchSnapshot();
      expect(fileContent).toMatch(/if statement true/);
      expect(fileContent).not.toMatch(/if statement false/);
    });

    test('variables', async () => {
      const { fileContent } = await build({
        input: './templates/variables.njk',
        output: './dist/index.html',
        vars: {
          variable1: 'test variable value',
          listVariable: ['a', 1, 'b', 2, 'c', 3]
        }
      });

      expect(fileContent).toMatchSnapshot();
      expect(fileContent).toMatch(/test variable value/);
      expect(fileContent).toMatch(/3-c-2-b-1-a/);
    });
  });
});
