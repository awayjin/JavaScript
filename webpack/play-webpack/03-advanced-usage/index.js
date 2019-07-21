if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/large-number-away.min.js");
} else {
  module.exports = require("./dist/large-number-away.js");
}