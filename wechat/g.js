'use strict'

var sha1 = require('sha1')
var getRawbody = require('raw-body')
var Wechat = require('./wechat')
var util = require('../libs/util')

module.exports = function (opts, handler) {
    var wechat = new Wechat(opts)

    return function * (next) {
        var that = this
        var token = opts.token
        var signature = this.query.signature
        var nonce = this.query.nonce
        var timestamp = this.query.timestamp
        var echostr = this.query.echostr

        var str = [token, timestamp, nonce]
            .sort()
            .join('')
        var sha = sha1(str)

        if (this.method === "GET") {
            // 微信服务器
            if (sha === signature) {
                this.body = echostr + ''
            } else {
                this.body = "wrong"
            }
        } else if (this.method === 'POST') {
            if (sha !== signature) {
                return false
            }
            // 用户事件
            var data = yield getRawbody(this.req, {
                length: this.length,
                limit: '1mb',
                encoding: this.charset
            })
            // xml转成对象
            var content = yield util.parseXMLAsync(data)
            // 格式化xml对象
            var message = util.formatMessage(content.xml)
            this.weixin = message

            yield handler.call(this, next)
            wechat.reply.call(this)

        }
    }
}