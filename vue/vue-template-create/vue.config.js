// 配置: https://cli.vuejs.org/zh/config/

const PORT = process.env.PORT || 5000
module.exports = {
  // devServer: {
  //   overlay: {
  //     warnings: true,
  //     errors: true
  //   },
  //   port: 5000
  // },
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    port: PORT,
    proxy: {
      "/api": {
        target: `http://localhost:${PORT}`,
        bypass: function(req, res) {
          const env = process.env.NODE_ENV
          console.log('process.env.NODE_ENV:', env)
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          // } else if (process.env.MOCK !== "none") {
          } else if (['pro', 'production'].indexOf(env) === -1) {
            console.log('req.headers.accept:', req.headers.accept)
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("-");
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
}
