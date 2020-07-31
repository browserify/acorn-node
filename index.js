var acorn = require('acorn')
var xtend = require('xtend')
var setPrototypeOf = require('setprototypeof')

var CJSParser = acorn.Parser
  .extend(require('./lib/class-fields'))
  .extend(require('./lib/static-class-features'))
  .extend(require('./lib/numeric-separator'))
  .extend(defaultOptionsPlugin)
var ESModulesParser = CJSParser

function mapOptions (opts) {
  if (!opts) opts = {}
  return xtend({
    ecmaVersion: 2020,
    allowHashBang: true,
    allowReturnOutsideFunction: true
  }, opts)
}

function defaultOptionsPlugin (P) {
  function DefaultOptionsParser (opts, src) {
    P.call(this, mapOptions(opts), src)
  }
  setPrototypeOf(DefaultOptionsParser, P)
  DefaultOptionsParser.prototype = P.prototype
  return DefaultOptionsParser
}

function getParser (opts) {
  if (!opts) opts = {}
  return opts.sourceType === 'module' ? ESModulesParser : CJSParser
}

module.exports = exports = xtend(acorn, {
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
})
