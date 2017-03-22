AFRAME.registerComponent('rcwaypoint', {
  schema: {
    triggerrad: {type: 'number', default: 1.0}
  },

  init: function() {
    // make us clickable
    var self = this;
    this.el.addEventListener('click', function (evt) {
      //this.setAttribute('material', 'color', COLORS[randomIndex]);
      var pos = self.el.getAttribute("position");
      var parent = document.querySelector('#camparent');
      parent.setAttribute("position", {x: pos.x, y: 0.0, z: pos.z});
    });
  },

  update: function() {
    // nothing to do
  }
});
