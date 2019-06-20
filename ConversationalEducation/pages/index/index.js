const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },

  onLoad: function() {
    var deadTime = parseInt(wx.getStorageSync("deadTime"));
    if (deadTime) {
      if (parseInt(deadTime) < Date.parse(new Date()) / 1000) {
        wx.removeStorageSync("deadTime");
        wx.removeStorageSync("userInfo");
        wx.removeStorageSync("hasUserInfo");
        wx.removeStorageSync("openId");
        wx.removeStorageSync("sessionKey");
      } else {
        app.globalData.userInfo = wx.getStorageSync("userInfo");
        app.globalData.hasUserInfo = wx.getStorageSync("hasUserInfo");
        app.globalData.openId = wx.getStorageSync("openId");
        app.globalData.sessionKey = wx.getStorageSync("sessionKey");
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
          url: getApp().globalData.serverUrl + "/user/login",
          method: "POST",
          data: {
            code: code
          },
          success: function(res) {
            if (res.data.openId) {
              app.globalData.openId = res.data.openId;
              app.globalData.sessionKey = res.data.sessionKey;
              wx.setStorageSync("openId", app.globalData.openId);
              wx.setStorageSync("sessionKey", app.globalData.sessionKey);
              var uuid = res.data.openId
              wx.request({
                url: getApp().globalData.serverUrl + "/user/" + uuid,
                method: "GET",
                success: function (res) {
                  var id = res.data.info.id;
                  wx.request({
                    url: getApp().globalData.serverUrl + "/user/" + id,
                    method: "PUT",
                    data: {
                      id: id,
                      headSculpture: e.detail.userInfo.avatarUrl
                    },
                    fail: function () {
                      wx.showToast({
                        title: "未知错误",
                        image: "/assets/images/warning.png",
                        duration: 1500
                      });
                    }
                  });
                },
                fail: function () {
                  wx.showToast({
                    title: "未知错误",
                    image: "/assets/images/warning.png",
                    duration: 1500
                  });
                }
              });
            }
          },
          fail: function(res) {
            console.log("http request fail!");
          }
        });
      }
    });

    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.hasUserInfo = true;

      try {
        wx.setStorageSync("userInfo", app.globalData.userInfo);
        wx.setStorageSync("hasUserInfo", app.globalData.hasUserInfo);
        var timeStamp = Date.parse(new Date());
        timeStamp = timeStamp / 1000 + 10 * 60;
        wx.setStorageSync("deadTime", timeStamp);
      } catch (e) {
        console.log("set key error!");
      }
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
    }
  },
  goToHome: function() {
    wx.switchTab({
      url: "../home/home",
    });
  },
})