const utilToc = require('mdast-util-toc');


// Sample entries
const entries = [
  { title: 'Drawbotics Button' },
  { entries: [
    { title: 'Installation' },
    { title: 'Example' },
    { title: 'Props' },
    { entries: [
      { title: 'Table' },
      { title: 'Knobs' },
    ]},
  ]},
];


module.exports = function toc() {
  return (tree) => {
    const result = utilToc(tree, { maxDepth: 3, tight: true });
    const entries = [];

    const { map } = result;
    map.children.forEach((child) => {

    });
    console.log(JSON.stringify(result, null, 2));
  }
}
