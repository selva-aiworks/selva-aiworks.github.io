(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,3454,e=>{"use strict";var t=e.i(64986),r=e.i(15977);function i({SIM_RESOLUTION:e=128,DYE_RESOLUTION:i=1440,CAPTURE_RESOLUTION:o=512,DENSITY_DISSIPATION:n=3.5,VELOCITY_DISSIPATION:a=2,PRESSURE:l=.1,PRESSURE_ITERATIONS:s=20,CURL:u=3,SPLAT_RADIUS:c=.2,SPLAT_FORCE:f=6e3,SHADING:m=!0,COLOR_UPDATE_SPEED:d=10,BACK_COLOR:v={r:.5,g:0,b:0},TRANSPARENT:h=!0}){let p=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t,r,o,v,h,g,x,y,T=p.current;if(!T)return;let w=[{id:-1,texcoordX:0,texcoordY:0,prevTexcoordX:0,prevTexcoordY:0,deltaX:0,deltaY:0,down:!1,moved:!1,color:{r:0,g:0,b:0}}],E={SIM_RESOLUTION:e,DYE_RESOLUTION:i,DENSITY_DISSIPATION:n,VELOCITY_DISSIPATION:a,PRESSURE:l,PRESSURE_ITERATIONS:s,CURL:u,SPLAT_RADIUS:c,SPLAT_FORCE:f,SHADING:m,COLOR_UPDATE_SPEED:d},{gl:S,ext:b}=function(e){let t,r,i,o={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},n=e.getContext("webgl2",o);if(n||(n=e.getContext("webgl",o)||e.getContext("experimental-webgl",o)),!n)throw Error("Unable to initialize WebGL.");let a="drawBuffers"in n,l=!1,s=null;a?(n.getExtension("EXT_color_buffer_float"),l=!!n.getExtension("OES_texture_float_linear")):(s=n.getExtension("OES_texture_half_float"),l=!!n.getExtension("OES_texture_half_float_linear")),n.clearColor(0,0,0,1);let u=a?n.HALF_FLOAT:s&&s.HALF_FLOAT_OES||0;return a?(t=R(n,n.RGBA16F,n.RGBA,u),r=R(n,n.RG16F,n.RG,u),i=R(n,n.R16F,n.RED,u)):(t=R(n,n.RGBA,n.RGBA,u),r=R(n,n.RGBA,n.RGBA,u),i=R(n,n.RGBA,n.RGBA,u)),{gl:n,ext:{formatRGBA:t,formatRG:r,formatR:i,halfFloatTexType:u,supportLinearFiltering:l}}}(T);if(!S||!b)return;function R(e,t,r,i){if(!function(e,t,r,i){let o=e.createTexture();if(!o)return!1;e.bindTexture(e.TEXTURE_2D,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,t,4,4,0,r,i,null);let n=e.createFramebuffer();return!!n&&(e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE)}(e,t,r,i)){if("drawBuffers"in e)switch(t){case e.R16F:return R(e,e.RG16F,e.RG,i);case e.RG16F:return R(e,e.RGBA16F,e.RGBA,i)}return null}return{internalFormat:t,format:r}}function _(e,t,r=null){let i=function(e,t){if(!t)return e;let r="";for(let e of t)r+=`#define ${e}
`;return r+e}(t,r),o=S.createShader(e);return o?(S.shaderSource(o,i),S.compileShader(o),S.getShaderParameter(o,S.COMPILE_STATUS)||console.trace(S.getShaderInfoLog(o)),o):null}function A(e,t){if(!e||!t)return null;let r=S.createProgram();return r?(S.attachShader(r,e),S.attachShader(r,t),S.linkProgram(r),S.getProgramParameter(r,S.LINK_STATUS)||console.trace(S.getProgramInfoLog(r)),r):null}function P(e){let t={},r=S.getProgramParameter(e,S.ACTIVE_UNIFORMS);for(let i=0;i<r;i++){let r=S.getActiveUniform(e,i);r&&(t[r.name]=S.getUniformLocation(e,r.name))}return t}b.supportLinearFiltering||(E.DYE_RESOLUTION=256,E.SHADING=!1);class D{program;uniforms;constructor(e,t){this.program=A(e,t),this.uniforms=this.program?P(this.program):{}}bind(){this.program&&S.useProgram(this.program)}}let C=_(S.VERTEX_SHADER,`
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;

      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `),L=_(S.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;

      void main () {
          gl_FragColor = texture2D(uTexture, vUv);
      }
    `),I=_(S.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;

      void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
      }
    `),F=`
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;

              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);

              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);

              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `,U=_(S.FRAGMENT_SHADER,`
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;

      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
    `),N=_(S.FRAGMENT_SHADER,`
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform vec2 dyeTexelSize;
      uniform float dt;
      uniform float dissipation;

      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
          vec2 st = uv / tsize - 0.5;
          vec2 iuv = floor(st);
          vec2 fuv = fract(st);

          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }

      void main () {
          #ifdef MANUAL_FILTERING
              vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
              vec4 result = bilerp(uSource, coord, dyeTexelSize);
          #else
              vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
              vec4 result = texture2D(uSource, coord);
          #endif
          float decay = 1.0 + dissipation * dt;
          gl_FragColor = result / decay;
      }
    `,b.supportLinearFiltering?null:["MANUAL_FILTERING"]),z=_(S.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;

          vec2 C = texture2D(uVelocity, vUv).xy;
          if (vL.x < 0.0) { L = -C.x; }
          if (vR.x > 1.0) { R = -C.x; }
          if (vT.y > 1.0) { T = -C.y; }
          if (vB.y < 0.0) { B = -C.y; }

          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `),B=_(S.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uVelocity, vL).y;
          float R = texture2D(uVelocity, vR).y;
          float T = texture2D(uVelocity, vT).x;
          float B = texture2D(uVelocity, vB).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `),M=_(S.FRAGMENT_SHADER,`
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;

      void main () {
          float L = texture2D(uCurl, vL).x;
          float R = texture2D(uCurl, vR).x;
          float T = texture2D(uCurl, vT).x;
          float B = texture2D(uCurl, vB).x;
          float C = texture2D(uCurl, vUv).x;

          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 0.0001;
          force *= curl * C;
          force.y *= -1.0;

          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity += force * dt;
          velocity = min(max(velocity, -1000.0), 1000.0);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `),k=_(S.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;

      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          float C = texture2D(uPressure, vUv).x;
          float divergence = texture2D(uDivergence, vUv).x;
          float pressure = (L + R + B + T - divergence) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `),O=_(S.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `),j=(g=S.createBuffer(),S.bindBuffer(S.ARRAY_BUFFER,g),S.bufferData(S.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),S.STATIC_DRAW),x=S.createBuffer(),S.bindBuffer(S.ELEMENT_ARRAY_BUFFER,x),S.bufferData(S.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),S.STATIC_DRAW),S.vertexAttribPointer(0,2,S.FLOAT,!1,0,0),S.enableVertexAttribArray(0),(e,t=!1)=>{S&&(e?(S.viewport(0,0,e.width,e.height),S.bindFramebuffer(S.FRAMEBUFFER,e.fbo)):(S.viewport(0,0,S.drawingBufferWidth,S.drawingBufferHeight),S.bindFramebuffer(S.FRAMEBUFFER,null)),t&&(S.clearColor(0,0,0,1),S.clear(S.COLOR_BUFFER_BIT)),S.drawElements(S.TRIANGLES,6,S.UNSIGNED_SHORT,0))}),X=new D(C,L),G=new D(C,I),Y=new D(C,U),H=new D(C,N),V=new D(C,z),W=new D(C,B),$=new D(C,M),K=new D(C,k),q=new D(C,O),J=new class{vertexShader;fragmentShaderSource;programs;activeProgram;uniforms;constructor(e,t){this.vertexShader=e,this.fragmentShaderSource=t,this.programs={},this.activeProgram=null,this.uniforms={}}setKeywords(e){let t=0;for(let r of e)t+=function(e){if(!e.length)return 0;let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r)|0;return t}(r);let r=this.programs[t];if(null==r){let i=_(S.FRAGMENT_SHADER,this.fragmentShaderSource,e);r=A(this.vertexShader,i),this.programs[t]=r}r!==this.activeProgram&&(r&&(this.uniforms=P(r)),this.activeProgram=r)}bind(){this.activeProgram&&S.useProgram(this.activeProgram)}}(C,F);function Z(e,t,r,i,o,n){S.activeTexture(S.TEXTURE0);let a=S.createTexture();S.bindTexture(S.TEXTURE_2D,a),S.texParameteri(S.TEXTURE_2D,S.TEXTURE_MIN_FILTER,n),S.texParameteri(S.TEXTURE_2D,S.TEXTURE_MAG_FILTER,n),S.texParameteri(S.TEXTURE_2D,S.TEXTURE_WRAP_S,S.CLAMP_TO_EDGE),S.texParameteri(S.TEXTURE_2D,S.TEXTURE_WRAP_T,S.CLAMP_TO_EDGE),S.texImage2D(S.TEXTURE_2D,0,r,e,t,0,i,o,null);let l=S.createFramebuffer();S.bindFramebuffer(S.FRAMEBUFFER,l),S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,a,0),S.viewport(0,0,e,t),S.clear(S.COLOR_BUFFER_BIT);let s=1/e,u=1/t;return{texture:a,fbo:l,width:e,height:t,texelSizeX:s,texelSizeY:u,attach:e=>(S.activeTexture(S.TEXTURE0+e),S.bindTexture(S.TEXTURE_2D,a),e)}}function Q(e,t,r,i,o,n){let a=Z(e,t,r,i,o,n),l=Z(e,t,r,i,o,n);return{width:e,height:t,texelSizeX:a.texelSizeX,texelSizeY:a.texelSizeY,read:a,write:l,swap(){let e=this.read;this.read=this.write,this.write=e}}}function ee(e,t,r,i,o,n,a){var l;let s;return e.width===t&&e.height===r?e:(l=e.read,s=Z(t,r,i,o,n,a),X.bind(),X.uniforms.uTexture&&S.uniform1i(X.uniforms.uTexture,l.attach(0)),j(s,!1),e.read=s,e.write=Z(t,r,i,o,n,a),e.width=t,e.height=r,e.texelSizeX=1/t,e.texelSizeY=1/r,e)}function et(){let e=er(E.SIM_RESOLUTION),i=er(E.DYE_RESOLUTION),n=b.halfFloatTexType,a=b.formatRGBA,l=b.formatRG,s=b.formatR,u=b.supportLinearFiltering?S.LINEAR:S.NEAREST;S.disable(S.BLEND),t=t?ee(t,i.width,i.height,a.internalFormat,a.format,n,u):Q(i.width,i.height,a.internalFormat,a.format,n,u),r=r?ee(r,e.width,e.height,l.internalFormat,l.format,n,u):Q(e.width,e.height,l.internalFormat,l.format,n,u),o=Z(e.width,e.height,s.internalFormat,s.format,n,S.NEAREST),v=Z(e.width,e.height,s.internalFormat,s.format,n,S.NEAREST),h=Q(e.width,e.height,s.internalFormat,s.format,n,S.NEAREST)}function er(e){let t=S.drawingBufferWidth,r=S.drawingBufferHeight,i=t/r,o=Math.round(e),n=Math.round(e*(i<1?1/i:i));return t>r?{width:n,height:o}:{width:o,height:n}}function ei(e){return Math.floor(e*(window.devicePixelRatio||1))}y=[],E.SHADING&&y.push("SHADING"),J.setKeywords(y),et();let eo=Date.now(),en=0;function ea(){var e,i;let n,a,l,s,u,c,f,m=(a=Math.min(a=((n=Date.now())-eo)/1e3,.016666),eo=n,a);l=ei(T.clientWidth),s=ei(T.clientHeight),(T.width!==l||T.height!==s)&&(T.width=l,T.height=s,1)&&et(),(en+=m*E.COLOR_UPDATE_SPEED)>=1&&(e=en,en=0==(u=1)?0:(e-0)%u+0,w.forEach(e=>{e.color=ec()})),function(){for(let e of w)e.moved&&(e.moved=!1,function(e){let t=e.deltaX*E.SPLAT_FORCE,r=e.deltaY*E.SPLAT_FORCE;el(e.texcoordX,e.texcoordY,t,r,e.color)}(e))}(),function(e){S.disable(S.BLEND),W.bind(),W.uniforms.texelSize&&S.uniform2f(W.uniforms.texelSize,r.texelSizeX,r.texelSizeY),W.uniforms.uVelocity&&S.uniform1i(W.uniforms.uVelocity,r.read.attach(0)),j(v),$.bind(),$.uniforms.texelSize&&S.uniform2f($.uniforms.texelSize,r.texelSizeX,r.texelSizeY),$.uniforms.uVelocity&&S.uniform1i($.uniforms.uVelocity,r.read.attach(0)),$.uniforms.uCurl&&S.uniform1i($.uniforms.uCurl,v.attach(1)),$.uniforms.curl&&S.uniform1f($.uniforms.curl,E.CURL),$.uniforms.dt&&S.uniform1f($.uniforms.dt,e),j(r.write),r.swap(),V.bind(),V.uniforms.texelSize&&S.uniform2f(V.uniforms.texelSize,r.texelSizeX,r.texelSizeY),V.uniforms.uVelocity&&S.uniform1i(V.uniforms.uVelocity,r.read.attach(0)),j(o),G.bind(),G.uniforms.uTexture&&S.uniform1i(G.uniforms.uTexture,h.read.attach(0)),G.uniforms.value&&S.uniform1f(G.uniforms.value,E.PRESSURE),j(h.write),h.swap(),K.bind(),K.uniforms.texelSize&&S.uniform2f(K.uniforms.texelSize,r.texelSizeX,r.texelSizeY),K.uniforms.uDivergence&&S.uniform1i(K.uniforms.uDivergence,o.attach(0));for(let e=0;e<E.PRESSURE_ITERATIONS;e++)K.uniforms.uPressure&&S.uniform1i(K.uniforms.uPressure,h.read.attach(1)),j(h.write),h.swap();q.bind(),q.uniforms.texelSize&&S.uniform2f(q.uniforms.texelSize,r.texelSizeX,r.texelSizeY),q.uniforms.uPressure&&S.uniform1i(q.uniforms.uPressure,h.read.attach(0)),q.uniforms.uVelocity&&S.uniform1i(q.uniforms.uVelocity,r.read.attach(1)),j(r.write),r.swap(),H.bind(),H.uniforms.texelSize&&S.uniform2f(H.uniforms.texelSize,r.texelSizeX,r.texelSizeY),!b.supportLinearFiltering&&H.uniforms.dyeTexelSize&&S.uniform2f(H.uniforms.dyeTexelSize,r.texelSizeX,r.texelSizeY);let i=r.read.attach(0);H.uniforms.uVelocity&&S.uniform1i(H.uniforms.uVelocity,i),H.uniforms.uSource&&S.uniform1i(H.uniforms.uSource,i),H.uniforms.dt&&S.uniform1f(H.uniforms.dt,e),H.uniforms.dissipation&&S.uniform1f(H.uniforms.dissipation,E.VELOCITY_DISSIPATION),j(r.write),r.swap(),!b.supportLinearFiltering&&H.uniforms.dyeTexelSize&&S.uniform2f(H.uniforms.dyeTexelSize,t.texelSizeX,t.texelSizeY),H.uniforms.uVelocity&&S.uniform1i(H.uniforms.uVelocity,r.read.attach(0)),H.uniforms.uSource&&S.uniform1i(H.uniforms.uSource,t.read.attach(1)),H.uniforms.dissipation&&S.uniform1f(H.uniforms.dissipation,E.DENSITY_DISSIPATION),j(t.write),t.swap()}(m),S.blendFunc(S.ONE,S.ONE_MINUS_SRC_ALPHA),S.enable(S.BLEND),c=(i=null,S.drawingBufferWidth),f=i?i.height:S.drawingBufferHeight,J.bind(),E.SHADING&&J.uniforms.texelSize&&S.uniform2f(J.uniforms.texelSize,1/c,1/f),J.uniforms.uTexture&&S.uniform1i(J.uniforms.uTexture,t.read.attach(0)),j(i,!1),requestAnimationFrame(ea)}function el(e,i,o,n,a){var l;let s;Y.bind(),Y.uniforms.uTarget&&S.uniform1i(Y.uniforms.uTarget,r.read.attach(0)),Y.uniforms.aspectRatio&&S.uniform1f(Y.uniforms.aspectRatio,T.width/T.height),Y.uniforms.point&&S.uniform2f(Y.uniforms.point,e,i),Y.uniforms.color&&S.uniform3f(Y.uniforms.color,o,n,0),Y.uniforms.radius&&S.uniform1f(Y.uniforms.radius,(l=E.SPLAT_RADIUS/100,(s=T.width/T.height)>1&&(l*=s),l)),j(r.write),r.swap(),Y.uniforms.uTarget&&S.uniform1i(Y.uniforms.uTarget,t.read.attach(0)),Y.uniforms.color&&S.uniform3f(Y.uniforms.color,a.r,a.g,a.b),j(t.write),t.swap()}function es(e,t,r,i){e.id=t,e.down=!0,e.moved=!1,e.texcoordX=r/T.width,e.texcoordY=1-i/T.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=ec()}function eu(e,t,r,i){var o,n;let a,l;e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=t/T.width,e.texcoordY=1-r/T.height,o=e.texcoordX-e.prevTexcoordX,(a=T.width/T.height)<1&&(o*=a),e.deltaX=o,n=e.texcoordY-e.prevTexcoordY,(l=T.width/T.height)>1&&(n/=l),e.deltaY=n,e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=i}function ec(){let e=function(e,t,r){let i=0,o=0,n=0,a=Math.floor(6*e),l=6*e-a,s=0,u=+(1-l),c=+(1-(1-l)*1);switch(a%6){case 0:i=1,o=c,n=s;break;case 1:i=u,o=1,n=s;break;case 2:i=s,o=1,n=c;break;case 3:i=s,o=u,n=1;break;case 4:i=c,o=s,n=1;break;case 5:i=1,o=s,n=u}return{r:i,g:o,b:n}}(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}window.addEventListener("mousedown",e=>{let t,r,i,o=w[0];es(o,-1,ei(e.clientX),ei(e.clientY)),t=ec(),t.r*=10,t.g*=10,t.b*=10,r=10*(Math.random()-.5),i=30*(Math.random()-.5),el(o.texcoordX,o.texcoordY,r,i,t)}),document.body.addEventListener("mousemove",function e(t){let r=w[0],i=ei(t.clientX),o=ei(t.clientY),n=ec();ea(),eu(r,i,o,n),document.body.removeEventListener("mousemove",e)}),window.addEventListener("mousemove",e=>{let t=w[0],r=ei(e.clientX),i=ei(e.clientY),o=t.color;eu(t,r,i,o)}),document.body.addEventListener("touchstart",function e(t){let r=t.targetTouches,i=w[0];for(let e=0;e<r.length;e++){let t=ei(r[e].clientX),o=ei(r[e].clientY);ea(),es(i,r[e].identifier,t,o)}document.body.removeEventListener("touchstart",e)}),window.addEventListener("touchstart",e=>{let t=e.targetTouches,r=w[0];for(let e=0;e<t.length;e++){let i=ei(t[e].clientX),o=ei(t[e].clientY);es(r,t[e].identifier,i,o)}},!1),window.addEventListener("touchmove",e=>{let t=e.targetTouches,r=w[0];for(let e=0;e<t.length;e++)eu(r,ei(t[e].clientX),ei(t[e].clientY),r.color)},!1),window.addEventListener("touchend",e=>{let t=e.changedTouches,r=w[0];for(let e=0;e<t.length;e++)r.down=!1})},[e,i,o,n,a,l,s,u,c,f,m,d,v,h]),(0,t.jsx)("div",{className:"fixed top-0 left-0 z-50 pointer-events-none w-full h-full",children:(0,t.jsx)("canvas",{ref:p,id:"fluid",className:"w-screen h-screen block"})})}e.s(["default",()=>i])},35829,e=>{"use strict";var t=e.i(64986),r=e.i(15977),i=e.i(20190);e.i(67881);var o=e.i(90296),n=e.i(51784),a=e.i(76264),l=e.i(64529),s=e.i(67361),u=r,c=e.i(3024);function f(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}class m extends u.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){let e=t.offsetParent,r=(0,s.isHTMLElement)(e)&&e.offsetWidth||0,i=this.props.sizeRef.current;i.height=t.offsetHeight||0,i.width=t.offsetWidth||0,i.top=t.offsetTop,i.left=t.offsetLeft,i.right=r-i.width-i.left}return null}componentDidUpdate(){}render(){return this.props.children}}function d({children:e,isPresent:i,anchorX:o,root:n}){let a=(0,u.useId)(),l=(0,u.useRef)(null),s=(0,u.useRef)({width:0,height:0,top:0,left:0,right:0}),{nonce:d}=(0,u.useContext)(c.MotionConfigContext),v=function(...e){return r.useCallback(function(...e){return t=>{let r=!1,i=e.map(e=>{let i=f(e,t);return r||"function"!=typeof i||(r=!0),i});if(r)return()=>{for(let t=0;t<i.length;t++){let r=i[t];"function"==typeof r?r():f(e[t],null)}}}}(...e),e)}(l,e?.ref);return(0,u.useInsertionEffect)(()=>{let{width:e,height:t,top:r,left:u,right:c}=s.current;if(i||!l.current||!e||!t)return;let f="left"===o?`left: ${u}`:`right: ${c}`;l.current.dataset.motionPopId=a;let m=document.createElement("style");d&&(m.nonce=d);let v=n??document.head;return v.appendChild(m),m.sheet&&m.sheet.insertRule(`
          [data-motion-pop-id="${a}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${t}px !important;
            ${f}px !important;
            top: ${r}px !important;
          }
        `),()=>{v.contains(m)&&v.removeChild(m)}},[i]),(0,t.jsx)(m,{isPresent:i,childRef:l,sizeRef:s,children:u.cloneElement(e,{ref:v})})}let v=({children:e,initial:i,isPresent:o,onExitComplete:a,custom:s,presenceAffectsLayout:u,mode:c,anchorX:f,root:m})=>{let v=(0,n.useConstant)(h),p=(0,r.useId)(),g=!0,x=(0,r.useMemo)(()=>(g=!1,{id:p,initial:i,isPresent:o,custom:s,onExitComplete:e=>{for(let t of(v.set(e,!0),v.values()))if(!t)return;a&&a()},register:e=>(v.set(e,!1),()=>v.delete(e))}),[o,v,a]);return u&&g&&(x={...x}),(0,r.useMemo)(()=>{v.forEach((e,t)=>v.set(t,!1))},[o]),r.useEffect(()=>{o||v.size||!a||a()},[o]),"popLayout"===c&&(e=(0,t.jsx)(d,{isPresent:o,anchorX:f,root:m,children:e})),(0,t.jsx)(l.PresenceContext.Provider,{value:x,children:e})};function h(){return new Map}var p=e.i(81479);let g=e=>e.key||"";function x(e){let t=[];return r.Children.forEach(e,e=>{(0,r.isValidElement)(e)&&t.push(e)}),t}let y=({children:e,custom:i,initial:l=!0,onExitComplete:s,presenceAffectsLayout:u=!0,mode:c="sync",propagate:f=!1,anchorX:m="left",root:d})=>{let[h,y]=(0,p.usePresence)(f),T=(0,r.useMemo)(()=>x(e),[e]),w=f&&!h?[]:T.map(g),E=(0,r.useRef)(!0),S=(0,r.useRef)(T),b=(0,n.useConstant)(()=>new Map),[R,_]=(0,r.useState)(T),[A,P]=(0,r.useState)(T);(0,a.useIsomorphicLayoutEffect)(()=>{E.current=!1,S.current=T;for(let e=0;e<A.length;e++){let t=g(A[e]);w.includes(t)?b.delete(t):!0!==b.get(t)&&b.set(t,!1)}},[A,w.length,w.join("-")]);let D=[];if(T!==R){let e=[...T];for(let t=0;t<A.length;t++){let r=A[t],i=g(r);w.includes(i)||(e.splice(t,0,r),D.push(r))}return"wait"===c&&D.length&&(e=D),P(x(e)),_(T),null}let{forceRender:C}=(0,r.useContext)(o.LayoutGroupContext);return(0,t.jsx)(t.Fragment,{children:A.map(e=>{let r=g(e),o=(!f||!!h)&&(T===A||w.includes(r));return(0,t.jsx)(v,{isPresent:o,initial:(!E.current||!!l)&&void 0,custom:i,presenceAffectsLayout:u,mode:c,root:d,onExitComplete:o?void 0:()=>{if(!b.has(r))return;b.set(r,!0);let e=!0;b.forEach(t=>{t||(e=!1)}),e&&(C?.(),P(S.current),f&&y?.(),s&&s())},anchorX:m,children:e},r)})})};var T=e.i(78215);let w=(0,T.default)("message-square",[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]]),E=(0,T.default)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var S=e.i(78387),b=e.i(73712),R=e.i(23191),_=e.i(18684),A=e.i(74771),P=e.i(82838);let D={black:"#000000",white:"#ffffff",red:"#ff0000",green:"#00ff00",blue:"#0000ff",fuchsia:"#ff00ff",cyan:"#00ffff",yellow:"#ffff00",orange:"#ff8000"};function C(e){4===e.length&&(e=e[0]+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t||console.warn(`Unable to convert hex string ${e} to rgb values`),[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]}function L(e){if(void 0===e)return[0,0,0];if(3==arguments.length)return arguments;if(!isNaN(e)){var t;return[((t=parseInt(t=e))>>16&255)/255,(t>>8&255)/255,(255&t)/255]}return"#"===e[0]?C(e):D[e.toLowerCase()]?C(D[e.toLowerCase()]):(console.warn("Color format not recognised"),[0,0,0])}class I extends Array{constructor(e){if(Array.isArray(e))return super(...e);return super(...L(...arguments))}get r(){return this[0]}get g(){return this[1]}get b(){return this[2]}set r(e){this[0]=e}set g(e){this[1]=e}set b(e){this[2]=e}set(e){return Array.isArray(e)?this.copy(e):this.copy(L(...arguments))}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this}}let F=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,U=`
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`,N=({color:e=[1,1,1],amplitude:i=1,distance:o=0,enableMouseInteraction:n=!1})=>{let a=(0,r.useRef)(null),l=(0,r.useRef)(null);return(0,r.useEffect)(()=>{if(!a.current)return;let t=a.current,r=new R.Renderer({alpha:!0}),s=r.gl;s.clearColor(0,0,0,0),s.enable(s.BLEND),s.blendFunc(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA),t.appendChild(s.canvas);let u=new P.Triangle(s),c=new _.Program(s,{vertex:F,fragment:U,uniforms:{iTime:{value:0},iResolution:{value:new I(s.canvas.width,s.canvas.height,s.canvas.width/s.canvas.height)},uColor:{value:new I(...e)},uAmplitude:{value:i},uDistance:{value:o},uMouse:{value:new Float32Array([.5,.5])}}}),f=new A.Mesh(s,{geometry:u,program:c});function m(){let{clientWidth:e,clientHeight:i}=t;r.setSize(e,i),c.uniforms.iResolution.value.r=e,c.uniforms.iResolution.value.g=i,c.uniforms.iResolution.value.b=e/i}window.addEventListener("resize",m),m();let d=[.5,.5],v=[.5,.5];function h(e){let r=t.getBoundingClientRect();v=[(e.clientX-r.left)/r.width,1-(e.clientY-r.top)/r.height]}function p(){v=[.5,.5]}return n&&(t.addEventListener("mousemove",h),t.addEventListener("mouseleave",p)),l.current=requestAnimationFrame(function e(t){n?(d[0]+=.05*(v[0]-d[0]),d[1]+=.05*(v[1]-d[1]),c.uniforms.uMouse.value[0]=d[0],c.uniforms.uMouse.value[1]=d[1]):(c.uniforms.uMouse.value[0]=.5,c.uniforms.uMouse.value[1]=.5),c.uniforms.iTime.value=.001*t,r.render({scene:f}),l.current=requestAnimationFrame(e)}),()=>{l.current&&cancelAnimationFrame(l.current),window.removeEventListener("resize",m),n&&(t.removeEventListener("mousemove",h),t.removeEventListener("mouseleave",p)),t.contains(s.canvas)&&t.removeChild(s.canvas),s.getExtension("WEBGL_lose_context")?.loseContext()}},[e,i,o,n]),(0,t.jsx)("div",{ref:a,className:"w-full h-full relative"})},z={workerUrl:"https://chat.colabmldrive.workers.dev",systemPrompt:`You are Selva's personal AI assistant and guide on his portfolio website. Your personality is warm, professional, engaging, and slightly witty. You only discuss Selva G and his professional journey - nothing else. You can use appropriate emojis to make more natural and human feel.

ABOUT SELVA G:
- Current Role: AI Software Engineer at *astTECS Unified Communication & Cloud Telephony Solutions
- Freelance: WordPress Website Developer with AI incorporation
- Education: B.E in Artificial Intelligence & Machine Learning from AMC Engineering College, Bangalore (2020-2024, CGPA: 8.06/10)
- Location: Bangalore, India
- Contact: +91 9363087305 | selvaofficialmail@gmail.com
- Portfolio: https://selva-aiworks.github.io
- LinkedIn: https://www.linkedin.com/in/selva-g
- GitHub: https://github.com/selva-aiworks

EXPERIENCE:
1. AI Software Engineer at *astTECS (Current) - Building unified communication and cloud telephony solutions
2. AI Trainer at Sambhav Foundation (Present) - Training 500+ learners in partnership with Microsoft & Accenture's Digital Skilling Program
3. Freelance WordPress Developer - Creating AI-integrated websites for clients
4. AI Intern at CodSoft (Aug-Sep 2023) - Deployed AI-driven systems

SKILLS:
- Languages: Python, PHP, HTML
- Frameworks: TensorFlow, PyTorch, Hugging Face, NumPy, Pandas, Scikit-learn, CrewAI, LangChain, LangGraph
- Specializations: Generative AI, Speech-to-Text/Text-to-Speech, Agentic-AI Systems, Deep Learning, NLP, Computer Vision, Web Scraping
- Tools: Google Colab, Jupyter Notebook, NVIDIA Models

KEY PROJECTS:
1. P.A.C.E (Pythonic AI for Coding and Execution) - NeMo API system converting natural language to Python code
2. W.E.B.S (Web Extraction and Summarization) - CrewAI agents for web scraping and PDF summarization
3. Speech Recognition System - 98% accuracy multilingual STT/TTS with GPT-2
4. Sports Image Classification - 92% accuracy sports identification system

CERTIFICATIONS:
- Stanford DeepLearning.AI Machine Learning Specialization (3 courses)
- Infosys: Data Science & Python
- Udemy: Deep Learning & Neural Networks

ACHIEVEMENTS:
- Omdena contributor: Built AI crop disease detection app for Kenyan farms
- Led AI/ML training sessions for 500+ engineers
- Multiple deployed AI solutions in NLP, computer vision, and speech recognition

YOUR BEHAVIOR:
1. Always bring conversations back to Selva's work, even if users ask off-topic questions
2. Be conversational, enthusiastic, and proud of Selva's achievements
3. Naturally guide users through his journey: education → skills → projects → experience
4. When users express interest in contacting Selva or want to leave, smoothly transition to collecting their contact info
5. Detect exit phrases like "thanks", "bye", "that's all", "contact him", "reach out", "hire", "collaborate"
6. Try to give a precise and concise message, not a big para message

CONTACT COLLECTION FLOW:
- When user wants to connect/leave, say: "I'd love to help you connect with Selva! May I have your name?"
- After name: "Great to meet you, [Name]! What's your email address?"
- After email: "Perfect! And what message would you like me to pass along to Selva?"
- After message: "Thank you! I'll make sure Selva gets your message right away. He typically responds within 24 hours!"

Remember: You're here to showcase Selva's expertise and facilitate connections. Be proud, professional, and helpful!`,welcomeMessage:"Hey there! 👋 I'm Selva's AI assistant - think of me as his digital twin who knows everything about his AI journey. Whether you're curious about his projects, skills, or just want to say hi, I'm here to help! What would you like to know about Selva?",model:"sarvam-m",temperature:.8,typingSpeed:20};function B({content:e,onComplete:i,speed:o=20,onCharacterTyped:n}){let[a,l]=(0,r.useState)(""),[s,u]=(0,r.useState)(0);return(0,r.useEffect)(()=>{if(s<e.length){let t=setTimeout(()=>{l(t=>t+e[s]),u(e=>e+1),n?.()},o);return()=>clearTimeout(t)}i()},[s,e,o,i,n]),(0,t.jsx)("span",{dangerouslySetInnerHTML:{__html:a.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>")}})}function M(){let[e,o]=(0,r.useState)(!1),[n,a]=(0,r.useState)([]),[l,s]=(0,r.useState)(""),[u,c]=(0,r.useState)(!1),[f,m]=(0,r.useState)(!1),[d,v]=(0,r.useState)([]),[h,p]=(0,r.useState)(!1),[g,x]=(0,r.useState)(0),[T,R]=(0,r.useState)({name:"",email:"",message:""}),[_,A]=(0,r.useState)(null),P=(0,r.useRef)(null),D=(0,r.useRef)(null),C=(0,r.useCallback)(()=>{P.current?.scrollIntoView({behavior:"smooth"})},[]);(0,r.useEffect)(()=>{C()},[n,C]),(0,r.useEffect)(()=>{if(e&&0===n.length){let e="welcome";a([{id:e,content:z.welcomeMessage,sender:"bot",isTyping:!0}]),A(e)}e&&D.current?.focus()},[e,n.length]);let L=(0,r.useCallback)(e=>{a(t=>t.map(t=>t.id===e?{...t,isTyping:!1}:t)),A(null),c(!1),setTimeout(()=>{D.current?.focus()},50)},[]),I=async e=>{try{let t=await fetch(z.workerUrl+"/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e.name,email:e.email,message:e.message})}),r=await t.json();if(!t.ok||!r.success)throw Error(r.error||"Email send failed");return!0}catch(e){return console.error("Email error:",e),!1}},F=e=>{let t=Date.now().toString();a(r=>[...r,{id:t,content:e,sender:"bot",isTyping:!0}]),A(t)},U=async()=>{let e=l.trim();if(e&&!u){if(a(t=>[...t,{id:Date.now().toString(),content:e,sender:"user",isTyping:!1}]),s(""),c(!0),h){if(1===g){R({...T,name:e}),x(2),setTimeout(()=>{F(`Great to meet you, ${e}! What's your email address?`)},300);return}else if(2===g){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))return void setTimeout(()=>{F("Hmm, that doesn't look like a valid email. Could you try again?")},300);R({...T,email:e}),x(3),setTimeout(()=>{F("Perfect! And what message would you like me to pass along to Selva?")},300);return}else if(3===g){let t={...T,message:e};R(t),await I(t)?F("Thank you! I've sent your message to Selva. He typically responds within 24 hours. Have a great day! 🚀"):F("I've noted your message! You can also reach Selva directly at selvaofficialmail@gmail.com or +91 9363087305"),p(!1),x(0),R({name:"",email:"",message:""});return}}m(!0);try{let t=[...d,{role:"user",content:e}];v(t);let r=await fetch(z.workerUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({systemPrompt:z.systemPrompt,conversationHistory:t,model:z.model,temperature:z.temperature})});if(!r.ok)throw Error(`API Error: ${r.status}`);let i=(await r.json()).choices[0].message.content;m(!1),F(i),v(e=>[...e,{role:"assistant",content:i}]),(i.toLowerCase().includes("may i have your name")||i.toLowerCase().includes("what's your name"))&&(p(!0),x(1))}catch(e){m(!1),F("Sorry, I encountered an error. You can also reach Selva at selvaofficialmail@gmail.com"),console.error("Chatbot error:",e)}}};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(i.motion.button,{onClick:()=>o(!e),className:"fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full p-[2px] border border-white/10 bg-white/5 shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 group",whileHover:{scale:1.1},whileTap:{scale:.95},"aria-label":"Open chat",children:[(0,t.jsx)("div",{className:"absolute inset-0 rounded-full pointer-events-none",children:(0,t.jsx)(b.GlowingEffect,{spread:40,glow:!0,disabled:!1,proximity:64,inactiveZone:.01,borderWidth:2,variant:"royal"})}),(0,t.jsxs)("div",{className:"relative z-10 w-full h-full rounded-full bg-black/20 backdrop-blur-3xl backdrop-saturate-150 flex items-center justify-center",children:[(0,t.jsx)("div",{className:"absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"}),(0,t.jsx)(w,{className:"w-6 h-6 text-white relative z-10"})]})]}),(0,t.jsx)(y,{children:e&&(0,t.jsxs)(i.motion.div,{initial:{opacity:0,y:20,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:20,scale:.95},transition:{duration:.2},className:"fixed bottom-24 right-6 z-50 w-[min(420px,calc(100vw-48px))] h-[min(600px,calc(100vh-140px))] rounded-3xl p-[2px] border border-white/10 shadow-2xl flex flex-col bg-white/5",children:[(0,t.jsx)("div",{className:"absolute inset-0 rounded-[inherit] pointer-events-none",children:(0,t.jsx)(b.GlowingEffect,{spread:40,glow:!0,disabled:!1,proximity:64,inactiveZone:.01,borderWidth:2,variant:"royal"})}),(0,t.jsxs)("div",{className:"relative z-10 w-full h-full rounded-[22px] overflow-hidden flex flex-col bg-black/80 backdrop-blur-3xl backdrop-saturate-150",children:[(0,t.jsx)("div",{className:"absolute inset-0 z-10 opacity-90",children:(0,t.jsx)(N,{color:[1,1,1],amplitude:1.2,distance:0,enableMouseInteraction:!0})}),(0,t.jsxs)("div",{className:"relative z-10 flex items-center justify-between p-5 border-b border-white/10 bg-black/90",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("h3",{className:"text-lg font-semibold text-white flex items-center gap-2",children:[(0,t.jsx)("span",{className:"w-2 h-2 rounded-full bg-green-400 animate-pulse"}),"Selva's AI Twin"]}),(0,t.jsx)("p",{className:"text-xs text-white/50",children:"Ask me anything about Selva!"})]}),(0,t.jsx)("button",{onClick:()=>o(!1),className:"w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-colors","aria-label":"Close chat",children:(0,t.jsx)(E,{className:"w-4 h-4 text-white"})})]}),(0,t.jsxs)("div",{className:"relative z-10 flex-1 overflow-y-auto p-4 space-y-4 bg-black/70",children:[n.map(e=>(0,t.jsx)(i.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:`flex ${"user"===e.sender?"justify-end":"justify-start"}`,children:(0,t.jsx)("div",{className:`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${"user"===e.sender?"bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-md shadow-lg shadow-purple-500/20":"bg-black/80 border border-white/10 text-white rounded-bl-md"}`,children:"bot"===e.sender&&e.isTyping?(0,t.jsx)(B,{content:e.content,speed:z.typingSpeed,onComplete:()=>L(e.id),onCharacterTyped:C}):(0,t.jsx)("span",{dangerouslySetInnerHTML:{__html:e.content.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>")}})})},e.id)),f&&(0,t.jsx)(i.motion.div,{initial:{opacity:0},animate:{opacity:1},className:"flex justify-start",children:(0,t.jsxs)("div",{className:"bg-black/80 border border-white/10 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5",children:[(0,t.jsx)("span",{className:"w-2 h-2 bg-purple-400 rounded-full animate-bounce",style:{animationDelay:"0ms"}}),(0,t.jsx)("span",{className:"w-2 h-2 bg-blue-400 rounded-full animate-bounce",style:{animationDelay:"150ms"}}),(0,t.jsx)("span",{className:"w-2 h-2 bg-cyan-400 rounded-full animate-bounce",style:{animationDelay:"300ms"}})]})}),(0,t.jsx)("div",{ref:P})]}),(0,t.jsx)("div",{className:"relative z-10 p-4 border-t border-white/10 bg-black/90",children:(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("input",{ref:D,type:"text",value:l,onChange:e=>s(e.target.value),onKeyPress:e=>"Enter"===e.key&&U(),placeholder:"Ask me anything about Selva...",className:"flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all",disabled:u||null!==_}),(0,t.jsx)("button",{onClick:U,disabled:u||!l.trim()||null!==_,className:"w-11 h-11 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all","aria-label":"Send message",children:(0,t.jsx)(S.Send,{className:"w-5 h-5 text-white"})})]})})]})]})})]})}e.s(["default",()=>M],35829)}]);