import { GetRoute, PostRoute, PutRoute, DelRoute, AllRoute } from '@app/core/router';
import format, { query, params } from '@app/core/params';
// import validator from './validator';

export default class Routes {
  @GetRoute('/')
  static home = (ctx, next) => {
    ctx.render(
      'home',
      {
        layout: 'layout/html',
        title: 'title',
        initializeData: { user: '<Hello>'}
      }
    );
  }

  @GetRoute('/params/:id')
  @format({
    name: query('name'),
    params: params('id')
  })
  static getParams = (ctx, next) => {
    // ctx.params, ctx.query
    console.log(ctx.formatedParams);
    ctx.body = 'get /params';
  }

  @GetRoute('/test')
  static getTest = (ctx, next) => {
    ctx.body = 'get /test'
  }

  @PostRoute('/test')
  static postTest = (ctx, next) => {
    ctx.body = 'post /test'
  }

  @PutRoute('/test')
  static putTest = (ctx, next) => {
    ctx.body = 'put /test'
  }

  @DelRoute('/test')
  static delTest = (ctx, next) => {
    ctx.body = 'delete /test'
  }

  @AllRoute('/test-all')
  static allTest = (ctx, next) => {
    ctx.body = 'all /test-all'
  }
}
