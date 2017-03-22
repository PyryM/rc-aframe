AFRAME.registerShader('pano-shader-magic', {
  schema: {
    src: {type: 'map', is: 'uniform'}
  },

  vertexShader: [
    'varying vec2 vUV;',
    'varying vec3 worldViewDir;',
    'void main(void) {',
    '  vec4 worldPos = modelMatrix * vec4(position, 1.0);',
    '  worldViewDir = worldPos.xyz - cameraPosition;',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '  vUV = uv;',
    '}'
  ].join('\n'),

  fragmentShader: [
    '#define M_PI 3.1415926535897932384626433832795',
    'uniform sampler2D src;',
    'varying vec2 vUV;',
    'varying vec3 worldViewDir;',
    'vec3 panoMap(vec3 vdir) {',
    '  float r = sqrt(vdir.x*vdir.x + vdir.z*vdir.z);',
    '  float theta = atan(vdir.z, vdir.x)/M_PI;',
    '  float phi = atan(vdir.y, r)/M_PI;',
    '  vec2 uv = vec2(theta*0.5 + 0.5, phi + 0.5);',
    '  return texture2D(src, uv).rgb;',
    '}',
    'void main() {',
    '  vec3 ndir = normalize(worldViewDir);',
    '  gl_FragColor.rgb = panoMap(ndir);',
    '  gl_FragColor.a = 1.0;',
    '}'
  ].join('\n')
});
