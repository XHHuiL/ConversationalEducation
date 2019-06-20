Page({

  data: {},

  onLoad: function(options) {
    var that = this;
    wx.request({
      url: "http://101.132.190.67:80/notes/" + getApp().globalData.openId,
      headers: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        if (res) {
          that.setData({
            notes: res.data
          });
        }
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

  onClick: function(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.notes[index];
    wx.navigateTo({
      url: "../change-note/change-note?old_note=" + item.text + "&content=" + item.contentText + "&index=" + index + "&id=" + item.id
    })
  },

  onShow: function() {
    var that = this;
    wx.request({
      url: "http://101.132.190.67:80/notes/" + getApp().globalData.openId,
      headers: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        if (res) {
          that.setData({
            notes: res.data
          });
        }
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
})