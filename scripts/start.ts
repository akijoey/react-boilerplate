import http from 'http'
import Koa, { ParameterizedContext, Next } from 'koa'
import webpack, { Compiler } from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import chalk from 'chalk'

process.env.NODE_ENV = 'development'
const config = require('../webpack.config')

// webpack-dev-middleware
const devMiddleware = (compiler: Compiler, options: any) => {
  const dev = webpackDevMiddleware(compiler, options)
  return async (ctx: ParameterizedContext, next: Next) => {
    await dev(ctx.req, Object.assign(ctx.res, {
      send: (content: any) => ctx.body = content
    }), next)
  }
}

// webpack-hot-middleware
const hotMiddleware = (compiler: Compiler, options: any) => {
  const hot = webpackHotMiddleware(compiler, options)
  return async (ctx: ParameterizedContext, next: Next) => {
    const originalEnd = ctx.res.end
    await new Promise(resolve => {
      ctx.res.end = function(callback?: any) {
        originalEnd.bind(this, ...arguments)
        resolve(callback)
      }
      hot(ctx.req, ctx.res, resolve)
    }) && next()
  }
}

function start(): void {
  const app = new Koa()
  const compiler = webpack(config)
  app.use(devMiddleware(compiler, {
    publicPath: config.output!.publicPath!,
    writeToDisk: false
  }))
  app.use(hotMiddleware(compiler, {
    heartbeat: 2000
  }))
  const server = http.createServer(app.callback())
  // server listen
  const host = '127.0.0.1', port = 3000
  const url = chalk.magenta.underline(`http://${host}:${port}`)
  server.listen(port, host, () => {
    console.log(`DevServer is running at ${url}`)
  })
  // signal handle
  const signals = ['SIGINT', 'SIGTERM']
  signals.forEach(signal => {
    process.on(signal, () => {
      server.close()
      console.log(chalk.greenBright.bold('Exit'))
      process.exit()
    })
  })
}

if (require.main === module) {
  start()
}
