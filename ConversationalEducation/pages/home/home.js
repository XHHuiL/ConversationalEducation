Page({

  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: "image",
      url: "http://adweb-image.oss-cn-shanghai.aliyuncs.com/swiper1.jpg"
    }, {
      id: 1,
      type: "image",
      url: "http://adweb-image.oss-cn-shanghai.aliyuncs.com/swiper2.jpg"
    }, {
      id: 2,
      type: "image",
      url: "http://adweb-image.oss-cn-shanghai.aliyuncs.com/swiper3.jpg"
    }, {
      id: 3,
      type: "image",
      url: "http://adweb-image.oss-cn-shanghai.aliyuncs.com/swiper4.jpg"
    }, {
      id: 4,
      type: "image",
      url: "http://adweb-image.oss-cn-shanghai.aliyuncs.com/swiper5.jpg"
    }, {
      id: 5,
      type: "image",
      url: "http://adweb-image.oss-cn-shanghai.aliyuncs.com/swiper6.jpg"
    }, {
      id: 6,
      type: "image",
      url: "http://adweb-image.oss-cn-shanghai.aliyuncs.com/swiper7.jpg"
    }]
  },

  onLoad: function(e) {
    var that = this;
    wx.request({
      url: "http://101.132.190.67:80/course/all",
      headers: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        that.setData({
          courses: res.data.courses
        });
      },
      fail: function(res) {
        wx.showToast({
          title: "未知错误",
          image: "/assets/images/warning.png",
          duration: 2000
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
      url: "http://101.132.190.67:80/course/take",
      method: "POST",
      data: {
        userId: getApp().globalData.openId,
        courseId: that.data.courseId,
      },
      success: function(res) {
        if (res.data.code != "ok") {
          wx.showToast({
            title: "选课失败",
            image: "/assets/images/warning.png",
            duration: 2000
          });
        } else {
          wx.showToast({
            title: "选课成功",
            duration: 2000
          });
        }
        that.setData({
          courseId: null,
        });
      },
      fail: function() {
        wx.showToast({
          title: "未知错误",
          image: "/assets/images/warning.png",
          duration: 2000
        });
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
})