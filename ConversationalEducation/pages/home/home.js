Page({

  data: {

  },

  onLoad: function (e) {
    var that = this;
    wx.request({
      url: 'http://localhost:5300/courses',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          courses: res.data
        });
      }
    });
  },
  allCourses: function(e) {
    var that = this;
    wx.request({
      url: 'http://localhost:5300/courses',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          courses: res.data
        });
      }
    });
  },
  selectedCourses: function(e) {
    var that = this;
    wx.request({
      url: 'http://localhost:5300/courses/selected/'+getApp().globalData.student_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          courses: res.data[0].courses
        });
      }
    });
  },
  unselectedCourses: function(e) {
    var that = this;
    wx.request({
      url: 'http://localhost:5300/courses/unselected/' + getApp().globalData.student_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          courses: res.data[0].courses
        });
      }
    });
  }
})