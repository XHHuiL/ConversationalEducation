Page({

  data: {
    readContents: [],
    index: -1,
    length: 0,
    top: -1,
    currentMessage: "",
    messageLength: 0,
    answerModel: false
  },

  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/contents/' + options.chapterId,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
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
    if(this.data.answerModel){
      return;
    }
    if (this.data.index < this.data.length - 1 + this.data.messageLength) {
      this.data.index = this.data.index + 1;
      var s = 'readContents[' + this.data.index + ']';
      var content = this.data.contents[this.data.index - this.data.messageLength];
      this.setData({
        [s]: content
      });
      this.setData({
        top: 1000 * this.data.index
      });
      if (content.type == 2) {
        this.setData({
          answerModel: true
        });
        var that = this;
        wx.request({
          url: 'http://localhost:8080/options/' + content.id,
          headers: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
            that.data.index = that.data.index + 1;
            var s = 'readContents[' + that.data.index + ']';
            var options = res.data;
            that.setData({
              [s]: options,
              messageLength: that.data.messageLength + 1,
            });
            that.setData({
              top: 1000 * that.data.index
            });
          }
        });
      }
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
        type: 0
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