Page({

  data: {

  },

  onLoad: function (options) {
    this.setData({
      old_note: options.old_note,
      new_note: options.old_note,
      content: options.content,
      index: options.index
    });
  },

  changeNote: function (e) {
    this.setData({
      new_note: e.detail.value
    });
  },

  saveNote: function () {
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    var new_note = this.data.new_note;
    var s = 'notes['+this.data.index+'].text';
    prePage.setData({
      [s]: new_note
    });
    wx.navigateBack({
      delta: 1
    });
  }
})