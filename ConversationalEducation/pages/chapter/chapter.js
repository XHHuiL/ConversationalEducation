Page({

  data: {

  },

  onLoad: function(options) {
    var that = this;
    wx.request({
      url: getApp().globalData.serverUrl + "/chapters/" + options.courseId,
      headers: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        that.setData({
          chapters: res.data
        });
      },
      fail: function() {
        wx.showToast({
          title: "未知错误",
          image: "/assets/images/warning.png",
          duration: 2000
        });
      }
    });
  },

  onClick: function(e) {
    var chapterId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../content/content?chapterId=" + chapterId,
    });
  },
})