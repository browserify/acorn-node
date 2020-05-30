function fixDependencies (babel) {
  return {
    visitor: {
      CallExpression: function (path) {
        var callee = path.get('callee')
        var arg = path.get('arguments.0')
        if (!callee.isIdentifier({ name: 'require' }) ||
            !arg.isLiteral()) {
          return
        }

        if (arg.node.value === 'acorn-private-class-elements') {
          arg.node.value = '../acorn-private-class-elements'
        } else if (arg.node.value === 'acorn') {
          // all good
        } else {
          throw new Error('Unexpected require() argument: ' + arg.node.value + '. \n' +
                          'Make sure that this dependency is expected and whitelist it in babel.config.js.')
        }
      }
    }
  }
}

module.exports = {
  presets: [
    ['@babel/preset-env', {
      spec: true
    }]
  ],
  plugins: [
    fixDependencies
  ]
}
