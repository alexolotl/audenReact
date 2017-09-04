const fragShader =  `precision highp float;
          #define M_PI 3.14159265359

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

          // Uniforms
          uniform mat4 world;
          uniform float time;
          uniform vec2 mouse;
          uniform vec2 resolution;

          // Refs
          uniform sampler2D textureSampler;

          mat2 rotate2d(in float _angle) {
              return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
          }

          void main(void) {
            vec2 st = vUV;

            st.x += .003*sin(st.y*8.+4.*time) - .001*sin(st.y*6. + time);
            st.y += .04*sin(vUV.x*24. + 4.*time);

            st = mix(vUV, st, mouse);

            vec4 texcolor = texture2D(textureSampler, st);
            gl_FragColor = texcolor;
          }`

export default fragShader;
