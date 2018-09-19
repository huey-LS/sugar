import { createThunkAttributeDescriptor } from './helpers';

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

