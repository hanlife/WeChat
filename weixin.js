'user strict'

exports.reply = function * (next) {
    var message = this.weixin
    console.log('reply..............')
    if (message.MsgType === 'event') {
        // 事件推送
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log("扫二维码进入" + message.EventKey + ' ' + message.tickey)
            }
            this.body = '您订阅了、消息ID：'
        } else if (message.Event === 'unsubscribe') {
            this.body = '取消关注了'
        } else if (message.Event === 'LOCATION') {
            this.body = '您上报的位置是' + message.Latitude + '/' + message.Longitude + '-' + message.Precisiong
        } else if (message.Event === 'CLICK') {
            this.body = '点击了菜单' + message.EventKey
        } else if (message.Event === 'SCAN') {
            console.log('关注后扫描二维码' + message.EventKey + "  " + message.Tickey)
            this.body = '扫描二维码'
        } else if (message.Event === 'VIEW') {
            this.body = '点击了菜单中的链接' + message.EventKey
        }
    } else if (message.MsgType === 'text') {
        var content = message.Content
        var reply = {
            type: 'text',
            content: '您说的太复杂' + content
        }

        if (content === '1') {
            reply.content = "回复了1"
        } else if (content === '2') {
            reply.type='image'
            reply.content = {
                media_id: 'https://www.caiyoyo.com/image/news.png'
            }
        } else if (content === '3') {
            reply.type='news'
            reply.content = [
                {
                    title: '我是图文标题1',
                    description: '我是描述文字1',
                    picUrl: 'https://www.caiyoyo.com/image/news.png',
                    url: 'http://www.baidu.com/'
                }, {
                    title: '我是图文标题2',
                    description: '我是描述文字2',
                    picUrl: 'https://www.caiyoyo.com/image/news.png',
                    url: 'http://www.taobao.com/'
                }
            ]
        }
        this.body = reply
    }
    yield next
}