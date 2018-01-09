var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var buble = require('buble')

function compile (name, output) {
  console.log(name, '→', output)
  mkdirp.sync(path.dirname(path.join(__dirname, output)))
  var source = fs.readFileSync(require.resolve(name), 'utf8')
  var result = buble.transform(source, {
    transforms: {
      dangerousForOf: true
    }
  })
  fs.writeFileSync(path.join(__dirname, output), result.code, 'utf8')
}

compile('acorn5-object-spread/inject', 'lib/object-spread/index.js')
