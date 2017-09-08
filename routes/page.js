const router = require('koa-router')()

router.prefix('/page')

router.use('/', async(ctx, next) => {
  ctx.status(200)
  ctx.body = 'page'
})
