Page({

  data: {

  },

  onLoad: function(options) {
    var that = this;
    wx.request({
      url: "http://192.168.1.108:8080/chapters/" + options.courseId,
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