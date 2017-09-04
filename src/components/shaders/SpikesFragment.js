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
          uniform float specularLight;
          uniform float reflection;
          uniform float scale6;
          uniform float scale3;

          // Refs
          uniform sampler2D textureSampler;
          uniform vec3 pickPoint;

          mat2 rotate2d(in float _angle) {
              return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
          }

          void main(void) {
              vec3 vLightPosition = vec3(10,20,20);
              //vLightPosition = vec3(8.0,2.0*pickPoint.yz);
              vLightPosition = vec3(6.0,3.0,4.0);
              vLightPosition = vec3(0.,5.,0.);
              vLightPosition = vec3(3.,5.,6.);

              // World values
              vec3 vPositionW = vec3(vModelMatrix * vec4(vPosition, 1.0));
              vec3 vNormalW = normalize(vec3(vModelMatrix * vec4(vNormal, 0.0)));
              vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

              // Light
              vec3 lightVectorW = normalize(vLightPosition - vPositionW);
              vec3 color = texture2D(textureSampler, vUV).rgb;
              color = texture2D(textureSampler, mix(vUV/vec2(M_PI,2.*M_PI)+vec2(0.5,0.5),(vReflection.xz/5.)+0.35,1.)).rgb;
              color *= (color+.12);
              float fresnel = 1.-dot(viewDirectionW, vNormalW);
              color = mix(vec3(1.),color,reflection);
              //color = mix(vec3(1.,1.,1.),color,(1.-fresnel));
              //color = texture2D(textureSampler, vUV).rgb;


              //color += vec3(0.,0.,1.)*fresnel;


              // emissive
              float emissive = 1.6;

              // diffuse
              float ndl = max(0., dot(normalize(vNormalW), normalize(vec3(3.,5.,6.))));
              //ndl += .7*fresnel;
              //ndl *= 1. / (.7+ndl/2.);

              //ndl += max(0., dot(vNormalW, normalize(vec3(-3.,-5.,2.))));

              //ndl += .5*max(0., dot(vNormalW, normalize(vec3(0.,1.,0.))));
              //ndl += .5*max(0., dot(vNormalW, normalize(vec3(.2,0.,-1.))));
              //ndl += .5*max(0., dot(vNormalW, normalize(vec3(.2,0.,1.))));

              // Specular
              vec3 angleW = normalize(viewDirectionW + lightVectorW);
              float specComp = max(0., dot(vNormalW, angleW));
              specComp = pow(specComp, 64.) * 0.05;

              vec4 intensity4 = vec4(mix(emissive*color, ndl*color*vec3(1.,0.98,1.) + specComp*5.*specularLight, 0.26),1.);
              float intensity = ( intensity4.x + intensity4.y + intensity4.z ) / 3.;

              vec4 color4;

              if (intensity > 0.95)
            		color4 = vec4(0.9,0.9,0.4,1.0);
              else
            		color4 = vec4(0.85,0.75,0.35,1.0);

              gl_FragColor = mix(color4*intensity, intensity4*vec4(0.9,0.9,0.4,1.0), scale3);
              gl_FragColor.w = 1.0;
              //gl_FragColor = vec4(mix(emissive*color, ndl*color*vec3(1.,0.98,1.) + specComp*5.*specularLight, 0.66),scale6);
              // gl_FragColor = vec4(vNormal, 1.); // this looks really cool...especially if you change the bump extremity
          }`

export default fragShader;
