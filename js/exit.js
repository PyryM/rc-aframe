AFRAME.registerComponent('rcexitbutton', {
  schema: {
    type: "selector"
  },

  init: function() {
    // make us clickable
    var self = this;
    this.el.addEventListener('click', function (evt) {
      //this.setAttribute('material', 'color', COLORS[randomIndex]);
      var parent = document.querySelector('#camparent');
      console.log("Teleporting to: " + self.data);
      var pos = self.data.getAttribute("position");
      if(parent.components.walker) {
        parent.components.walker.unlock();
        parent.components.walker.walk_to(pos);
      } else {
        parent.setAttribute("position", pos);
      }
    });
  },

  update: function() {
    // nothing to do
  }
});

// AFRAME.registerComponent('ezexit', {
//   schema: {
//     type: "vec3", default: {x: 1.0, y: 0.0, z: 0.0}
//   },
//
//   init: function() {
//     // make us clickable
//     var self = this;
//     this.el.addEventListener('click', function (evt) {
//       //this.setAttribute('material', 'color', COLORS[randomIndex]);
//       var parent = document.querySelector('#camparent');
//       var prevpos = parent.getAttribute("position");
//       var newpos = {x: prevpos.x + self.data.x,
//                     y: prevpos.y + self.data.y,
//                     z: prevpos.z + self.data.z};
//       console.log("Teleporting to: " + self.data);
//       var pos = self.data.getAttribute("position");
//       if(parent.components.walker) {
//         parent.components.walker.walk_to(pos);
//       } else {
//         parent.setAttribute("position", pos);
//       }
//     });
//   },
//
//   update: function() {
//     // nothing to do
//   }
// });
