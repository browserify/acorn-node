var acorn = require('acorn')
var xtend = require('xtend')

var CJSParser = acorn.Parser
  .extend(require('./lib/acorn-bigint'))
  .extend(require('./lib/acorn-class-fields'))
  .extend(require('./lib/acorn-static-class-features'))
  .extend(require('./lib/acorn-numeric-separator'))
var ESModulesParser = CJSParser
  .extend(require('./lib/acorn-export-ns-from'))
  .extend(require('./lib/acorn-import-meta'))

function mapOptions (opts) {
  if (!opts) opts = {}
  return xtend({
    ecmaVersion: 2020,
    allowHashBang: true,
    allowReturnOutsideFunction: true
  }, opts)
}

function getParser (opts) {
  if (!opts) opts = {}
  return opts.sourceType === 'module' ? ESModulesParser : CJSParser
}

module.exports = exports = xtend(acorn, {
  parse: function parse (src, opts) {
    return getParser(opts).parse(src, mapOptions(opts))
  },
  parseExpressionAt: function parseExpressionAt (src, offset, opts) {
    return getParser(opts).parseExpressionAt(src, offset, mapOptions(opts))
  },
  tokenizer: function tokenizer (src, opts) {
    return getParser(opts).tokenizer(src, mapOptions(opts))
  }
})
