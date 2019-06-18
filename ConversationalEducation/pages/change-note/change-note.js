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
        console.log("http request fail!");
        wx.navigateBack({
          delta: 1
        });
      }
    });
  },

  deleteNote: function(){
    var noteId = this.data.id;
    wx.request({
      url: 'http://localhost:8080/note/' + noteId,
      method: 'DELETE',
      success: function(){
        wx.navigateBack({
          delta: 1
        });
      },
      fail: function () {
        console.log("http request fail!");
        wx.navigateBack({
          delta: 1
        });
      }
    });
  },
})