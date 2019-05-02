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
        console.log(res);
        that.setData({
          courses: res.data
        });
        console.log(that.data.courses);
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
        console.log(res);
        that.setData({
          courses: res.data
        });
        console.log(that.data.courses);
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
        console.log(res);
        that.setData({
          courses: res.data[0].courses
        });
        console.log(that.data.courses);
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
        console.log(res);
        that.setData({
          courses: res.data[0].courses
        });
        console.log(that.data.courses);
      }
    });
  }
})