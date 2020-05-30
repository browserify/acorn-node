function rewritePrivateClassElementImport (babel) {
  return {
    visitor: {
      CallExpression: function (path) {
        if (path.get('callee').isIdentifier({ name: 'require' }) &&
          path.get('arguments.0').isLiteral({ value: 'acorn-private-class-elements' })) {
          path.get('arguments.0').node.value = '../acorn-private-class-elements'
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
    rewritePrivateClassElementImport
  ]
}
