// const { watch } = require('fs');
const { resolve } = require('path');
const pm2 = require('pm2');
const build = require('./build');
const packageConfig = require('../package');
const path = require('path');

let apps;

var serverName = packageConfig.name;
var stopBuildWatch;

const NODE_ENV = process.env.NODE_ENV;

pm2.connect(async function (err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  let buildResult = await build();
  stopBuildWatch = buildResult.stop;
  let buildMainFile = buildResult.main;

  let pm2StartConfig = {
    name: serverName,
    script: buildMainFile,
    exec_mode: 'fork',
    instances: 1,
    max_memory_restart: '100M',
    cwd: path.join(__dirname, '../'),
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    watch: NODE_ENV === 'development' ? ['src/view'] : false,
    ignore_watch: ["node_modules", "static"],
    autorestart: false,
    logDateFormat: 'YYYY-MM-DD HH:mm:ss'
  }

  if (NODE_ENV === 'development') {
    pm2StartConfig.exec_interpreter = "./node_modules/.bin/babel-node"
  }

  pm2.start(pm2StartConfig, function (err, proc) {
    if (err) {
      throw err;
    } else {
      console.log(`pm2 start ${serverName} success`);
      apps = proc;
      if (NODE_ENV === 'development') {
        pm2.launchBus((err, bus) => {
          bus.on('log:out', ({ process, data }) => {
            if (process.name === serverName) {
              console.log(data);
            }
          });
        });
      } else {
        pm2.disconnect();
      }
    }
  });
});

if (NODE_ENV === 'development') {
  process.on('SIGINT', () => {
    stop();
  });
  process.on('exit', () => {
    stop();
  });
  process.stdin.resume();
}

let stopping = false;
function stop () {
  if (!apps || stopping) {
    return true;
  }
  stopping = true;
  console.log(`start to pm2 delete ${serverName}`);
  apps = null;
  let stopActions = [];
  stopActions.push(
      new Promise((resolve) => {
      pm2.connect(() => {
        pm2.delete(serverName, (err) => {
          pm2.disconnect();
          if (err) throw err;
          console.log(`pm2 delete ${serverName} success`);
          apps = null;
          resolve();
        });
      })
    })
  )


  if (stopBuildWatch) {
    stopActions.push(stopBuildWatch())
  }

  Promise.all(stopActions)
    .then(() => {
      process.stdin.pause();
      process.exit();
    })
}
