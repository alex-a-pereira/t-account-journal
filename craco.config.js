const CracoAlias = require('craco-alias')

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: (content, loaderContext) => {
          const additionalImports = [
            'src/setup/styles/variables.scss',
            'src/setup/styles/globals.scss'
          ]

          const importsForThisFile = additionalImports
            .filter(imp => !loaderContext.resourcePath.endsWith(imp))
            .map(imp => `@import "${imp}";`)
            .join('\n')

          return `
            ${importsForThisFile}
            ${content}
          `
        }
      }
    }
  },
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
