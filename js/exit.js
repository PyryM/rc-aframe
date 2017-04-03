AFRAME.registerComponent('rcexitbutton', {
  schema: {
    teleport_waypoint: {type: "string"}
  },

  init: function() {
    // make us clickable
    var self = this;
    this.el.addEventListener('click', function (evt) {
      //this.setAttribute('material', 'color', COLORS[randomIndex]);
      var pos = self.el.getAttribute("position");
      var parent = document.querySelector('#camparent');
      var t_w = document.querySelector('#' + self.data.teleport_waypoint);
      var tpos = t_w.getAttribute("position");
      parent.setAttribute("position", {x: tpos.x, y: 0.0, z: tpos.z});
    });
  },

  update: function() {
    // nothing to do
  }
});
