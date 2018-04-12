'use strict'

var fs = require('fs')
var Promise = require('bluebird')
var xml2js = require('xml2js')
var tpl = require('../wechat/tpl')

exports.readFileAsync = function (fpath, encodnig) {
    return new Promise(function (resolve, reject) {
        fs
            .readFile(fpath, encodnig, function (err, content) {
                if (err) 
                    reject(err)
                else 
                    resolve(content)
            })
    })
}

exports.writeFileAsync = function (fpath, encodnig) {
    return new Promise(function (resolve, reject) {
        fs
            .writeFile(fpath, encodnig, function (err, content) {
                if (err) 
                    reject(err)
                else 
                    resolve(content)
            })
    })
}

exports.parseXMLAsync = function(xml){
    return new Promise(function(resolve, reject){
        xml2js.parseString(xml, {trim: true}, function(err, content){
            if(err) reject(err)
            else resolve(content)
        })
    })
}

function formatMessage(result) {
    var message = {}

    if (typeof result === 'object') {
        var keys = Object.keys(result)

        for (var i = 0; i < keys.length; i++) {
            var item = result[keys[i]]
            var key = keys[i]

            if (!(item instanceof Array) || item.length === 0) {
                continue
            }

            if (item.length === 1) {
                var val = item[0]

                if (typeof val === 'object') {
                    message[key] = formatMessage(val)
                } else {
                    message[key] = (val || '').trim()
                }
            } else {
                message[key] = []

                for (var j = 0; j < item.length; j++) {
                    message[key].push(formatMessage(item[j]))
                }
            }
        }
    }
    return message
}

exports.formatMessage = formatMessage

exports.tpl = function(content, message){
    var info = {}
    var type = 'text'
    var FromUserName = message.FromUserName
    var ToUserName = message.ToUserName

    type = content.type || type

    info.content = content.content
    info.createTime = new Date().getTime()
    info.MsgType = type
    info.ToUserName = FromUserName
    info.FromUserName = ToUserName
    return tpl.compiled(info)
}