Page({

  data: {

  },

  onLoad: function (options) {
    this.setData({
      old_note: options.old_note,
      new_note: options.old_note,
      content: options.content,
      index: options.index,
      id: options.id
    });
  },

  changeNote: function (e) {
    this.setData({
      new_note: e.detail.value
    });
  },

  saveNote: function () {
    var noteId = this.data.id;
    var new_note = this.data.new_note;
    wx.request({
      url: 'http://localhost:8080/note/'+noteId,
      method: 'PUT',
      data: {
        id: noteId,
        text: new_note
      },
      success: function () {
        wx.navigateBack({
          delta: 1
        });
      },
      fail: function () {
        wx.showToast({
          title: '未知错误',
          image: "/assets/images/warning.png",
          duration: 2000
        });
      }
    });
  }, 

  showModal(e) {
    this.setData({
      noteId: e.currentTarget.dataset.id
    });
  },

  hideModal(e) {
    this.setData({
      noteId: null
    });
  },

  deleteNote: function(){
    var that = this;
    var noteId = this.data.id;
    wx.request({
      url: 'http://localhost:8080/note/' + noteId,
      method: 'DELETE',
      success: function(){
        that.setData({
          noteId: null
        });
        wx.navigateBack({
          delta: 1
        });
      },
      fail: function () {
        console.log("http request fail!");
        that.setData({
          noteId: null
        });
        wx.navigateBack({
          delta: 1
        });
      }
    });
  },
})