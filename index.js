/**
 * Super-tool
 *
 * Version   →  1.0.14
 * Github    →  https://github.com/ariiiman/skylake
 * License   →  http://opensource.org/licenses/MIT
 * Author    →  Aristide Benoist © 2016
 * Website   →  www.aristidebenoist.com
 * Date      →  Jul 6, 2016
 */
"use strict";var classCallCheck=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),S={Polyfill:{}};S.Animate=function(){function t(e,n,i,s,r,a,o){classCallCheck(this,t),this.param=n,this.start=i,this.end=s,this.easing=r,this.duration=a,this._opts=o||!1,this.delayBefore=!!this._opts.delay&&this._opts.delay.before,this.delayAfter=!!this._opts.delay&&this._opts.delay.after,this.processingEl(e),this.EasingLibrary=S.Easing,this.raf=new S.RafIndex,this.prepare(),S.BindMaker(this,["run","loop"])}return createClass(t,[{key:"init",value:function(){var t=this.delayBefore?this.delayBefore:0;S.Delay(this.run,t)}},{key:"run",value:function(){this.startTime=S.Win.perfNow(),this.raf.start(this.loop)}},{key:"loop",value:function(){var t=S.Win.perfNow(),e=(t-this.startTime)/this.duration,n=e>1?1:e,i=this.EasingLibrary[this.easing](n),s=void 0;if(this.isNotMultipleT)s=+this.start+this.distance*i;else{s=[];for(var r=0;r<this.updateQty;r++)s[r]=+this.start[r]+this.distance[r]*i}if(this.render(s),n<1)this.raf.start(this.loop);else if(this.raf.cancel(),this.render(this.end),this._opts.callback){var a=this.delayAfter?this.delayAfter:0;S.Delay(this._opts.callback,a)}}},{key:"prepare",value:function(){if(this.param.constructor===Array){this.isNotMultipleT=!1,this.updateQty=this.param.length,this.render=this.multipleT,this.distance=[];for(var t=0;t<this.updateQty;t++)this.distance[t]=+this.end[t]-+this.start[t]}else{switch(this.param){case"x":case"y":this.render=this.attributUpdate;break;case"3dx":case"3dy":this.render=this.t3dUpdate;break;case"scrollTop":this.render=this.scrollTopUpdate;break;default:this.render=this.styleUpdate}this.isNotMultipleT=!0,this.distance=+this.end-+this.start}}},{key:"multipleT",value:function(t){for(var e=0,n=0,i=0,s=0;s<this.updateQty;s++)"3dx"===this.param[s]?e=S.Detect.isString(this.start[s])?t[s]+"px":t[s]+"%":"3dy"===this.param[s]?n=S.Detect.isString(this.start[s])?t[s]+"px":t[s]+"%":"rotate"===this.param[s]&&(i="rotate("+t[s]+"deg)");var r="translate3d("+e+","+n+",0)",a=r+" "+i;this.letsRock("transform","transform",a)}},{key:"attributUpdate",value:function(t){this.letsRock("setAttribut",this.param,t)}},{key:"scrollTopUpdate",value:function(t){this.el[this.param]=t,this._opts.during&&this._opts.during(t)}},{key:"t3dUpdate",value:function(t){var e=S.Detect.isString(this.start)?t+"px":t+"%",n="3dx"===this.param?e+",0":"0,"+e,i="translate3d("+n+",0)";this.letsRock("transform","transform",i)}},{key:"styleUpdate",value:function(t){this.letsRock("style",this.param,t)}},{key:"letsRock",value:function(t,e,n){for(var i=this.multiple?this.el.length:1,s=0;s<i;s++){var r=this.multiple?this.el[s]:this.el;"transform"===t&&(r.style.webkitTransform=n),"setAttribut"===t?r.setAttribute(e,n):r.style[e]=n}}},{key:"processingEl",value:function(t){S.Detect.isString(t)?(this.el=S.Selector.el(t),this.multiple="class"===S.Selector.type(t)):(this.el=t,this.multiple=!1)}}]),t}(),S.BindMaker=function(t,e){for(var n=e.length,i=0;i<n;i++)t[e[i]]=t[e[i]].bind(t)};var Detect=function(){function t(){classCallCheck(this,t),this.uA=navigator.userAgent.toLowerCase()}return createClass(t,[{key:"safari",value:function(){return this.uA.match(/version\/[\d\.]+.*safari/)}},{key:"isString",value:function(t){return"string"==typeof t}},{key:"isFirefox",get:function(){return this.uA.indexOf("firefox")>-1}},{key:"isSafari",get:function(){return!!this.safari()}},{key:"browserVersion",get:function(){if(this.isSafari){var t=this.safari()[0].match(/\d{1,2}\.\d{1,2}\.\d{1,2}/);return+t[0].split(".")[0]}return!1}},{key:"isTouch",get:function(){return"ontouchend"in window}},{key:"scrollable",get:function(){return this.firefox?document.documentElement:S.Dom.body}}]),t}();S.Detect=new Detect,S.Delay=function(t,e){window.setTimeout(function(){t()},e)};var e={s:1.70158,q:2.25,r:1.525,u:.984375,v:7.5625,w:.9375,x:2.75,y:2.625,z:.75};S.Easing={linear:function(t){return t},Power1In:function(t){return-Math.cos(t*(Math.PI/2))+1},Power1Out:function(t){return Math.sin(t*(Math.PI/2))},Power1InOut:function(t){return-.5*(Math.cos(Math.PI*t)-1)},Power2In:function(t){return t*t},Power2Out:function(t){return t*(2-t)},Power2InOut:function(t){return t<.5?2*t*t:-1+(4-2*t)*t},Power3In:function(t){return t*t*t},Power3Out:function(t){return--t*t*t+1},Power3InOut:function(t){return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},Power4In:function(t){return t*t*t*t},Power4Out:function(t){return 1- --t*t*t*t},Power4InOut:function(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t},Power5In:function(t){return t*t*t*t*t},Power5Out:function(t){return 1+--t*t*t*t*t},Power5InOut:function(t){return t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t},ExpoIn:function(t){return 0===t?0:Math.pow(2,10*(t-1))},ExpoOut:function(t){return 1===t?1:-Math.pow(2,-10*t)+1},ExpoInOut:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},CircIn:function(t){return-(Math.sqrt(1-t*t)-1)},CircOut:function(t){return Math.sqrt(1-Math.pow(t-1,2))},CircInOut:function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){return t*t*((e.s+1)*t-e.s)},BackOut:function(t){return(t-=1)*t*((e.s+1)*t+e.s)+1},BackInOut:function(t){return(t/=.5)<1?.5*(t*t*(((e.s*=e.r)+1)*t-e.s)):.5*((t-=2)*t*(((e.s*=e.r)+1)*t+e.s)+2)},Elastic:function(t){return-1*Math.pow(4,-8*t)*Math.sin((6*t-1)*(2*Math.PI)/2)+1},SwingFromTo:function(t){return(t/=.5)<1?.5*(t*t*(((e.s*=e.r)+1)*t-e.s)):.5*((t-=2)*t*(((e.s*=e.r)+1)*t+e.s)+2)},SwingFrom:function(t){return t*t*((e.s+1)*t-e.s)},SwingTo:function(t){return(t-=1)*t*((e.s+1)*t+e.s)+1},Bounce:function(t){return t<1/e.x?e.v*t*t:t<2/e.x?e.v*(t-=1.5/e.x)*t+e.z:t<2.5/e.x?e.v*(t-=e.q/e.x)*t+e.w:e.v*(t-=e.y/e.x)*t+e.u},BounceOut:function(t){return t<1/e.x?e.v*t*t:t<2/e.x?e.v*(t-=1.5/e.x)*t+e.z:t<2.5/e.x?e.v*(t-=e.q/e.x)*t+e.w:e.v*(t-=e.y/e.x)*t+e.u},BouncePast:function(t){return t<1/e.x?e.v*t*t:t<2/e.x?2-(e.v*(t-=1.5/e.x)*t+e.z):t<2.5/e.x?2-(e.v*(t-=e.q/e.x)*t+e.w):2-(e.v*(t-=e.y/e.x)*t+e.u)},FromTo:function(t){return(t/=.5)<1?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},From:function(t){return Math.pow(t,4)},To:function(t){return Math.pow(t,.25)}},S.Throttle=function(){function t(e){classCallCheck(this,t),this.currentTime=0,this.lastTime=0,this.timer,this.opts=e}return createClass(t,[{key:"init",value:function(){var t=this;this.currentTime=S.Win.perfNow(),this.lastTime+this.opts.delay>this.currentTime?(clearTimeout(this.timer),this.timer=S.Delay(function(){t.opts.callback(),t.timeReset()},this.opts.delay)):(this.opts.endOnly||this.opts.callback(),this.timeReset())}},{key:"timeReset",value:function(){this.lastTime=this.currentTime}}]),t}();var Geb=function(){function t(){classCallCheck(this,t),this.doc=document}return createClass(t,[{key:"id",value:function(t){return this.doc.getElementById(t)}},{key:"class",value:function(t){return this.doc.getElementsByClassName(t)}},{key:"tag",value:function(t){return this.doc.getElementsByTagName(t)}}]),t}();S.Geb=new Geb,S.Dom={html:document.documentElement,body:document.body};var Selector=function(){function t(){classCallCheck(this,t)}return createClass(t,[{key:"el",value:function(t){var e=t.substring(1);return"#"===t.charAt(0)?S.Geb.id(e):S.Geb["class"](e)}},{key:"type",value:function(t){return"#"===t.charAt(0)?"id":"class"}},{key:"name",value:function(t){return t.substring(1)}}]),t}();S.Selector=new Selector,S.MM=function(){function t(e){classCallCheck(this,t),this.callback=e,this.posX=0,this.posY=0,this.rafTicking=new S.RafTicking,S.BindMaker(this,["getRAF","run"])}return createClass(t,[{key:"on",value:function(){this.listeners("add")}},{key:"off",value:function(){this.listeners("remove")}},{key:"listeners",value:function(t){S.Listen(document,t,"mousemove",this.getRAF)}},{key:"getRAF",value:function(t){this.event=t,this.rafTicking.start(this.run)}},{key:"run",value:function(){this.posX=this.event.pageX,this.posY=this.event.pageY,this.callback(this.posX,this.posY)}}]),t}(),S.RO=function(){function t(e){classCallCheck(this,t),this.opts=e,this.isTouch=S.Detect.isTouch,S.BindMaker(this,["getThrottle","getRAF"]),this.throttle=new S.Throttle({callback:this.getRAF,delay:this.opts.throttle.delay,endOnly:this.opts.throttle.endOnly}),this.rafTicking=new S.RafTicking}return createClass(t,[{key:"on",value:function(){this.listeners("add")}},{key:"off",value:function(){this.listeners("remove")}},{key:"listeners",value:function(t){this.isTouch?S.Listen(window,t,"orientationchange",this.getThrottle):S.Listen(window,t,"resize",this.getThrottle)}},{key:"getThrottle",value:function(){this.throttle.init()}},{key:"getRAF",value:function(){this.rafTicking.start(this.opts.callback)}}]),t}(),S.Scroll=function(){function t(e){classCallCheck(this,t),this.opts=e,this.scrollable=S.Detect.scrollable,S.BindMaker(this,["getThrottle","getRAF","run"]),this.throttle=new S.Throttle({callback:this.getRAF,delay:this.opts.throttle.delay,endOnly:this.opts.throttle.endOnly}),this.rafTicking=new S.RafTicking}return createClass(t,[{key:"on",value:function(){this.startScrollY=this.scrollable.scrollTop,this.listeners("add")}},{key:"off",value:function(){this.listeners("remove")}},{key:"listeners",value:function(t){S.Listen(window,t,"scroll",this.getThrottle)}},{key:"getThrottle",value:function(){this.throttle.init()}},{key:"getRAF",value:function(){this.rafTicking.start(this.run)}},{key:"run",value:function(){var t=this.scrollable.scrollTop,e=-(t-this.startScrollY);this.startScrollY=t,this.opts.callback(t,e)}}]),t}(),S.WTDisable=function(){function t(t){var n=S.Detect.isTouch,i=document;n?S.Listen(i,t,"touchmove",e):S.Listen(i,t,"mouseWheel",e)}function e(t){t.preventDefault()}var n=function(){t("add")},i=function(){t("remove")};return{on:n,off:i}}(),S.WT=function(){function t(e){classCallCheck(this,t),this.callback=e,this.isTouch=S.Detect.isTouch,this.rafTicking=new S.RafTicking,S.BindMaker(this,["getRAF","run","touchMove"])}return createClass(t,[{key:"on",value:function(){S.WTDisable.off(),this.listeners("add")}},{key:"off",value:function(){S.WTDisable.on(),this.listeners("remove")}},{key:"listeners",value:function(t){this.isTouch?S.Listen(this.el,t,"touchstart",this.getRAF):S.Listen(document,t,"mouseWheel",this.getRAF)}},{key:"getRAF",value:function(t){t.preventDefault(),this.listeners("remove"),this.event=t,this.rafTicking.start(this.run)}},{key:"run",value:function(){var t=this.event.type;"wheel"===t?this.onWheel():"mousewheel"===t?this.onMouseWheel():this.touchStart()}},{key:"onWheel",value:function(){this.type="scroll",this.delta=this.event.wheelDeltaY||this.event.deltaY*-1,S.Detect.isFirefox&&1===this.event.deltaMode&&(this.delta*=40),this.getCallback()}},{key:"onMouseWheel",value:function(){this.type="scroll",this.delta=this.event.wheelDeltaY?this.event.wheelDeltaY:this.event.wheelDelta,this.getCallback()}},{key:"touchStart",value:function(){this.start=this.event.targetTouches[0].pageY,this.touchMoveListener("add")}},{key:"touchMove",value:function(){this.event.preventDefault(),this.type="touch",this.delta=this.event.targetTouches[0].pageY-this.start,this.touchMoveListener("remove"),this.getCallback()}},{key:"touchMoveListener",value:function(t){S.Listen(document,t,"touchmove",this.touchMove)}},{key:"getCallback",value:function(){this.listeners("add"),this.callback(this.delta,this.type,this.event)}}]),t}(),S.AnimatedLine=function(t){function e(t){var e=t.getTotalLength(),i=n.reverse?0:e,s=n.reverse?e:0;t.style.strokeDasharray=e,t.style.opacity=1;var r=new S.Animate(t,"strokeDashoffset",i,s,n.easing,n.duration,{callback:n.callback});r.init()}for(var n=t,i=S.Geb["class"](n.pathsClass),s=i.length,r=0;r<s;r++)e(i[r])},S.ScrollToTop=function(t){function e(){switch(!0){case 0===s:return"Power1InOut";case s<=600:return"Power1InOut";default:return"ExpoInOut"}}function n(){var t=s/i.totalHeight,e=-Math.pow(2,-10*t)+1;switch(!0){case 0===s:return 0;case s>0&&s<=200:return 300;case s>200&&s<=400:return 500;case s>400&&s<=600:return 700;default:return 1500*e}}var i=t,s=S.Detect.scrollable.scrollTop,r={destination:0,duration:n(),easing:e(),during:i.during,callback:i.callback};S.ScrollTo(r)},S.ScrollTo=function(t){function e(){S.WTDisable.off(),n.callback&&n.callback()}var n=t,i=S.Detect.scrollable,s=i.scrollTop,r=new S.Animate(i,"scrollTop",s,n.destination,n.easing,n.duration,{callback:e,during:n.during});n.destination===s?e():(S.WTDisable.on(),r.init())},S.ScrollZero=function(){S.Detect.scrollable.scrollTop=0},S.AutoTransitionend=function(t,e,n){function i(t){t.stopPropagation(),r("remove"),s()}function s(){e(n)}function r(t){S.Listen(a,t,"transitionend",i)}var a=S.Geb.id(t);r("add")},S.Listen=function(t,e,n,i){var s=document,r=void 0;r="mouseWheel"===n?"onwheel"in s?"wheel":void 0!==s.onmousewheel?"mousewheel":"DOMMouseScroll":"focusOut"===n?S.Detect.isFirefox?"blur":"focusout":n,t[e+"EventListener"](r,i)},S.Polyfill.perfNow=function(){"performance"in window||(window.performance={}),"now"in window.performance||!function(){var t=Date.now();window.performance.now=function(){return Date.now()-t}}()},S.Polyfill.raf=function(){var t=0;window.requestAnimationFrame||(window.requestAnimationFrame=function(e){var n=(new Date).getTime(),i=Math.max(0,16-(n-t)),s=S.Delay(function(){e(n+i)},i);return t=n+i,s}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})},S.Raf=function(t){window.requestAnimationFrame(t)},S.RafIndex=function(){function t(){classCallCheck(this,t)}return createClass(t,[{key:"start",value:function(t){this.rafCallback=S.Raf(t)}},{key:"cancel",value:function(){window.cancelAnimationFrame(this.rafCallback)}}]),t}(),S.RafTicking=function(){function t(){classCallCheck(this,t),this.ticking=!1,this.rafIndex=new S.RafIndex,S.BindMaker(this,["getCallback"])}return createClass(t,[{key:"start",value:function(t){this.callback=t,this.ticking||(this.ticking=!0,this.rafIndex.start(this.getCallback))}},{key:"getCallback",value:function(){this.callback(),this.destroy()}},{key:"destroy",value:function(){this.rafIndex.cancel(),this.ticking=!1}}]),t}(),S.Win={w:function(){return window.innerWidth},h:function(){return window.innerHeight},path:function(){return window.location.pathname},href:function(){return window.location.href},perfNow:function(){return window.performance.now()}},S.Controller=function(t,e,n){function i(t){function e(t,e){t.setAttribute("content",e)}var n=S.Geb.tag("link")[0],i=S.Geb.tag("title")[0],s=S.Geb.tag("meta"),r=s.length,a=t.head.url,o=t.head.title,u=t.head.description,l=t.head.keywords;n.href=a,i.textContent=o;for(var c=0;c<r;c++){var h=s[c],f=h.getAttribute("name"),d=h.getAttribute("itemprop"),p=h.getAttribute("property");f?"description"===f?e(h,u):"keywords"===f?e(h,l):"twitter:title"===f?e(h,o):"twitter:description"===f&&e(h,u):d?"name"===d?e(h,o):"description"===d&&e(h,u):p&&("og:url"===p?e(h,a):"og:title"===p?e(h,o):"og:description"===p&&e(h,u))}}function s(){var e="home"===t?"/":t;history.pushState({key:"value"},"titre",e)}var r="index.php?url="+t+"&xhr=true",a=new XMLHttpRequest;a.open("GET",r,!0),a.onreadystatechange=function(){if(4===a.readyState&&200===a.status){var t=JSON.parse(a.responseText).xhrController;i(t),s(),e(t.view,n)}},a.send(null)},S.OnPopstate=function(){function t(){S.Delay(function(){n=!1},0)}function e(t){n&&"complete"===document.readyState&&(t.preventDefault(),t.stopImmediatePropagation())}var n="complete"!==document.readyState;S.Listen(window,"add","load",t),S.Listen(window,"add","popstate",e),window.onpopstate=function(){window.location.href=window.location.pathname}},module.exports=S;