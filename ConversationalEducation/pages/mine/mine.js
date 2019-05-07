// pages/mine/mine.js
Page({

  data: {
    email: "123456789@qq.com",
    student_number: 16302010048
  },

  onLoad: function (options) {
    var globalData = getApp().globalData.userInfo;
    var sex = "女";
    if(globalData.gender == 1){
      sex = "男";
    }
    this.setData({
      name: globalData.nickName,
      sex: sex,
      image_url: globalData.avatarUrl
    });
  },

  showDialog: function() {
    this.setData({
      showModal: true
    });
  },

  preventTouchMove: function(){

  },

  hideModal: function () {
    this.setData({
      showModal: false
    });
  },

  male: function () {    
    this.hideModal();
    // 需要调用setData()函数才能动态改变页面上的内容
    // 直接执行this.data.sex="男"不会改变页面上的内容
    this.setData({
      sex: "男"
    });
  },

  female: function () {
    this.hideModal();
    this.setData({
      sex: "女"
    });
  }
})