'use strict'

var ejs = require('ejs')
var heredoc = require('heredoc')

var tpl = heredoc(function () {/*
    <xml>
        <ToUserName><![CDATA[<%= ToUserName %>]]></ToUserName>
        <FromUserName><![CDATA[<%= FromUserName %>]]></FromUserName>
        <CreateTime><%= createTime %></CreateTime>
        <MsgType><![CDATA[<%= MsgType %>]]></MsgType>
        <% if(MsgType === 'text'){ %>
            <Content><![CDATA[<%= content %>]]></Content>
        <%} else if(MsgType === 'image'){%>
            <Image>
                <MediaId><![CDATA[<%= content.media_id %>]]></MediaId>
            </Image>
        <%} else if(MsgType === 'voice'){%>
            <Voice><MediaId>< ![CDATA[<%= content.media_id %>]]></MediaId></Voice>
        <%} else if(MsgType === 'video'){%>
            <Video>
                <MediaId><![CDATA[<%= content.media_id %>]]></MediaId>
                <Title><![CDATA[<%= content.title %>]]></Title>
                <Description><![CDATA[<%= content.description %>]]></Description>
            </Video>
        <%} else if(MsgType === 'music'){%>
            <Music>
                <Title><![CDATA[<%= content.title %>]]></Title>
                <Description><![CDATA[<%= content.description %>]]></Description>
                <MusicUrl><![CDATA[<%= content.music_url %>]]></MusicUrl>
                <HQMusicUrl><![CDATA[<%= content.hqMusic_url %>]]></HQMusicUrl>
                <ThumbMediaId><![CDATA[<%= content.media_id %>]]></ThumbMediaId>
            </Music>
        <%} else if(MsgType === 'news'){%>
            <ArticleCount><%= content.length %></ArticleCount>
            <Articles>
               <% content.forEach(function(item) {%>
                 <item>
                    <Title><![CDATA[<%= item.title %>]]></Title> 
                    <Description><![CDATA[<%= item.description1 %>]]></Description>
                    <PicUrl><![CDATA[<%= item.picUrl %>]]></PicUrl>
                    <Url><![CDATA[<%= item.url %>]]]></Url>
                </item>
                <% }) %>
            </Articles>
          <% } %>
    </xml>
*/
})

var compiled = ejs.compile(tpl)

exports = module.exports = {
    compiled: compiled
}