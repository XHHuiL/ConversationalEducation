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
      url: 'http://localhost:5300/content/' + options.chapter_id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          contents: res.data[0].contents,
          length: res.data[0].contents.length,
          image_url: getApp().globalData.userInfo.avatarUrl
        });
      }
    });
  },

  onclick: function(e) {
    var that = this;
    that.setData({
      item_text: e.currentTarget.dataset.content,
    })

    wx.navigateTo({
      url: '../../pages/add-note/add-note?content=' + that.data.item_text,
    })

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