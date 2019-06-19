Page({

  data: {

  },

  onLoad: function(options) {
    this.setData({
      old_name: options.old_name,
      new_name: options.old_name,
      id: options.id
    });
  },

  changeName: function(e) {
    this.setData({
      new_name: e.detail.value
    });
  },

  saveName: function() {
    var id = this.data.id;
    var new_name = this.data.new_name;
    wx.request({
      url: "http://192.168.1.108:8080/user/" + id,
      method: "PUT",
      data: {
        id: id,
        nickname: new_name
      },
      success: function() {
        wx.navigateBack({
          delta: 1
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
  }
})