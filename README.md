# 项目介绍
前端小游戏的后台支持，  
后台采用nodejs，  
服务运行在leancloud的云引擎上，同时使用leancloud做存储，  
使用leancloud命令行工具构建项目

#项目运行
首先确认本机已经安装 [Node.js](http://nodejs.org/)运行环境
##安装依赖：
```
npm install
```
##本地运行
```
node server.js 或  
nodemon server.js (修改文件自动重启服务)
```

## 部署到leancloud
确认本机已经安装[LeanCloud 命令行工具](https://leancloud.cn/docs/leanengine_cli.html)   
登录并关联应用：
```
lean login
lean switch
```
发布
```
lean deploy
```

#前端游戏
##工兵扛军旗
[在线demo http://junqi.chengxg.site](http://junqi.chengxg.site)

项目gif截图  
	![image](https://github.com/chengxg/junqi-client-vue/blob/master/junqi.gif)  


