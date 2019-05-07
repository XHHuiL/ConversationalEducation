Page({

  data: {
  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:5300/notes/' + getApp().globalData.student_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if(res){
          that.setData({
            notes: res.data[0].notes
          });
        }
      }
    });
  }
})