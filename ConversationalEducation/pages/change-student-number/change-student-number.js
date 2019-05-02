// pages/change-student-number/change-student-number.js
Page({

  data: {

  },

  onLoad: function (options) {
    this.setData({
      old_student_number: options.old_student_number,
      new_student_number: options.old_student_number
    });
  },

  changeStudentNumber: function (e) {
    this.setData({
      new_student_number: e.detail.value
    });
  },

  saveStudentNumber: function () {
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    var new_student_number = this.data.new_student_number;
    prePage.setData({
      student_number: new_student_number
    });
    wx.navigateBack({
      delta: 1
    });
  }
})