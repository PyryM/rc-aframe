AFRAME.registerComponent('videocontrol', {
  schema: {
    radius: {type: 'number', default: 1.0},
    src:    {type: 'selector'},
    pos:    {type: 'vec3'},
    hide:   {type: 'boolean', default: true}
  },

  init: function() {
    this.triggerpos = new THREE.Vector3();
    this.videoState = "unknown";

    // var camparent = document.querySelector("#camparent");
  },

  update: function() {
    var temppos = this.data.pos || this.el.getAttribute('position');
    this.triggerpos.set(temppos.x, temppos.y, temppos.z);
  },

  tick: function() {
    var scene = document.querySelector('a-scene');
    var campos = scene.camera.getWorldPosition();

    if(campos.distanceTo(this.triggerpos) < this.data.radius) {
      this.startPlaying(campos);
    } else {
      this.stopPlaying(campos);
    }
  },

  startPlaying: function(campos) {
    if(this.videoState == "playing") {
      return;
    }
    this.data.src.play();
    this.videoState = "playing";
    this.el.setAttribute("visible", true);
  },

  stopPlaying: function(campos) {
    if(this.videoState == "stopped") {
      return;
    }
    this.data.src.pause();
    this.videoState = "stopped";
    if(this.data.hide) {
      this.el.setAttribute("visible", false);
    }
  }
});
