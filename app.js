'use strict'

var Koa = require('koa')

var wechat = require('./wechat/g')
var util = require('./libs/util')
var config = require('./config')
var weixin = require('./weixin')


var app = new Koa();

app.use(wechat(config.wechat, weixin.reply))

app.listen(80);
console.log('listening:80')