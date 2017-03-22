AFRAME.registerComponent('rccolorchanger', {
  schema: {
    triggerrad: {type: 'number', default: 1.0}
  },

  init: function() {
    this.triggerpos = new THREE.Vector3();
  },

  update: function() {
    var temppos = this.el.getAttribute('position');
    this.triggerpos.set(temppos.x, temppos.y, temppos.z);
  },

  tick: function() {
    var sky = document.querySelector('#sky');
    var scene = document.querySelector('a-scene');
    var campos = scene.camera.getWorldPosition();

    if(campos.distanceTo(this.triggerpos) < this.data.triggerrad) {
      sky.setAttribute('color', this.el.getAttribute('color'));
    }
  }
});
