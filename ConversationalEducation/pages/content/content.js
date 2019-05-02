Page({

  data: {

  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:5300/content/' + options.chapter_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          contents: res.data[0].contents
        });
        console.log(that.data.contents);
      }
    });
  }
})