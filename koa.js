const Koa = require('koa')
const app = new Koa()
const port = process.env.port || 3000
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const cors = require('kcors')
const convert = require('koa-convert');



const api = require('./index.js')
const Router = require('koa-router')
const router = new Router()

app.use(logger())
app.use(bodyparser())
app.use(convert(cors({'Access-Control-Allow-Origin':'*'})))
app.use(router.routes(), router.allowedMethods())

router.get('/hello', function* (ctx) {
  let test = 1
  // ctx.set({Accept:"text/plain"})
  yield next
  let data = yield api.boxList({pageNum:0})
  test++
  console.log(test)
  ctx.body = data
})

router.post('/get', async (ctx) => {
  let param = ctx.request.body
  let url = param.url
  if(url) {
    let promise= api.picList(url)
    let data = await promise
    ctx.body = data
  }else {
    ctx.body = "找不到该网页"
  }
})





const server = app.listen(port)

server.on('listening', ()=> console.log(`server is start at ${port}`)) 