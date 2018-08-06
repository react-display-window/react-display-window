const path = require('path');
const serve = require('webpack-serve');

const buildConfig = require('../webpack.config.js');


export async function main(args={}) {
  const runningIn = process.cwd();
  const { path: docPath } = args;

  const finalDocPath = path.resolve(runningIn, docPath);
  const docName = path.basename(finalDocPath);
  const docDir = path.dirname(finalDocPath)

  process.chdir(path.resolve(__dirname, '../'));

  const config = await buildConfig({ runningIn, docName, docDir });
  serve({}, { config });
}
