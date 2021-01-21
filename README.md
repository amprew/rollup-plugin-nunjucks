# ROLLUP Plugin Nunjucks

[Nunjucks](https://github.com/mozilla/nunjucks#readme) is a templating library by [Mozilla](https://www.mozilla.org/). This Rollup plugin integrates these great features into an easy interface without having to set up all of your templates.

### How to use

To use this plugin we specify an input and output file for our template and pass it into the plugin section:

#### Example #1

```js
import NunjucksPlugin from 'rollup-nunjucks-plugin';

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
      }
    })
  ]
```

(file paths can be either relative or absolute.)
