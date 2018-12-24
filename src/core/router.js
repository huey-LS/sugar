import request from 'request';
import { createThunkAttributeDescriptor, extractData } from './helpers';

/**
 * @enum {RouteMethod}
 */
var RouteMethod = {
  get: 'get',
  post: 'post',
  put: 'put',
  del: 'del',
  all: 'all'
}

/**
 * create routes
 * @param {Object} options
 * @param {RouteMethod} options.method
 * @param {string} options.path
 * @returns {Function} descriptor
 */
export const create = createThunkAttributeDescriptor((value, options) => {
  if (typeof value === 'function') {
    return {
      middleware: value,
      method: options.method,
      path: options.path
    }
  }

  return value;
});

export function GetRoute (path) {
  return create({ method: 'get', path })
}

export function PostRoute (path) {
  return create({ method: 'post', path })
}

export function PutRoute (path) {
  return create({ method: 'put', path })
}

export function DelRoute (path) {
  return create({ method: 'del', path })
}

export function AllRoute (path) {
  return create({ method: 'all', path })
}

export default function appendRoutes (router, routes) {
  for (let key in routes) {
    let { method, path, middleware } = routes[key];
    router[method] && router[method](path, middleware);
  }

  return router;
}

export function doForward (ctx, to, options = {}) {
  let customHeaders = options.headers || {};
  ctx.body = ctx.req.pipe(
    request({
      url: to,
      method: ctx.request.method,
      headers: {
        ...ctx.request.headers,
        ...customHeaders
      }
    })
  );
}

export function appendForward (router, forwards) {
  forwards.forEach((forward) => {
    router.all(forward.from, async function (ctx, next) {
      let to = extractData(forward.to, ctx);
      let query = ctx.request.url.split('?')[1];
      if (query && to.indexOf('?') === -1) {
        to = to + '?' + query;
      }
      let customHeaders = extractData(forward.headers, ctx);
      console.log(`[forward] method: [${ctx.request.method}] from: [${ctx.request.url}], to: [${to}]`);
      doForward(ctx, to, {
        headers: customHeaders
      })
    })
  })

  return router;
}