# 对话式教学微信小程序
## 刘辉 16302010048

### 1. 项目组织及文件说明
```
│  app.js					配置全局数据
│  app.json					配置pages, 底部导航栏(tabBar)
│  app.wxss					导入colorui css库
│  project.config.json				项目配置文件
│  
├─assets
│  └─images
│          arrow-right.png			右箭头图标
│          course.png				底部导航栏“课程”图标
│          course_selected.png			底部导航栏“课程选中”图标
│          delete.png				删除图标
│          enter.png				进入图标
│          home.png				底部导航栏“主页”图标
│          home_selected.png			底部导航栏“主页选中”图标
│          logo.jpg				logo
│          logo.png				logo
│          mine.png				底部导航栏“我的”图标
│          mine_selected.png			底部导航栏“我的选中”图标
│          next.png				下一个图标
│          note.png				底部导航栏“笔记”图标
│          note_selected.png			底部导航栏“笔记选中”图标
│          radio.png				radio图标
│          selected_radio.png			radio选中图标
│          warning.png				警告图标
│          
├─colorui					colorui css库
│  │  animation.wxss
│  │  icon.wxss
│  │  main.wxss
│  │  
│  └─components
│          cu-custom.js
│          cu-custom.json
│          cu-custom.wxml
│          cu-custom.wxss
│          
├─pages
│  ├─add-note					添加笔记page
│  │      add-note.js
│  │      add-note.json
│  │      add-note.wxml
│  │      add-note.wxss
│  │      
│  ├─change-email				改变邮件page
│  │      change-email.js
│  │      change-email.json
│  │      change-email.wxml
│  │      change-email.wxss
│  │      
│  ├─change-name				改变昵称page
│  │      change-name.js
│  │      change-name.json
│  │      change-name.wxml
│  │      change-name.wxss
│  │      
│  ├─change-note				改变笔记内容page
│  │      change-note.js
│  │      change-note.json
│  │      change-note.wxml
│  │      change-note.wxss
│  │      
│  ├─change-student-number			改变学号page
│  │      change-student-number.js
│  │      change-student-number.json
│  │      change-student-number.wxml
│  │      change-student-number.wxss
│  │      
│  ├─chapter					章节page
│  │      chapter.js
│  │      chapter.json
│  │      chapter.wxml
│  │      chapter.wxss
│  │      
│  ├─content					章节内容（聊天室形式）page
│  │      content.js
│  │      content.json
│  │      content.wxml
│  │      content.wxss
│  │      
│  ├─course					课程page
│  │      course.js
│  │      course.json
│  │      course.wxml
│  │      course.wxss
│  │      
│  ├─home					主页page
│  │      home.js
│  │      home.json
│  │      home.wxml
│  │      home.wxss
│  │      
│  ├─index					首页page
│  │      index.js
│  │      index.json
│  │      index.wxml
│  │      index.wxss
│  │      
│  ├─mine					我的page
│  │      mine.js
│  │      mine.json
│  │      mine.wxml
│  │      mine.wxss
│  │      
│  └─note					笔记page
│          note.js
│          note.json
│          note.wxml
│          note.wxss
|
```

### 2. 关键功能实现细节
+ 用户登录后一段时间内免授权登录，超时后须重新授权
	+ 首次登录时，调用wx.setStorageSync()在本地存储与用户相关的数据并存储免授权登录截止时间
	+ 再次登录时，先调用wx.getStorageSync()获取免授权截止时间，然后判断是否超时。如果没有超时，那么调用wx.getStorageSync()获取用户相关的数据；否则提示用户重新授权登录
+ 聊天室
	+ 聊天室消息气泡通过将头像、旋转45度的正方形、文本这3个元素按行排列的方式实现，如果是用户发送的消息则顺序逆转
	+ 首先向服务器请求此章节的所有内容，设置两个值：已读消息的长度（包括章节内容和用户发送的消息）、用户发送消息的长度，通过控制这两个值来保证消息显示正确
	+ 当读到的章节内容是一个问题时，向服务器请求此问题的所有选项并显示在聊天室中，此时进入回答问题状态
	+ 处在回答问题状态时，使用flag保证用户只有回答了问题之后才能查看下一条章节内容，否则在聊天室中给出相应的提示
	+ 通过调用wx.setStorageSync()将聊天室的所有对话保存，调用wx.getStorageSync()获取之前保存的聊天室的所有对话
