/**
 * Skylake
 *
 * Version   →  1.0.42
 * Github    →  https://github.com/ariiiman/skylake
 * License   →  http://opensource.org/licenses/MIT
 * Author    →  Aristide Benoist © 2016
 * Website   →  www.aristidebenoist.com
 * Date      →  Aug 23, 2016
 */
"use strict";var classCallCheck=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),S={Polyfill:{}};S.Merom=function(){function t(e,n,i,s,o,a,r){classCallCheck(this,t);this.element=e,this.prop=n,this.start=i,this.end=s,S.Is.object(o)?(this.duration=0,this.easing="linear",this.opts=o):(this.duration=o||0,this.easing=a||"linear",this.opts=r||!1),this.delay=this.opts.delay||0,this.callbackDelay=this.opts.callbackDelay||0,this.el=S.Selector.el(this.element),this.elL=this.el.length,this.deltaTimeAtPause=0,this.EasingLibrary=S.Easing,this.raf=new S.RafIndex,this.selectUpdateType(),S.BindMaker(this,["getRaf","loop"])}return createClass(t,[{key:"play",value:function(){S.Delay(this.getRaf,this.delay)}},{key:"pause",value:function(t){"on"===t?(this.isPaused=!0,this.deltaTimeSave=this.deltaTime):(this.isPaused=!1,this.deltaTimeAtPause=this.deltaTimeSave,this.startTime=S.Win.perfNow,this.raf.start(this.loop))}},{key:"getRaf",value:function(){this.startTime=S.Win.perfNow,this.raf.start(this.loop)}},{key:"loop",value:function(){if(!this.isPaused){var t=S.Win.perfNow;this.deltaTime=t-this.startTime+this.deltaTimeAtPause;var e=this.deltaTime/this.duration,n=e>1?1:e,i=this.EasingLibrary[this.easing](n),s=void 0;if(this.isNotMultipleT)s=+this.start+this.distance*i;else{s=[];for(var o=0;o<this.updateQty;o++)s[o]=+this.start[o]+this.distance[o]*i}this.update(s),n<1?this.raf.start(this.loop):(this.raf.cancel(),this.update(this.end),this.opts.callback&&S.Delay(this.opts.callback,this.callbackDelay))}}},{key:"selectUpdateType",value:function(){if(this.prop.constructor===Array){this.isNotMultipleT=!1,this.updateQty=this.prop.length,this.update=this.multipleT,this.distance=[];for(var t=0;t<this.updateQty;t++)this.distance[t]=+this.end[t]-+this.start[t]}else{switch(this.prop){case"3dx":case"3dy":case"scale":case"rotate":this.update=this.simpleT;break;case"scrollTop":this.update=this.setScrollTop;break;default:this.update=this.setStyle}this.isNotMultipleT=!0,this.distance=+this.end-+this.start}}},{key:"multipleT",value:function(t){for(var e=0,n=0,i="",s="",o=0;o<this.updateQty;o++)"3dx"===this.prop[o]?e=S.Is.string(this.start[o])?t[o]+"px":t[o]+"%":"3dy"===this.prop[o]?n=S.Is.string(this.start[o])?t[o]+"px":t[o]+"%":"rotate"===this.prop[o]?i="rotate("+t[o]+"deg)":"scale"===this.prop[o]&&(s="scale("+t[o]+")");var a="translate3d("+e+","+n+",0)",r=a+" "+i+" "+s;this.updateDom("transform",r)}},{key:"simpleT",value:function(t){var e=void 0;if("3dx"===this.prop||"3dy"===this.prop){var n=S.Is.string(this.start)?t+"px":t+"%",i="3dx"===this.prop?n+",0":"0,"+n;e="translate3d("+i+",0)"}else e="scale"===this.prop?"scale("+t+")":"rotate("+t+"deg)";this.updateDom("transform",e)}},{key:"setScrollTop",value:function(t){this.element[this.prop]=t,this.opts.during&&this.opts.during(t)}},{key:"setStyle",value:function(t){this.updateDom(this.prop,t)}},{key:"updateDom",value:function(t,e){for(var n=0;n<this.elL;n++)"transform"===t?(this.el[n].style.webkitTransform=e,this.el[n].style.transform=e):"x"===t||"y"===t?this.el[n].setAttribute(t,e):this.el[n].style[t]=e}}]),t}(),S.AnimatedLine=function(){function t(e){classCallCheck(this,t),this.path=S.Selector.el(e),this.pathL=this.path.length,this.merom=[]}return createClass(t,[{key:"play",value:function(){this.type="play",this.run.apply(this,arguments)}},{key:"reverse",value:function(){this.type="reverse",this.run.apply(this,arguments)}},{key:"run",value:function(t,e,n){this.duration=t,this.easing=e,this.callback=n;for(var i=0;i<this.pathL;i++)this.animationLine(this.path[i],i)}},{key:"pause",value:function(t){for(var e=0;e<this.pathL;e++)this.merom[e].pause(t)}},{key:"reset",value:function(){for(var t=0;t<this.pathL;t++)this.path[t].style=""}},{key:"animationLine",value:function(t,e){var n=t.getTotalLength(),i=void 0,s=void 0;if("reverse"===this.type){var o=t.style.strokeDashoffset;i="x"===o.charAt(o.length-1)?+o.substring(0,o.length-2):+o,s=n}else i=n,s=0;t.style.strokeDasharray=n,t.style.opacity=1,this.merom[e]=new S.Merom(t,"strokeDashoffset",i,s,this.duration,this.easing,{callback:this.callback}),this.merom[e].play()}}]),t}(),S.Morph=function(){function t(e){classCallCheck(this,t),this.opts=e,this.type="polygon"===this.opts.type?"points":"d",this.coordsStart=this.getCoordsArr(this.opts.element.getAttribute(this.type)),this.coordsEnd=this.getCoordsArr(this.opts.newCoords),this.raf=new S.RafIndex,S.BindMaker(this,["getRaf","loop"])}return createClass(t,[{key:"play",value:function(){var t=this.opts.delay?this.opts.delay:0;S.Delay(this.getRaf,t)}},{key:"pause",value:function(){this.isPaused=!0}},{key:"getRaf",value:function(){this.startTime=S.Win.perfNow,this.raf.start(this.loop)}},{key:"loop",value:function(){if(!this.isPaused){for(var t=S.Win.perfNow,e=(t-this.startTime)/this.opts.duration,n=e>1?1:e,i=S.Easing[this.opts.easing](n),s=[],o="",a=0;a<this.coordsStart.length;a++)s[a]=this.isLetter(this.coordsStart[a])?this.coordsStart[a]+" ":+this.coordsStart[a]+(+this.coordsEnd[a]-+this.coordsStart[a])*i,o+=s[a],a!==this.coordsStart.length-1&&(o+=","===o.charAt(o.length-1)?" ":",");this.opts.element.setAttribute(this.type,o),i<1?this.raf.start(this.loop):(this.raf.cancel(),this.opts.element.setAttribute(this.type,this.opts.newCoords),this.getCallback())}}},{key:"getCoordsArr",value:function(t){for(var e=t.split(" "),n=[],i=0;i<e.length;i++)for(var s=e[i].split(","),o=0;o<s.length;o++)n.push(s[o]);return n}},{key:"isLetter",value:function(t){return"M"===t||"L"===t||"C"===t||"Z"===t}},{key:"getCallback",value:function(){if(this.opts.callback){var t=this.opts.callbackDelay?this.opts.callbackDelay:0;S.Delay(this.opts.callback,t)}}}]),t}(),S.Timeline=function(){function t(){classCallCheck(this,t),this.content=[]}return createClass(t,[{key:"from",value:function(){if(this.contentL>0){var t=this.content[this.contentL-1].delay,e=arguments[4]&&S.Is.object(arguments[4]);e&&arguments[4].delay?arguments[4].delay=t+arguments[4].delay:e?arguments[4].delay=t:arguments[6]&&arguments[6].delay?arguments[6].delay=t+arguments[6].delay:arguments[6]?arguments[6].delay=t:[].push.call(arguments,{delay:t})}this.content.push(new(Function.prototype.bind.apply(S.Merom,[null].concat(Array.prototype.slice.call(arguments)))))}},{key:"play",value:function(){for(var t=0;t<this.contentL;t++)this.content[t].play()}},{key:"pause",value:function(t){for(var e=0;e<this.contentL;e++)this.content[e].pause(t)}},{key:"contentL",get:function(){return this.content.length}}]),t}(),S.BindMaker=function(t,e){for(var n=e.length,i=0;i<n;i++)t[e[i]]=t[e[i]].bind(t)},S.Delay=function(t,e){window.setTimeout(function(e){t()},e)};var e={s:1.70158,q:2.25,r:1.525,u:.984375,v:7.5625,w:.9375,x:2.75,y:2.625,z:.75};S.Easing={linear:function(t){return t},Power1In:function(t){return-Math.cos(t*(Math.PI/2))+1},Power1Out:function(t){return Math.sin(t*(Math.PI/2))},Power1InOut:function(t){return-.5*(Math.cos(Math.PI*t)-1)},Power2In:function(t){return t*t},Power2Out:function(t){return t*(2-t)},Power2InOut:function(t){return t<.5?2*t*t:-1+(4-2*t)*t},Power3In:function(t){return t*t*t},Power3Out:function(t){return--t*t*t+1},Power3InOut:function(t){return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},Power4In:function(t){return t*t*t*t},Power4Out:function(t){return 1- --t*t*t*t},Power4InOut:function(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t},Power5In:function(t){return t*t*t*t*t},Power5Out:function(t){return 1+--t*t*t*t*t},Power5InOut:function(t){return t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t},ExpoIn:function(t){return 0===t?0:Math.pow(2,10*(t-1))},ExpoOut:function(t){return 1===t?1:-Math.pow(2,-10*t)+1},ExpoInOut:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},CircIn:function(t){return-(Math.sqrt(1-t*t)-1)},CircOut:function(t){return Math.sqrt(1-Math.pow(t-1,2))},CircInOut:function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){return t*t*((e.s+1)*t-e.s)},BackOut:function(t){return(t-=1)*t*((e.s+1)*t+e.s)+1},BackInOut:function(t){return(t/=.5)<1?.5*(t*t*(((e.s*=e.r)+1)*t-e.s)):.5*((t-=2)*t*(((e.s*=e.r)+1)*t+e.s)+2)},Elastic:function(t){return-1*Math.pow(4,-8*t)*Math.sin((6*t-1)*(2*Math.PI)/2)+1},SwingFromTo:function(t){return(t/=.5)<1?.5*(t*t*(((e.s*=e.r)+1)*t-e.s)):.5*((t-=2)*t*(((e.s*=e.r)+1)*t+e.s)+2)},SwingFrom:function(t){return t*t*((e.s+1)*t-e.s)},SwingTo:function(t){return(t-=1)*t*((e.s+1)*t+e.s)+1},Bounce:function(t){return t<1/e.x?e.v*t*t:t<2/e.x?e.v*(t-=1.5/e.x)*t+e.z:t<2.5/e.x?e.v*(t-=e.q/e.x)*t+e.w:e.v*(t-=e.y/e.x)*t+e.u},BounceOut:function(t){return t<1/e.x?e.v*t*t:t<2/e.x?e.v*(t-=1.5/e.x)*t+e.z:t<2.5/e.x?e.v*(t-=e.q/e.x)*t+e.w:e.v*(t-=e.y/e.x)*t+e.u},BouncePast:function(t){return t<1/e.x?e.v*t*t:t<2/e.x?2-(e.v*(t-=1.5/e.x)*t+e.z):t<2.5/e.x?2-(e.v*(t-=e.q/e.x)*t+e.w):2-(e.v*(t-=e.y/e.x)*t+e.u)},FromTo:function(t){return(t/=.5)<1?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},From:function(t){return Math.pow(t,4)},To:function(t){return Math.pow(t,.25)}};var Is=function(){function t(){classCallCheck(this,t)}return createClass(t,[{key:"string",value:function(t){return"string"==typeof t}},{key:"object",value:function(t){return t===Object(t)}}]),t}();S.Is=new Is;var Sniffer=function(){function t(){classCallCheck(this,t),this.uA=navigator.userAgent.toLowerCase()}return createClass(t,[{key:"isFirefox",get:function(){return this.uA.indexOf("firefox")>-1}},{key:"safari",get:function(){return this.uA.match(/version\/[\d\.]+.*safari/)}},{key:"isSafari",get:function(){return!!this.safari}},{key:"version",get:function(){if(this.isSafari){var t=this.safari[0].match(/version\/\d{1,2}/);return+t[0].split("/")[1]}return!1}},{key:"isTouch",get:function(){return"ontouchend"in window}},{key:"isPageError",get:function(){for(var t=S.Geb.tag("meta"),e=t.length,n=!1,i=0;i<e;i++)if("error"===t[i].name){n=!0;break}return n}}]),t}();S.Sniffer=new Sniffer,S.Throttle=function(){function t(e){classCallCheck(this,t),this.timeout=!1,this.timer=0,this.opts=e,S.BindMaker(this,["atEndController"])}return createClass(t,[{key:"init",value:function(){this.startTime=S.Win.perfNow,this.timeout||(this.timeout=!0,S.Delay(this.atEndController,this.opts.delay))}},{key:"atEndController",value:function(){var t=S.Win.perfNow;t-this.startTime<this.opts.delay?(this.timer=S.Delay(this.atEndController,this.opts.delay),this.opts.atEnd||this.opts.callback()):(clearTimeout(this.timer),this.timeout=!1,this.opts.callback())}}]),t}();var Geb=function(){function t(){classCallCheck(this,t),this.doc=document}return createClass(t,[{key:"id",value:function(t){return this.doc.getElementById(t)}},{key:"class",value:function(t){return this.doc.getElementsByClassName(t)}},{key:"tag",value:function(t){return this.doc.getElementsByTagName(t)}}]),t}();S.Geb=new Geb,S.Dom={html:document.documentElement,body:document.body};var Selector=function(){function t(){classCallCheck(this,t)}return createClass(t,[{key:"el",value:function t(e){var t=[];if(S.Is.string(e)){var n=e.substring(1);"#"===e.charAt(0)?t[0]=S.Geb.id(n):t=S.Geb.class(n)}else t[0]=e;return t}},{key:"type",value:function(t){return"#"===t.charAt(0)?"id":"class"}},{key:"name",value:function(t){return t.substring(1)}}]),t}();S.Selector=new Selector,S.MM=function(){function t(e){classCallCheck(this,t),this.callback=e,this.posX=0,this.posY=0,this.rafTicking=new S.RafTicking,S.BindMaker(this,["getRAF","run"])}return createClass(t,[{key:"on",value:function(){this.listeners("add")}},{key:"off",value:function(){this.listeners("remove")}},{key:"listeners",value:function(t){S.Listen(document,t,"mousemove",this.getRAF)}},{key:"getRAF",value:function(t){this.event=t,this.rafTicking.start(this.run)}},{key:"run",value:function(){this.posX=this.event.pageX,this.posY=this.event.pageY,this.callback(this.posX,this.posY)}}]),t}(),S.RO=function(){function t(e){classCallCheck(this,t),this.opts=e,this.isTouch=S.Sniffer.isTouch,S.BindMaker(this,["getThrottle","getRAF"]),this.throttle=new S.Throttle({callback:this.getRAF,delay:this.opts.throttle.delay,atEnd:this.opts.throttle.atEnd}),this.rafTicking=new S.RafTicking}return createClass(t,[{key:"on",value:function(){this.listeners("add")}},{key:"off",value:function(){this.listeners("remove")}},{key:"listeners",value:function(t){this.isTouch?S.Listen(window,t,"orientationchange",this.getThrottle):S.Listen(window,t,"resize",this.getThrottle)}},{key:"getThrottle",value:function(){this.throttle.init()}},{key:"getRAF",value:function(){this.rafTicking.start(this.opts.callback)}}]),t}(),S.Scroll=function(){function t(e){classCallCheck(this,t),this.opts=e,this.scrollable=S.Scrollable,S.BindMaker(this,["getThrottle","getRAF","run"]),this.throttle=new S.Throttle({callback:this.getRAF,delay:this.opts.throttle.delay,atEnd:this.opts.throttle.atEnd}),this.rafTicking=new S.RafTicking}return createClass(t,[{key:"on",value:function(){this.startScrollY=this.scrollable.scrollTop,this.listeners("add")}},{key:"off",value:function(){this.listeners("remove")}},{key:"listeners",value:function(t){S.Listen(window,t,"scroll",this.getThrottle)}},{key:"getThrottle",value:function(){this.throttle.init()}},{key:"getRAF",value:function(){this.rafTicking.start(this.run)}},{key:"run",value:function(){var t=this.scrollable.scrollTop,e=-(t-this.startScrollY);this.startScrollY=t,this.opts.callback(t,e)}}]),t}(),S.WTDisable=function(){function t(t){var n=S.Sniffer.isTouch,i=document;n?S.Listen(i,t,"touchmove",e):S.Listen(i,t,"mouseWheel",e)}function e(t){t.preventDefault()}var n=function(e){t("add")},i=function(e){t("remove")};return{on:n,off:i}}(),S.WT=function(){function t(e){classCallCheck(this,t),this.callback=e,this.isTouch=S.Sniffer.isTouch,this.rafTicking=new S.RafTicking,S.BindMaker(this,["getRAF","run","touchMove"])}return createClass(t,[{key:"on",value:function(){S.WTDisable.off(),this.listeners("add")}},{key:"off",value:function(){S.WTDisable.on(),this.listeners("remove")}},{key:"listeners",value:function(t){this.isTouch?S.Listen(this.el,t,"touchstart",this.getRAF):S.Listen(document,t,"mouseWheel",this.getRAF)}},{key:"getRAF",value:function(t){t.preventDefault(),this.listeners("remove"),this.event=t,this.rafTicking.start(this.run)}},{key:"run",value:function(){var t=this.event.type;"wheel"===t?this.onWheel():"mousewheel"===t?this.onMouseWheel():this.touchStart()}},{key:"onWheel",value:function(){this.type="scroll",this.delta=this.event.wheelDeltaY||this.event.deltaY*-1,S.Sniffer.isFirefox&&1===this.event.deltaMode&&(this.delta*=40),this.getCallback()}},{key:"onMouseWheel",value:function(){this.type="scroll",this.delta=this.event.wheelDeltaY?this.event.wheelDeltaY:this.event.wheelDelta,this.getCallback()}},{key:"touchStart",value:function(){this.start=this.event.targetTouches[0].pageY,this.touchMoveListener("add")}},{key:"touchMove",value:function(){this.event.preventDefault(),this.type="touch",this.delta=this.event.targetTouches[0].pageY-this.start,this.touchMoveListener("remove"),this.getCallback()}},{key:"touchMoveListener",value:function(t){S.Listen(document,t,"touchmove",this.touchMove)}},{key:"getCallback",value:function(){this.listeners("add"),this.callback(this.delta,this.type,this.event)}}]),t}(),S.AutoTransitionend=function(t,e,n){function i(t){t.stopPropagation(),o("remove"),s()}function s(){e(n)}function o(t){S.Listen(a,t,"transitionend",i)}var a=S.Geb.id(t);o("add")},S.Listen=function(t,e,n,i){var s=document,o=S.Selector.el(t),a=o.length,r=void 0;r="mouseWheel"===n?"onwheel"in s?"wheel":void 0!==s.onmousewheel?"mousewheel":"DOMMouseScroll":"focusOut"===n?S.Sniffer.isFirefox?"blur":"focusout":n;for(var l=0;l<a;l++)o[l][e+"EventListener"](r,i)},S.Polyfill.perfNow=function(t){"performance"in window||(window.performance={}),"now"in window.performance||!function(){var t=Date.now();window.performance.now=function(){return Date.now()-t}}()},S.Polyfill.raf=function(t){var e=0;window.requestAnimationFrame||(window.requestAnimationFrame=function(t){var n=(new Date).getTime(),i=Math.max(0,16-(n-e)),s=S.Delay(function(e){t(n+i)},i);return e=n+i,s}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})},S.Raf=function(t){window.requestAnimationFrame(t)},S.RafIndex=function(){function t(){classCallCheck(this,t)}return createClass(t,[{key:"start",value:function(t){this.rafCallback=S.Raf(t)}},{key:"cancel",value:function(){window.cancelAnimationFrame(this.rafCallback)}}]),t}(),S.RafTicking=function(){function t(){classCallCheck(this,t),this.ticking=!1,this.rafIndex=new S.RafIndex,S.BindMaker(this,["getCallback"])}return createClass(t,[{key:"start",value:function(t){this.callback=t,this.ticking||(this.ticking=!0,this.rafIndex.start(this.getCallback))}},{key:"getCallback",value:function(){this.callback(),this.destroy()}},{key:"destroy",value:function(){this.rafIndex.cancel(),this.ticking=!1}}]),t}(),S.ScrollToTop=function(t){function e(){switch(!0){case 0===s:return"Power1InOut";case s<=600:return"Power1InOut";default:return"ExpoInOut"}}function n(){var t=s/i.totalHeight,e=-Math.pow(2,-10*t)+1;switch(!0){case 0===s:return 0;case s>0&&s<=200:return 300;case s>200&&s<=400:return 500;case s>400&&s<=600:return 700;default:return 1500*e}}var i=t,s=S.Scrollable.scrollTop,o={destination:0,duration:n(),easing:e(),during:i.during,callback:i.callback};S.ScrollTo(o)},S.ScrollTo=function(t){function e(){S.WTDisable.off(),n.callback&&n.callback()}var n=t,i=S.Scrollable,s=i.scrollTop,o=new S.Merom(i,"scrollTop",s,n.destination,n.duration,n.easing,{callback:e,during:n.during});n.destination===s?e():(S.WTDisable.on(),o.play())},S.ScrollZero=function(t){S.Scrollable.scrollTop=0},S.Scrollable=S.Sniffer.isFirefox?document.documentElement:S.Dom.body,S.TopWhenRefresh=function(t){window.onbeforeunload=function(){window.scrollTo(0,0)}};var Win=function(){function t(){classCallCheck(this,t)}return createClass(t,[{key:"w",get:function(){return window.innerWidth}},{key:"h",get:function(){return window.innerHeight}},{key:"path",get:function(){return window.location.pathname}},{key:"hostname",get:function(){return window.location.hostname}},{key:"href",get:function(){return window.location.href}},{key:"perfNow",get:function(){return window.performance.now()}}]),t}();S.Win=new Win,S.Controller=function(t,e,n){function i(t){function e(t,e){t.setAttribute("content",e)}var n=S.Geb.tag("link")[0],i=S.Geb.tag("title")[0],s=S.Geb.tag("meta"),o=s.length,a=t.head.url,r=t.head.title,l=t.head.description,u=t.head.keywords;n.href=a,i.textContent=r;for(var c=0;c<o;c++){var h=s[c],f=h.getAttribute("name"),d=h.getAttribute("itemprop"),p=h.getAttribute("property");f?"description"===f?e(h,l):"keywords"===f?e(h,u):"twitter:title"===f?e(h,r):"twitter:description"===f&&e(h,l):d?"name"===d?e(h,r):"description"===d&&e(h,l):p&&("og:url"===p?e(h,a):"og:title"===p?e(h,r):"og:description"===p&&e(h,l))}}function s(){var e="home"===t?"/":t;history.pushState({key:"value"},"titre",e)}var o="index.php?url="+t+"&xhr=true",a=new XMLHttpRequest;a.open("GET",o,!0),a.onreadystatechange=function(){if(4===a.readyState&&200===a.status){var t=JSON.parse(a.responseText).xhrController;i(t),s(),e(t.view,n)}},a.send(null)},S.OnPopstate=function(t){function e(){S.Delay(function(t){i=!1},0)}function n(t){i&&"complete"===document.readyState&&(t.preventDefault(),t.stopImmediatePropagation())}var i="complete"!==document.readyState;S.Listen(window,"add","load",e),S.Listen(window,"add","popstate",n),window.onpopstate=function(t){window.location.href=S.Win.path}},module.exports=S;