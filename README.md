# ROLLUP Plugin Nunjucks

[Nunjucks](https://github.com/mozilla/nunjucks#readme) is a templating library by [Mozilla](https://www.mozilla.org/). This Rollup plugin integrates these great features into an easy interface without having to set up all of your templates.

## Install

[![npm version](https://badge.fury.io/js/%40amprew%2Frollup-plugin-nunjucks.svg)](https://badge.fury.io/js/%40amprew%2Frollup-plugin-nunjucks)

```sh
npm install --save-dev @amprew/rollup-plugin-nunjucks
```

## How to use

To use this plugin we specify an input and output file for our template and pass it into the plugin section:

#### Example #1

```js
import NunjucksPlugin from '@amprew/rollup-plugin-nunjucks';

{
  ...,
  plugins: [
    ...[other plugins],
    NunjucksPlugin({
      input: './src/index.html',
      output: './dist/index.html',
      vars: {
        ENVIRONMENT: 'production',
        some_other_view_variable: 'some value'
      },
      opts: {}
    })
  ]
```

## Options

### `input` (\*required\*)

Type: `string`

Default: `none`

Note: This `input` option is a path to the input nunjucks file. This path can either be an absolute or relative.

### `output` (\*required\*)

Type: `string`

Default: `none`

Note: This `output` option is a path to the output nunjucks file. This path can either be an absolute or relative.

### `vars` (\*optional\*)

Type: `Object` `{[key: string]: any}`

Default: `{}`

Note: This `vars` option is where you can specify any variable that gets passed to your template.

### `opts` (\*optional\*)

Type: `Object` `{[key: string]: any}`

Default: `{}`

Note: This `opts` option is to be used for configuring different arguments which get passed to Nunjuck's `configure` function https://mozilla.github.io/nunjucks/api.html#configure.

### `preRenderEnvironment` (\*optional\*)

type `Function`

(parameter: [Nunjucks environment](https://mozilla.github.io/nunjucks/api.html#environment))

Default: `undefined`

Usage:

```js
{
  input: './source.njk',
  output: './dist.html',
  preRenderEnvironment: (environment) => {
    environment.addFilter('shorten', function (str, count) {
      return str.slice(0, count || 5) + '...';
    });
  }
}
```

template:

```njk
A message for you: {{ message|shorten }}
```
