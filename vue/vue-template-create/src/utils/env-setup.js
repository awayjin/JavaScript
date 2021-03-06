let envList = {
  dev: { // 开发
    G_HOST: '',
    G_PORT: '',
    G_PREFIX: ''
  },
  test: { // 测试
    G_HOST: 'https://digitaltest.vankeservice.com',
    G_PORT: '',
    G_PREFIX: ''
  },
  pro: { // 生产
    G_HOST: 'https://vanvan.vankeservice.com',
    G_PORT: '',
    G_PREFIX: ''
  }
}

let baseURL = ''
// full-url
function getFullUrl (env) {
  const G_PORT = env.G_PORT ? `:${env.G_PORT}` : ''
  const G_PREFIX = env.G_PREFIX ? `/${env.G_PREFIX}` : ''
  baseURL = env.G_HOST + G_PORT + G_PREFIX
  return baseURL
}

let NODE_ENV = process.env.NODE_ENV
switch (NODE_ENV) {
  case 'dev': // 开发
    baseURL = getFullUrl(envList.dev)
    break
  case 'test': // 测试
    baseURL = getFullUrl(envList.test)
    break
  case 'pro': // 生产
  case 'production':
    baseURL = getFullUrl(envList.pro)
    break
}

export default baseURL
