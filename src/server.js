import createServer from '@app/core/server';
import * as configs from '@app/configs';
import routes from '@app/routes';

var app = createServer(configs, routes);

// server();

// function server () {
//   var router = new Router();
//   appendRoutes(router);
//   app.use(router.routes());
// }