require('@babel/polyfill');
const path = require('path');
const serve = require('webpack-serve');

const buildConfig = require('./webpack.config.js');


function runServe(config) {
  serve({}, { config });
}


function runBuild(config, outDir) {

}


module.exports.main = async function main(args={}) {
  const runningIn = process.cwd();
  const { path: docPath, command, outDir } = args;

  const finalDocPath = path.resolve(runningIn, docPath);
  const docName = path.basename(finalDocPath);
  const docDir = path.dirname(finalDocPath)

  process.chdir(path.resolve(__dirname, '../../'));

  const config = await buildConfig({ runningIn, docName, docDir });
  if (command === 'serve') {
    runServe(config);
  }
  else if (command === 'build') {
    runBuild(config, outDir);
  }
}
