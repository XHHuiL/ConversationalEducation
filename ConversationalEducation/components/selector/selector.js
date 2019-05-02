Component({

  properties: {
    options: {
      type: Array,
    }
  },

  data: {
    selectShow: false,
    currentOption: "所有课程",
  },
  
  methods: {
    selectToggle: function () {
      this.setData({
        selectShow: !this.data.selectShow
      })
    },

    selectOption: function (e) {
      var option = this.properties.options;
      var index = e.target.dataset.index;
      var currentOption = option[index].text;
      this.setData({
        selectShow: false,
        currentOption: currentOption,
      })
    }
  },
})