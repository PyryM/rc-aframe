AFRAME.registerComponent('rcexitbutton', {
  schema: {
    type: "string"
  },

  init: function() {
    // make us clickable
    var self = this;
    this.el.addEventListener('click', function (evt) {
      //this.setAttribute('material', 'color', COLORS[randomIndex]);
      var parent = document.querySelector('#camparent');
      console.log("Teleporting to: " + self.data);
      var t_w = document.querySelector('#' + self.data);
      var tpos = t_w.getAttribute("position");
      parent.setAttribute("position", tpos);
    });
  },

  update: function() {
    // nothing to do
  }
});
