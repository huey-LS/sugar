const webpack = require('webpack');

module.exports = async function () {
  // await buildDll();
  const stopBuildWatch = await build();
  return stopBuildWatch;
}

function buildDll () {
  const dllConfig = require('../webpack.dll.config.js');
  return new Promise((resolve, reject) => {
    webpack(
      dllConfig,
      (err, stats) => {
        if (err || stats.hasErrors()) {
          console.error((err && err.stack) || err || stats.toJson().errors);
          reject(err);
        } else {
          console.log(stats.toString({
            colors: true
          }));
          resolve();
        }
      }
    )
  })
}

function build () {
  const config = require('../webpack.config.js');
  return new Promise((resolve, reject) => {
    const compiler = webpack(config);
    if (process.env.NODE_ENV === 'development') {
      console.log('webpack start watching.')
      const watching = compiler.watch(
        {},
        (err, stats) => {
          if (err || stats.hasErrors()) {
            console.error((err && err.stack) || stats.toJson().errors);
            reject(err);
          } else {
            console.log(stats.toString({
              colors: true
            }))
            console.log('webpack build success.')
            resolve(() => new Promise((resolve) => {
              watching.close(() => {
                console.log('webpack watching Ended.');
                resolve();
              });
            }));
          }
        }
      )
    } else {
      compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
          console.log(stats.toString({
            colors: true
          }));
          reject(err);
        } else {
          console.log(stats.toString({
            colors: true
          }));
          resolve();
        }
      });
    }
  })
}
