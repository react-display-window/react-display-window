#!/usr/bin/env node
const meow = require('meow');

const { main } = require('../lib/cli');


const cli = meow(`
  Usage
    $ rdw <command> <path>

  Input
    command: Can be "build" to build a static site or "serve" to serve it from memory
    path: Path to the mdx file

  Options
    --out-dir, -o Where to output the files when building
    --port, -p Where the "serve" will serve the demo page
    --help Show this help

  Examples
    $ rdw src --out-dir site
`, {
  autoHelp: true
});


async function run() {
  const [ command, path ] = cli.input;
  const { outDir, port } = cli.flags;
  await main({ path, command, outDir, port });
}


if (require.main === module) {
  run().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
