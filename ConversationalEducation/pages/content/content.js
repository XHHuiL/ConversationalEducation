Page({

  data: {
    readContents: [],
    index: -1,
    length: 0,
    top: -1,
    currentMessage: "",
    messageLength: 0
  },

  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/contents/' + options.chapter_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          teacherHeadSculpture: res.data.headSculpture,
          contents: res.data.contents,
          length: res.data.contents.length,
          image_url: getApp().globalData.userInfo.avatarUrl
        });
      }
    });
  },

  message: function(e) {
    this.setData({
      currentMessage: e.detail.value
    });
  },

  nextContent: function(e) {
    if (this.data.index < this.data.length - 1 + this.data.messageLength) {
      this.data.index = this.data.index + 1;
      var s = 'readContents[' + this.data.index + ']';
      this.setData({
        [s]: this.data.contents[this.data.index - this.data.messageLength]
      });
      this.setData({
        top: 1000 * this.data.index
      });
    }
  },

  postMessage: function(e) {
    if (this.data.currentMessage != "") {
      this.data.index = this.data.index + 1;
      var s = 'readContents[' + this.data.index + ']';
      var messageData = {
        id: 0,
        text: this.data.currentMessage,
        image: this.data.image_url,
        type: 2
      };
      this.setData({
        [s]: messageData,
        messageLength: this.data.messageLength + 1,
        currentMessage: ""
      });
      this.setData({
        top: 1000 * this.data.index
      });
    }
  }


})