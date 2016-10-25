/**
 * Skylake
 *
 * Version   →  1.0.49
 * Github    →  https://github.com/ariiiman/skylake
 * License   →  http://opensource.org/licenses/MIT
 * Author    →  Aristide Benoist © 2016
 * Website   →  www.aristidebenoist.com
 * Date      →  Oct 25, 2016
 */
var S={Polyfill:{}};module.exports=S,S.Merom=function(t,e,i,n,o,s,r){this.element=t,this.prop=e,this.start=i,this.end=n,S.Is.object(o)?(this.duration=0,this.easing="linear",this.opts=o):(this.duration=o||0,this.easing=s||"linear",this.opts=r||!1),this.delaysInit(),this.el=S.Selector.el(this.element),this.elL=this.el.length,this.deltaTimeAtPause=0,this.EasingLibrary=S.Easing,this.raf=new S.RafIndex,this.selectUpdateType(),S.BindMaker(this,["getRaf","loop"])},S.Merom.prototype={play:function(){var t=this;S.Delay(function(){t.isPaused=!1,t.getRaf()},t.delay)},pause:function(t){"on"===t?(this.isPaused=!0,this.deltaTimeSave=this.deltaTime):(this.deltaTimeAtPause=this.deltaTimeSave,this.delay=0,this.play())},reverse:function(t,e,i){this.pause("on"),S.Is.object(t)?this.opts=t:(this.duration=t||this.duration,this.easing=e||this.easing,this.opts=i||!1),this.getReset()},reset:function(t){this.pause("on"),this.duration=0,this.easing="linear",this.opts=t||!1,this.getReset()},getRaf:function(){this.startTime=S.Win.perfNow,this.raf.start(this.loop)},loop:function(){if(!this.isPaused){var t=S.Win.perfNow;this.deltaTime=t-this.startTime+this.deltaTimeAtPause;var e=this.deltaTime/this.duration,i=e>1?1:e,n=this.EasingLibrary[this.easing](i);if(this.isNotMultipleT)this.value=S.Lerp.init(+this.start,+this.end,n);else{this.value=[];for(var o=0;o<this.updateQty;o++)this.value[o]=S.Lerp.init(+this.start[o],+this.end[o],n)}this.update(this.value),i<1?this.raf.start(this.loop):(this.raf.cancel(),this.update(this.end),this.opts.callback&&S.Delay(this.opts.callback,this.callbackDelay))}},selectUpdateType:function(){if(S.Is.array(this.prop))this.isNotMultipleT=!1,this.updateQty=this.prop.length,this.update=this.multipleT;else{switch(this.prop){case"3dx":case"3dy":case"scale":case"rotate":this.update=this.simpleT;break;case"scrollTop":this.update=this.setScrollTop;break;default:this.update=this.setStyle}this.isNotMultipleT=!0}},multipleT:function(t){for(var e=0,i=0,n="",o="",s=0;s<this.updateQty;s++)"3dx"===this.prop[s]?e=t[s]+this.t3dUnit(this.start[s]):"3dy"===this.prop[s]?i=t[s]+this.t3dUnit(this.start[s]):"rotate"===this.prop[s]?n="rotate("+t[s]+"deg)":"scale"===this.prop[s]&&(o="scale("+t[s]+")");var r="translate3d("+e+","+i+",0)",a=r+" "+n+" "+o;this.updateDom("transform",a)},simpleT:function(t){var e;if("3dx"===this.prop||"3dy"===this.prop){var i=t+this.t3dUnit(this.start),n="3dx"===this.prop?i+",0":"0,"+i;e="translate3d("+n+",0)"}else e="rotate"===this.prop?"rotate("+t+"deg)":"scale("+t+")";this.updateDom("transform",e)},setScrollTop:function(t){this.element[this.prop]=t,this.opts.during&&this.opts.during(t)},setStyle:function(t){this.updateDom(this.prop,t)},updateDom:function(t,e){for(var i=0;i<this.elL;i++)"transform"===t?(this.el[i].style.webkitTransform=e,this.el[i].style.transform=e):"x"===t||"y"===t||"r"===t?this.el[i].setAttribute(t,e):this.el[i].style[t]=e},delaysInit:function(){this.delay=this.opts.delay||0,this.callbackDelay=this.opts.callbackDelay||0},getReset:function(){this.end=this.start,this.start=S.Is.string(this.start)?String(this.value):this.value,this.delaysInit(),this.play()},t3dUnit:function(t){return S.Is.string(t)?"px":"%"}},S.AnimatedLine=function(t){this.path=S.Selector.el(t),this.pathL=this.path.length,this.merom=[]},S.AnimatedLine.prototype={play:function(t,e,i){this.type="play",this.run(t,e,i)},reverse:function(t,e,i){this.type="reverse",this.run(t,e,i)},run:function(t,e,i){this.duration=t,this.easing=e,this.callback=i;for(var n=0;n<this.pathL;n++)this.animationLine(this.path[n],n)},pause:function(t){for(var e=0;e<this.pathL;e++)this.merom[e].pause(t)},reset:function(){for(var t=0;t<this.pathL;t++)this.path[t].style=""},animationLine:function(t,e){var i,n,o=t.getTotalLength();if("reverse"===this.type){var s=t.style.strokeDashoffset;i="x"===s.charAt(s.length-1)?+s.substring(0,s.length-2):+s,n=o}else i=o,n=0;t.style.strokeDasharray=o,t.style.opacity=1,this.merom[e]=new S.Merom(t,"strokeDashoffset",i,n,this.duration,this.easing,{callback:this.callback}),this.merom[e].play()}},S.Morph=function(t){this.opts=t,this.type="polygon"===this.opts.type?"points":"d",this.coordsStart=this.getCoordsArr(this.opts.element.getAttribute(this.type)),this.coordsEnd=this.getCoordsArr(this.opts.newCoords),this.raf=new S.RafIndex,S.BindMaker(this,["getRaf","loop"])},S.Morph.prototype={play:function(){var t=this.opts.delay?this.opts.delay:0;S.Delay(this.getRaf,t)},pause:function(){this.isPaused=!0},getRaf:function(){this.startTime=S.Win.perfNow,this.raf.start(this.loop)},loop:function(){if(!this.isPaused){for(var t=S.Win.perfNow,e=(t-this.startTime)/this.opts.duration,i=e>1?1:e,n=S.Easing[this.opts.easing](i),o=[],s="",r=0;r<this.coordsStart.length;r++)o[r]=this.isLetter(this.coordsStart[r])?this.coordsStart[r]+" ":S.Lerp.init(+this.coordsStart[r],+this.coordsEnd[r],n),s+=o[r],r!==this.coordsStart.length-1&&(s+=","===s.charAt(s.length-1)?" ":",");this.opts.element.setAttribute(this.type,s),n<1?this.raf.start(this.loop):(this.raf.cancel(),this.opts.element.setAttribute(this.type,this.opts.newCoords),this.getCallback())}},getCoordsArr:function(t){for(var e=t.split(" "),i=[],n=0;n<e.length;n++)for(var o=e[n].split(","),s=0;s<o.length;s++)i.push(o[s]);return i},isLetter:function(t){return"M"===t||"L"===t||"C"===t||"Z"===t},getCallback:function(){if(this.opts.callback){var t=this.opts.callbackDelay?this.opts.callbackDelay:0;S.Delay(this.opts.callback,t)}}},S.Timeline=function(){this.content=[],this.contentL=function(){return this.content.length}},S.Timeline.prototype={from:function(t,e,i,n,o,s,r){if(this.contentL()>0){var r=r||{},a=this.content[this.contentL()-1].delay,h=o&&S.Is.object(o);h&&o.delay?o.delay=a+o.delay:h?o.delay=a:r.delay?r.delay=a+r.delay:r.delay=a}this.content.push(new S.Merom(t,e,i,n,o,s,r))},play:function(){for(var t=0;t<this.contentL();t++)this.content[t].play()},pause:function(t){for(var e=0;e<this.contentL();e++)this.content[e].pause(t)},reverse:function(){for(var t=0;t<this.contentL();t++)this.content[t].reverse(Array.from(arguments))},reset:function(t){for(var e=0;e<this.contentL();e++)this.content[e].reset(t)}},S.BindMaker=function(t,e){for(var i=e.length,n=0;n<i;n++)t[e[n]]=t[e[n]].bind(t)},S.Delay=function(t,e){window.setTimeout(function(){t()},e)};var e={s:1.70158,q:2.25,r:1.525,u:.984375,v:7.5625,w:.9375,x:2.75,y:2.625,z:.75};S.Easing={linear:function(t){return t},Power1In:function(t){return-Math.cos(t*(Math.PI/2))+1},Power1Out:function(t){return Math.sin(t*(Math.PI/2))},Power1InOut:function(t){return-.5*(Math.cos(Math.PI*t)-1)},Power2In:function(t){return t*t},Power2Out:function(t){return t*(2-t)},Power2InOut:function(t){return t<.5?2*t*t:-1+(4-2*t)*t},Power3In:function(t){return t*t*t},Power3Out:function(t){return--t*t*t+1},Power3InOut:function(t){return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},Power4In:function(t){return t*t*t*t},Power4Out:function(t){return 1- --t*t*t*t},Power4InOut:function(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t},Power5In:function(t){return t*t*t*t*t},Power5Out:function(t){return 1+--t*t*t*t*t},Power5InOut:function(t){return t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t},ExpoIn:function(t){return 0===t?0:Math.pow(2,10*(t-1))},ExpoOut:function(t){return 1===t?1:-Math.pow(2,-10*t)+1},ExpoInOut:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},CircIn:function(t){return-(Math.sqrt(1-t*t)-1)},CircOut:function(t){return Math.sqrt(1-Math.pow(t-1,2))},CircInOut:function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){return t*t*((e.s+1)*t-e.s)},BackOut:function(t){return(t-=1)*t*((e.s+1)*t+e.s)+1},BackInOut:function(t){return(t/=.5)<1?.5*(t*t*(((e.s*=e.r)+1)*t-e.s)):.5*((t-=2)*t*(((e.s*=e.r)+1)*t+e.s)+2)},Elastic:function(t){return-1*Math.pow(4,-8*t)*Math.sin((6*t-1)*(2*Math.PI)/2)+1},SwingFromTo:function(t){return(t/=.5)<1?.5*(t*t*(((e.s*=e.r)+1)*t-e.s)):.5*((t-=2)*t*(((e.s*=e.r)+1)*t+e.s)+2)},SwingFrom:function(t){return t*t*((e.s+1)*t-e.s)},SwingTo:function(t){return(t-=1)*t*((e.s+1)*t+e.s)+1},Bounce:function(t){return t<1/e.x?e.v*t*t:t<2/e.x?e.v*(t-=1.5/e.x)*t+e.z:t<2.5/e.x?e.v*(t-=e.q/e.x)*t+e.w:e.v*(t-=e.y/e.x)*t+e.u},BounceOut:function(t){return t<1/e.x?e.v*t*t:t<2/e.x?e.v*(t-=1.5/e.x)*t+e.z:t<2.5/e.x?e.v*(t-=e.q/e.x)*t+e.w:e.v*(t-=e.y/e.x)*t+e.u},BouncePast:function(t){return t<1/e.x?e.v*t*t:t<2/e.x?2-(e.v*(t-=1.5/e.x)*t+e.z):t<2.5/e.x?2-(e.v*(t-=e.q/e.x)*t+e.w):2-(e.v*(t-=e.y/e.x)*t+e.u)},FromTo:function(t){return(t/=.5)<1?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},From:function(t){return Math.pow(t,4)},To:function(t){return Math.pow(t,.25)}},S.Is=function(){var t=function(t){return"string"==typeof t},e=function(t){return t===Object(t)},i=function(t){t.constructor===Array};return{string:t,object:e,array:i}}(),S.Lerp={init:function(t,e,i){return t+(e-t)*i},extend:function(t,e,i,n,o){return n+(o-n)/(i-e)*(t-1)}},S.Sniffer={uA:navigator.userAgent.toLowerCase(),get isFirefox(){return this.uA.indexOf("firefox")>-1},get safari(){return this.uA.match(/version\/[\d\.]+.*safari/)},get isSafari(){return!!this.safari},get isFacebookApp(){const t=navigator.userAgent||navigator.vendor||window.opera;return t.indexOf("FBAN")>-1||t.indexOf("FBAV")>-1},get version(){if(this.isSafari){var t=this.safari[0].match(/version\/\d{1,2}/);return+t[0].split("/")[1]}return!1},get isTouch(){return"ontouchend"in window},get isPageError(){for(var t=S.Geb.tag("meta"),e=t.length,i=!1,n=0;n<e;n++)if("error"===t[n].name){i=!0;break}return i}},S.Throttle=function(t){this.timeout=!1,this.timer=0,this.opts=t,S.BindMaker(this,["atEndController"])},S.Throttle.prototype={init:function(){this.startTime=S.Win.perfNow,this.timeout||(this.timeout=!0,S.Delay(this.atEndController,this.opts.delay))},atEndController:function(){var t=S.Win.perfNow;t-this.startTime<this.opts.delay?(this.timer=S.Delay(this.atEndController,this.opts.delay),this.opts.atEnd||this.opts.callback()):(clearTimeout(this.timer),this.timeout=!1,this.opts.callback())}},S.Geb=function(){var t=document,e=function(e){return t.getElementById(e)},i=function(e){return t.getElementsByClassName(e)},n=function(e){return t.getElementsByTagName(e)};return{id:e,class:i,tag:n}}(),S.Dom={html:document.documentElement,body:document.body},S.Selector=function(){var t=function(t){var e=[];if(S.Is.string(t)){const i=t.substring(1);"#"===t.charAt(0)?e[0]=S.Geb.id(i):e=S.Geb.class(i)}else e[0]=t;return e},e=function(t){return"#"===t.charAt(0)?"id":"class"},i=function(t){return t.substring(1)};return{el:t,type:e,name:i}}(),S.MM=function(t){this.callback=t,this.posX=0,this.posY=0,this.rafTicking=new S.RafTicking,S.BindMaker(this,["getRAF","run"])},S.MM.prototype={on:function(){this.listeners("add")},off:function(){this.listeners("remove")},listeners:function(t){S.Listen(document,t,"mousemove",this.getRAF)},getRAF:function(t){this.event=t,this.rafTicking.start(this.run)},run:function(){this.posX=this.event.pageX,this.posY=this.event.pageY,this.callback(this.posX,this.posY)}},S.RO=function(t){this.opts=t,this.isTouch=S.Sniffer.isTouch,S.BindMaker(this,["getThrottle","getRAF"]),this.throttle=new S.Throttle({callback:this.getRAF,delay:this.opts.throttle.delay,atEnd:this.opts.throttle.atEnd}),this.rafTicking=new S.RafTicking},S.RO.prototype={on:function(){this.listeners("add")},off:function(){this.listeners("remove")},listeners:function(t){this.isTouch?S.Listen(window,t,"orientationchange",this.getThrottle):S.Listen(window,t,"resize",this.getThrottle)},getThrottle:function(){this.throttle.init()},getRAF:function(){this.rafTicking.start(this.opts.callback)}},S.Scroll=function(t){this.opts=t,this.scrollable=S.Scrollable,S.BindMaker(this,["getThrottle","getRAF","run"]),this.throttle=new S.Throttle({callback:this.getRAF,delay:this.opts.throttle.delay,atEnd:this.opts.throttle.atEnd}),this.rafTicking=new S.RafTicking},S.Scroll.prototype={on:function(){this.startScrollY=this.scrollable.scrollTop,this.listeners("add")},off:function(){this.listeners("remove")},listeners:function(t){S.Listen(window,t,"scroll",this.getThrottle)},getThrottle:function(){this.throttle.init()},getRAF:function(){this.rafTicking.start(this.run)},run:function(){var t=this.scrollable.scrollTop,e=-(t-this.startScrollY);this.startScrollY=t,this.opts.callback(t,e)}},S.WTDisable=function(){function t(t){var i=S.Sniffer.isTouch,n=document;i?S.Listen(n,t,"touchmove",e):S.Listen(n,t,"mouseWheel",e)}function e(t){t.preventDefault()}var i=function(){t("add")},n=function(){t("remove")};return{on:i,off:n}}(),S.WT=function(t){this.callback=t,this.isTouch=S.Sniffer.isTouch,this.rafTicking=new S.RafTicking,S.BindMaker(this,["getRAF","run","touchStart","touchMove"])},S.WT.prototype={on:function(){S.WTDisable.off(),this.listeners("add")},off:function(){S.WTDisable.on(),this.listeners("remove")},listeners:function(t){var e=document;this.isTouch?(S.Listen(e,t,"touchstart",this.touchStart),S.Listen(e,t,"touchmove",this.touchMove)):S.Listen(e,t,"mouseWheel",this.getRAF)},getRAF:function(t){t.preventDefault(),this.listeners("remove"),this.event=t,this.rafTicking.start(this.run)},run:function(){const t=this.event.type;"wheel"===t?this.onWheel():"mousewheel"===t&&this.onMouseWheel()},onWheel:function(){this.type="scroll",this.delta=this.event.wheelDeltaY||this.event.deltaY*-1,S.Sniffer.isFirefox&&1===this.event.deltaMode&&(this.delta*=40),this.getCallback()},onMouseWheel:function(){this.type="scroll",this.delta=this.event.wheelDeltaY?this.event.wheelDeltaY:this.event.wheelDelta,this.getCallback()},touchStart:function(t){t.preventDefault(),this.start=t.targetTouches[0].pageY},touchMove:function(t){t.preventDefault(),this.type="touch",this.delta=t.targetTouches[0].pageY-this.start,this.getCallback()},getCallback:function(){this.isTouch||this.listeners("add"),this.callback(this.delta,this.type,this.event)}},S.AutoTransitionend=function(t,e,i){function n(t){t.stopPropagation(),s("remove"),o()}function o(){e(i)}function s(t){S.Listen(r,t,"transitionend",n)}var r=S.Geb.id(t);s("add")},S.Listen=function(t,e,i,n){var o,s=document,r=S.Selector.el(t),a=r.length;o="mouseWheel"===i?"onwheel"in s?"wheel":void 0!==s.onmousewheel?"mousewheel":"DOMMouseScroll":"focusOut"===i?S.Sniffer.isFirefox?"blur":"focusout":i;for(var h=0;h<a;h++)r[h][e+"EventListener"](o,n)},S.Polyfill.perfNow=function(){if("performance"in window||(window.performance={}),!("now"in window.performance)){var t=Date.now();window.performance.now=function(){return Date.now()-t}}},S.Polyfill.raf=function(){var t=0;window.requestAnimationFrame||(window.requestAnimationFrame=function(e){var i=(new Date).getTime(),n=Math.max(0,16-(i-t)),o=S.Delay(function(){e(i+n)},n);return t=i+n,o}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})},S.Raf=function(t){window.requestAnimationFrame(t)},S.RafIndex=function(){this.start=function(t){this.rafCallback=S.Raf(t)},this.cancel=function(){window.cancelAnimationFrame(this.rafCallback)}},S.RafTicking=function(){this.ticking=!1,this.rafIndex=new S.RafIndex,S.BindMaker(this,["getCallback"])},S.RafTicking.prototype={start:function(t){this.callback=t,this.ticking||(this.ticking=!0,this.rafIndex.start(this.getCallback))},getCallback:function(){this.callback(),this.destroy()},destroy:function(){this.rafIndex.cancel(),this.ticking=!1}},S.ScrollToTop=function(t){function e(){switch(!0){case 0===o:return"Power1InOut";case o<=600:return"Power1InOut";default:return"ExpoInOut"}}function i(){var t=o/n.totalHeight,e=-Math.pow(2,-10*t)+1;switch(!0){case 0===o:return 0;case o>0&&o<=200:return 300;case o>200&&o<=400:return 500;case o>400&&o<=600:return 700;default:return 1500*e}}var n=t,o=S.Scrollable.scrollTop,s={destination:0,duration:i(),easing:e(),during:n.during,callback:n.callback};S.ScrollTo(s)},S.ScrollTo=function(t){function e(){S.WTDisable.off(),i.callback&&i.callback()}var i=t,n=S.Scrollable,o=n.scrollTop,s=new S.Merom(n,"scrollTop",o,i.destination,i.duration,i.easing,{callback:e,during:i.during});i.destination===o?e():(S.WTDisable.on(),s.play())},S.ScrollZero=function(){S.Scrollable.scrollTop=0},S.Scrollable=S.Sniffer.isFirefox?document.documentElement:S.Dom.body,S.TopWhenRefresh=function(){window.onbeforeunload=function(){window.scrollTo(0,0)}},S.Win={get w(){return window.innerWidth},get h(){return window.innerHeight},get path(){return window.location.pathname},get hostname(){return window.location.hostname},get href(){return window.location.href},get perfNow(){return window.performance.now()}},S.Controller=function(t,e,i){function n(t){function e(t,e){t.setAttribute("content",e)}var i=S.Geb.tag("link")[0],n=S.Geb.tag("title")[0],o=S.Geb.tag("meta"),s=o.length,r=t.head.url,a=t.head.title,h=t.head.description,c=t.head.keywords;i.href=r,n.textContent=a;for(var u=0;u<s;u++){var l=o[u],f=l.getAttribute("name"),p=l.getAttribute("itemprop"),d=l.getAttribute("property");f?"description"===f?e(l,h):"keywords"===f?e(l,c):"twitter:title"===f?e(l,a):"twitter:description"===f&&e(l,h):p?"name"===p?e(l,a):"description"===p&&e(l,h):d&&("og:url"===d?e(l,r):"og:title"===d?e(l,a):"og:description"===d&&e(l,h))}}function o(){var e="home"===t?"/":t;history.pushState({key:"value"},"titre",e)}var s="index.php?url="+t+"&xhr=true",r=new XMLHttpRequest;r.open("GET",s,!0),r.onreadystatechange=function(){if(4===r.readyState&&200===r.status){var t=JSON.parse(r.responseText).xhrController;n(t),o(),e(t.view,i)}},r.send(null)},S.OnPopstate=function(){function t(){S.Delay(function(){i=!1},0)}function e(t){i&&"complete"===document.readyState&&(t.preventDefault(),t.stopImmediatePropagation())}var i="complete"!==document.readyState;S.Listen(window,"add","load",t),S.Listen(window,"add","popstate",e),window.onpopstate=function(){window.location.href=S.Win.path}};