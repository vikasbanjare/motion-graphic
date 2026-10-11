// Vertex shader for engravingMaterial.frag.glsl (three.js ShaderMaterial; three injects
// projectionMatrix, modelViewMatrix, normalMatrix, position, normal, uv).
varying vec3 vNormalV;
varying vec3 vPosV;
varying vec3 vPosO;
varying vec2 vUv;
void main(){
  vUv = uv;
  vPosO = position;
  vNormalV = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vPosV = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
