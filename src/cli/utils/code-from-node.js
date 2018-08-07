const babylon = require('babylon');
const traverse = require('babel-traverse').default;


module.exports = function codeFromNode(condition) {
  return (code) => {
    let value = '';
    const ast = babylon.parse(code, { plugins: ['jsx'] });

    traverse(ast, {
      enter(path) {
        if (condition(path)) {
          value = code.slice(path.node.start, path.node.end);
          path.stop();
        }
      }
    });

    return value;
  }
}
