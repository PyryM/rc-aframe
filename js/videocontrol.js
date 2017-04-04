AFRAME.registerComponent('videocontrol', {
  schema: {
    radius: {type: 'number', default: 1.0},
    src:  {type: 'selector'}
  },

  init: function() {
    this.triggerpos = new THREE.Vector3();
    this.videoState = "unknown";
  },

  update: function() {
    var temppos = this.el.getAttribute('position');
    this.triggerpos.set(temppos.x, temppos.y, temppos.z);
  },

  tick: function() {
    var scene = document.querySelector('a-scene');
    var campos = scene.camera.getWorldPosition();

    if(campos.distanceTo(this.triggerpos) < this.data.radius) {
      this.startPlaying();
    } else {
      this.stopPlaying();
    }
  },

  startPlaying: function() {
    if(this.videoState == "playing") {
      return;
    }
    this.data.src.play();
    this.videoState = "playing";
  },

  stopPlaying: function() {
    if(this.videoState == "stopped") {
      return;
    }
    this.data.src.pause();
    this.videoState = "stopped";
  }
});
