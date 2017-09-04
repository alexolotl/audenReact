const vertexShader =  `precision highp float;

      #define M_PI 3.14159265359

      // Uniforms
      uniform mat4 worldViewProjection;
      uniform float time;
      uniform mat4 world;
      uniform vec3 vEyePosition;

      // Varying
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUV;
      varying vec3 vColor;
      varying vec2 vR;
      varying float vColor0;
      varying vec4 vReflection;
      varying vec2 vUVsphere;
      varying mat4 vModelMatrix;

      void main(void) {
          vModelMatrix = modelMatrix;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vPosition = position;
          vUV = uv;
      }`

export default vertexShader;
