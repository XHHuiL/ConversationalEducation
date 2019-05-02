const app = getApp()

Page({
  data:{
    // 存储用户的信息
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    console.log("onLoad is called");
    // 如果全局数据中已经存有用户信息，那么直接使用
    if (app.globalData.userInfo) {
      console.log("用户已授权");
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    // 否则进行网络请求，使用回调函数设置用户信息
    else if(this.data.canIUse){
      console.log("网络请求用户已经授权的信息");
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        console.log(this.data.userInfo);
      }
    }
  },
  getUserInfo: function(e) {
    console.log("getUserInfo is called");
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    console.log(e);
    if(e.detail.userInfo){
      // 设置授权信息
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
    }
  },
  // 跳转到首页
  goToHome: function() {
    wx.switchTab({
      url: '../home/home',
    })
  },
})
