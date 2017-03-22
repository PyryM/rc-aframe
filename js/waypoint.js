AFRAME.registerComponent('rcwaypoint', {
  schema: {
    type: 'vec3',
    default: {x: 0.0, y: 0.0, z: 0.0}
  },

  init: function() {
    // make us clickable
    var self = this;
    this.el.addEventListener('click', function (evt) {
      //this.setAttribute('material', 'color', COLORS[randomIndex]);
      var pos = self.el.getAttribute("position");
      var parent = document.querySelector('#camparent');
      //parent.setAttribute("position", {x: pos.x, y: 0.0, z: pos.z});
      parent.setAttribute("position", self.data);
    });
  },

  update: function() {
    // nothing to do
  }
});
