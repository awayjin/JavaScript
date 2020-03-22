const EasySock = require('easy_sock');
/**
 *
 protocol-buffers:
 - Google 研发的二进制协议编解码库
 - 通过协议文件控制 Buffer 的格式。 更直观，更好维护，更便于合作
 */
const protobuf = require('protocol-buffers');
const fs = require('fs');

let schemas = null;
let easySock = null;

module.exports = {

    compile: function (config) {
        schemas = protobuf(
            config.protobufFile
        );

        easySock = new EasySock({
            ip: config.ip,
            port: config.port,
            timeout: 500,
            keepAlive: true
        })

        easySock.encode = function (data, seq) {
            const body = schemas[config.requestStruct].encode(data);

            const head = Buffer.alloc(8);
            head.writeInt32BE(seq);
            head.writeInt32BE(body.length, 4);

            return Buffer.concat([head, body])
        }
        easySock.decode = function (buffer) {
            const seq = buffer.readInt32BE();
            const body = schemas[config.responseStruct].decode(buffer.slice(8));

            return {
                result: body,
                seq
            }
        }
        easySock.isReceiveComplete = function (buffer) {
            if (buffer.length < 8) {
                return 0
            }
            const bodyLength = buffer.readInt32BE(4);

            if (buffer.length >= bodyLength + 8) {
                return bodyLength + 8

            } else {
                return 0
            }
        }
    },

    request: async function (data) {
        return await new Promise((resolve, reject) => {
            easySock.write(data, function (err, data) {
                err ? reject(err) : resolve(data)
            })
        })
    }
}