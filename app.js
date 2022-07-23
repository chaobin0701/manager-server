const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const log4js = require('./utils/log4j')
const router = require("koa-router")();


const users = require('./routes/users')


// error handler
onerror(app)

require('./config/db.js')


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  log4js.info(`get ${JSON.stringify(ctx.request.query)}`)
  log4js.info(`post ${JSON.stringify(ctx.request.body)}`)

  await next()
})

router.prefix("/api")
router.use(users.routes(),users.allowedMethods())
// routes
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
  log4js.error('error output',err)
});

module.exports = app
