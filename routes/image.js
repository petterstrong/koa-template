const router = require('koa-router')();
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path  = require('path');
router.prefix('/image');

router.get('/', async (ctx, next) => {
  const {keyword, source} = ctx.query
  console.time('start')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  console.timeEnd('start')
  console.time('navigate')
  await page.goto('https://www.baidu.com', {waitUntil: 'networkidle'})
  console.timeEnd('navigate')
  await page.setViewport({
    width: 1380,
    height: 920
  })

  await page.type(keyword, {delay: 200})
  await page.click('input[type=submit]')
  await page.waitForNavigation({waitUntil: 'networkidle'})

  const buffer = await page.screenshot({fullPage: true})
  console.log(__dirname, buffer)
  const filename = path.join(__dirname + '/../public/file/test.png')
  await fs.writeFile(filename, buffer)
  browser.close()
  ctx.set('Cache-Control', 'public, max-age=3600')
  ctx.type = 'png'
  ctx.body = buffer
})

module.exports = router
