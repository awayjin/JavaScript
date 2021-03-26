const path = require('path')

module.exports = {
  context: path.resolve('./'),
  resolve: {
    "alias": {
      "@/*": ["src/*"],
      "@@/*": ["src/.umi/*"],
      "@/hooks": ["hooks/index"],
      "@/components": ["components/index"],
      "@/utils": ["utils/index"]
    },
  },
}
