# stylint-json-reporter
JSON formatted reporter for [Stylint](https://github.com/rossPatton/stylint)

## Install

To install for local project:

```
npm install stylint-json-reporter
```

Or to install as global package:

```
npm install -g stylint-json-reporter
```

## Usage

### CLI

You need to set `reporter` to `stylint-json-reporter` in the `.stylintrc` config file.

```json
{
  "reporter": "stylint-json-reporter",
  
  "blocks": false,
  "brackets": "never",
  "colons": "always",
  "colors": "always",
  ...
}
```

### Non CLI

You need to set `reporter` to `stylint-json-reporter` in config object.

```javascript
const stylint = require('stylint')('path/to/stylus/', {
    reporter: "stylint-json-reporter",
    
    brackets: 'always',
    namingConvention: 'BEM',
    semicolons: 'always',
    ...
}, callbackFn).create();
```

## Tests

Just run:

```
npm install
npm run test
```

## Changelog

### [0.3.1] - 2016-10-05

Fix column property name mismatch. [PR #2](https://github.com/sertae/stylint-json-reporter/pull/2).

### [0.3.0] - 2016-04-10

Added support for column numbers.

### [0.2.0] - 2016-03-21

Added tests and coverage

### [0.1.0] - 2016-03-21

First public version of reporter and package.json
