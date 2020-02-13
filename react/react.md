
rm -rf `yarn cache dir`

yarn cache clean

yarn cache dir

npm config rm proxy 
npm config rm https-proxy

info There appears to be trouble with your network connection. Retrying...
"https://registry.npm.taobao.org/autoprefixer: tunneling socket could not be established, cause=connect ETIMEDOUT 10.129.49.21:8080".

## 对node-sass镜像源进行设置
yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass
或者
npm config set sass-binary-site http://npm.taobao.org/mirrors/node-sass

https://blog.csdn.net/Tyro_java/article/details/79772442