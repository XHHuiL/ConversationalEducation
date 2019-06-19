// pages/change-email/change-email.js
Page({

  data: {

  },

  onLoad: function (options) {
    this.setData({
      old_email: options.old_email,
      new_email: options.old_email,
      id: options.id
    });
  },

  changeEmail: function (e) {
    this.setData({
      new_email: e.detail.value
    });
  },

  saveEmail: function () {
    var id = this.data.id;
    var new_email = this.data.new_email;
    wx.request({
      url: 'http://localhost:8080/user/' + id,
      method: 'PUT',
      data: {
        id: id,
        email: new_email
      },
      success: function () {
        wx.navigateBack({
          delta: 1
        });
      },
      fail: function () {
        wx.showToast({
          title: '未知错误',
          image: "/assets/images/warning.png",
          duration: 2000
        });
      }
    });
  }
})