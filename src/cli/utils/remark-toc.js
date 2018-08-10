// const utilToc = require('mdast-util-toc');
const logger = require('@drawbotics/logger');
// const filter = require('unist-util-filter');
const is = require('unist-util-is');
const visit = require('unist-util-visit');
const find = require('unist-util-find');
const fs = require('fs-extra');


function getTitle(heading) {
  const text = find(heading, (n) => is('text', n));
  return text ? text.value : null;
}


function buildEntries(headings, depth) {
  return headings.map((heading) => {
    if (heading.__done) {
      return null;
    }
    else if (heading.depth === depth) {
      heading.__done = true;  // mark it as done
      return { title: getTitle(heading) };
    }
    else if (heading.depth > depth) {
      return { entries: buildEntries(headings, heading.depth) };
    }
    else {
      return null;
    }
  }).filter(Boolean);
}


module.exports = function toc() {
  return (tree) => {
    const headings = [];
    visit(tree, 'heading', (n) => headings.includes(n) ? null : headings.push(n));

    const entries = buildEntries(headings, 1);
    console.log(entries);
    const tocNode = visit(tree, (node) => {
      if (is('html', node) && node.value.match(/<Toc\s/)) {
        node.value = node.value.replace(/<Toc\s/, `<Toc __entries={${JSON.stringify(entries)}} `);
      }
    });
  }
}
