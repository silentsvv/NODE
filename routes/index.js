const Router = require('koa-router')
const router = new Router()
const Api = require('./index.js')

router.get('/hello', async (ctx) => {
  try {
    let data
  // ctx.body = 'heloo'
    let a = Api()
    await p
    a.then((res) => console.log(ctx.body = data))
  } catch (error) {
    ctx.body = "服务器出错"
  }
  
  console.log(a)
})

module.exports = router