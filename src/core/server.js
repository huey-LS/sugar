import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import send from 'koa-send';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import reactView from 'koa-react-view';

import config from './config';
import appendRoutes, { appendForward } from './router';

const basePath = '../'

export default function (configs, routes) {
  const app = new Koa();

  // add configs
  config.add(configs);

  // create react view
  // reactView(app, {
  //   views: path.join(__dirname, basePath, config.get('server.view')),
  //   extname: 'jsx'
  // });

  const viewRoot = path.join(basePath, config.get('server.view.root'));
  const viewApplicationRoot = path.join(viewRoot, config.get('server.view.application'));

  process.env.VIEW_ENV = 'server';
  app.use(async (ctx, next) => {
    ctx.render = async (name, props) => {
      let app = require(path.join(viewApplicationRoot, name)).default;
      let layout = require(path.join(viewRoot, props.layout)).default;
      // console.log('try render', view, path.join(viewRoot, view), app);
      ctx.body = ReactDOMServer.renderToString(
        React.createElement(
          layout,
          { ...props, script: `/static/view/${name}.js` },
          React.createElement(app))
      );
    }

    await next();
  })

  // init routes
  var router = new Router();
  appendRoutes(router, routes);
  app.use(router.routes());

  var router = new Router();
  const staticRoute = config.get('server.static.route');
  const staticPath = config.get('server.static.path');
  // static resources
  router.prefix(staticRoute).get('*', async (ctx, next) => {
    var path = ctx.path.substr(staticRoute.length);

    if (path) {
      await send(ctx, path, { root: staticPath });
    } else {
      await next;
    }
  });
  app.use(router.routes());

  // forward
  const forward = config.get('proxy.forward')
  if (Array.isArray(forward) && forward.length > 0) {
    app.use(
      appendForward(
        new Router(),
        forward
      ).routes()
    );
  }


  const serverName = config.get('server.name');
  const httpPort = config.get('server.port');
  app.listen(httpPort);
  console.info(`${serverName} server start listen at ${httpPort}`);

  return app;
}
