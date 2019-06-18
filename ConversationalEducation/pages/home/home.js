Page({

  data: {

  },

  onLoad: function (e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/course/all',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          courses: res.data.courses
        });
      }
    });
  },
  allCourses: function(e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/course/all',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          courses: res.data.courses
        });
      }
    });
  },
  selectedCourses: function(e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/course/selected/'+getApp().globalData.openId,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          courses: res.data.courses
        });
      }
    });
  },
  unselectedCourses: function(e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/course/unselected/' + getApp().globalData.openId,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          courses: res.data.courses
        });
      }
    });
  }
})