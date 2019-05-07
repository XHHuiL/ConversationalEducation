Page({

  data: {

  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:5300/chapter/'+options.course_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          chapters: res.data[0].chapters
        });
      }
    });
  },
})