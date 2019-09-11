const router = require('koa-router')()

router.prefix('/page')

router.get('/', async(ctx, next) => {
  await ctx.render('page')
})

module.exports = router
