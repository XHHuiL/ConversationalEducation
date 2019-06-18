Page({

  data: {

  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/chapters/'+options.course_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          chapters: res.data
        });
      }
    });
  },
})