const app = getApp()

Page({
  data: {
    // 存储用户的信息
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    // try {
    //   app.globalData.userInfo = wx.getStorageSync('userInfo');
    //   app.globalData.hasUserInfo = wx.getStorageSync('hasUserInfo');
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   });
    // } catch (e) {
    //   console.log('no such key!');
    // }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    app.globalData.hasUserInfo = true;
    try {
      wx.setStorageSync('userInfo', app.globalData.userInfo);
      wx.setStorageSync('hasUserInfo', app.globalData.hasUserInfo);
    } catch (e) {
      console.log('set key error!');
    }
    if (e.detail.userInfo) {
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