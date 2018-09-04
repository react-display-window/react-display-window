require('@babel/polyfill');

const path = require('path');
const serve = require('webpack-serve');
const webpack = require('webpack');

const buildConfig = require('./webpack.config.js');


function runServe(config) {
  serve({}, { config });
}


function runBuild(config, outDir) {
  const compiler = webpack(config);
  compiler.run((err, stats) => {
    if (err) {
      throw new Error(err);
    }
  });
}


module.exports.main = async function main(args={}) {
  const runningIn = process.cwd();
  const { path: docPath, command, outDir, port } = args;

  const finalDocPath = path.resolve(runningIn, docPath);
  const docName = path.basename(finalDocPath);
  const docDir = path.dirname(finalDocPath)

  process.chdir(path.resolve(__dirname, '../../'));


  if (command === 'serve') {
    const config = await buildConfig({ runningIn, docName, docDir, port });
    runServe(config);
  }
  else if (command === 'build') {
    const output = path.resolve(runningIn, outDir);
    const config = await buildConfig({ runningIn, docName, docDir, outDir: output });
    runBuild(config, output);
  }
}
