module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/variables.scss";`,
      },
    },
  },

  assetsDir: 'assets/',

  pluginOptions: {
    moment: {
      locales: ['ko'],
    },
  },

  pages: {
    community: {
      entry: 'src/main.ts',
      filename: 'index.html',
    },
  },
  chainWebpack: config => {
    // config.devServer
    //   .host('0.0.0.0')
    //   .disableHostCheck(true);
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .tap(options => {
        options.fix = true;
        return options;
      });
  },
};