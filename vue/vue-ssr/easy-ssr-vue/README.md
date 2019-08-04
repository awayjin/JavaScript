//     env项是借助插件babel-preset-env，下面这个配置说的是babel对es6,es7,es8进行转码，并且设置amd,commonjs这样的模块化文件，不进行转码

{
  "presets": [
    "env",
    {
      "modules": false
    }
  ],
  "plugins": [
    "syntax-dynamic-import"
  ]
}

npm install @babel/plugin-syntax-dynamic-import --save-dev

npm install -D babel-loader @babel/core @babel/preset-env