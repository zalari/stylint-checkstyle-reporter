# @zalari/stylint-checkstyle-reporter
Checkstyle reporter for [Stylint](https://github.com/rossPatton/stylint)

## Install

To install for a _local_ project:

```
npm install --save-dev @zalari/stylint-checkstyle-reporter
```

Or install as _global_ package:

```
npm install --global @zalari/stylint-checkstyle-reporter
```

## Usage

### CLI

You need to set `reporter` to `@zalari/stylint-checkstyle-reporter` in the `.stylintrc` config file.

```json
{
  "reporter": "@zalari/stylint-checkstyle-reporter",
  
  "blocks": false,
  "brackets": "never",
  "colons": "always",
  "colors": "always",
  ...
}
```

### Non CLI

You need to set `reporter` to `@zalari/stylint-checkstyle-reporter` in config object.

```javascript
const stylint = require('stylint')('path/to/stylus/', {
    reporter: "@zalari/stylint-checkstyle-reporter",
    
    brackets: 'always',
    namingConvention: 'BEM',
    semicolons: 'always',
    ...
}, callbackFn).create();
```
