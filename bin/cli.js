#!/usr/bin/env node
const meow = require('meow');

const { main } = require('../lib/cli');


const cli = meow(`
  Usage
    $ rdw [path]

  Options
    --out-dir, -o Where to output the files when building
    --help Show this help

  Examples
    $ rdw src --out-dir site
`, {
  autoHelp: true
});


async function run() {
  const [ path ] = cli.input;
  await main({ path });
}


if (require.main === module) {
  run().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
