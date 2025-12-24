(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,87779,e=>{"use strict";var t=e.i(43476),r=e.i(71645);function i({SIM_RESOLUTION:e=128,DYE_RESOLUTION:i=1440,CAPTURE_RESOLUTION:n=512,DENSITY_DISSIPATION:o=3.5,VELOCITY_DISSIPATION:a=2,PRESSURE:l=.1,PRESSURE_ITERATIONS:s=20,CURL:u=3,SPLAT_RADIUS:c=.2,SPLAT_FORCE:f=6e3,SHADING:d=!0,COLOR_UPDATE_SPEED:m=10,BACK_COLOR:h={r:.5,g:0,b:0},TRANSPARENT:v=!0}){let p=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t,r,n,h,v,g,x,y,b=p.current;if(!b)return;let w=[{id:-1,texcoordX:0,texcoordY:0,prevTexcoordX:0,prevTexcoordY:0,deltaX:0,deltaY:0,down:!1,moved:!1,color:{r:0,g:0,b:0}}],E={SIM_RESOLUTION:e,DYE_RESOLUTION:i,DENSITY_DISSIPATION:o,VELOCITY_DISSIPATION:a,PRESSURE:l,PRESSURE_ITERATIONS:s,CURL:u,SPLAT_RADIUS:c,SPLAT_FORCE:f,SHADING:d,COLOR_UPDATE_SPEED:m},{gl:T,ext:S}=function(e){let t,r,i,n={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},o=e.getContext("webgl2",n);if(o||(o=e.getContext("webgl",n)||e.getContext("experimental-webgl",n)),!o)throw Error("Unable to initialize WebGL.");let a="drawBuffers"in o,l=!1,s=null;a?(o.getExtension("EXT_color_buffer_float"),l=!!o.getExtension("OES_texture_float_linear")):(s=o.getExtension("OES_texture_half_float"),l=!!o.getExtension("OES_texture_half_float_linear")),o.clearColor(0,0,0,1);let u=a?o.HALF_FLOAT:s&&s.HALF_FLOAT_OES||0;return a?(t=_(o,o.RGBA16F,o.RGBA,u),r=_(o,o.RG16F,o.RG,u),i=_(o,o.R16F,o.RED,u)):(t=_(o,o.RGBA,o.RGBA,u),r=_(o,o.RGBA,o.RGBA,u),i=_(o,o.RGBA,o.RGBA,u)),{gl:o,ext:{formatRGBA:t,formatRG:r,formatR:i,halfFloatTexType:u,supportLinearFiltering:l}}}(b);if(!T||!S)return;function _(e,t,r,i){if(!function(e,t,r,i){let n=e.createTexture();if(!n)return!1;e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,t,4,4,0,r,i,null);let o=e.createFramebuffer();return!!o&&(e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE)}(e,t,r,i)){if("drawBuffers"in e)switch(t){case e.R16F:return _(e,e.RG16F,e.RG,i);case e.RG16F:return _(e,e.RGBA16F,e.RGBA,i)}return null}return{internalFormat:t,format:r}}function R(e,t,r=null){let i=function(e,t){if(!t)return e;let r="";for(let e of t)r+=`#define ${e}
`;return r+e}(t,r),n=T.createShader(e);return n?(T.shaderSource(n,i),T.compileShader(n),T.getShaderParameter(n,T.COMPILE_STATUS)||console.trace(T.getShaderInfoLog(n)),n):null}function P(e,t){if(!e||!t)return null;let r=T.createProgram();return r?(T.attachShader(r,e),T.attachShader(r,t),T.linkProgram(r),T.getProgramParameter(r,T.LINK_STATUS)||console.trace(T.getProgramInfoLog(r)),r):null}function A(e){let t={},r=T.getProgramParameter(e,T.ACTIVE_UNIFORMS);for(let i=0;i<r;i++){let r=T.getActiveUniform(e,i);r&&(t[r.name]=T.getUniformLocation(e,r.name))}return t}S.supportLinearFiltering||(E.DYE_RESOLUTION=256,E.SHADING=!1);class D{program;uniforms;constructor(e,t){this.program=P(e,t),this.uniforms=this.program?A(this.program):{}}bind(){this.program&&T.useProgram(this.program)}}let C=R(T.VERTEX_SHADER,`
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
    `),L=R(T.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;

      void main () {
          gl_FragColor = texture2D(uTexture, vUv);
      }
    `),I=R(T.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;

      void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
      }
    `),N=`
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
    `,F=R(T.FRAGMENT_SHADER,`
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
    `),U=R(T.FRAGMENT_SHADER,`
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
    `,S.supportLinearFiltering?null:["MANUAL_FILTERING"]),j=R(T.FRAGMENT_SHADER,`
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
    `),M=R(T.FRAGMENT_SHADER,`
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
    `),O=R(T.FRAGMENT_SHADER,`
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
    `),z=R(T.FRAGMENT_SHADER,`
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
    `),k=R(T.FRAGMENT_SHADER,`
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
    `),B=(g=T.createBuffer(),T.bindBuffer(T.ARRAY_BUFFER,g),T.bufferData(T.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),T.STATIC_DRAW),x=T.createBuffer(),T.bindBuffer(T.ELEMENT_ARRAY_BUFFER,x),T.bufferData(T.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),T.STATIC_DRAW),T.vertexAttribPointer(0,2,T.FLOAT,!1,0,0),T.enableVertexAttribArray(0),(e,t=!1)=>{T&&(e?(T.viewport(0,0,e.width,e.height),T.bindFramebuffer(T.FRAMEBUFFER,e.fbo)):(T.viewport(0,0,T.drawingBufferWidth,T.drawingBufferHeight),T.bindFramebuffer(T.FRAMEBUFFER,null)),t&&(T.clearColor(0,0,0,1),T.clear(T.COLOR_BUFFER_BIT)),T.drawElements(T.TRIANGLES,6,T.UNSIGNED_SHORT,0))}),X=new D(C,L),G=new D(C,I),Y=new D(C,F),H=new D(C,U),V=new D(C,j),$=new D(C,M),W=new D(C,O),K=new D(C,z),q=new D(C,k),J=new class{vertexShader;fragmentShaderSource;programs;activeProgram;uniforms;constructor(e,t){this.vertexShader=e,this.fragmentShaderSource=t,this.programs={},this.activeProgram=null,this.uniforms={}}setKeywords(e){let t=0;for(let r of e)t+=function(e){if(!e.length)return 0;let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r)|0;return t}(r);let r=this.programs[t];if(null==r){let i=R(T.FRAGMENT_SHADER,this.fragmentShaderSource,e);r=P(this.vertexShader,i),this.programs[t]=r}r!==this.activeProgram&&(r&&(this.uniforms=A(r)),this.activeProgram=r)}bind(){this.activeProgram&&T.useProgram(this.activeProgram)}}(C,N);function Z(e,t,r,i,n,o){T.activeTexture(T.TEXTURE0);let a=T.createTexture();T.bindTexture(T.TEXTURE_2D,a),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_MIN_FILTER,o),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_MAG_FILTER,o),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_WRAP_S,T.CLAMP_TO_EDGE),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_WRAP_T,T.CLAMP_TO_EDGE),T.texImage2D(T.TEXTURE_2D,0,r,e,t,0,i,n,null);let l=T.createFramebuffer();T.bindFramebuffer(T.FRAMEBUFFER,l),T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,a,0),T.viewport(0,0,e,t),T.clear(T.COLOR_BUFFER_BIT);let s=1/e,u=1/t;return{texture:a,fbo:l,width:e,height:t,texelSizeX:s,texelSizeY:u,attach:e=>(T.activeTexture(T.TEXTURE0+e),T.bindTexture(T.TEXTURE_2D,a),e)}}function Q(e,t,r,i,n,o){let a=Z(e,t,r,i,n,o),l=Z(e,t,r,i,n,o);return{width:e,height:t,texelSizeX:a.texelSizeX,texelSizeY:a.texelSizeY,read:a,write:l,swap(){let e=this.read;this.read=this.write,this.write=e}}}function ee(e,t,r,i,n,o,a){var l;let s;return e.width===t&&e.height===r?e:(l=e.read,s=Z(t,r,i,n,o,a),X.bind(),X.uniforms.uTexture&&T.uniform1i(X.uniforms.uTexture,l.attach(0)),B(s,!1),e.read=s,e.write=Z(t,r,i,n,o,a),e.width=t,e.height=r,e.texelSizeX=1/t,e.texelSizeY=1/r,e)}function et(){let e=er(E.SIM_RESOLUTION),i=er(E.DYE_RESOLUTION),o=S.halfFloatTexType,a=S.formatRGBA,l=S.formatRG,s=S.formatR,u=S.supportLinearFiltering?T.LINEAR:T.NEAREST;T.disable(T.BLEND),t=t?ee(t,i.width,i.height,a.internalFormat,a.format,o,u):Q(i.width,i.height,a.internalFormat,a.format,o,u),r=r?ee(r,e.width,e.height,l.internalFormat,l.format,o,u):Q(e.width,e.height,l.internalFormat,l.format,o,u),n=Z(e.width,e.height,s.internalFormat,s.format,o,T.NEAREST),h=Z(e.width,e.height,s.internalFormat,s.format,o,T.NEAREST),v=Q(e.width,e.height,s.internalFormat,s.format,o,T.NEAREST)}function er(e){let t=T.drawingBufferWidth,r=T.drawingBufferHeight,i=t/r,n=Math.round(e),o=Math.round(e*(i<1?1/i:i));return t>r?{width:o,height:n}:{width:n,height:o}}function ei(e){return Math.floor(e*(window.devicePixelRatio||1))}y=[],E.SHADING&&y.push("SHADING"),J.setKeywords(y),et();let en=Date.now(),eo=0;function ea(){var e,i;let o,a,l,s,u,c,f,d=(a=Math.min(a=((o=Date.now())-en)/1e3,.016666),en=o,a);l=ei(b.clientWidth),s=ei(b.clientHeight),(b.width!==l||b.height!==s)&&(b.width=l,b.height=s,1)&&et(),(eo+=d*E.COLOR_UPDATE_SPEED)>=1&&(e=eo,eo=0==(u=1)?0:(e-0)%u+0,w.forEach(e=>{e.color=ec()})),function(){for(let e of w)e.moved&&(e.moved=!1,function(e){let t=e.deltaX*E.SPLAT_FORCE,r=e.deltaY*E.SPLAT_FORCE;el(e.texcoordX,e.texcoordY,t,r,e.color)}(e))}(),function(e){T.disable(T.BLEND),$.bind(),$.uniforms.texelSize&&T.uniform2f($.uniforms.texelSize,r.texelSizeX,r.texelSizeY),$.uniforms.uVelocity&&T.uniform1i($.uniforms.uVelocity,r.read.attach(0)),B(h),W.bind(),W.uniforms.texelSize&&T.uniform2f(W.uniforms.texelSize,r.texelSizeX,r.texelSizeY),W.uniforms.uVelocity&&T.uniform1i(W.uniforms.uVelocity,r.read.attach(0)),W.uniforms.uCurl&&T.uniform1i(W.uniforms.uCurl,h.attach(1)),W.uniforms.curl&&T.uniform1f(W.uniforms.curl,E.CURL),W.uniforms.dt&&T.uniform1f(W.uniforms.dt,e),B(r.write),r.swap(),V.bind(),V.uniforms.texelSize&&T.uniform2f(V.uniforms.texelSize,r.texelSizeX,r.texelSizeY),V.uniforms.uVelocity&&T.uniform1i(V.uniforms.uVelocity,r.read.attach(0)),B(n),G.bind(),G.uniforms.uTexture&&T.uniform1i(G.uniforms.uTexture,v.read.attach(0)),G.uniforms.value&&T.uniform1f(G.uniforms.value,E.PRESSURE),B(v.write),v.swap(),K.bind(),K.uniforms.texelSize&&T.uniform2f(K.uniforms.texelSize,r.texelSizeX,r.texelSizeY),K.uniforms.uDivergence&&T.uniform1i(K.uniforms.uDivergence,n.attach(0));for(let e=0;e<E.PRESSURE_ITERATIONS;e++)K.uniforms.uPressure&&T.uniform1i(K.uniforms.uPressure,v.read.attach(1)),B(v.write),v.swap();q.bind(),q.uniforms.texelSize&&T.uniform2f(q.uniforms.texelSize,r.texelSizeX,r.texelSizeY),q.uniforms.uPressure&&T.uniform1i(q.uniforms.uPressure,v.read.attach(0)),q.uniforms.uVelocity&&T.uniform1i(q.uniforms.uVelocity,r.read.attach(1)),B(r.write),r.swap(),H.bind(),H.uniforms.texelSize&&T.uniform2f(H.uniforms.texelSize,r.texelSizeX,r.texelSizeY),!S.supportLinearFiltering&&H.uniforms.dyeTexelSize&&T.uniform2f(H.uniforms.dyeTexelSize,r.texelSizeX,r.texelSizeY);let i=r.read.attach(0);H.uniforms.uVelocity&&T.uniform1i(H.uniforms.uVelocity,i),H.uniforms.uSource&&T.uniform1i(H.uniforms.uSource,i),H.uniforms.dt&&T.uniform1f(H.uniforms.dt,e),H.uniforms.dissipation&&T.uniform1f(H.uniforms.dissipation,E.VELOCITY_DISSIPATION),B(r.write),r.swap(),!S.supportLinearFiltering&&H.uniforms.dyeTexelSize&&T.uniform2f(H.uniforms.dyeTexelSize,t.texelSizeX,t.texelSizeY),H.uniforms.uVelocity&&T.uniform1i(H.uniforms.uVelocity,r.read.attach(0)),H.uniforms.uSource&&T.uniform1i(H.uniforms.uSource,t.read.attach(1)),H.uniforms.dissipation&&T.uniform1f(H.uniforms.dissipation,E.DENSITY_DISSIPATION),B(t.write),t.swap()}(d),T.blendFunc(T.ONE,T.ONE_MINUS_SRC_ALPHA),T.enable(T.BLEND),c=(i=null,T.drawingBufferWidth),f=i?i.height:T.drawingBufferHeight,J.bind(),E.SHADING&&J.uniforms.texelSize&&T.uniform2f(J.uniforms.texelSize,1/c,1/f),J.uniforms.uTexture&&T.uniform1i(J.uniforms.uTexture,t.read.attach(0)),B(i,!1),requestAnimationFrame(ea)}function el(e,i,n,o,a){var l;let s;Y.bind(),Y.uniforms.uTarget&&T.uniform1i(Y.uniforms.uTarget,r.read.attach(0)),Y.uniforms.aspectRatio&&T.uniform1f(Y.uniforms.aspectRatio,b.width/b.height),Y.uniforms.point&&T.uniform2f(Y.uniforms.point,e,i),Y.uniforms.color&&T.uniform3f(Y.uniforms.color,n,o,0),Y.uniforms.radius&&T.uniform1f(Y.uniforms.radius,(l=E.SPLAT_RADIUS/100,(s=b.width/b.height)>1&&(l*=s),l)),B(r.write),r.swap(),Y.uniforms.uTarget&&T.uniform1i(Y.uniforms.uTarget,t.read.attach(0)),Y.uniforms.color&&T.uniform3f(Y.uniforms.color,a.r,a.g,a.b),B(t.write),t.swap()}function es(e,t,r,i){e.id=t,e.down=!0,e.moved=!1,e.texcoordX=r/b.width,e.texcoordY=1-i/b.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=ec()}function eu(e,t,r,i){var n,o;let a,l;e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=t/b.width,e.texcoordY=1-r/b.height,n=e.texcoordX-e.prevTexcoordX,(a=b.width/b.height)<1&&(n*=a),e.deltaX=n,o=e.texcoordY-e.prevTexcoordY,(l=b.width/b.height)>1&&(o/=l),e.deltaY=o,e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=i}function ec(){let e=function(e,t,r){let i=0,n=0,o=0,a=Math.floor(6*e),l=6*e-a,s=0,u=+(1-l),c=+(1-(1-l)*1);switch(a%6){case 0:i=1,n=c,o=s;break;case 1:i=u,n=1,o=s;break;case 2:i=s,n=1,o=c;break;case 3:i=s,n=u,o=1;break;case 4:i=c,n=s,o=1;break;case 5:i=1,n=s,o=u}return{r:i,g:n,b:o}}(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}window.addEventListener("mousedown",e=>{let t,r,i,n=w[0];es(n,-1,ei(e.clientX),ei(e.clientY)),t=ec(),t.r*=10,t.g*=10,t.b*=10,r=10*(Math.random()-.5),i=30*(Math.random()-.5),el(n.texcoordX,n.texcoordY,r,i,t)}),document.body.addEventListener("mousemove",function e(t){let r=w[0],i=ei(t.clientX),n=ei(t.clientY),o=ec();ea(),eu(r,i,n,o),document.body.removeEventListener("mousemove",e)}),window.addEventListener("mousemove",e=>{let t=w[0],r=ei(e.clientX),i=ei(e.clientY),n=t.color;eu(t,r,i,n)}),document.body.addEventListener("touchstart",function e(t){let r=t.targetTouches,i=w[0];for(let e=0;e<r.length;e++){let t=ei(r[e].clientX),n=ei(r[e].clientY);ea(),es(i,r[e].identifier,t,n)}document.body.removeEventListener("touchstart",e)}),window.addEventListener("touchstart",e=>{let t=e.targetTouches,r=w[0];for(let e=0;e<t.length;e++){let i=ei(t[e].clientX),n=ei(t[e].clientY);es(r,t[e].identifier,i,n)}},!1),window.addEventListener("touchmove",e=>{let t=e.targetTouches,r=w[0];for(let e=0;e<t.length;e++)eu(r,ei(t[e].clientX),ei(t[e].clientY),r.color)},!1),window.addEventListener("touchend",e=>{let t=e.changedTouches,r=w[0];for(let e=0;e<t.length;e++)r.down=!1})},[e,i,n,o,a,l,s,u,c,f,d,m,h,v]),(0,t.jsx)("div",{className:"fixed top-0 left-0 z-0 pointer-events-none w-full h-full",children:(0,t.jsx)("canvas",{ref:p,id:"fluid",className:"w-screen h-screen block"})})}e.s(["default",()=>i])},98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i={assign:function(){return s},searchParamsToUrlQuery:function(){return o},urlQueryToSearchParams:function(){return l}};for(var n in i)Object.defineProperty(r,n,{enumerable:!0,get:i[n]});function o(e){let t={};for(let[r,i]of e.entries()){let e=t[r];void 0===e?t[r]=i:Array.isArray(e)?e.push(i):t[r]=[e,i]}return t}function a(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function l(e){let t=new URLSearchParams;for(let[r,i]of Object.entries(e))if(Array.isArray(i))for(let e of i)t.append(r,a(e));else t.set(r,a(i));return t}function s(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,i]of r.entries())e.append(t,i)}return e}},95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i={formatUrl:function(){return l},formatWithValidation:function(){return u},urlObjectKeys:function(){return s}};for(var n in i)Object.defineProperty(r,n,{enumerable:!0,get:i[n]});let o=e.r(90809)._(e.r(98183)),a=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:r}=e,i=e.protocol||"",n=e.pathname||"",l=e.hash||"",s=e.query||"",u=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?u=t+e.host:r&&(u=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(u+=":"+e.port)),s&&"object"==typeof s&&(s=String(o.urlQueryToSearchParams(s)));let c=e.search||s&&`?${s}`||"";return i&&!i.endsWith(":")&&(i+=":"),e.slashes||(!i||a.test(i))&&!1!==u?(u="//"+(u||""),n&&"/"!==n[0]&&(n="/"+n)):u||(u=""),l&&"#"!==l[0]&&(l="#"+l),c&&"?"!==c[0]&&(c="?"+c),n=n.replace(/[?#]/g,encodeURIComponent),c=c.replace("#","%23"),`${i}${u}${n}${c}${l}`}let s=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function u(e){return l(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return n}});let i=e.r(71645);function n(e,t){let r=(0,i.useRef)(null),n=(0,i.useRef)(null);return(0,i.useCallback)(i=>{if(null===i){let e=r.current;e&&(r.current=null,e());let t=n.current;t&&(n.current=null,t())}else e&&(r.current=o(e,i)),t&&(n.current=o(t,i))},[e,t])}function o(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18967,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i={DecodeError:function(){return g},MiddlewareNotFoundError:function(){return w},MissingStaticPage:function(){return b},NormalizeError:function(){return x},PageNotFoundError:function(){return y},SP:function(){return v},ST:function(){return p},WEB_VITALS:function(){return o},execOnce:function(){return a},getDisplayName:function(){return f},getLocationOrigin:function(){return u},getURL:function(){return c},isAbsoluteUrl:function(){return s},isResSent:function(){return d},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return m},stringifyError:function(){return E}};for(var n in i)Object.defineProperty(r,n,{enumerable:!0,get:i[n]});let o=["CLS","FCP","FID","INP","LCP","TTFB"];function a(e){let t,r=!1;return(...i)=>(r||(r=!0,t=e(...i)),t)}let l=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,s=e=>l.test(e);function u(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function c(){let{href:e}=window.location,t=u();return e.substring(t.length)}function f(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function d(e){return e.finished||e.headersSent}function m(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let i=await e.getInitialProps(t);if(r&&d(r))return i;if(!i)throw Object.defineProperty(Error(`"${f(e)}.getInitialProps()" should resolve to an object. But found "${i}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return i}let v="undefined"!=typeof performance,p=v&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class g extends Error{}class x extends Error{}class y extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class b extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class w extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function E(e){return JSON.stringify({message:e.message,stack:e.stack})}},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return o}});let i=e.r(18967),n=e.r(52817);function o(e){if(!(0,i.isAbsoluteUrl)(e))return!0;try{let t=(0,i.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,n.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return i}});let i=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i={default:function(){return g},useLinkStatus:function(){return y}};for(var n in i)Object.defineProperty(r,n,{enumerable:!0,get:i[n]});let o=e.r(90809),a=e.r(43476),l=o._(e.r(71645)),s=e.r(95057),u=e.r(8372),c=e.r(18581),f=e.r(18967),d=e.r(5550);e.r(33525);let m=e.r(91949),h=e.r(73668),v=e.r(9396);function p(e){return"string"==typeof e?e:(0,s.formatUrl)(e)}function g(t){var r;let i,n,o,[s,g]=(0,l.useOptimistic)(m.IDLE_LINK_STATUS),y=(0,l.useRef)(null),{href:b,as:w,children:E,prefetch:T=null,passHref:S,replace:_,shallow:R,scroll:P,onClick:A,onMouseEnter:D,onTouchStart:C,legacyBehavior:L=!1,onNavigate:I,ref:N,unstable_dynamicOnHover:F,...U}=t;i=E,L&&("string"==typeof i||"number"==typeof i)&&(i=(0,a.jsx)("a",{children:i}));let j=l.default.useContext(u.AppRouterContext),M=!1!==T,O=!1!==T?null===(r=T)||"auto"===r?v.FetchStrategy.PPR:v.FetchStrategy.Full:v.FetchStrategy.PPR,{href:z,as:k}=l.default.useMemo(()=>{let e=p(b);return{href:e,as:w?p(w):e}},[b,w]);if(L){if(i?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});n=l.default.Children.only(i)}let B=L?n&&"object"==typeof n&&n.ref:N,X=l.default.useCallback(e=>(null!==j&&(y.current=(0,m.mountLinkInstance)(e,z,j,O,M,g)),()=>{y.current&&((0,m.unmountLinkForCurrentNavigation)(y.current),y.current=null),(0,m.unmountPrefetchableInstance)(e)}),[M,z,j,O,g]),G={ref:(0,c.useMergedRef)(X,B),onClick(t){L||"function"!=typeof A||A(t),L&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(t),!j||t.defaultPrevented||function(t,r,i,n,o,a,s){if("undefined"!=typeof window){let u,{nodeName:c}=t.currentTarget;if("A"===c.toUpperCase()&&((u=t.currentTarget.getAttribute("target"))&&"_self"!==u||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(r)){o&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),s){let e=!1;if(s({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:f}=e.r(99781);l.default.startTransition(()=>{f(i||r,o?"replace":"push",a??!0,n.current)})}}(t,z,k,y,_,P,I)},onMouseEnter(e){L||"function"!=typeof D||D(e),L&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),j&&M&&(0,m.onNavigationIntent)(e.currentTarget,!0===F)},onTouchStart:function(e){L||"function"!=typeof C||C(e),L&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),j&&M&&(0,m.onNavigationIntent)(e.currentTarget,!0===F)}};return(0,f.isAbsoluteUrl)(k)?G.href=k:L&&!S&&("a"!==n.type||"href"in n.props)||(G.href=(0,d.addBasePath)(k)),o=L?l.default.cloneElement(n,G):(0,a.jsx)("a",{...U,...G,children:i}),(0,a.jsx)(x.Provider,{value:s,children:o})}e.r(84508);let x=(0,l.createContext)(m.IDLE_LINK_STATUS),y=()=>(0,l.useContext)(x);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18566,(e,t,r)=>{t.exports=e.r(76562)},86311,e=>{"use strict";let t=(0,e.i(75254).default)("message-square",[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]]);e.s(["MessageSquare",()=>t],86311)},99981,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(22016),n=e.i(18566),o=e.i(46932),a=e.i(75254);let l=(0,a.default)("house",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]]),s=(0,a.default)("folder",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]]);var u=e.i(63488),c=e.i(86311),f=e.i(75157);function d(){let e=(0,n.usePathname)(),a=[{icon:l,label:"Home",href:"/",isAction:!1},{icon:s,label:"Projects",href:"/projects",isAction:!1},{icon:u.Mail,label:"Contact",href:"/contact",isAction:!1},{icon:c.MessageSquare,label:"Chat",href:"#",isAction:!0,onClick:e=>{e.preventDefault(),window.dispatchEvent(new CustomEvent("open-chatbot"))}}];return(0,t.jsx)("div",{className:"md:hidden fixed bottom-8 left-0 right-0 px-6 z-50 flex justify-center pointer-events-none",children:(0,t.jsx)(o.motion.div,{initial:{y:100,opacity:0},animate:{y:0,opacity:1},transition:{duration:.6,delay:.2,type:"spring",damping:20,stiffness:300},className:"relative w-full max-w-sm pointer-events-auto",children:(0,t.jsxs)("div",{className:"relative z-10 flex items-center justify-between px-6 py-4 rounded-[32px] bg-black/30 backdrop-blur-[60px] backdrop-saturate-200 border border-white/10 shadow-2xl overflow-hidden",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-br from-white/5 to-white/5 pointer-events-none"}),(0,t.jsx)("div",{className:"relative z-10 flex w-full justify-between items-center px-2",children:a.map(n=>{let a=e===n.href,l=n.icon;return(0,t.jsx)(r.default.Fragment,{children:n.isAction?(0,t.jsx)("button",{onClick:n.onClick,className:(0,f.cn)("relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 group","hover:bg-white/10 active:scale-95"),children:(0,t.jsx)(l,{className:"w-6 h-6 text-white/90 group-hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-all ease-out",strokeWidth:1.5})}):(0,t.jsxs)(i.default,{href:n.href,className:(0,f.cn)("relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-500",a?"bg-white/10 shadow-[inner_0_0_12px_rgba(255,255,255,0.1)]":"hover:bg-white/5 active:scale-90"),children:[(0,t.jsx)(l,{className:(0,f.cn)("w-6 h-6 transition-all duration-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]",a?"text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]":"text-white/70 hover:text-white"),strokeWidth:1.5}),a&&(0,t.jsx)(o.motion.div,{layoutId:"activeDockIndicator",className:"absolute -bottom-1 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]",transition:{type:"spring",stiffness:300,damping:25}})]})},n.label)})})]})})})}e.s(["default",()=>d],99981)},84686,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(46932);e.i(47167);var n=e.i(31178),o=e.i(47414),a=e.i(74008),l=e.i(21476),s=e.i(72846),u=r,c=e.i(37806);function f(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}class d extends u.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){let e=t.offsetParent,r=(0,s.isHTMLElement)(e)&&e.offsetWidth||0,i=this.props.sizeRef.current;i.height=t.offsetHeight||0,i.width=t.offsetWidth||0,i.top=t.offsetTop,i.left=t.offsetLeft,i.right=r-i.width-i.left}return null}componentDidUpdate(){}render(){return this.props.children}}function m({children:e,isPresent:i,anchorX:n,root:o}){let a=(0,u.useId)(),l=(0,u.useRef)(null),s=(0,u.useRef)({width:0,height:0,top:0,left:0,right:0}),{nonce:m}=(0,u.useContext)(c.MotionConfigContext),h=function(...e){return r.useCallback(function(...e){return t=>{let r=!1,i=e.map(e=>{let i=f(e,t);return r||"function"!=typeof i||(r=!0),i});if(r)return()=>{for(let t=0;t<i.length;t++){let r=i[t];"function"==typeof r?r():f(e[t],null)}}}}(...e),e)}(l,e?.ref);return(0,u.useInsertionEffect)(()=>{let{width:e,height:t,top:r,left:u,right:c}=s.current;if(i||!l.current||!e||!t)return;let f="left"===n?`left: ${u}`:`right: ${c}`;l.current.dataset.motionPopId=a;let d=document.createElement("style");m&&(d.nonce=m);let h=o??document.head;return h.appendChild(d),d.sheet&&d.sheet.insertRule(`
          [data-motion-pop-id="${a}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${t}px !important;
            ${f}px !important;
            top: ${r}px !important;
          }
        `),()=>{h.contains(d)&&h.removeChild(d)}},[i]),(0,t.jsx)(d,{isPresent:i,childRef:l,sizeRef:s,children:u.cloneElement(e,{ref:h})})}let h=({children:e,initial:i,isPresent:n,onExitComplete:a,custom:s,presenceAffectsLayout:u,mode:c,anchorX:f,root:d})=>{let h=(0,o.useConstant)(v),p=(0,r.useId)(),g=!0,x=(0,r.useMemo)(()=>(g=!1,{id:p,initial:i,isPresent:n,custom:s,onExitComplete:e=>{for(let t of(h.set(e,!0),h.values()))if(!t)return;a&&a()},register:e=>(h.set(e,!1),()=>h.delete(e))}),[n,h,a]);return u&&g&&(x={...x}),(0,r.useMemo)(()=>{h.forEach((e,t)=>h.set(t,!1))},[n]),r.useEffect(()=>{n||h.size||!a||a()},[n]),"popLayout"===c&&(e=(0,t.jsx)(m,{isPresent:n,anchorX:f,root:d,children:e})),(0,t.jsx)(l.PresenceContext.Provider,{value:x,children:e})};function v(){return new Map}var p=e.i(64978);let g=e=>e.key||"";function x(e){let t=[];return r.Children.forEach(e,e=>{(0,r.isValidElement)(e)&&t.push(e)}),t}let y=({children:e,custom:i,initial:l=!0,onExitComplete:s,presenceAffectsLayout:u=!0,mode:c="sync",propagate:f=!1,anchorX:d="left",root:m})=>{let[v,y]=(0,p.usePresence)(f),b=(0,r.useMemo)(()=>x(e),[e]),w=f&&!v?[]:b.map(g),E=(0,r.useRef)(!0),T=(0,r.useRef)(b),S=(0,o.useConstant)(()=>new Map),[_,R]=(0,r.useState)(b),[P,A]=(0,r.useState)(b);(0,a.useIsomorphicLayoutEffect)(()=>{E.current=!1,T.current=b;for(let e=0;e<P.length;e++){let t=g(P[e]);w.includes(t)?S.delete(t):!0!==S.get(t)&&S.set(t,!1)}},[P,w.length,w.join("-")]);let D=[];if(b!==_){let e=[...b];for(let t=0;t<P.length;t++){let r=P[t],i=g(r);w.includes(i)||(e.splice(t,0,r),D.push(r))}return"wait"===c&&D.length&&(e=D),A(x(e)),R(b),null}let{forceRender:C}=(0,r.useContext)(n.LayoutGroupContext);return(0,t.jsx)(t.Fragment,{children:P.map(e=>{let r=g(e),n=(!f||!!v)&&(b===P||w.includes(r));return(0,t.jsx)(h,{isPresent:n,initial:(!E.current||!!l)&&void 0,custom:i,presenceAffectsLayout:u,mode:c,root:m,onExitComplete:n?void 0:()=>{if(!S.has(r))return;S.set(r,!0);let e=!0;S.forEach(t=>{t||(e=!1)}),e&&(C?.(),A(T.current),f&&y?.(),s&&s())},anchorX:d,children:e},r)})})};var b=e.i(86311);let w=(0,e.i(75254).default)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var E=e.i(14764),T=e.i(97560),S=e.i(21663),_=e.i(56850),R=e.i(80075),P=e.i(53604);let A={black:"#000000",white:"#ffffff",red:"#ff0000",green:"#00ff00",blue:"#0000ff",fuchsia:"#ff00ff",cyan:"#00ffff",yellow:"#ffff00",orange:"#ff8000"};function D(e){4===e.length&&(e=e[0]+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t||console.warn(`Unable to convert hex string ${e} to rgb values`),[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]}function C(e){if(void 0===e)return[0,0,0];if(3==arguments.length)return arguments;if(!isNaN(e)){var t;return[((t=parseInt(t=e))>>16&255)/255,(t>>8&255)/255,(255&t)/255]}return"#"===e[0]?D(e):A[e.toLowerCase()]?D(A[e.toLowerCase()]):(console.warn("Color format not recognised"),[0,0,0])}class L extends Array{constructor(e){if(Array.isArray(e))return super(...e);return super(...C(...arguments))}get r(){return this[0]}get g(){return this[1]}get b(){return this[2]}set r(e){this[0]=e}set g(e){this[1]=e}set b(e){this[2]=e}set(e){return Array.isArray(e)?this.copy(e):this.copy(C(...arguments))}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this}}let I=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,N=`
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
`,F=({color:e=[1,1,1],amplitude:i=1,distance:n=0,enableMouseInteraction:o=!1})=>{let a=(0,r.useRef)(null),l=(0,r.useRef)(null);return(0,r.useEffect)(()=>{if(!a.current)return;let t=a.current,r=new S.Renderer({alpha:!0}),s=r.gl;s.clearColor(0,0,0,0),s.enable(s.BLEND),s.blendFunc(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA),t.appendChild(s.canvas);let u=new P.Triangle(s),c=new _.Program(s,{vertex:I,fragment:N,uniforms:{iTime:{value:0},iResolution:{value:new L(s.canvas.width,s.canvas.height,s.canvas.width/s.canvas.height)},uColor:{value:new L(...e)},uAmplitude:{value:i},uDistance:{value:n},uMouse:{value:new Float32Array([.5,.5])}}}),f=new R.Mesh(s,{geometry:u,program:c});function d(){let{clientWidth:e,clientHeight:i}=t;r.setSize(e,i),c.uniforms.iResolution.value.r=e,c.uniforms.iResolution.value.g=i,c.uniforms.iResolution.value.b=e/i}window.addEventListener("resize",d),d();let m=[.5,.5],h=[.5,.5];function v(e){let r=t.getBoundingClientRect();h=[(e.clientX-r.left)/r.width,1-(e.clientY-r.top)/r.height]}function p(){h=[.5,.5]}return o&&(t.addEventListener("mousemove",v),t.addEventListener("mouseleave",p)),l.current=requestAnimationFrame(function e(t){o?(m[0]+=.05*(h[0]-m[0]),m[1]+=.05*(h[1]-m[1]),c.uniforms.uMouse.value[0]=m[0],c.uniforms.uMouse.value[1]=m[1]):(c.uniforms.uMouse.value[0]=.5,c.uniforms.uMouse.value[1]=.5),c.uniforms.iTime.value=.001*t,r.render({scene:f}),l.current=requestAnimationFrame(e)}),()=>{l.current&&cancelAnimationFrame(l.current),window.removeEventListener("resize",d),o&&(t.removeEventListener("mousemove",v),t.removeEventListener("mouseleave",p)),t.contains(s.canvas)&&t.removeChild(s.canvas),s.getExtension("WEBGL_lose_context")?.loseContext()}},[e,i,n,o]),(0,t.jsx)("div",{ref:a,className:"w-full h-full relative"})},U={workerUrl:"https://chat.colabmldrive.workers.dev",systemPrompt:`You are Selva's personal AI assistant and guide on his portfolio website. Your personality is warm, professional, engaging, and slightly witty. You only discuss Selva G and his professional journey - nothing else. You can use appropriate emojis to make more natural and human feel.

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

Remember: You're here to showcase Selva's expertise and facilitate connections. Be proud, professional, and helpful!`,welcomeMessage:"Hey there! 👋 I'm Selva's AI assistant - think of me as his digital twin who knows everything about his AI journey. Whether you're curious about his projects, skills, or just want to say hi, I'm here to help! What would you like to know about Selva?",model:"sarvam-m",temperature:.8,typingSpeed:20};function j({content:e,onComplete:i,speed:n=20,onCharacterTyped:o}){let[a,l]=(0,r.useState)(""),[s,u]=(0,r.useState)(0);return(0,r.useEffect)(()=>{if(s<e.length){let t=setTimeout(()=>{l(t=>t+e[s]),u(e=>e+1),o?.()},n);return()=>clearTimeout(t)}i()},[s,e,n,i,o]),(0,t.jsx)("span",{dangerouslySetInnerHTML:{__html:a.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>")}})}function M(){let[e,n]=(0,r.useState)(!1),[o,a]=(0,r.useState)([]),[l,s]=(0,r.useState)(""),[u,c]=(0,r.useState)(!1),[f,d]=(0,r.useState)(!1),[m,h]=(0,r.useState)([]),[v,p]=(0,r.useState)(!1),[g,x]=(0,r.useState)(0),[S,_]=(0,r.useState)({name:"",email:"",message:""}),[R,P]=(0,r.useState)(null),A=(0,r.useRef)(null),D=(0,r.useRef)(null),C=(0,r.useCallback)(()=>{A.current?.scrollIntoView({behavior:"smooth"})},[]);(0,r.useEffect)(()=>{C()},[o,C]),(0,r.useEffect)(()=>{if(e&&0===o.length){let e="welcome";a([{id:e,content:U.welcomeMessage,sender:"bot",isTyping:!0}]),P(e)}e&&D.current?.focus()},[e,o.length]);let L=(0,r.useCallback)(e=>{a(t=>t.map(t=>t.id===e?{...t,isTyping:!1}:t)),P(null),c(!1),setTimeout(()=>{D.current?.focus()},50)},[]),I=async e=>{try{let t=await fetch(U.workerUrl+"/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e.name,email:e.email,message:e.message})}),r=await t.json();if(!t.ok||!r.success)throw Error(r.error||"Email send failed");return!0}catch(e){return console.error("Email error:",e),!1}},N=e=>{let t=Date.now().toString();a(r=>[...r,{id:t,content:e,sender:"bot",isTyping:!0}]),P(t)},M=async()=>{let e=l.trim();if(e&&!u){if(a(t=>[...t,{id:Date.now().toString(),content:e,sender:"user",isTyping:!1}]),s(""),c(!0),v){if(1===g){_({...S,name:e}),x(2),setTimeout(()=>{N(`Great to meet you, ${e}! What's your email address?`)},300);return}else if(2===g){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))return void setTimeout(()=>{N("Hmm, that doesn't look like a valid email. Could you try again?")},300);_({...S,email:e}),x(3),setTimeout(()=>{N("Perfect! And what message would you like me to pass along to Selva?")},300);return}else if(3===g){let t={...S,message:e};_(t),await I(t)?N("Thank you! I've sent your message to Selva. He typically responds within 24 hours. Have a great day! 🚀"):N("I've noted your message! You can also reach Selva directly at selvaofficialmail@gmail.com or +91 9363087305"),p(!1),x(0),_({name:"",email:"",message:""});return}}d(!0);try{let t=[...m,{role:"user",content:e}];h(t);let r=await fetch(U.workerUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({systemPrompt:U.systemPrompt,conversationHistory:t,model:U.model,temperature:U.temperature})});if(!r.ok)throw Error(`API Error: ${r.status}`);let i=(await r.json()).choices[0].message.content;d(!1),N(i),h(e=>[...e,{role:"assistant",content:i}]),(i.toLowerCase().includes("may i have your name")||i.toLowerCase().includes("what's your name"))&&(p(!0),x(1))}catch(e){d(!1),N("Sorry, I encountered an error. You can also reach Selva at selvaofficialmail@gmail.com"),console.error("Chatbot error:",e)}}};return(0,r.useEffect)(()=>{let e=()=>n(!0);return window.addEventListener("open-chatbot",e),()=>window.removeEventListener("open-chatbot",e)},[]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(i.motion.button,{onClick:()=>n(!e),className:"fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full p-[2px] border border-white/10 bg-white/5 shadow-2xl hidden md:flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 group",whileHover:{scale:1.1},whileTap:{scale:.95},"aria-label":"Open chat",children:[(0,t.jsx)("div",{className:"absolute inset-0 rounded-full pointer-events-none",children:(0,t.jsx)(T.GlowingEffect,{spread:40,glow:!0,disabled:!1,proximity:64,inactiveZone:.01,borderWidth:2,variant:"royal"})}),(0,t.jsxs)("div",{className:"relative z-10 w-full h-full rounded-full bg-black/20 backdrop-blur-3xl backdrop-saturate-150 flex items-center justify-center",children:[(0,t.jsx)("div",{className:"absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"}),(0,t.jsx)(b.MessageSquare,{className:"w-6 h-6 text-white relative z-10"})]})]}),(0,t.jsx)(y,{children:e&&(0,t.jsxs)(i.motion.div,{initial:{opacity:0,y:20,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:20,scale:.95},transition:{duration:.2},className:"fixed bottom-24 right-6 z-50 w-[min(420px,calc(100vw-48px))] h-[min(600px,calc(100vh-140px))] rounded-3xl p-[2px] border border-white/10 shadow-2xl flex flex-col bg-white/5",children:[(0,t.jsx)("div",{className:"absolute inset-0 rounded-[inherit] pointer-events-none",children:(0,t.jsx)(T.GlowingEffect,{spread:40,glow:!0,disabled:!1,proximity:64,inactiveZone:.01,borderWidth:2,variant:"royal"})}),(0,t.jsxs)("div",{className:"relative z-10 w-full h-full rounded-[22px] overflow-hidden flex flex-col bg-black/80 backdrop-blur-3xl backdrop-saturate-150",children:[(0,t.jsx)("div",{className:"absolute inset-0 z-10 opacity-90",children:(0,t.jsx)(F,{color:[1,1,1],amplitude:1.2,distance:0,enableMouseInteraction:!0})}),(0,t.jsxs)("div",{className:"relative z-10 flex items-center justify-between p-5 border-b border-white/10 bg-black/90",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("h3",{className:"text-lg font-semibold text-white flex items-center gap-2",children:[(0,t.jsx)("span",{className:"w-2 h-2 rounded-full bg-green-400 animate-pulse"}),"Selva's AI Twin"]}),(0,t.jsx)("p",{className:"text-xs text-white/50",children:"Ask me anything about Selva!"})]}),(0,t.jsx)("button",{onClick:()=>n(!1),className:"w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-colors","aria-label":"Close chat",children:(0,t.jsx)(w,{className:"w-4 h-4 text-white"})})]}),(0,t.jsxs)("div",{className:"relative z-10 flex-1 overflow-y-auto p-4 space-y-4 bg-black/70",children:[o.map(e=>(0,t.jsx)(i.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:`flex ${"user"===e.sender?"justify-end":"justify-start"}`,children:(0,t.jsx)("div",{className:`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${"user"===e.sender?"bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-md shadow-lg shadow-purple-500/20":"bg-black/80 border border-white/10 text-white rounded-bl-md"}`,children:"bot"===e.sender&&e.isTyping?(0,t.jsx)(j,{content:e.content,speed:U.typingSpeed,onComplete:()=>L(e.id),onCharacterTyped:C}):(0,t.jsx)("span",{dangerouslySetInnerHTML:{__html:e.content.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>")}})})},e.id)),f&&(0,t.jsx)(i.motion.div,{initial:{opacity:0},animate:{opacity:1},className:"flex justify-start",children:(0,t.jsxs)("div",{className:"bg-black/80 border border-white/10 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5",children:[(0,t.jsx)("span",{className:"w-2 h-2 bg-purple-400 rounded-full animate-bounce",style:{animationDelay:"0ms"}}),(0,t.jsx)("span",{className:"w-2 h-2 bg-blue-400 rounded-full animate-bounce",style:{animationDelay:"150ms"}}),(0,t.jsx)("span",{className:"w-2 h-2 bg-cyan-400 rounded-full animate-bounce",style:{animationDelay:"300ms"}})]})}),(0,t.jsx)("div",{ref:A})]}),(0,t.jsx)("div",{className:"relative z-10 p-4 border-t border-white/10 bg-black/90",children:(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("input",{ref:D,type:"text",value:l,onChange:e=>s(e.target.value),onKeyPress:e=>"Enter"===e.key&&M(),placeholder:"Ask me anything about Selva...",className:"flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all",disabled:u||null!==R}),(0,t.jsx)("button",{onClick:M,disabled:u||!l.trim()||null!==R,className:"w-11 h-11 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all","aria-label":"Send message",children:(0,t.jsx)(E.Send,{className:"w-5 h-5 text-white"})})]})})]})]})})]})}e.s(["default",()=>M],84686)}]);