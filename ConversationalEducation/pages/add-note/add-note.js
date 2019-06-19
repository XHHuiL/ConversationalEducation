Page({

  data: {

  },

  onLoad: function(options) {
    this.setData({
      contentText: options.contentText,
      contentId: options.contentId
    });
  },

  changeNote: function(e) {
    this.setData({
      text: e.detail.value
    });
  },

  addNote: function() {
    wx.request({
      url: "http://101.132.190.67:80/note",
      method: "POST",
      data: {
        studentId: getApp().globalData.openId,
        contentId: this.data.contentId,
        text: this.data.text
      },
      success: function(res) {
        var pages = getCurrentPages();
        wx.navigateBack({
          delta: 1
        });
      },
      fail: function() {
        wx.showToast({
          title: "未知错误",
          image: "/assets/images/warning.png",
          duration: 1500
        });
      }
    });
  }
})