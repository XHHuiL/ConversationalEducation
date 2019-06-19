Page({

  data: {},

  onLoad: function(options) {
    var that = this;
    wx.request({
      url: "http://192.168.1.108:8080/user/" + getApp().globalData.openId,
      headers: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        if (res) {
          that.setData({
            info: res.data.info
          });
          var sex = "女";
          if (that.data.info.sex == 1 || that.data.info.sex == null) {
            sex = "男";
          }
          that.setData({
            sex: sex
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: "未知错误",
          image: "/assets/images/warning.png",
          duration: 1500
        });
      }
    });
    var globalData = getApp().globalData.userInfo;
    this.setData({
      image_url: globalData.avatarUrl
    });
  },

  onShow: function() {
    var that = this;
    wx.request({
      url: "http://192.168.1.108:8080/user/" + getApp().globalData.openId,
      headers: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        if (res) {
          that.setData({
            info: res.data.info
          });
          var sex = "女";
          if (that.data.info.sex == 1 || that.data.info.sex == null) {
            sex = "男";
          }
          that.setData({
            sex: sex
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: "未知错误",
          image: "/assets/images/warning.png",
          duration: 1500
        });
      }
    });
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    });
  },
  hideModal(e) {
    this.setData({
      modalName: null
    });
  },

  male: function() {
    var that = this;
    var id = this.data.info.id;
    wx.request({
      url: "http://192.168.1.108:8080/user/" + id,
      method: "PUT",
      data: {
        id: id,
        sex: 1
      },
      success: function() {
        that.hideModal();
        that.setData({
          sex: "男"
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

  female: function() {
    var that = this;
    var id = this.data.info.id;
    wx.request({
      url: "http://192.168.1.108:8080/user/" + id,
      method: "PUT",
      data: {
        id: id,
        sex: 0
      },
      success: function() {
        that.hideModal();
        that.setData({
          sex: "女"
        });
      },
      fail: function() {
        wx.showToast({
          title: "未知错误",
          image: "/assets/images/warning.png",
          duration: 1500
        });
      }
    });
  }
})