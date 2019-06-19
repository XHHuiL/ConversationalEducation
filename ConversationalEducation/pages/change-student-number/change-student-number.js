Page({

  data: {

  },

  onLoad: function(options) {
    this.setData({
      old_student_number: options.old_student_number,
      new_student_number: options.old_student_number,
      id: options.id
    });
  },

  changeStudentNumber: function(e) {
    this.setData({
      new_student_number: e.detail.value
    });
  },

  saveStudentNumber: function() {
    var id = this.data.id;
    var new_student_number = this.data.new_student_number;
    wx.request({
      url: "http://192.168.1.108:8080/user/" + id,
      method: "PUT",
      data: {
        id: id,
        number: new_student_number
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