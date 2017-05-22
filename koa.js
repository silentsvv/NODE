const Koa = require('koa')
const app = new Koa()
const port = process.env.port || 3000
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const routes = require('./routes')


app.use(logger())
app.use(bodyparser())
app.use(routes.routes(), routes.allowedMethods())

const server = app.listen(port)

server.on('listening', ()=> console.log(`server is start at ${port}`)) 