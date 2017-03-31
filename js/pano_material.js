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

AFRAME.registerShader('pano-warp-magic', {
  schema: {
    src: {type: 'map', is: 'uniform'},
    warpParams: {type: 'vec4', is: 'uniform'}
  },

  vertexShader: [
    'uniform vec4 warpParams;',
    'varying vec3 worldNormal;',
    'varying vec3 worldViewDir;',
    'varying float warpAlpha;',
    'void main(void) {',
    '  vec4 zeroPos = modelMatrix * vec4(0.0, 0.0, 0.0, 1.0);',
    '  float distToZero = length(cameraPosition - zeroPos.xyz);',
    '  warpAlpha = clamp(warpParams.x * distToZero + warpParams.y, 0.0, 1.0);',
    '  vec4 worldPos = modelMatrix * vec4(position, 1.0);',
    '  worldViewDir = worldPos.xyz - cameraPosition;',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '  worldNormal = (modelMatrix * vec4(normal.xyz, 0.0)).xyz;',
    '}'
  ].join('\n'),

  fragmentShader: [
    '#define M_PI 3.1415926535897932384626433832795',
    'uniform sampler2D src;',
    'uniform vec4 warpParams;',
    'varying vec3 worldNormal;',
    'varying vec3 worldViewDir;',
    'varying float warpAlpha;',
    'vec3 panoMap(vec3 vdir) {',
    '  float r = sqrt(vdir.x*vdir.x + vdir.z*vdir.z);',
    '  float theta = atan(vdir.z, vdir.x)/M_PI;',
    '  float phi = atan(vdir.y, r)/M_PI;',
    '  vec2 uv = vec2(theta*0.5 + 0.5, phi + 0.5);',
    '  return texture2D(src, uv).rgb;',
    '}',
    'void main() {',
    '  vec3 nn = normalize(worldNormal);',
    '  vec3 ndir = normalize(worldViewDir);',
    '  vec3 sampleDir = (warpAlpha)*ndir + (1.0 - warpAlpha)*nn;',
    '  gl_FragColor.rgb = panoMap(sampleDir);',
    '  gl_FragColor.a = 1.0;',
    '}'
  ].join('\n')
});
