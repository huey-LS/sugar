import { createThunkAttributeDescriptor, createThunk } from './helpers';

var format = createThunkAttributeDescriptor((value, rules) => {
  if (typeof value === 'function') {
    return function (ctx, next) {
      let params = {};
      let _self = this;
      Object.keys(rules).forEach((key) => {
        let rule = rules[key];
        if (typeof rule === 'function') {
          params[key] = rule.call(_self, ctx);
        }
      })
      ctx.formatedParams = params;
      return value.call(this, ctx, next)
    }
  }
})

export default format;

export const query = createThunk(function (key, ctx) {
  return ctx.query[key]
})

export const params = createThunk(function (key, ctx) {
  return ctx.params[key]
})
