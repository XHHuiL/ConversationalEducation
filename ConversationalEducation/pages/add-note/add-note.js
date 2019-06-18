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
      url: 'http://localhost:8080/note',
      method: 'POST',
      data: {
        studentId: getApp().globalData.openId,
        contentId: this.data.contentId,
        text: this.data.text
      },
      fail: function() {
        console.log("http request fail!");
      }
    });
    var pages = getCurrentPages();
    wx.navigateBack({
      delta: 1
    });
  }
})