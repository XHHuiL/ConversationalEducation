// pages/change-email/change-email.js
Page({

  data: {

  },

  onLoad: function (options) {
    this.setData({
      old_email: options.old_email,
      new_email: options.old_email
    });
  },

  changeEmail: function (e) {
    this.setData({
      new_email: e.detail.value
    });
  },

  saveEmail: function () {
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    var new_email = this.data.new_email;
    prePage.setData({
      email: new_email
    });
    wx.navigateBack({
      delta: 1
    });
  }
})