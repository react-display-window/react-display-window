const is = require('unist-util-is');
const nodeToString = require('hast-util-to-string');
const strip = require('strip-indent');
const { flow } = require('lodash');

const codeFromNode = require('./code-from-node');


function getComponentName(value) {
  const match = value.match(/^\<\\?(\w+)/);
  return match && match[1];
}


function removePlaygroundTag(code) {
  const open = codeFromNode((p) => p.isJSXOpeningElement() && p.node.name.name === 'PlayGround');
  const close = codeFromNode((p) => p.isJSXClosingElement() && p.node.name.name === 'PlayGround');
  return code.replace(open(code), '').replace(close(code), '');
}


function trim(arg) {
  return arg.trim();
}


function addCodeProp(node, index) {
  const name = getComponentName(node.value);
  const tagOpen = new RegExp(`^\\<${name}`);

  if (name === 'PlayGround') {
    const code = flow(
      nodeToString,
      removePlaygroundTag,
      strip,
      trim,
    )(node);

    node.value = node.value.replace(
      tagOpen,
      `<${name} __position={${index}} __code={\`${code}\`}`,
    );
  }
}


module.exports = function rehypePlayground() {
  return (tree) => {
    const reactNodes = tree.children.filter((node) => is('jsx', node)).map(addCodeProp);
  }
}
