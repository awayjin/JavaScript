// 'prerender-spa-plugin': https://www.jianshu.com/p/6a4c0b281e7f
// https://blog.csdn.net/yftk765768540/article/details/81047145

const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require('path')
const ManifestPlugin = require('pwa-manifest-webpack-plugin')

// import FullURL from './src/utils/env-setup.js'
// const FullURL = require('./src/utils/env-setup.js')
// console.log('FullURL:', FullURL)

module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    port: 4002,
    // 代理跨域
    proxy: 'http://localhost:5005'
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return;
    return {
      plugins: [
        // manifest
        new ManifestPlugin({
          name: '最野新闻', // 标题 指定了Web App的名称。
          short_name: '最野', // 短标题 short_name其实是该应用的一个简称。一般来说，当没有足够空间展示应用的name时，系统就会使用short_name。
          description: '最野新闻 - 一款最前线新闻的应用', // 这个字段的含义非常简单，就是一段对该应用的描述。
          display: 'standalone', // fullscreen：全屏显示，会尽可能将所有的显示区域都占满；standalone：独立应用模式，这种模式下打开的应用有自己的启动图标，并且不会有浏览器的地址栏。因此看起来更像一个Native App；minimal-ui：与standalone相比，该模式会多出地址栏；browser：一般来说，会和正常使用浏览器打开样式一致。
          start_url: '/', // 这个属性指定了用户打开该Web App时加载的URL。相对URL会相对于manifest。这里我们指定了start_url为/，访问根目录。
          orientation: 'portrait-primary', // 控制Web App的方向。设置某些值会具有类似锁屏的效果（禁止旋转），例如例子中的portrait-primary。具体的值包括：any, natural, landscape, landscape-primary, landscape-secondary, portrait, portrait-primary, portrait-secondary。
          icon: {
            // icons本身是一个数组，每个元素包含三个属性：
            //
            // sizes：图标的大小。通过指定大小，系统会选取最合适的图标展示在相应位置上。
            // src：图标的文件路径。注意相对路径是相对于manifest。
            // type：图标的图片类型
            src: path.resolve('src/assets/logo.png'),
            sizes: [200]
          },
          background_color: '#2d8cf0', // background_color是在应用的样式资源为加载完毕前的默认背景，因此会展示在开屏界面。background_color加上我们刚才定义的icons就组成了Web App打开时的“开屏图”。
          theme_color: '#2d8cf0' // 定义应用程序的默认主题颜色。 这有时会影响操作系统显示应用程序的方式（例如，在Android的任务切换器上，主题颜色包围应用程序）。此外，还可以在meta标签中设置theme_color：<meta name="theme-color" content="#5eace0"/>
        }),
        // 预渲染
        new PrerenderSPAPlugin({
          // 生成文件的路径，也可以与webpakc打包的一致。
          // 下面这句话非常重要！！！
          // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
          staticDir: path.join(__dirname,'dist'),
          // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
          routes: ['/', '/mixin','/about'],
          // 这个很重要，如果没有配置这段，也不会进行预编译
          renderer: new Renderer({
            inject: {
              foo: 'bar'
            },
            headless: false,
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            renderAfterDocumentEvent: 'render-event'
          })
        }),
      ],
    };
  }
}
