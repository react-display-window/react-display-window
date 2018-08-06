const path = require('path');
const glob = require('fast-glob');
const fs = require('fs-extra');
const unified = require('unified');
const remark = require('remark-parse');
const frontmatter = require('remark-frontmatter');
const parseYaml = require('remark-parse-yaml');
const slug = require('remark-slug');
const find = require('unist-util-find');
const is = require('unist-util-is');
const visit = require('unist-util-visit');


async function getAst() {
  const files = await glob(path.join(__dirname, '../../**/*.mdx'));

  const map = {};

  for (let file of files) {
    const fileData = await fs.readFile(file, 'utf-8');
    const parser = unified()
      .use(remark, { type: 'yaml', marker: '-' })
      .use(frontmatter)
      .use(parseYaml)
      .use(slug);

    const ast = await parser.run(parser.parse(fileData));
    map[file] = ast;
  }

  return map;
}


module.exports = async function getPages() {
  const mdxFiles = await getAst();

  return Object.entries(mdxFiles).reduce((memo, [ path, ast ]) => {
    const yamlNode = find(ast, (node) => is('yaml', node));
    const { section, name } = yamlNode.data.parsedValue;
    return [
      ...memo,
      {
        name,
        section,
        url: `/${section.toLowerCase()}/${name.toLowerCase()}`,
        path,
      },
    ];
  }, []);
}
