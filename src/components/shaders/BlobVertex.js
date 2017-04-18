const vertexShader =  `precision highp float;

      #define M_PI 3.14159265359

      // Uniforms
      uniform mat4 worldViewProjection;
      uniform float time;
      uniform vec2 mouse;
      uniform vec3 pickPoint;
      uniform float gravityScale;
      uniform vec2 resolution;
      uniform mat4 world;
      uniform vec3 vEyePosition;
      uniform float time1;
      uniform float time2;
      uniform float time3;
      uniform float time4;
      uniform float mousePull;
      uniform float mousePullWidth;
      uniform float displace;
      uniform float scale1;
      uniform float scale2;
      uniform float scale3;
      uniform float scale4;
      uniform float scale5;
      uniform float scale6;
      uniform float scale7;
      uniform float scale8;
      uniform float scale9;
      uniform float size;
      uniform float reflection;
      uniform float detail;
      uniform float octaves;
      uniform float u_bump;

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





      mat4 rotationMatrix(vec3 axis, float angle)
      {
          axis = normalize(axis);
          float s = sin(angle);
          float c = cos(angle);
          float oc = 1.0 - c;

          return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                      oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                      oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                      0.0,                                0.0,                                0.0,                                1.0);
      }

      float interpolate(float val) {
        return pow(abs(sin(M_PI * val / 2.0)),2.);
      }


      mat2 rotate2d(in float _angle) {
          return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
      }

      vec3 rotateValue(vec3 inVal, vec3 inNorm, float angle) {
        return (rotationMatrix(inNorm, angle)*vec4(inVal,1.0)).xyz;
      }



      vec3 W(vec3 p){

          p = (p+3.)*4.;

          float t = time/3.*time1;

          for (int i=0; i<3; i++){
              p += cos( p.yzx*3. + vec3(t,1.,1.57))/3.;
              p += sin( p.yzx + t + vec3(1.57,t,1.))/2.;
              p *= 1.3;
          }
          vec3 f = mod(p,2.)/2.;
          vec3 u = f * f * (3.0 - 2.0 * f );
          return mix(2.*u-1., mod(p,2.)-1., detail);

      }

      #define NUM_OCTAVES 2

      float fbm(vec3 x) {
          float v = 0.0;
          float a = 0.5;
          vec3 shift = vec3(100.);
          for (int i = 0; i < NUM_OCTAVES; ++i) {
              v += a * length(W(x));
              x = x * 2.0 + shift;
              a *= 0.5;
          }
          return v;
      }
      vec3 normVal; // storing this globally to compute bump accentuation

      vec3 parametric(float newu, float newv, float mousePullWidth, float mousePullHeight) {
            vec3 newValue;

            newValue.x = sin(newu)*cos(newv);
            newValue.y = sin(newu)*sin(newv);
            newValue.z = cos(newu);

            newValue*=size/2.;
            normVal = normalize(newValue);

            newValue += scale1*(.25*vec3(sin(time2*time/2.),sin(time2*time/3.),2.*sin(time2*time/2.5))+0.15*vec3(sin(time/6.),sin(time/5.),2.*sin(time/4.)));

            vec2 screen = mouse/resolution * 2.0 - 1.0;

            float displaceX = scale9/10.*length(W(scale8*newValue/14.));
            vec3 displaced = vec3(displaceX);
            //displaced += 0.05*sin(time/2. + newValue.y*1.5);
            newValue += normVal * displaced;

            vColor = vec3(displaceX);

            // ROTATIONS
            newValue = ( rotationMatrix(vec3(1.0,0.0,0.0), screen.y/1.5*scale2)*vec4(newValue,1.0) ).xyz;
            newValue = ( rotationMatrix(vec3(0.0,1.0,0.0), screen.x/1.5*scale2)*vec4(newValue,1.0) ).xyz;

            //newValue += normVal*(mousePullHeight+displaced)*interpolate(max(0., (mousePullWidth-distance(pickPoint,newValue))/mousePullWidth));

            return newValue;

          }



      void main(void) {

          float mousePullHeight = mousePull;
          vec3 v = position;
          vUV.x = uv.x * M_PI; // the 0.01 helps fill in hole, the mod rotates it
          vUV.y = uv.y * M_PI*2.0;
          vec3 newPosition = parametric(vUV.x, vUV.y, mousePullWidth, mousePullHeight);
          float smallvalue = 0.01;
          vec3 neighbor1 = parametric(vUV.x+smallvalue, vUV.y, mousePullWidth, mousePullHeight);
          vec3 neighbor2 = parametric(vUV.x, vUV.y+smallvalue, mousePullWidth, mousePullHeight);
          vec3 tangent = neighbor1 - newPosition;
          vec3 bitangent = neighbor2 - newPosition;

          vNormal = normalize(cross(tangent, bitangent));

          // ALTERNATIVE the rotation difference between original normal and new normal, to accentuate bump
          vec3 normOrig = normVal;
          float normAngle = acos(dot(vNormal, normOrig));
          vec3 crossed = normalize(cross(vNormal, normOrig));
          vNormal = rotateValue(normOrig, crossed, normAngle*u_bump);

          vReflection = reflect(-normalize(modelMatrix*vec4(newPosition,1.0) - vec4(vEyePosition,1.0)), vec4(vNormal,0.0));
          vModelMatrix = modelMatrix;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          vPosition = newPosition;
      }`

export default vertexShader;
