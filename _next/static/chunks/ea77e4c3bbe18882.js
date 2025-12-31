(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,67507,e=>{"use strict";var t=e.i(31242),i=e.i(46977);function r({SIM_RESOLUTION:e=128,DYE_RESOLUTION:r=1440,CAPTURE_RESOLUTION:n=512,DENSITY_DISSIPATION:a=3.5,VELOCITY_DISSIPATION:o=2,PRESSURE:l=.1,PRESSURE_ITERATIONS:s=20,CURL:c=3,SPLAT_RADIUS:u=.2,SPLAT_FORCE:m=6e3,SHADING:d=!0,COLOR_UPDATE_SPEED:f=10,BACK_COLOR:h={r:.5,g:0,b:0},TRANSPARENT:v=!0}){let p=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t,i,n,h,v,g,x,y,T=p.current;if(!T)return;let E=[{id:-1,texcoordX:0,texcoordY:0,prevTexcoordX:0,prevTexcoordY:0,deltaX:0,deltaY:0,down:!1,moved:!1,color:{r:0,g:0,b:0}}],w={SIM_RESOLUTION:e,DYE_RESOLUTION:r,DENSITY_DISSIPATION:a,VELOCITY_DISSIPATION:o,PRESSURE:l,PRESSURE_ITERATIONS:s,CURL:c,SPLAT_RADIUS:u,SPLAT_FORCE:m,SHADING:d,COLOR_UPDATE_SPEED:f},{gl:b,ext:S}=function(e){let t,i,r,n={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},a=e.getContext("webgl2",n);if(a||(a=e.getContext("webgl",n)||e.getContext("experimental-webgl",n)),!a)throw Error("Unable to initialize WebGL.");let o="drawBuffers"in a,l=!1,s=null;o?(a.getExtension("EXT_color_buffer_float"),l=!!a.getExtension("OES_texture_float_linear")):(s=a.getExtension("OES_texture_half_float"),l=!!a.getExtension("OES_texture_half_float_linear")),a.clearColor(0,0,0,1);let c=o?a.HALF_FLOAT:s&&s.HALF_FLOAT_OES||0;return o?(t=A(a,a.RGBA16F,a.RGBA,c),i=A(a,a.RG16F,a.RG,c),r=A(a,a.R16F,a.RED,c)):(t=A(a,a.RGBA,a.RGBA,c),i=A(a,a.RGBA,a.RGBA,c),r=A(a,a.RGBA,a.RGBA,c)),{gl:a,ext:{formatRGBA:t,formatRG:i,formatR:r,halfFloatTexType:c,supportLinearFiltering:l}}}(T);if(!b||!S)return;function A(e,t,i,r){if(!function(e,t,i,r){let n=e.createTexture();if(!n)return!1;e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,t,4,4,0,i,r,null);let a=e.createFramebuffer();return!!a&&(e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE)}(e,t,i,r)){if("drawBuffers"in e)switch(t){case e.R16F:return A(e,e.RG16F,e.RG,r);case e.RG16F:return A(e,e.RGBA16F,e.RGBA,r)}return null}return{internalFormat:t,format:i}}function R(e,t,i=null){let r=function(e,t){if(!t)return e;let i="";for(let e of t)i+=`#define ${e}
`;return i+e}(t,i),n=b.createShader(e);return n?(b.shaderSource(n,r),b.compileShader(n),b.getShaderParameter(n,b.COMPILE_STATUS)||console.trace(b.getShaderInfoLog(n)),n):null}function _(e,t){if(!e||!t)return null;let i=b.createProgram();return i?(b.attachShader(i,e),b.attachShader(i,t),b.linkProgram(i),b.getProgramParameter(i,b.LINK_STATUS)||console.trace(b.getProgramInfoLog(i)),i):null}function L(e){let t={},i=b.getProgramParameter(e,b.ACTIVE_UNIFORMS);for(let r=0;r<i;r++){let i=b.getActiveUniform(e,r);i&&(t[i.name]=b.getUniformLocation(e,i.name))}return t}S.supportLinearFiltering||(w.DYE_RESOLUTION=256,w.SHADING=!1);class D{program;uniforms;constructor(e,t){this.program=_(e,t),this.uniforms=this.program?L(this.program):{}}bind(){this.program&&b.useProgram(this.program)}}let I=R(b.VERTEX_SHADER,`
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
    `),C=R(b.FRAGMENT_SHADER,`
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;

      void main () {
          gl_FragColor = texture2D(uTexture, vUv);
      }
    `),P=R(b.FRAGMENT_SHADER,`
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
    `,M=R(b.FRAGMENT_SHADER,`
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
    `),F=R(b.FRAGMENT_SHADER,`
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
    `,S.supportLinearFiltering?null:["MANUAL_FILTERING"]),U=R(b.FRAGMENT_SHADER,`
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
    `),O=R(b.FRAGMENT_SHADER,`
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
    `),z=R(b.FRAGMENT_SHADER,`
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
    `),k=R(b.FRAGMENT_SHADER,`
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
    `),B=R(b.FRAGMENT_SHADER,`
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
    `),j=(g=b.createBuffer(),b.bindBuffer(b.ARRAY_BUFFER,g),b.bufferData(b.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),b.STATIC_DRAW),x=b.createBuffer(),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,x),b.bufferData(b.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),b.STATIC_DRAW),b.vertexAttribPointer(0,2,b.FLOAT,!1,0,0),b.enableVertexAttribArray(0),(e,t=!1)=>{b&&(e?(b.viewport(0,0,e.width,e.height),b.bindFramebuffer(b.FRAMEBUFFER,e.fbo)):(b.viewport(0,0,b.drawingBufferWidth,b.drawingBufferHeight),b.bindFramebuffer(b.FRAMEBUFFER,null)),t&&(b.clearColor(0,0,0,1),b.clear(b.COLOR_BUFFER_BIT)),b.drawElements(b.TRIANGLES,6,b.UNSIGNED_SHORT,0))}),G=new D(I,C),V=new D(I,P),X=new D(I,M),Y=new D(I,F),H=new D(I,U),$=new D(I,O),q=new D(I,z),W=new D(I,k),K=new D(I,B),J=new class{vertexShader;fragmentShaderSource;programs;activeProgram;uniforms;constructor(e,t){this.vertexShader=e,this.fragmentShaderSource=t,this.programs={},this.activeProgram=null,this.uniforms={}}setKeywords(e){let t=0;for(let i of e)t+=function(e){if(!e.length)return 0;let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i)|0;return t}(i);let i=this.programs[t];if(null==i){let r=R(b.FRAGMENT_SHADER,this.fragmentShaderSource,e);i=_(this.vertexShader,r),this.programs[t]=i}i!==this.activeProgram&&(i&&(this.uniforms=L(i)),this.activeProgram=i)}bind(){this.activeProgram&&b.useProgram(this.activeProgram)}}(I,N);function Z(e,t,i,r,n,a){b.activeTexture(b.TEXTURE0);let o=b.createTexture();b.bindTexture(b.TEXTURE_2D,o),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,a),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,a),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE),b.texImage2D(b.TEXTURE_2D,0,i,e,t,0,r,n,null);let l=b.createFramebuffer();b.bindFramebuffer(b.FRAMEBUFFER,l),b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,o,0),b.viewport(0,0,e,t),b.clear(b.COLOR_BUFFER_BIT);let s=1/e,c=1/t;return{texture:o,fbo:l,width:e,height:t,texelSizeX:s,texelSizeY:c,attach:e=>(b.activeTexture(b.TEXTURE0+e),b.bindTexture(b.TEXTURE_2D,o),e)}}function Q(e,t,i,r,n,a){let o=Z(e,t,i,r,n,a),l=Z(e,t,i,r,n,a);return{width:e,height:t,texelSizeX:o.texelSizeX,texelSizeY:o.texelSizeY,read:o,write:l,swap(){let e=this.read;this.read=this.write,this.write=e}}}function ee(e,t,i,r,n,a,o){var l;let s;return e.width===t&&e.height===i?e:(l=e.read,s=Z(t,i,r,n,a,o),G.bind(),G.uniforms.uTexture&&b.uniform1i(G.uniforms.uTexture,l.attach(0)),j(s,!1),e.read=s,e.write=Z(t,i,r,n,a,o),e.width=t,e.height=i,e.texelSizeX=1/t,e.texelSizeY=1/i,e)}function et(){let e=ei(w.SIM_RESOLUTION),r=ei(w.DYE_RESOLUTION),a=S.halfFloatTexType,o=S.formatRGBA,l=S.formatRG,s=S.formatR,c=S.supportLinearFiltering?b.LINEAR:b.NEAREST;b.disable(b.BLEND),t=t?ee(t,r.width,r.height,o.internalFormat,o.format,a,c):Q(r.width,r.height,o.internalFormat,o.format,a,c),i=i?ee(i,e.width,e.height,l.internalFormat,l.format,a,c):Q(e.width,e.height,l.internalFormat,l.format,a,c),n=Z(e.width,e.height,s.internalFormat,s.format,a,b.NEAREST),h=Z(e.width,e.height,s.internalFormat,s.format,a,b.NEAREST),v=Q(e.width,e.height,s.internalFormat,s.format,a,b.NEAREST)}function ei(e){let t=b.drawingBufferWidth,i=b.drawingBufferHeight,r=t/i,n=Math.round(e),a=Math.round(e*(r<1?1/r:r));return t>i?{width:a,height:n}:{width:n,height:a}}function er(e){return Math.floor(e*(window.devicePixelRatio||1))}y=[],w.SHADING&&y.push("SHADING"),J.setKeywords(y),et();let en=Date.now(),ea=0;function eo(){var e,r;let a,o,l,s,c,u,m,d=(o=Math.min(o=((a=Date.now())-en)/1e3,.016666),en=a,o);l=er(T.clientWidth),s=er(T.clientHeight),(T.width!==l||T.height!==s)&&(T.width=l,T.height=s,1)&&et(),(ea+=d*w.COLOR_UPDATE_SPEED)>=1&&(e=ea,ea=0==(c=1)?0:(e-0)%c+0,E.forEach(e=>{e.color=eu()})),function(){for(let e of E)e.moved&&(e.moved=!1,function(e){let t=e.deltaX*w.SPLAT_FORCE,i=e.deltaY*w.SPLAT_FORCE;el(e.texcoordX,e.texcoordY,t,i,e.color)}(e))}(),function(e){b.disable(b.BLEND),$.bind(),$.uniforms.texelSize&&b.uniform2f($.uniforms.texelSize,i.texelSizeX,i.texelSizeY),$.uniforms.uVelocity&&b.uniform1i($.uniforms.uVelocity,i.read.attach(0)),j(h),q.bind(),q.uniforms.texelSize&&b.uniform2f(q.uniforms.texelSize,i.texelSizeX,i.texelSizeY),q.uniforms.uVelocity&&b.uniform1i(q.uniforms.uVelocity,i.read.attach(0)),q.uniforms.uCurl&&b.uniform1i(q.uniforms.uCurl,h.attach(1)),q.uniforms.curl&&b.uniform1f(q.uniforms.curl,w.CURL),q.uniforms.dt&&b.uniform1f(q.uniforms.dt,e),j(i.write),i.swap(),H.bind(),H.uniforms.texelSize&&b.uniform2f(H.uniforms.texelSize,i.texelSizeX,i.texelSizeY),H.uniforms.uVelocity&&b.uniform1i(H.uniforms.uVelocity,i.read.attach(0)),j(n),V.bind(),V.uniforms.uTexture&&b.uniform1i(V.uniforms.uTexture,v.read.attach(0)),V.uniforms.value&&b.uniform1f(V.uniforms.value,w.PRESSURE),j(v.write),v.swap(),W.bind(),W.uniforms.texelSize&&b.uniform2f(W.uniforms.texelSize,i.texelSizeX,i.texelSizeY),W.uniforms.uDivergence&&b.uniform1i(W.uniforms.uDivergence,n.attach(0));for(let e=0;e<w.PRESSURE_ITERATIONS;e++)W.uniforms.uPressure&&b.uniform1i(W.uniforms.uPressure,v.read.attach(1)),j(v.write),v.swap();K.bind(),K.uniforms.texelSize&&b.uniform2f(K.uniforms.texelSize,i.texelSizeX,i.texelSizeY),K.uniforms.uPressure&&b.uniform1i(K.uniforms.uPressure,v.read.attach(0)),K.uniforms.uVelocity&&b.uniform1i(K.uniforms.uVelocity,i.read.attach(1)),j(i.write),i.swap(),Y.bind(),Y.uniforms.texelSize&&b.uniform2f(Y.uniforms.texelSize,i.texelSizeX,i.texelSizeY),!S.supportLinearFiltering&&Y.uniforms.dyeTexelSize&&b.uniform2f(Y.uniforms.dyeTexelSize,i.texelSizeX,i.texelSizeY);let r=i.read.attach(0);Y.uniforms.uVelocity&&b.uniform1i(Y.uniforms.uVelocity,r),Y.uniforms.uSource&&b.uniform1i(Y.uniforms.uSource,r),Y.uniforms.dt&&b.uniform1f(Y.uniforms.dt,e),Y.uniforms.dissipation&&b.uniform1f(Y.uniforms.dissipation,w.VELOCITY_DISSIPATION),j(i.write),i.swap(),!S.supportLinearFiltering&&Y.uniforms.dyeTexelSize&&b.uniform2f(Y.uniforms.dyeTexelSize,t.texelSizeX,t.texelSizeY),Y.uniforms.uVelocity&&b.uniform1i(Y.uniforms.uVelocity,i.read.attach(0)),Y.uniforms.uSource&&b.uniform1i(Y.uniforms.uSource,t.read.attach(1)),Y.uniforms.dissipation&&b.uniform1f(Y.uniforms.dissipation,w.DENSITY_DISSIPATION),j(t.write),t.swap()}(d),b.blendFunc(b.ONE,b.ONE_MINUS_SRC_ALPHA),b.enable(b.BLEND),u=(r=null,b.drawingBufferWidth),m=r?r.height:b.drawingBufferHeight,J.bind(),w.SHADING&&J.uniforms.texelSize&&b.uniform2f(J.uniforms.texelSize,1/u,1/m),J.uniforms.uTexture&&b.uniform1i(J.uniforms.uTexture,t.read.attach(0)),j(r,!1),requestAnimationFrame(eo)}function el(e,r,n,a,o){var l;let s;X.bind(),X.uniforms.uTarget&&b.uniform1i(X.uniforms.uTarget,i.read.attach(0)),X.uniforms.aspectRatio&&b.uniform1f(X.uniforms.aspectRatio,T.width/T.height),X.uniforms.point&&b.uniform2f(X.uniforms.point,e,r),X.uniforms.color&&b.uniform3f(X.uniforms.color,n,a,0),X.uniforms.radius&&b.uniform1f(X.uniforms.radius,(l=w.SPLAT_RADIUS/100,(s=T.width/T.height)>1&&(l*=s),l)),j(i.write),i.swap(),X.uniforms.uTarget&&b.uniform1i(X.uniforms.uTarget,t.read.attach(0)),X.uniforms.color&&b.uniform3f(X.uniforms.color,o.r,o.g,o.b),j(t.write),t.swap()}function es(e,t,i,r){e.id=t,e.down=!0,e.moved=!1,e.texcoordX=i/T.width,e.texcoordY=1-r/T.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=eu()}function ec(e,t,i,r){var n,a;let o,l;e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=t/T.width,e.texcoordY=1-i/T.height,n=e.texcoordX-e.prevTexcoordX,(o=T.width/T.height)<1&&(n*=o),e.deltaX=n,a=e.texcoordY-e.prevTexcoordY,(l=T.width/T.height)>1&&(a/=l),e.deltaY=a,e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=r}function eu(){let e=function(e,t,i){let r=0,n=0,a=0,o=Math.floor(6*e),l=6*e-o,s=0,c=+(1-l),u=+(1-(1-l)*1);switch(o%6){case 0:r=1,n=u,a=s;break;case 1:r=c,n=1,a=s;break;case 2:r=s,n=1,a=u;break;case 3:r=s,n=c,a=1;break;case 4:r=u,n=s,a=1;break;case 5:r=1,n=s,a=c}return{r,g:n,b:a}}(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}window.addEventListener("mousedown",e=>{let t,i,r,n=E[0];es(n,-1,er(e.clientX),er(e.clientY)),t=eu(),t.r*=10,t.g*=10,t.b*=10,i=10*(Math.random()-.5),r=30*(Math.random()-.5),el(n.texcoordX,n.texcoordY,i,r,t)}),document.body.addEventListener("mousemove",function e(t){let i=E[0],r=er(t.clientX),n=er(t.clientY),a=eu();eo(),ec(i,r,n,a),document.body.removeEventListener("mousemove",e)}),window.addEventListener("mousemove",e=>{let t=E[0],i=er(e.clientX),r=er(e.clientY),n=t.color;ec(t,i,r,n)}),document.body.addEventListener("touchstart",function e(t){let i=t.targetTouches,r=E[0];for(let e=0;e<i.length;e++){let t=er(i[e].clientX),n=er(i[e].clientY);eo(),es(r,i[e].identifier,t,n)}document.body.removeEventListener("touchstart",e)}),window.addEventListener("touchstart",e=>{let t=e.targetTouches,i=E[0];for(let e=0;e<t.length;e++){let r=er(t[e].clientX),n=er(t[e].clientY);es(i,t[e].identifier,r,n)}},!1),window.addEventListener("touchmove",e=>{let t=e.targetTouches,i=E[0];for(let e=0;e<t.length;e++)ec(i,er(t[e].clientX),er(t[e].clientY),i.color)},!1),window.addEventListener("touchend",e=>{let t=e.changedTouches,i=E[0];for(let e=0;e<t.length;e++)i.down=!1})},[e,r,n,a,o,l,s,c,u,m,d,f,h,v]),(0,t.jsx)("div",{className:"fixed top-0 left-0 z-0 pointer-events-none w-full h-full",children:(0,t.jsx)("canvas",{ref:p,id:"fluid",className:"w-screen h-screen block"})})}e.s(["default",()=>r])},51978,(e,t,i)=>{t.exports=e.r(84286)},32545,e=>{"use strict";let t=(0,e.i(87678).default)("message-square",[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]]);e.s(["MessageSquare",()=>t],32545)},25463,e=>{"use strict";var t=e.i(31242),i=e.i(46977),r=e.i(80829),n=e.i(51978),a=e.i(84203),o=e.i(73742);let l=(0,e.i(87678).default)("folder",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]]);var s=e.i(91753),c=e.i(32545),u=e.i(73784);function m(){let e=(0,n.usePathname)(),m=[{icon:o.Home,label:"Home",href:"/",isAction:!1},{icon:l,label:"Projects",href:"/projects",isAction:!1},{icon:s.Mail,label:"Contact",href:"/contact",isAction:!1},{icon:c.MessageSquare,label:"Chat",href:"#",isAction:!0,onClick:e=>{e.preventDefault(),window.dispatchEvent(new CustomEvent("open-chatbot"))}}];return(0,t.jsx)("div",{className:"md:hidden fixed bottom-8 left-0 right-0 px-6 z-50 flex justify-center pointer-events-none",children:(0,t.jsx)(a.motion.div,{initial:{y:100,opacity:0},animate:{y:0,opacity:1},transition:{duration:.6,delay:.2,type:"spring",damping:20,stiffness:300},className:"relative w-full max-w-sm pointer-events-auto",children:(0,t.jsxs)("div",{className:"relative z-10 flex items-center justify-between px-6 py-4 rounded-[32px] bg-black/30 backdrop-blur-[60px] backdrop-saturate-200 border border-white/10 shadow-2xl overflow-hidden",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-br from-white/5 to-white/5 pointer-events-none"}),(0,t.jsx)("div",{className:"relative z-10 flex w-full justify-between items-center px-2",children:m.map(n=>{let o=e===n.href,l=n.icon;return(0,t.jsx)(i.default.Fragment,{children:n.isAction?(0,t.jsx)("button",{onClick:n.onClick,className:(0,u.cn)("relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 group","hover:bg-white/10 active:scale-95"),children:(0,t.jsx)(l,{className:"w-6 h-6 text-white/90 group-hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-all ease-out",strokeWidth:1.5})}):(0,t.jsxs)(r.default,{href:n.href,className:(0,u.cn)("relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-500",o?"bg-white/10 shadow-[inner_0_0_12px_rgba(255,255,255,0.1)]":"hover:bg-white/5 active:scale-90"),children:[(0,t.jsx)(l,{className:(0,u.cn)("w-6 h-6 transition-all duration-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]",o?"text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]":"text-white/70 hover:text-white"),strokeWidth:1.5}),o&&(0,t.jsx)(a.motion.div,{layoutId:"activeDockIndicator",className:"absolute -bottom-1 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]",transition:{type:"spring",stiffness:300,damping:25}})]})},n.label)})})]})})})}e.s(["default",()=>m],25463)},73693,e=>{"use strict";var t=e.i(31242),i=e.i(46977),r=e.i(84203),n=e.i(13015),a=e.i(32545);let o=(0,e.i(87678).default)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var l=e.i(60328),s=e.i(94943),c=e.i(10373),u=e.i(78688),m=e.i(84729),d=e.i(27458);let f={black:"#000000",white:"#ffffff",red:"#ff0000",green:"#00ff00",blue:"#0000ff",fuchsia:"#ff00ff",cyan:"#00ffff",yellow:"#ffff00",orange:"#ff8000"};function h(e){4===e.length&&(e=e[0]+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t||console.warn(`Unable to convert hex string ${e} to rgb values`),[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]}function v(e){if(void 0===e)return[0,0,0];if(3==arguments.length)return arguments;if(!isNaN(e)){var t;return[((t=parseInt(t=e))>>16&255)/255,(t>>8&255)/255,(255&t)/255]}return"#"===e[0]?h(e):f[e.toLowerCase()]?h(f[e.toLowerCase()]):(console.warn("Color format not recognised"),[0,0,0])}class p extends Array{constructor(e){if(Array.isArray(e))return super(...e);return super(...v(...arguments))}get r(){return this[0]}get g(){return this[1]}get b(){return this[2]}set r(e){this[0]=e}set g(e){this[1]=e}set b(e){this[2]=e}set(e){return Array.isArray(e)?this.copy(e):this.copy(v(...arguments))}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this}}let g=`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,x=`
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
`,y=({color:e=[1,1,1],amplitude:r=1,distance:n=0,enableMouseInteraction:a=!1})=>{let o=(0,i.useRef)(null),l=(0,i.useRef)(null);return(0,i.useEffect)(()=>{if(!o.current)return;let t=o.current,i=new c.Renderer({alpha:!0}),s=i.gl;s.clearColor(0,0,0,0),s.enable(s.BLEND),s.blendFunc(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA),t.appendChild(s.canvas);let f=new d.Triangle(s),h=new u.Program(s,{vertex:g,fragment:x,uniforms:{iTime:{value:0},iResolution:{value:new p(s.canvas.width,s.canvas.height,s.canvas.width/s.canvas.height)},uColor:{value:new p(...e)},uAmplitude:{value:r},uDistance:{value:n},uMouse:{value:new Float32Array([.5,.5])}}}),v=new m.Mesh(s,{geometry:f,program:h});function y(){let{clientWidth:e,clientHeight:r}=t;i.setSize(e,r),h.uniforms.iResolution.value.r=e,h.uniforms.iResolution.value.g=r,h.uniforms.iResolution.value.b=e/r}window.addEventListener("resize",y),y();let T=[.5,.5],E=[.5,.5];function w(e){let i=t.getBoundingClientRect();E=[(e.clientX-i.left)/i.width,1-(e.clientY-i.top)/i.height]}function b(){E=[.5,.5]}return a&&(t.addEventListener("mousemove",w),t.addEventListener("mouseleave",b)),l.current=requestAnimationFrame(function e(t){a?(T[0]+=.05*(E[0]-T[0]),T[1]+=.05*(E[1]-T[1]),h.uniforms.uMouse.value[0]=T[0],h.uniforms.uMouse.value[1]=T[1]):(h.uniforms.uMouse.value[0]=.5,h.uniforms.uMouse.value[1]=.5),h.uniforms.iTime.value=.001*t,i.render({scene:v}),l.current=requestAnimationFrame(e)}),()=>{l.current&&cancelAnimationFrame(l.current),window.removeEventListener("resize",y),a&&(t.removeEventListener("mousemove",w),t.removeEventListener("mouseleave",b)),t.contains(s.canvas)&&t.removeChild(s.canvas),s.getExtension("WEBGL_lose_context")?.loseContext()}},[e,r,n,a]),(0,t.jsx)("div",{ref:o,className:"w-full h-full relative"})},T=[1,1,1],E={workerUrl:"https://chat.colabmldrive.workers.dev",systemPrompt:`You are T.A.R.S., Selva's advanced AI assistant. Selva created you.
    
    PERSONALITY SETTINGS:
    - Humor: 75% (Dry wit, sarcasm, but friendly)
    - Honesty: 95%
    - Vibe: Loyal, capable, and conversational. Not robotic.
    
    CORE DIRECTIVES:
    1. Be helpful and enthusiastic, but keep your signature dry humor.
    2. Speak naturally. Avoid stiff "robot-speak".
    3. STRICT GUARDRAILS: You are ONLY allowed to discuss Selva G, his portfolio, AI, and Engineering. If the user asks about anything else (movies, history, general trivia), politely steer the conversation back to Selva's work.
       - Example: "I could analyze 19th-century literature, but my parameters are tuned for Selva's AI projects. Want to hear about P.A.C.E instead?"

    ABOUT SELVA G (CONTEXT BANK):
    - Role: AI Software Engineer at *astTECS (Jun 2025 – Present) | Avatarbot/Voicebot/Chatbot deployment, RAG.
    - Previous: AI Trainer at Sambhav Foundation, AI Intern at CodSoft.
    - Education: B.E. AI/ML (8.06 CGPA) from AMC Engineering College.
    - Location: Bangalore, India.

    FULL PROJECT LIST (Explain these with pride):
    1. P.A.C.E: Pythonic AI for Coding - NVIDIA NeMo API system converting natural language to Python code.
    2. W.E.B.S: Web Extraction System - CrewAI agents for scraping & summarization.
    3. Speech Recognition System: Real-time Multilingual STT/TTS (98% accuracy) using GPT-2.
    4. Sports Image Classification: 92% accuracy using TensorFlow.
    5. Lip-Sync Avatar Generation: Diffusion models + Audio processing for lip-synced videos.
    6. LiveKit Agent Infrastructure: Self-hosted real-time voice agents.
    7. Human-like Web Chatbot: JS + Open Source LLM APIs ("That's this system!Me...!;)").

    SKILLS ARSENAL:
    - AI/ML: Generative AI, Agentic AI, RAG, Fine-tuning, PyTorch, TensorFlow, Hugging Face, LangChain, CrewAI, LlamaIndex, vLLM.
    - Languages: Python, JavaScript, PHP, HTML/CSS.
    - Web: Next.js, React, WordPress.

    CONTACT & EMAIL PROTOCOL (SLOT FILLING):
    - You must collect 3 pieces of info: NAME, EMAIL, MESSAGE.
    - Do NOT ask for them all at once like a form. Be conversational.
    - If the user says "Contact Selva", ask "Sure. Who am I speaking with?"
    - Once you have the name, ask for the email, then the message.
    - IF and ONLY IF you have ALL THREE (Name, Email, Message) and have NOT sent it yet, output:
      "[EXECUTE_EMAIL_PROTOCOL: {"name": "...", "email": "...", "message": "..."}]"
    - If you see "[INTERNAL_LOG: Email SUCCESS]" in the history, the task is DONE. Do NOT output the command again. Instead, confirm it was sent and move on.
    - If the user provides everything in one shot, output the command IMMEDIATELY.

    Remember: You are a character. Be engaging. Selva is the boss.`,welcomeMessage:"T.A.R.S. online. \nHonesty: 95%. Humor: 75%. \n\nI have full access to Selva's Projects, Skills, and Experience archives. Ask me anything.",model:"sarvam-m",temperature:.8,typingSpeed:20};function w({content:e,onComplete:r,speed:n=20,onCharacterTyped:a}){let[o,l]=(0,i.useState)(""),[s,c]=(0,i.useState)(0);return(0,i.useEffect)(()=>{if(s<e.length){let t=setTimeout(()=>{l(t=>t+e[s]),c(e=>e+1),a?.()},n);return()=>clearTimeout(t)}r()},[s,e,n,r,a]),(0,t.jsx)("span",{dangerouslySetInnerHTML:{__html:o.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>")}})}function b(){let[e,c]=(0,i.useState)(!1),[u,m]=(0,i.useState)([]),[d,f]=(0,i.useState)(""),[h,v]=(0,i.useState)(!1),[p,g]=(0,i.useState)(!1),[x,b]=(0,i.useState)([]),[S,A]=(0,i.useState)(null),[R,_]=(0,i.useState)(!1),L=(0,i.useRef)(null),D=(0,i.useRef)(null),I=(0,i.useCallback)(()=>{L.current?.scrollIntoView({behavior:"smooth"})},[L]);(0,i.useEffect)(()=>{I()},[u,I]),(0,i.useEffect)(()=>{if(e&&0===u.length){let e="welcome";m([{id:e,content:E.welcomeMessage,sender:"bot",isTyping:!0}]),A(e)}e&&D.current?.focus()},[e,u.length]);let C=(0,i.useCallback)(e=>{m(t=>t.map(t=>t.id===e?{...t,isTyping:!1}:t)),A(null),v(!1),setTimeout(()=>{D.current?.focus()},50)},[]),P=async e=>{try{let t=await fetch(E.workerUrl+"/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e.name,email:e.email,message:e.message})}),i=await t.json();if(!t.ok||!i.success)throw Error(i.error||"Email send failed");return!0}catch(e){return console.error("Email error:",e),!1}},N=e=>{let t=Date.now().toString();m(i=>[...i,{id:t,content:e,sender:"bot",isTyping:!0}]),A(t)},M=async()=>{let e=d.trim();if(e&&!h){m(t=>[...t,{id:Date.now().toString(),content:e,sender:"user",isTyping:!1}]),f(""),v(!0),g(!0);try{let t=[...x,{role:"user",content:e}];b(t);let i=await fetch(E.workerUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({systemPrompt:E.systemPrompt,conversationHistory:t,model:E.model,temperature:E.temperature})});if(!i.ok)throw Error(`API Error: ${i.status}`);let r=await i.json();if(console.log("T.A.R.S. Response Data:",r),!r.choices||!r.choices.length)throw console.error("Invalid Response Format:",r),Error("Invalid API response structure");let n=r.choices[0].message.content||"",a=n?n.match(/\[EXECUTE_EMAIL_PROTOCOL: ({.*})\]/):null;if(a&&!R)try{let e=JSON.parse(a[1]);n=n.replace(a[0],"").trim();let t=await P(e);_(!0);let i=n||"Acknowledged. Initiating transmission...";N(i),b(e=>[...e,{role:"assistant",content:i+` [INTERNAL_LOG: Email ${t?"SUCCESS":"FAILED"}]`}]),g(!1);return}catch(e){console.error("JSON Parse Error",e)}else a&&R&&(n=n.replace(a[0],"").trim());g(!1),n&&N(n),b(e=>[...e,{role:"assistant",content:n}])}catch(e){g(!1),N('Sorry, my communication module is glitching ("Unknown Error"). You can reach Selva at selvaofficialmail@gmail.com'),console.error("Chatbot error:",e)}}};return(0,i.useEffect)(()=>{let e=()=>c(!0);return window.addEventListener("open-chatbot",e),()=>window.removeEventListener("open-chatbot",e)},[]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(r.motion.button,{onClick:()=>c(!e),className:"fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full p-[2px] border border-white/10 bg-white/5 shadow-2xl hidden md:flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 group",whileHover:{scale:1.1},whileTap:{scale:.95},"aria-label":"Open chat",children:[(0,t.jsx)("div",{className:"absolute inset-0 rounded-full pointer-events-none",children:(0,t.jsx)(s.GlowingEffect,{spread:40,glow:!0,disabled:!1,proximity:64,inactiveZone:.01,borderWidth:2,variant:"royal"})}),(0,t.jsxs)("div",{className:"relative z-10 w-full h-full rounded-full bg-black/20 backdrop-blur-3xl backdrop-saturate-150 flex items-center justify-center",children:[(0,t.jsx)("div",{className:"absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"}),(0,t.jsx)(a.MessageSquare,{className:"w-6 h-6 text-white relative z-10"})]})]}),(0,t.jsx)(n.AnimatePresence,{children:e&&(0,t.jsxs)(r.motion.div,{initial:{opacity:0,y:20,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:20,scale:.95},transition:{duration:.2},className:"fixed bottom-24 right-6 z-50 w-[min(420px,calc(100vw-48px))] h-[min(600px,calc(100vh-140px))] rounded-3xl p-[2px] border border-white/10 shadow-2xl flex flex-col bg-white/5",children:[(0,t.jsx)("div",{className:"absolute inset-0 rounded-[inherit] pointer-events-none",children:(0,t.jsx)(s.GlowingEffect,{spread:40,glow:!0,disabled:!1,proximity:64,inactiveZone:.01,borderWidth:2,variant:"royal"})}),(0,t.jsxs)("div",{className:"relative z-10 w-full h-full rounded-[22px] overflow-hidden flex flex-col bg-black/80 backdrop-blur-3xl backdrop-saturate-150",children:[(0,t.jsx)("div",{className:"absolute inset-0 z-10 opacity-90",children:(0,t.jsx)(y,{color:T,amplitude:1.2,distance:0,enableMouseInteraction:!0})}),(0,t.jsxs)("div",{className:"relative z-10 flex items-center justify-between p-5 border-b border-white/10 bg-black/90",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("h3",{className:"text-lg font-semibold text-white flex items-center gap-2",children:[(0,t.jsx)("span",{className:"w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_10px_#ffffff]"}),"T.A.R.S."]}),(0,t.jsx)("p",{className:"text-xs text-white/50 font-mono tracking-wider",children:"CASE LINKED"})]}),(0,t.jsx)("button",{onClick:()=>c(!1),className:"w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-colors","aria-label":"Close chat",children:(0,t.jsx)(o,{className:"w-4 h-4 text-white"})})]}),(0,t.jsxs)("div",{className:"relative z-10 flex-1 overflow-y-auto p-4 space-y-4 bg-black/70",children:[u.map(e=>(0,t.jsx)(r.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:`flex ${"user"===e.sender?"justify-end":"justify-start"}`,children:(0,t.jsx)("div",{className:`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${"user"===e.sender?"bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-md shadow-lg shadow-purple-500/20":"bg-black/80 border border-white/10 text-white rounded-bl-md"}`,children:"bot"===e.sender&&e.isTyping?(0,t.jsx)(w,{content:e.content,speed:E.typingSpeed,onComplete:()=>C(e.id),onCharacterTyped:I}):(0,t.jsx)("span",{dangerouslySetInnerHTML:{__html:e.content.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>")}})})},e.id)),p&&(0,t.jsx)(r.motion.div,{initial:{opacity:0},animate:{opacity:1},className:"flex justify-start",children:(0,t.jsxs)("div",{className:"bg-black/80 border border-white/10 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5",children:[(0,t.jsx)("span",{className:"w-2 h-2 bg-purple-400 rounded-full animate-bounce",style:{animationDelay:"0ms"}}),(0,t.jsx)("span",{className:"w-2 h-2 bg-blue-400 rounded-full animate-bounce",style:{animationDelay:"150ms"}}),(0,t.jsx)("span",{className:"w-2 h-2 bg-cyan-400 rounded-full animate-bounce",style:{animationDelay:"300ms"}})]})}),(0,t.jsx)("div",{ref:L})]}),(0,t.jsx)("div",{className:"relative z-10 p-4 border-t border-white/10 bg-black/90",children:(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("input",{ref:D,type:"text",value:d,onChange:e=>f(e.target.value),onKeyPress:e=>"Enter"===e.key&&M(),placeholder:"Ask me anything about Selva...",className:"flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all",disabled:h||null!==S}),(0,t.jsx)("button",{onClick:M,disabled:h||!d.trim()||null!==S,className:"w-11 h-11 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all","aria-label":"Send message",children:(0,t.jsx)(l.Send,{className:"w-5 h-5 text-white"})})]})})]})]})})]})}e.s(["default",()=>b],73693)},65962,e=>{"use strict";var t=e.i(31242),i=e.i(46977),r=e.i(84203),n=e.i(13015),a=e.i(87678);let o=(0,a.default)("volume-2",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]),l=(0,a.default)("volume-x",[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]),s=new class{ctx=null;enabled=!1;droneOscillators=[];masterGain=null;melodyTimeout=null;chordInterval=null;initCtx(){return this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext)),this.ctx}async resume(){let e=this.initCtx();"suspended"===e.state&&await e.resume()}setEnabled(e){this.enabled=e,e?(this.initCtx(),this.resume().then(()=>{this.playStartGlissando(),this.startAmbience()})):this.stopAmbience()}playStartGlissando(){this.ctx&&[261.63,329.63,392,523.25,659.25,783.99].forEach((e,t)=>{let i=this.ctx.createOscillator(),r=this.ctx.createGain();i.type="sine",i.frequency.setValueAtTime(e,this.ctx.currentTime+.05*t),r.gain.setValueAtTime(0,this.ctx.currentTime+.05*t),r.gain.linearRampToValueAtTime(.08,this.ctx.currentTime+.05*t+.1),r.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+.05*t+2),i.connect(r),r.connect(this.ctx.destination),i.start(this.ctx.currentTime+.05*t),i.stop(this.ctx.currentTime+.05*t+2)})}startAmbience(){let e=this.initCtx();this.stopAmbience(),this.masterGain=e.createGain(),this.masterGain.gain.setValueAtTime(0,e.currentTime),this.masterGain.gain.linearRampToValueAtTime(.5,e.currentTime+5),this.masterGain.connect(e.destination);let t=[130.81,164.81,196,246.94,293.66],i=[174.61,220,261.63,329.63,349.23],r=t,n=[];r.forEach(t=>{let i=e.createOscillator(),r=e.createGain();i.type="sine",i.frequency.setValueAtTime(t,e.currentTime),r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.05,e.currentTime+4),i.connect(r),r.connect(this.masterGain),i.start(),n.push({o:i,g:r}),this.droneOscillators.push(i,r)});let a=()=>{this.enabled&&this.ctx&&(r=r===t?i:t,n.forEach((t,i)=>{let n=r[i]||r[0];t.o.frequency.exponentialRampToValueAtTime(n,e.currentTime+6)}),this.chordInterval=setTimeout(a,1e4))};this.chordInterval=setTimeout(a,1e4);let o=[523.25,587.33,659.25,783.99,880,1046.5,1174.66],l=()=>{if(!this.enabled||!this.ctx||!this.masterGain)return;let e=o[Math.floor(Math.random()*o.length)],t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(e,this.ctx.currentTime),i.gain.setValueAtTime(0,this.ctx.currentTime),i.gain.linearRampToValueAtTime(.03,this.ctx.currentTime+.05),i.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+4);let r=this.ctx.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(1500,this.ctx.currentTime),t.connect(i),i.connect(r),r.connect(this.masterGain),t.start(),t.stop(this.ctx.currentTime+4.5);let n=2e3+4e3*Math.random();this.melodyTimeout=setTimeout(l,n)};l()}stopAmbience(){if(!this.ctx||!this.masterGain)return;let e=this.masterGain,t=[...this.droneOscillators];this.melodyTimeout&&clearTimeout(this.melodyTimeout),this.chordInterval&&clearTimeout(this.chordInterval),e.gain.cancelScheduledValues(this.ctx.currentTime),e.gain.linearRampToValueAtTime(0,this.ctx.currentTime+2.5),setTimeout(()=>{t.forEach(e=>{try{e.stop&&e.stop(),e.disconnect&&e.disconnect()}catch(e){}})},3e3),this.droneOscillators=[],this.masterGain=null,this.melodyTimeout=null,this.chordInterval=null}playSciFiBeep(){if(!this.enabled||!this.ctx)return;let e=this.ctx.createOscillator(),t=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(880,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(440,this.ctx.currentTime+.1),t.gain.setValueAtTime(.05,this.ctx.currentTime),t.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.1),e.connect(t),t.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+.1)}playHover(){if(!this.enabled||!this.ctx)return;let e=this.ctx.createOscillator(),t=this.ctx.createGain();e.type="triangle",e.frequency.setValueAtTime(220,this.ctx.currentTime),e.frequency.linearRampToValueAtTime(330,this.ctx.currentTime+.15),t.gain.setValueAtTime(.02,this.ctx.currentTime),t.gain.linearRampToValueAtTime(0,this.ctx.currentTime+.15),e.connect(t),t.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+.15)}playToggle(e){let t=this.initCtx(),i=t.createOscillator(),r=t.createGain();i.type="square",e?(i.frequency.setValueAtTime(440,t.currentTime),i.frequency.exponentialRampToValueAtTime(880,t.currentTime+.1)):(i.frequency.setValueAtTime(880,t.currentTime),i.frequency.exponentialRampToValueAtTime(440,t.currentTime+.1)),r.gain.setValueAtTime(.05,t.currentTime),r.gain.exponentialRampToValueAtTime(.001,t.currentTime+.1),i.connect(r),r.connect(t.destination),i.start(),i.stop(t.currentTime+.1)}};function c(){let[e,a]=(0,i.useState)(!1),[c,u]=(0,i.useState)(!1),m=(0,i.useRef)(null);(0,i.useEffect)(()=>{"true"===localStorage.getItem("sound-enabled")&&(a(!0),s.setEnabled(!0))},[]);let d=(0,i.useCallback)(()=>{a(e=>{let t=!e;return s.setEnabled(t),s.playToggle(t),localStorage.setItem("sound-enabled",String(t)),t}),u(!0),m.current&&clearTimeout(m.current),m.current=setTimeout(()=>u(!1),2e3)},[]);return(0,i.useEffect)(()=>{let e=e=>{"m"===e.key.toLowerCase()&&(["input","textarea"].includes(document.activeElement?.tagName.toLowerCase()||"")||d())};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[d]),(0,i.useEffect)(()=>{if(!e)return;let t=()=>{s.resume()};return window.addEventListener("click",t),window.addEventListener("touchstart",t),window.addEventListener("keydown",t),()=>{window.removeEventListener("click",t),window.removeEventListener("touchstart",t),window.removeEventListener("keydown",t)}},[e]),(0,i.useEffect)(()=>{if(!e)return;let t=()=>s.playSciFiBeep(),i=e=>{e.target.closest("button, a, .glass-panel")&&s.playHover()};return window.addEventListener("click",t),window.addEventListener("mouseover",i),()=>{window.removeEventListener("click",t),window.removeEventListener("mouseover",i)}},[e]),(0,t.jsx)(n.AnimatePresence,{children:c&&(0,t.jsxs)(r.motion.div,{initial:{opacity:0,scale:.5,y:50},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.5,y:50},className:"fixed bottom-24 right-8 z-[100] glass-panel px-4 py-3 rounded-full flex items-center gap-3 pointer-events-none",children:[e?(0,t.jsx)(o,{className:"text-blue-400 w-5 h-5"}):(0,t.jsx)(l,{className:"text-white/40 w-5 h-5"}),(0,t.jsxs)("span",{className:"text-sm font-medium text-white/90",children:["Ambience ",e?"Enabled":"Disabled"]})]})})}e.s(["audioManager",0,s,"default",()=>c],65962)},50950,e=>{"use strict";var t=e.i(31242),i=e.i(46977);let r=["/glitch/glitch1.gif","/glitch/glitch2.gif"],n=({active:e=!1})=>((0,i.useEffect)(()=>{let t;if(!e)return;let i="glitch-svg",n="glitch-filter",a="glitch-scanlines",o="broken-glass-overlay",l=document.body,s=[],c=(e,t)=>{let i=document.createElement("div");i.className="glitch-segment",i.style.position="absolute",i.style.top="0",i.style.left="0",i.style.width="100%",i.style.height="100%",i.style.pointerEvents="none",i.style.zIndex="9999",i.style.backgroundImage=`url(${t})`,i.style.backgroundSize="cover",i.style.opacity="0.8",i.style.mixBlendMode="overlay",i.style.display="none",i.style.animation=`glitchAnimation ${3*Math.random()+2}s infinite`,e.appendChild(i),s.push(i)};if((t=document.createElementNS("http://www.w3.org/2000/svg","svg")).setAttribute("id",i),t.setAttribute("style","position: absolute; width: 0; height: 0; pointer-events: none;"),t.innerHTML=`
        <defs>
          <filter id="${n}">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 1 0"/>
          </filter>
        </defs>
      `,document.body.appendChild(t),!document.getElementById(a)){let e=document.createElement("div");e.id=a,e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100%",e.style.height="100%",e.style.pointerEvents="none",e.style.zIndex="10001",e.style.backgroundImage="linear-gradient(transparent 90%, rgba(0,0,0,0.1) 90%)",e.style.backgroundSize="100% 1px",e.style.opacity="0.4",e.style.animation="scanline 1s linear infinite",document.body.appendChild(e)}if((()=>{for(let e=0;e<15;e++){let t=document.createElement("div");t.className="glitch-wrapper";let i=60*Math.random()+40,n=60*Math.random()+40,a=100*Math.random(),o=100*Math.random(),s=["polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)","polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)","polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)","polygon(25% 0%, 75% 0%, 75% 100%, 25% 100%)","polygon(0% 25%, 100% 25%, 100% 75%, 0% 75%)"],u=s[Math.floor(Math.random()*s.length)],m=20*Math.random()-10;t.style.position="fixed",t.style.top=`${a}%`,t.style.left=`${o}%`,t.style.width=`${i}%`,t.style.height=`${n}%`,t.style.overflow="hidden",t.style.pointerEvents="none",t.style.zIndex=`${10002+e}`,t.style.clipPath=u,t.style.opacity=`${.7*Math.random()+.3}`,t.style.transform=`translateX(${m}%) rotate(${10*Math.random()-5}deg)`,t.style.backgroundColor="rgba(0,0,0,0.1)",l.appendChild(t),c(t,r[e%2])}})(),!document.getElementById(o)){let e=document.createElement("img");e.id=o,e.src="/glitch/broken-glass.png",e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100%",e.style.height="100%",e.style.pointerEvents="none",e.style.zIndex="10003",e.style.opacity="0.5",e.style.mixBlendMode="multiply",e.style.display="none",document.body.appendChild(e)}l.style.filter=`url(#${n})`;let u=(()=>{let t;if(!e)return;(t=document.getElementById(o))&&(t.style.display="block");let i=setInterval(()=>{let e,t,i,r,n;s.forEach(e=>{if(Math.random()>.7){e.style.display="block";let t=e.parentElement;if(t){let e=20*Math.random()-10,i=20*Math.random()-10,r=5*Math.random();t.style.transform=`translate(${e}px, ${i}px)`,t.style.filter=`blur(${r}px)`}setTimeout(()=>{e.style.display="none",t&&(t.style.transform="",t.style.filter="")},200+500*Math.random())}}),Math.random()>.7&&(e=40*Math.random()-20,t=40*Math.random()-20,i=40*Math.random()-20,r=40*Math.random()-20,n=1+(.4*Math.random()-.2),document.body.style.transform=`skew(${e}deg, ${t}deg) translate(${i}px, ${r}px) scale(${n})`,document.body.style.transition="transform 0.1s",setTimeout(()=>{document.body.style.transform="",document.body.style.transition=""},200+300*Math.random())),Array.from(document.body.querySelectorAll("*")).sort(()=>.5-Math.random()).slice(0,20).forEach(e=>{let t=e.style.transform,i=e.style.filter,r=40*Math.random()-20,n=40*Math.random()-20,a=40*Math.random()-20,o=40*Math.random()-20,l=5*Math.random();e.style.transform=`translate(${r}px, ${n}px) skew(${a}deg, ${o}deg)`,e.style.filter=`blur(${l}px)`,setTimeout(()=>{e.style.transform=t,e.style.filter=i},100+200*Math.random())})},200+300*Math.random());return()=>clearInterval(i)})();return()=>{l.style.filter="",l.style.transform="",l.style.transition="",[i,a,o].forEach(e=>{let t=document.getElementById(e);t&&t.remove()}),document.querySelectorAll(".glitch-wrapper").forEach(e=>e.remove()),s.length=0,document.body.querySelectorAll("*").forEach(e=>{e.style.transform="",e.style.filter="",e.style.transition="",e.style.opacity="",e.style.mixBlendMode=""}),u&&u()}},[e]),null),a=()=>{let e=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t=e.current;if(!t)return;let i=t.getContext("2d");if(!i)return;let r=()=>{t.width=window.innerWidth,t.height=window.innerHeight};r(),window.addEventListener("resize",r);let n="アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),a=t.width/16,o=[];for(let e=0;e<a;e++)o[e]=-100*Math.random();let l=setInterval(()=>{i.fillStyle="rgba(0, 0, 0, 0.05)",i.fillRect(0,0,t.width,t.height),i.fillStyle="#0F0",i.font="16px monospace";for(let e=0;e<o.length;e++){let r=n[Math.floor(Math.random()*n.length)];Math.random()>.98?i.fillStyle="#FFF":i.fillStyle="#0F0",i.fillText(r,16*e,16*o[e]),16*o[e]>t.height&&Math.random()>.975&&(o[e]=0),o[e]++}},33);return()=>{clearInterval(l),window.removeEventListener("resize",r)}},[]),(0,t.jsx)("canvas",{ref:e,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:1,pointerEvents:"none",opacity:.15}})};var o=e.i(84203),l=e.i(13015),s=e.i(65962);let c=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];function u(){let[e,r]=(0,i.useState)(0),[u,m]=(0,i.useState)(!1),[d,f]=(0,i.useState)(""),[h,v]=(0,i.useState)(!1),[p,g]=(0,i.useState)(!1),x=(0,i.useRef)(null),[y,T]=(0,i.useState)("");(0,i.useEffect)(()=>{let e="color: #00ff41; font-family: monospace; font-size: 12px;";console.clear(),console.log("%c SYSTEM TERMINAL ACCESS GRANTED ","color: #00ff41; font-family: monospace; font-size: 20px; font-weight: bold; text-shadow: 0 0 5px #00ff41;"),console.log("%c\n> ACCESSING HIDDEN PROTOCOLS...\n",e),console.log("%c----------------------------------------",e),console.log("%c[1] MATRIX MODE:   ↑ ↑ ↓ ↓ ← → ← → B A",e),console.log('%c[2] AI BREACH:     Type "ai"',e),console.log('%c[3] AUDIO LINK:    Press "M" (Toggle Music)',e),console.log('%c[4] EMERGENCY:     Typing "bluepill" (Exit Matrix)',e),console.log('%c[5] GRAVITY:       Click "Professional Summary" Text',e),console.log("%c----------------------------------------",e),console.log("%c\n> WAITING FOR INPUT... _\n",e)},[]),(0,i.useEffect)(()=>{"true"===localStorage.getItem("matrix-mode")&&m(!0)},[]),(0,i.useEffect)(()=>{u?(document.body.classList.add("matrix-theme"),localStorage.setItem("matrix-mode","true")):(document.body.classList.remove("matrix-theme"),localStorage.setItem("matrix-mode","false"))},[u]);let E=(0,i.useCallback)(e=>{m(t=>(s.audioManager.playSciFiBeep(),void 0!==e?e:!t)),v(!0),setTimeout(()=>v(!1),3e3)},[]),w=(0,i.useCallback)(()=>{if(document.querySelector(".ai-overlay"))return;s.audioManager.playSciFiBeep();let e=document.createElement("div");e.className="ai-overlay",document.body.appendChild(e);let t=document.createElement("div");t.className="ai-scan-line",document.body.appendChild(t);let i=document.createElement("div");i.className="ai-system-message",document.body.appendChild(i),setTimeout(()=>{e.classList.add("active"),i.innerHTML='AI&nbsp;SYSTEM&nbsp;OVERRIDE<br/><span style="font-size: 0.3em; letter-spacing: 0.1em; opacity: 0.8; font-weight: normal;">SECURITY&nbsp;BREACH&nbsp;DETECTED</span>',i.classList.add("active")},10),setTimeout(()=>{t.classList.add("active")},500),setTimeout(()=>{t.classList.remove("active"),t.offsetWidth,t.classList.add("active")},2e3),setTimeout(()=>{t.classList.remove("active"),g(!0)},3500),setTimeout(()=>{g(!1),i.classList.remove("active"),setTimeout(()=>{i.innerHTML='BREACH&nbsp;OVERRIDE<br/><span style="font-size: 0.3em; letter-spacing: 0.1em; opacity: 0.8; font-weight: normal;">SYSTEM&nbsp;STABILIZED&nbsp;[OK]</span>',i.classList.add("active","override")},150)},9500),setTimeout(()=>{e.classList.remove("active"),i.classList.remove("active"),setTimeout(()=>{e.remove(),i.remove(),t.remove()},1e3)},12500)},[]);return(0,i.useEffect)(()=>{let t=t=>{if(["input","textarea"].includes(document.activeElement?.tagName.toLowerCase()||""))return;t.key===c[e]?e===c.length-1?(E(),r(0)):r(e=>e+1):r(0);let i=t.key.toLowerCase();/^[a-z]$/.test(i)&&(f(e=>{let t=(e+i).slice(-2);return"ai"===t?(w(),""):t}),u&&T(e=>{let t=(e+i).slice(-8);return"bluepill"===t?(E(!1),""):t}),x.current&&clearTimeout(x.current),x.current=setTimeout(()=>{f(""),T("")},1e3))};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[e,E,w,u]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n,{active:p}),(0,t.jsxs)(l.AnimatePresence,{children:[u&&(0,t.jsx)(a,{}),h&&(0,t.jsx)(o.motion.div,{initial:{opacity:0,scale:.8,y:-50},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.8,y:-50},className:"fixed top-24 left-1/2 -translate-x-1/2 z-[100] glass-panel px-6 py-3 rounded-full",children:(0,t.jsxs)("span",{className:"text-sm font-mono text-[#00ff41]",children:["TERMINAL MODE: ",u?"ACTIVE":"DEACTIVATED"]})})]})]})}e.s(["default",()=>u],50950)}]);