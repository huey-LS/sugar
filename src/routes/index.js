import { GetRoute, PostRoute, PutRoute, DelRoute, AllRoute } from '@app/core/router';

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
