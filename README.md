# stylint-json-reporter
JSON formatted reporter for [Stylint](https://github.com/rossPatton/stylint)

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
