const app = getApp()

Page({
  data: {
    // 存储用户的信息
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function() {
    var deadTime = parseInt(wx.getStorageSync('deadTime'));
    if (deadTime) {
      if (parseInt(deadTime) < Date.parse(new Date()) / 1000) {
        wx.removeStorageSync('deadTime');
        wx.removeStorageSync('userInfo');
        wx.removeStorageSync('hasUserInfo');
        wx.removeStorageSync('openId');
        wx.removeStorageSync('sessionKey');
      } else {
        app.globalData.userInfo = wx.getStorageSync('userInfo');
        app.globalData.hasUserInfo = wx.getStorageSync('hasUserInfo');
        app.globalData.openId = wx.getStorageSync('openId');
        app.globalData.sessionKey = wx.getStorageSync('sessionKey');
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        });
      }
    }
  },
  getUserInfo: function(e) {
    wx.login({
      success: res => {
        var code = res.code;
        wx.request({
          url: 'http://localhost:8080/user/login',
          method: 'POST',
          data: {
            code: code
          },
          success: function(res) {
            if (res.data.openId) {
              app.globalData.openId = res.data.openId;
              app.globalData.sessionKey = res.data.sessionKey;
              wx.setStorageSync('openId', app.globalData.openId);
              wx.setStorageSync('sessionKey', app.globalData.sessionKey);
            }
          },
          fail: function() {
            console.log("http request fail!");
          }
        });
      }
    });

    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.hasUserInfo = true;
      try {
        wx.setStorageSync('userInfo', app.globalData.userInfo);
        wx.setStorageSync('hasUserInfo', app.globalData.hasUserInfo);
        var timeStamp = Date.parse(new Date());
        timeStamp = timeStamp / 1000 + 24 * 3600;
        wx.setStorageSync('deadTime', timeStamp);
      } catch (e) {
        console.log('set key error!');
      }
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
    }
  },
  // 跳转到首页
  goToHome: function() {
    // todo: update user info
    wx.switchTab({
      url: '../home/home',
    });
  },
})