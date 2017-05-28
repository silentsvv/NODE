const Koa = require('koa')
const app = new Koa()
const port = process.env.port || 3000
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const cors = require('kcors');


const api = require('./index.js')
const Router = require('koa-router')
const router = new Router()

app.use(logger())
app.use(bodyparser())
app.use(cors({'Access-Control-Allow-Origin':'*'}))
app.use(router.routes(), router.allowedMethods())

router.get('/hello', async (ctx) => {
  // let p = api()
  let data = await api.boxList({pageNum:0})
  // console.log(data)
  // data = await api({pageNum:1})
  ctx.body = data
  // console.log(data)
  // ctx.body = data
})

router.post('/get', async (ctx) => {
  let param = ctx.request.body
  console.log(param)
  let url = param.url
  console.log(url)
  if(url) {
    let promise= api.picList(url)
    let data = await promise
    console.log(data)
    ctx.body = data
  }else {
    ctx.body = "找不到该网页"
  }
  console.log(ctx.response)
})





const server = app.listen(port)

server.on('listening', ()=> console.log(`server is start at ${port}`)) 