AFRAME.registerComponent('pointcloud', {
  dependencies: ['material'],

  schema: {
    pts: {type: 'model'},
    stride: {type: 'number', default: 6}
  },

  init: function () {
    this.model = null;
  },

  update: function () {
    var data = this.data;
    if (!data.pts) { return; }
    this.remove();
    this.loadPts(data.pts);
  },

  remove: function () {
    if (!this.model) { return; }
    this.el.removeObject3D('mesh');
  },

  loadPts: function (ptsUrl) {
    var self = this;

    // manually make a horrible request for the json
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        self.createGeo(xhr.response, null);
      } else {
        self.createGeo(null, status);
      }
    };
    xhr.send();
  },

  createGeo: function (pts, status) {
    if(pts == null) {
      console.log(status);
      return;
    }
    var el = this.el;

    // TODO
    var geometry = new THREE.BufferGeometry();

    var normVec = new THREE.Vector();
    var randVec = new THREE.Vector();
    var xVec = new THREE.Vector();
    var yVec = new THREE.Vector();

    // positions and normals
    var npts = pts.length / 6;
    var x, y, z, nx, ny, nz;
    var positions = [];
    var normals = [];
    for(var ptidx = 0; ptidx < npts; ++ptidx) {
      x = pts[ptidx+0];
      y = pts[ptidx+1];
      z = pts[ptidx+2];
      nx = pts[ptidx+3];
      ny = pts[ptidx+4];
      nz = pts[ptidx+5];

      randVec.set(Math.random(), Math.random(), Math.random());
      randVec.normalize();
      normVec.set(nx, ny, nz);
      normVec.normalize();
      xVec.cross(normVec, randVec);
      yVec.cross(xVec, normVec);

      var dtheta = Math.pi * 2.0 / 3.0;
      for(theta = 0; theta < Math.PI * 2.0; theta += dtheta) {
        normals.push(xVec * Math.cos(theta) + yVec * Math.sin(theta));
        positions.push(new THREE.Vector(x, y, z));
      }
    }

    var positions = new Float32Array( [
    	-1.0, -1.0,  1.0,
    	 1.0, -1.0,  1.0,
    	 1.0,  1.0,  1.0,

    	 1.0,  1.0,  1.0,
    	-1.0,  1.0,  1.0,
    	-1.0, -1.0,  1.0
    ] );

    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));

    self.model = ptsModel;
    el.setObject3D('mesh', ptsModel);
    el.emit('model-loaded', {format: 'pts', model: ptsModel});
  }
});
