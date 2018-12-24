export const forward = [
  {
    "from": /^\/api\//,
    "to": function (ctx) {
      return 'xxx' + ctx.request.url
    },
    "headers": {
      "Host": "id-dev.163yun.com"
    }
  }
]

