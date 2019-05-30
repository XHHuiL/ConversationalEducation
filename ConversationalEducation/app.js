App({
  globalData: {
    userInfo: null,
    hasUserInfo: false,
    student_id: 1
  },

  onLaunch: function() {
    // 登录
    wx.login({
      success: res => {
        var code = res.code;
        if (code) {
          wx.getUserInfo({
            success: function(r) {
              wx.request({
                url: 'http://localhost:8080/user/authenticate',
                method: 'POST',
                data: {
                  encryptedData: r.encryptedData,
                  iv: r.iv,
                  code: code
                },
                success: function(res) {
                  console.log(res.data);
                },
                fail: function() {
                  console.log("http request fail!");
                }
              });
            },
            fail: function() {
              console.log("get user information fail!");
            }
          });
        }
      }
    });
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: res => {
    //           this.globalData.userInfo = res.userInfo
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res);
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  }
})