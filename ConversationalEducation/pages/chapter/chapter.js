Page({

  data: {

  },

  onLoad: function (options) { 
    var that = this;
    wx.request({
      url: 'http://localhost:8080/chapters/'+options.courseId,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          chapters: res.data
        });
      }
    });
  },

  onClick: function(e){
    var chapterId = e.currentTarget.dataset.id; 
    wx.navigateTo({
      url: '../content/content?chapterId=' + chapterId,
    });
  },
})