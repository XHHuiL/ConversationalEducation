Page({

  data: {},

  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/notes/' + getApp().globalData.openId,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if (res) {
          that.setData({
            notes: res.data
          });
        }
      }
    });
  },

  onShow: function(){
    var that = this;
    wx.request({
      url: 'http://localhost:8080/notes/' + getApp().globalData.openId,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res) {
          that.setData({
            notes: res.data
          });
        }
      }
    });
  }
})