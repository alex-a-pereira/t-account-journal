const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './', // plugin does not take it from tsconfig
        tsConfigPath: './tsconfig.paths.json'
      }
    }
  ]
}
