Page({

  data: {
    readContents: [],
    index: -1,
    length: 0,
    top: -1,
    currentMessage: "",
    messageLength: 0,
    answerModel: false,
    correctOption: 0
  },

  onLoad: function(options) {
    var that = this;
    var storeData = wx.getStorageSync('chapter' + options.chapterId);
    if (storeData) {
      that.setData(storeData);
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
          });
          if (that.data.index >= that.data.messageLength - 1 + that.data.length) {
            that.setData({
              index: that.data.messageLength - 1 + that.data.length
            });
          }
        },
        fail: function() {
          wx.showToast({
            title: '未知错误',
            image: "/assets/images/warning.png",
            duration: 2000
          });
        }
      });
    } else {
      this.setData({
        chapterId: options.chapterId
      });
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
        },
        fail: function() {
          wx.showToast({
            title: '未知错误',
            image: "/assets/images/warning.png",
            duration: 2000
          });
        }
      });
    }
  },

  onUnload: function() {
    wx.setStorageSync('chapter' + this.data.chapterId, this.data);
  },

  message: function(e) {
    this.setData({
      currentMessage: e.detail.value
    });
  },

  nextContent: function(e) {
    if (this.data.answerModel) {
      this.data.index = this.data.index + 1;
      var s = 'readContents[' + this.data.index + ']';
      var prompt = {
        id: 0,
        text: "请发送你的答案",
        type: 4
      };
      this.setData({
        [s]: prompt,
        messageLength: this.data.messageLength + 1,
      });
      this.setData({
        top: 1000 * this.data.index
      });
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
              correctOption: options.correctOption,
              questionId: options.contentId
            });
            that.setData({
              top: 1000 * that.data.index
            });
          },
          fail: function() {
            wx.showToast({
              title: '未知错误',
              image: "/assets/images/warning.png",
              duration: 2000
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
      var text = this.data.currentMessage;
      var messageData = {
        id: 0,
        text: text,
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
      if (this.data.answerModel) {
        var select = 0;
        if (text == "A" || text == "a")
          select = 1;
        else if (text == "B" || text == "b")
          select = 2;
        else if (text == "C" || text == "c")
          select = 3;
        else if (text == "D" || text == "d")
          select = 4;
        if (select == 0) {
          this.data.index = this.data.index + 1;
          var s = 'readContents[' + this.data.index + ']';
          var prompt = {
            id: 0,
            text: "请回答：A / B / C / D",
            type: 4
          };
          this.setData({
            [s]: prompt,
            messageLength: this.data.messageLength + 1,
          });
          this.setData({
            top: 1000 * this.data.index
          });
          return;
        } else {
          this.setData({
            answerModel: false
          });
          this.data.index = this.data.index + 1;
          var s = 'readContents[' + this.data.index + ']';
          var promptMessage = "恭喜你，回答正确";
          if (select != this.data.correctOption)
            promptMessage = "回答错误，正确答案是：" + (string)('A' + this.data.correctOption - 1);
          var prompt = {
            id: 0,
            text: promptMessage,
            type: 4
          };
          this.setData({
            [s]: prompt,
            messageLength: this.data.messageLength + 1,
          });
          this.setData({
            top: 1000 * this.data.index
          });
          var that = this;
          wx.request({
            url: 'http://localhost:8080/answer',
            method: 'POST',
            data: {
              studentId: getApp().globalData.openId,
              contentId: that.data.questionId,
              selectedOption: select
            },
            fail: function() {
              wx.showToast({
                title: '未知错误',
                image: "/assets/images/warning.png",
                duration: 2000
              });
            }
          });
        }
      }
    }
  }
})