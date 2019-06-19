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
      },
      fail: function(){
        wx.showToast({
          title: '未知错误',
          image: "/assets/images/warning.png",
          duration: 2000
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
      },
      fail: function(){
        wx.showToast({
          title: '未知错误',
          image: "/assets/images/warning.png",
          duration: 2000
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
        wx.showToast({
          title: '退课成功',
          duration: 2000
        });
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
        wx.showToast({
          title: '未知错误',
          image: "/assets/images/warning.png",
          duration: 2000
        });
      }
    });
  }
})