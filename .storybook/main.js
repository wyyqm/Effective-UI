const path = require('path')
module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/**/*.stories.mdx',
    '../packages/**/*.stories.@(js|jsx|ts|tsx)',
    '../examples/**/*.stories.mdx',
    '../examples/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-source-code-addon',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [path.resolve(__dirname, '../src')] // You can specify directories
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
          injectStoryParameters: false
        }
      }
    }
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    })

    return config
  }
}
