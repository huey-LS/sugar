const { resolve } = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const webpackBuild = require('./webpack');


let execPromise = promisify(exec);

const babel = resolve(__dirname, '../node_modules/.bin/babel');

const NODE_ENV = process.env.NODE_ENV;

module.exports = async function () {
  if (NODE_ENV === 'development') {
    let stop = await dev();
    return {
      main: resolve(__dirname, '../src/server.js'),
      stop: stop
    }
  } else {
    let stop = await pro();
    return {
      main: resolve(__dirname, '../build/server.js'),
      stop: stop
    };
  }
}

async function dev () {
  return await webpackBuild();
}

async function pro (cwd, { watch = false } = {}) {
  try {
    const { stdout, stderr } = await execPromise(
      `${babel} src --out-dir build`,
      {
        cwd: cwd
      }
    );
    stdout && console.log(stdout);
    stderr && console.error(stderr);
  } catch (e) {
    throw e;
  }
  if (watch) {
    var child = exec(
      `${babel} src --out-dir build --watch`,
      {
        cwd: cwd
      }
    );

    return () => {
      console.log('Build Process Exit');
      child.kill("SIGINT");
    }
  }
}
