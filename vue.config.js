module.exports = {
  publicPath: "./", // 公共路径 默认为"/"，建议使用"./"相对路径
  devServer: {   // 本地服务器配置(npm run serve)
    port: 8080, // 端口
    host: "localhost", // 域名
    https: false, // 是否开启https
    open: true	// 是否在开启服务器后自动打开浏览器访问该服务器
  },
  lintOnSave: false,  // 取消lint语法检测，此处可不配置
  outputDir: "dist", // build打包输出目录
  assetsDir: "assets", // 静态文件输出目录，基于dist
  indexPath: "index.html",  // 输出html文件名
  productionSourceMap: false, // 取消.map文件的打包，加快打包速度
  configureWebpack: (config) => {
    // process.env为环境变量，分别对应.env.development文件和.env.production文件 此处表示加快开发环境打包速度
    if (process.env.NODE_ENV !== 'production') return;
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;	//生产环境去掉console.log
    return {  // 此处配置webpack.config.js的相关配置
      plugins: [],
      performance: {},
      css: { // css相关配置
        // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中，生产环境下是 true，开发环境下是 false
        extract: process.env.NODE_ENV === "production",
        // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
        sourceMap: false,
        // 启用 CSS modules for all css / pre-processor files.(预加载)
        requireModuleExtension: true,
        loaderOptions: {
          sass: {
            prependData: `@import "@.src/styles/main.scss";`
          }
        }
      },
    };
  }
};
