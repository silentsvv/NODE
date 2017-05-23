const Router = require('koa-router')
const router = new Router()
const Api = require(__dirname+'/index.js')

router.get('/hello', async (ctx) => {
  let data
  // ctx.body = 'heloo'
  let a = Api()
  await a
  a.then((res) => console.log(ctx.body = data))
  console.log(a)
})

module.exports = router