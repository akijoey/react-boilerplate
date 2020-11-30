import webpack from 'webpack'

process.env.NODE_ENV = 'production'
const config = require('../webpack.config')

function build(): void {
  const compiler = webpack(config)
  compiler.run((err, stats) => {
    if (err) {
      throw err
    }
    console.log(stats?.toString({
      colors:true
    }))
  })
}

if (require.main === module) {
	build()
}
