Page({

  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'http://adweb-image.oss-cn-shanghai.aliyuncs.com/swiper1.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'http://adweb-image.oss-cn-shanghai.aliyuncs.com/swiper2.jpg',
    }, {
      id: 2,
      type: 'image',
        url: 'http://adweb-image.oss-cn-shanghai.aliyuncs.com/swiper3.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'http://adweb-image.oss-cn-shanghai.aliyuncs.com/swiper4.jpg'
    }, {
      id: 4,
      type: 'image',
        url: 'http://adweb-image.oss-cn-shanghai.aliyuncs.com/swiper5.jpg'
    }, {
      id: 5,
      type: 'image',
        url: 'http://adweb-image.oss-cn-shanghai.aliyuncs.com/swiper6.jpg'
    }, {
      id: 6,
      type: 'image',
        url: 'http://adweb-image.oss-cn-shanghai.aliyuncs.com/swiper7.jpg'
    }],
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

  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  takeCourse: function(e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/course/take',
      method: 'POST',
      data: {
        userId: getApp().globalData.openId,
        courseId: that.data.courseId,
      },
      success: function() {
        that.setData({
          courseId: null
        });
      },
      fail: function () {
        console.log("http request fail!");
      }
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
})