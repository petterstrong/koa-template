const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Koa2 template'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'json'
  }
})

module.exports = router
