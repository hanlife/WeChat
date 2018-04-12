'use strict'


var path = require('path')
var util = require('./libs/util')
var wechat_file = path.join(__dirname, './config/wechat.txt')

var config = {
    wechat: {
        appId: 'wxd7f612dcaa4ebff6',
        appSecret: '3aaca8efacac69e9fe0bf97d18569301',
        token: 'hanlaifu',
        getAccessToken: function() {
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken: function(data){
            data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file, data)
        }
    }
}

module.exports = config
