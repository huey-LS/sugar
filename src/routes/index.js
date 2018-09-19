import { GetRoute } from '@app/core/router';

export default class Routes {
  @GetRoute('/')
  static home = (ctx, next) => {
    ctx.render(
      'home',
      {
        layout: 'layout/html',
        title: 'title',
        initializeData: { user: '<>aa\'\"a'}
      }
    );
  }
}
