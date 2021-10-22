var acorn = require('acorn')

var CJSParser = acorn.Parser
  .extend(defaultOptionsPlugin)
var ESModulesParser = CJSParser

function mapOptions (opts) {
  if (!opts) opts = {}
  return {
    ecmaVersion: 2022,
    allowHashBang: true,
    allowReturnOutsideFunction: true,
    ...opts
  }
}

function defaultOptionsPlugin (P) {
  return class DefaultOptionsParser extends P {
    constructor (opts, src) {
      super(mapOptions(opts), src)
    }
  }
}

function getParser (opts) {
  if (!opts) opts = {}
  return opts.sourceType === 'module' ? ESModulesParser : CJSParser
}

module.exports = exports = {
  ...acorn,
  Parser: CJSParser,
  ESModulesParser: ESModulesParser,

  parse: function parse (src, opts) {
    return getParser(opts).parse(src, opts)
  },
  parseExpressionAt: function parseExpressionAt (src, offset, opts) {
    return getParser(opts).parseExpressionAt(src, offset, opts)
  },
  tokenizer: function tokenizer (src, opts) {
    return getParser(opts).tokenizer(src, opts)
  }
}
