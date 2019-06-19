Page({

  data: {

  },

  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/course/selected/' + getApp().globalData.openId,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        that.setData({
          courses: res.data.courses
        });
      }
    });
  },

  onShow: function() { 
    var that = this;
    wx.request({
      url: 'http://localhost:8080/course/selected/' + getApp().globalData.openId,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        that.setData({
          courses: res.data.courses
        });
      }
    });
  },

  onClick: function(e) {
    var courseId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../chapter/chapter?courseId=' + courseId,
    });
  },

  showModal(e) {
    this.setData({
      courseId: e.currentTarget.dataset.id
    });
  },

  hideModal(e) {
    this.setData({
      courseId: null
    });
  },

  dropCourse: function(e) {
    var courseId = this.data.courseId;
    var that = this;
    wx.request({
      url: 'http://localhost:8080/course/drop',
      method: 'DELETE',
      data: {
        userId: getApp().globalData.openId,
        courseId: courseId,
      },
      success: function() {
        wx.request({
          url: 'http://localhost:8080/course/selected/' + getApp().globalData.openId,
          headers: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            that.setData({
              courses: res.data.courses,
              courseId: null
            });
          }
        });
      },
      fail: function() {
        console.log("http request fail!");
      }
    });
  }
})