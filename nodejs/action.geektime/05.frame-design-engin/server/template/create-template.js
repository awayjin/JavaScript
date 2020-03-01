// const vm = require('vm');
//
// const templateContext = vm.createContext({});
//
// function createTemplate(templateContent) {
//
//     return vm.runInContext(
//         `(function (data) {
//             with (data) {
//                 return \`${templateContent}\`
//             }
//         })`,
//         templateContext
//     );
// }
//
// module.exports = createTemplate


const vm = require('vm')
const fs = require('fs')

function createTemplate(templateContent) {
    return vm.runInNewContext(
      `(function (data) {
        with (data) {
          return \`${templateContent}\`
        }
    })`
    )
}
module.exports = createTemplate