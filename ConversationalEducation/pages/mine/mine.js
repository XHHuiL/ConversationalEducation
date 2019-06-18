// pages/mine/mine.js
Page({

  data: {},

  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/user/' + getApp().globalData.openId,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
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
      url: 'http://localhost:8080/user/' + getApp().globalData.openId,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
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
      }
    });
  },

  showDialog: function() {
    this.setData({
      showModal: true
    });
  },

  preventTouchMove: function() {

  },

  hideModal: function() {
    this.setData({
      showModal: false
    });
  },

  male: function() {
    this.hideModal();
    this.setData({
      sex: "男"
    });
    var id = this.data.info.id;
    console.log(id);
    wx.request({
      url: 'http://localhost:8080/user/' + id,
      method: 'PUT',
      data: {
        id: id,
        sex: 1
      },
      fail: function () {
        console.log("http request fail!");
      }
    });
  },

  female: function() {
    this.hideModal();
    this.setData({
      sex: "女"
    });
    var id = this.data.info.id;
    console.log(id);
    wx.request({
      url: 'http://localhost:8080/user/' + id,
      method: 'PUT',
      data: {
        id: id,
        sex: 0
      },
      fail: function () {
        console.log("http request fail!");
      }
    });
  }
})