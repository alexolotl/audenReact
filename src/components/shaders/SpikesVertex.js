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



      //	Simplex 4D Noise
      //	by Ian McEwan, Ashima Arts
      //
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      float permute(float x){return floor(mod(((x*34.0)+1.0)*x, 289.0));}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      float taylorInvSqrt(float r){return 1.79284291400159 - 0.85373472095314 * r;}

      vec4 grad4(float j, vec4 ip){
        const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
        vec4 p,s;

        p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
        p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
        s = vec4(lessThan(p, vec4(0.0)));
        p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;

        return p;
      }

      float snoise(vec4 v){
        const vec2  C = vec2( 0.138196601125010504,  // (5 - sqrt(5))/20  G4
                              0.309016994374947451); // (sqrt(5) - 1)/4   F4
      // First corner
        vec4 i  = floor(v + dot(v, C.yyyy) );
        vec4 x0 = v -   i + dot(i, C.xxxx);

      // Other corners

      // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
        vec4 i0;

        vec3 isX = step( x0.yzw, x0.xxx );
        vec3 isYZ = step( x0.zww, x0.yyz );
      //  i0.x = dot( isX, vec3( 1.0 ) );
        i0.x = isX.x + isX.y + isX.z;
        i0.yzw = 1.0 - isX;

      //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
        i0.y += isYZ.x + isYZ.y;
        i0.zw += 1.0 - isYZ.xy;

        i0.z += isYZ.z;
        i0.w += 1.0 - isYZ.z;

        // i0 now contains the unique values 0,1,2,3 in each channel
        vec4 i3 = clamp( i0, 0.0, 1.0 );
        vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
        vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

        //  x0 = x0 - 0.0 + 0.0 * C
        vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
        vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
        vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
        vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;

      // Permutations
        i = mod(i, 289.0);
        float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
        vec4 j1 = permute( permute( permute( permute (
                   i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
                 + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
                 + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
                 + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
      // Gradients
      // ( 7*7*6 points uniformly over a cube, mapped onto a 4-octahedron.)
      // 7*7*6 = 294, which is close to the ring size 17*17 = 289.

        vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

        vec4 p0 = grad4(j0,   ip);
        vec4 p1 = grad4(j1.x, ip);
        vec4 p2 = grad4(j1.y, ip);
        vec4 p3 = grad4(j1.z, ip);
        vec4 p4 = grad4(j1.w, ip);

      // Normalise gradients
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        p4 *= taylorInvSqrt(dot(p4,p4));

      // Mix contributions from the five corners
        vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
        vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
        m0 = m0 * m0;
        m1 = m1 * m1;
        return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
                     + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;

      }


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
            newValue*=scale5*.75;
            normVal = normalize(newValue);

            vec2 screen = mouse/resolution * 2.0 - 1.0;

            //float displaceX = scale9/10.*length(W(scale8*newValue/14.));
            //vec3 displaced = vec3(displaceX);

            //float displaceX = pow(sin(newv * 8. + sin(newu*12.)), 4.) * pow(sin(newu * 8.), 4.);

            float displaceX = pow(snoise(vec4(newValue*1.5 + vec3(sin(time+newValue.x), cos(time*.8 + newValue.z), sin(time* .7 + newValue.y/3.)), time)), 3.); // density
            vec3 displaced = vec3(displaceX);

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
