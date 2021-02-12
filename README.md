# acorn-node

[Acorn](https://github.com/acornjs/acorn) preloaded with plugins for syntax parity with recent Node versions.

It also includes versions of the plugins compiled with [Babel](https://github.com/babel/babel), so they can be run on old Node versions (0.6 and up).

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/acorn-node.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/acorn-node
[travis-image]: https://img.shields.io/travis/browserify/acorn-node/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/browserify/acorn-node
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```
npm install acorn-node
```

## Usage

```js
var acorn = require('acorn-node')
```

The API is the same as [acorn](https://github.com/acornjs/acorn), but the following syntax features are enabled by default:

 - Public and private class instance fields
 - Public and private class static fields

And the following options have different defaults from acorn, to match Node modules:

 - `ecmaVersion: 2021`
 - `allowHashBang: true`
 - `allowReturnOutsideFunction: true`

```js
var walk = require('acorn-node/walk')
```

The Acorn syntax tree walker. Comes preconfigured for the syntax plugins if necessary.
See the [acorn documentation](https://github.com/acornjs/acorn#distwalkjs) for details.

## License

The files in the repo root and the ./test folder are licensed as [Apache-2.0](LICENSE.md).

The files in lib/ are generated from other packages:

- lib/class-fields: [acorn-class-fields](https://github.com/acornjs/acorn-class-fields), MIT
- lib/class-private-elements: [acorn-class-private-elements](https://github.com/acornjs/acorn-class-private-elements), MIT
- lib/static-class-features: [acorn-static-class-features](https://github.com/acornjs/acorn-static-class-features), MIT
