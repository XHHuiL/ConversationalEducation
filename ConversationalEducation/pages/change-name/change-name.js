// pages/change-name/change-name.js
Page({

  data: {

  },

  onLoad: function (options) {
    this.setData({
      old_name: options.old_name,
      new_name: options.old_name
    });
  },

  changeName: function(e) {
    this.setData({
      new_name: e.detail.value
    });
  },

  saveName: function(){
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    var new_name = this.data.new_name;
    prePage.setData({
      name: new_name
    });
    wx.navigateBack({
      delta: 1
    });
  }
})