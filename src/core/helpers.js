export function createThunkAttributeDescriptor (callback) {
  return function (options) {
    return function (target, key, descriptor) {
      if (descriptor.initializer) {
        const oldInitializer = descriptor.initializer;
        descriptor.initializer = function () {
          const _self = this;
          const value = oldInitializer.call(_self);
          return callback.call(_self, value, options);
        }
      } else if (typeof descriptor.value !== 'undefined') {
        descriptor.value = callback.call(target, descriptor.value, options)
      }
      return descriptor;
    }
  }
}

export function createThunk (callback) {
  return function (options)  {
    return function (thunkOptions) {
      return callback(options, thunkOptions)
    }
  }
}

export function extractData (data, ...args) {
  if (typeof data === 'function') {
    return data(...args);
  } else {
    return data;
  }
}
