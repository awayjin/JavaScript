const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '17',
        chrome: '66',
        safari: '11.1',
        firefox: '60',
        // android: '4'
      },
      useBuiltIns: 'usage'
    }
  ]
]

module.exports = {
  presets
}