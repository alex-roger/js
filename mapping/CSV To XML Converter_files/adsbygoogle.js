(function(){var q=this,aa=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b},ba=function(a,b,c){return a.call.apply(a.bind,arguments)},ca=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},s=function(a,b,c){s=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?
ba:ca;return s.apply(null,arguments)};var v=(new Date).getTime();var da=function(){},w=function(a,b,c){switch(typeof b){case "string":ea(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(b instanceof Array){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),w(a,b[f],c),e=",";c.push("]");break}c.push("{");d="";for(e in b)b.hasOwnProperty(e)&&(f=b[e],"function"!=typeof f&&(c.push(d),ea(e,c),c.push(":"),w(a,f,c),d=
","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}},x={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},fa=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,ea=function(a,b){b.push('"');b.push(a.replace(fa,function(a){if(a in x)return x[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return x[a]=e+b.toString(16)}));b.push('"')};var ga=/&/g,ha=/</g,ia=/>/g,ja=/"/g,ka=/'/g,la=/\x00/g,A={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\"},D={"'":"\\'"},F=function(a,b){return a<b?-1:a>b?1:0};var G=function(a){G[" "](a);return a};G[" "]=function(){};var H=function(a){try{var b;if(b=!!a&&null!=a.location.href)t:{try{G(a.foo);b=!0;break t}catch(c){}b=!1}return b}catch(d){return!1}};var ma=function(a){var b=a.toString();a.name&&-1==b.indexOf(a.name)&&(b+=": "+a.name);a.message&&-1==b.indexOf(a.message)&&(b+=": "+a.message);if(a.stack){a=a.stack;var c=b;try{-1==a.indexOf(c)&&(a=c+"\n"+a);for(var d;a!=d;)d=a,a=a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/,"$1");b=a.replace(/\n */g,"\n")}catch(e){b=c}}return b};var I=document,J=window;var K=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.call(null,a[c],c,a)},L=function(a){return!!a&&"function"==typeof a&&!!a.call},na=function(a,b){if(!(2>arguments.length))for(var c=1,d=arguments.length;c<d;++c)a.push(arguments[c])},M=function(a,b){if(!(1E-4>Math.random())){var c=Math.random();if(c<b){try{var d=new Uint16Array(1);window.crypto.getRandomValues(d);c=d[0]/65536}catch(e){c=Math.random()}return a[Math.floor(c*a.length)]}}return null},oa=function(a){a.google_unique_id?
++a.google_unique_id:a.google_unique_id=1},N=function(a){a=a.google_unique_id;return"number"==typeof a?a:0},pa=function(a){var b=a.length;if(0==b)return 0;for(var c=305419896,d=0;d<b;d++)c^=(c<<5)+(c>>2)+a.charCodeAt(d)&4294967295;return 0<c?c:4294967296+c},O=function(a,b){return b.getComputedStyle?b.getComputedStyle(a,null):a.currentStyle},qa=/(^| )adsbygoogle($| )/;var ra={google_analytics_domain_name:!0,google_analytics_uacct:!0},sa=function(a){a.google_page_url&&(a.google_page_url=String(a.google_page_url));var b=[];K(a,function(a,d){if(null!=a){var e;try{var f=[];w(new da,a,f);e=f.join("")}catch(h){}e&&na(b,d,"=",e,";")}});return b.join("")};var ta={G:1,H:8,I:16,F:24};var ua=function(a){a=a.document;return("CSS1Compat"==a.compatMode?a.documentElement:a.body).clientHeight},P=function(a){a=a.document;return("CSS1Compat"==a.compatMode?a.documentElement:a.body).clientWidth};var Q=function(a){a=parseFloat(a);return isNaN(a)||1<a||0>a?0:a},va=function(a,b){return/^true$/.test(a)?!0:/^false$/.test(a)?!1:b},wa=/^([\w-]+\.)*([\w-]{2,})(\:[0-9]+)?$/,xa=function(a,b){if(!a)return b;var c=a.match(wa);return c?c[0]:b};var ya=Q("0.15"),za=Q("0.01"),Aa=Q("0.01"),Ba=Q("0.001"),Ca=Q("0.05"),Da=Q("0.01"),Ea=Q("0.05"),Fa=Q("0.001"),Ga=Q("0.2"),Ha=va("true",!0),Ia=Q("0.01"),
Ja=parseInt("100",10),Ka=isNaN(Ja)?100:Ja;var La=va("false",!1);var Ma=!!window.google_async_iframe_id,R=Ma&&window.parent||window,Na=function(a,b,c){var d=["<iframe"],e;for(e in a)a.hasOwnProperty(e)&&na(d,e+"="+a[e]);d.push('style="left:0;position:absolute;top:0;"');d.push("></iframe>");a=a.id;b="border:none;height:"+c+"px;margin:0;padding:0;position:relative;visibility:visible;width:"+b+"px;background-color:transparent";return['<ins id="',a+"_expand",'" style="display:inline-table;',b,'"><ins id="',a+"_anchor",'" style="display:block;',b,'">',d.join(" "),"</ins></ins>"].join("")};var Oa=!0,Pa={},Sa=function(a,b,c,d){var e=Qa,f,h=Oa;try{f=b()}catch(g){try{var m=ma(g);b="";g.fileName&&(b=g.fileName);var l=-1;g.lineNumber&&(l=g.lineNumber);h=e(a,m,b,l,c)}catch(k){try{var p=ma(k);a="";k.fileName&&(a=k.fileName);c=-1;k.lineNumber&&(c=k.lineNumber);Qa("pAR",p,a,c,void 0,void 0)}catch(E){Ra({context:"mRE",msg:E.toString()+"\n"+(E.stack||"")},void 0)}}if(!h)throw g;}finally{if(d)try{d()}catch(B){}}return f},Qa=function(a,b,c,d,e,f){var h={};if(e)try{e(h)}catch(g){}h.context=a;h.msg=
b.substring(0,512);c&&(h.file=c);0<d&&(h.line=d.toString());h.url=I.URL.substring(0,512);h.ref=I.referrer.substring(0,512);Ta(h);Ra(h,f);return Oa},Ra=function(a,b){try{if(Math.random()<(b||.01)){var c="/pagead/gen_204?id=jserror"+Ua(a),d="http"+("http:"==J.location.protocol?"":"s")+"://pagead2.googlesyndication.com"+c,c=d=d.substring(0,2E3);J.google_image_requests||(J.google_image_requests=[]);var e=J.document.createElement("img");e.src=c;J.google_image_requests.push(e)}}catch(f){}},Ta=function(a){var b=
a||{};K(Pa,function(a,d){b[d]=J[a]})},Va=function(a,b){return function(){var c=arguments;return Sa(a,function(){return b.apply(void 0,c)},void 0,void 0)}},Wa=function(a,b){return Va(a,b)},Ua=function(a){var b="";K(a,function(a,d){if(0===a||a)b+="&"+d+"="+("function"==typeof encodeURIComponent?encodeURIComponent(a):escape(a))});return b};var Xa=null,Ya=function(){if(!Xa){for(var a=window,b=a,c=0;a!=a.parent;)if(a=a.parent,c++,H(a))b=a;else break;Xa=b}return Xa};Oa=!va("false",!1);Pa={client:"google_ad_client",format:"google_ad_format",slotname:"google_ad_slot",output:"google_ad_output",ad_type:"google_ad_type",async_oa:"google_async_for_oa_experiment",dimpr:"google_always_use_delayed_impressions_experiment",peri:"google_top_experiment",pse:"google_pstate_expt"};var Za={"120x90":!0,"160x90":!0,"180x90":!0,"200x90":!0,"468x15":!0,"728x15":!0};var $a={rectangle:1,horizontal:2,vertical:4},ab=/^([0-9.]+)px$/,bb=/^([0-9.]+)$/,cb=[{width:970,height:90,format:2,i:9},{width:728,height:90,format:2,i:4},{width:468,height:60,format:2,i:7},{width:336,height:280,format:1,i:1},{width:320,height:50,format:2,i:3},{width:300,height:600,format:4,i:2},{width:300,height:250,format:1,i:5},{width:250,height:250,format:1,i:11},{width:234,height:60,format:2,i:8},{width:200,height:200,format:1,i:13},{width:180,height:150,format:1,i:10},{width:160,height:600,
format:4,i:6},{width:125,height:125,format:1,i:15},{width:120,height:600,format:4,i:12},{width:120,height:240,format:4,i:14}],db=function(a){return(a=ab.exec(a))?Number(a[1]):null},eb=function(a){return(a=db(a))?Math.round(a):null},S=function(a,b,c){for(var d=0;d<c.length;d++){var e="google_ad_"+c[d];if(!b.hasOwnProperty(e)){var f=eb(a[c[d]]);null!=f&&(b[e]=f)}}},fb=function(a,b){return a<=b},gb=function(a,b,c){if("auto"==c)return c=P(a),c=Math.min(1200,c),.25>=b/c?4:3;b=0;for(var d in $a)-1!=c.indexOf(d)&&
(b|=$a[d]);return b},hb=function(a,b,c,d,e,f){c=cb.sort(c);for(var h=0;h<c.length;h++){var g=c[h],m;if(m=b(c[h].width,a)&&g.format&d){m=g;var l;if(l="EMATF"==e.google_responsive_optimization_experiment&&f&&468>P(e)){var k=f,p=e;l=Math.min(ua(p),16*P(p)/9);p=p.document.documentElement.getBoundingClientRect();k=k.getBoundingClientRect();l=(p&&k?k.top-p.top:0)<l}m=l?250>m.height:!0}if(m)return g}return null},ib=function(a,b){return b.width-a.width||b.height-a.height},jb=function(a,b,c,d,e){b=gb(c,a,
b);d&&(d.google_responsive_formats=b);return hb(a,fb,ib,b,c,e)},kb=function(a,b){return a.i-b.i},lb=function(a,b){var c=a/b;return.66<=c&&1>=c},mb=function(a,b,c,d,e){b=gb(c,a,b);d&&(d.google_responsive_formats=b);d=hb(a,lb,kb,b,c,e);return null==d?hb(a,fb,ib,b,c,e):d};var nb=function(a,b,c){c||(c=La?"https":"http");return[c,"://",a,b].join("")};var T=null;var U;t:{var ob=q.navigator;if(ob){var pb=ob.userAgent;if(pb){U=pb;break t}}U=""}var V=function(a){return-1!=U.indexOf(a)};var qb=V("Opera")||V("OPR"),W=V("Trident")||V("MSIE"),rb=V("Gecko")&&-1==U.toLowerCase().indexOf("webkit")&&!(V("Trident")||V("MSIE")),sb=-1!=U.toLowerCase().indexOf("webkit"),tb=function(){var a=q.document;return a?a.documentMode:void 0},ub=function(){var a="",b;if(qb&&q.opera)return a=q.opera.version,"function"==aa(a)?a():a;rb?b=/rv\:([^\);]+)(\)|;)/:W?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:sb&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(U))?a[1]:"");return W&&(b=tb(),b>parseFloat(a))?String(b):a}(),vb={},
wb=function(a){if(!vb[a]){for(var b=0,c=String(ub).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var h=c[f]||"",g=d[f]||"",m=RegExp("(\\d*)(\\D*)","g"),l=RegExp("(\\d*)(\\D*)","g");do{var k=m.exec(h)||["","",""],p=l.exec(g)||["","",""];if(0==k[0].length&&0==p[0].length)break;b=F(0==k[1].length?0:parseInt(k[1],10),0==p[1].length?0:parseInt(p[1],10))||F(0==k[2].length,0==p[2].length)||F(k[2],
p[2])}while(0==b)}vb[a]=0<=b}},xb=q.document,yb=xb&&W?tb()||("CSS1Compat"==xb.compatMode?parseInt(ub,10):5):void 0;var zb;if(!(zb=!rb&&!W)){var Ab;if(Ab=W)Ab=W&&9<=yb;zb=Ab}zb||rb&&wb("1.9.1");W&&wb("9");var Bb=function(a,b,c){if(!a||!b||!c)return"XS";var d;if(Ma&&!H(R)){for(d="."+I.domain;2<d.split(".").length&&!H(R);)I.domain=d=d.substr(d.indexOf(".")+1),R=window.parent;H(R)||(R=window)}d=R;for(a=a.parentElement;a;){try{var e=a.style}catch(f){}var h=a.parentElement;if(e){var g=db(e.width),m=db(e.height),l=h&&1==h.childNodes.length;if(m&&(l||g&&b>=g)&&c<m)return"NS";if(g&&(l||m&&c>=m)){if(b<g)return"NS"}else if(g||m)return"NS"}if((a=O(a,d))&&("absolute"==a.position||"fixed"==a.position))return"absolute"==
a.position?"CA":"CF";a=h;if(!a)try{a=d.frameElement;var k=d.parent;k&&k!=d&&(d=k)}catch(p){return"XS"}}return"CS"};var X=function(a){this.k=a;a.google_iframe_oncopy||(a.google_iframe_oncopy={handlers:{},upd:s(this.v,this)});this.s=a.google_iframe_oncopy},Cb;var Y="var i=this.id,s=window.google_iframe_oncopy,H=s&&s.handlers,h=H&&H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&&d&&(!d.body||!d.body.firstChild)){if(h.call){setTimeout(h,0)}else if(h.match){try{h=s.upd(h,i)}catch(e){}w.location.replace(h)}}";
/[\x00&<>"']/.test(Y)&&(-1!=Y.indexOf("&")&&(Y=Y.replace(ga,"&amp;")),-1!=Y.indexOf("<")&&(Y=Y.replace(ha,"&lt;")),-1!=Y.indexOf(">")&&(Y=Y.replace(ia,"&gt;")),-1!=Y.indexOf('"')&&(Y=Y.replace(ja,"&quot;")),-1!=Y.indexOf("'")&&(Y=Y.replace(ka,"&#39;")),-1!=Y.indexOf("\x00")&&(Y=Y.replace(la,"&#0;")));Cb=Y;X.prototype.set=function(a,b){this.s.handlers[a]=b;this.k.addEventListener&&this.k.addEventListener("load",s(this.t,this,a),!1)};
X.prototype.t=function(a){a=this.k.document.getElementById(a);try{var b=a.contentWindow.document;if(a.onload&&b&&(!b.body||!b.body.firstChild))a.onload()}catch(c){}};X.prototype.v=function(a,b){var c=Db("rx",a),d;t:{if(a&&(d=a.match("dt=([^&]+)"))&&2==d.length){d=d[1];break t}d=""}d=(new Date).getTime()-d;c=c.replace(/&dtd=(\d+|M)/,"&dtd="+(1E4>d?d+"":"M"));this.set(b,c);return c};var Db=function(a,b){var c=new RegExp("\\b"+a+"=(\\d+)"),d=c.exec(b);d&&(b=b.replace(c,a+"="+(+d[1]+1||1)));return b};var Z,$=function(a){this.l=[];this.k=a||window;this.j=0;this.m=null;this.n=0},Eb=function(a,b){this.u=a;this.r=b};$.prototype.A=function(a,b){0!=this.j||0!=this.l.length||b&&b!=window?this.q(a,b):(this.j=2,this.p(new Eb(a,window)))};$.prototype.q=function(a,b){this.l.push(new Eb(a,b||this.k));Fb(this)};$.prototype.B=function(a){this.j=1;if(a){var b=Wa("sjr::timeout",s(this.o,this,!0));this.m=this.k.setTimeout(b,a)}};
$.prototype.o=function(a){a&&++this.n;1==this.j&&(null!=this.m&&(this.k.clearTimeout(this.m),this.m=null),this.j=0);Fb(this)};$.prototype.C=function(){return!(!window||!Array)};$.prototype.D=function(){return this.n};$.prototype.nq=$.prototype.A;$.prototype.nqa=$.prototype.q;$.prototype.al=$.prototype.B;$.prototype.rl=$.prototype.o;$.prototype.sz=$.prototype.C;$.prototype.tc=$.prototype.D;var Fb=function(a){var b=Wa("sjr::tryrun",s(a.w,a));a.k.setTimeout(b,0)};
$.prototype.w=function(){if(0==this.j&&this.l.length){var a=this.l.shift();this.j=2;var b=Wa("sjr::run",s(this.p,this,a));a.r.setTimeout(b,0);Fb(this)}};$.prototype.p=function(a){this.j=0;a.u()};
var Gb=function(a){try{return a.sz()}catch(b){return!1}},Hb=function(a){return!!a&&("object"==typeof a||"function"==typeof a)&&Gb(a)&&L(a.nq)&&L(a.nqa)&&L(a.al)&&L(a.rl)},Ib=function(){if(Z&&Gb(Z))return Z;var a=Ya(),b=a.google_jobrunner;return Hb(b)?Z=b:a.google_jobrunner=Z=new $(a)},Jb=function(a,b){Ib().nq(a,b)},Kb=function(a,b){Ib().nqa(a,b)};var Lb=Ma?1==N(J):!N(J),Mb=function(){var a=G("script"),b;b=xa("","pagead2.googlesyndication.com");return["<",a,' src="',nb(b,"/pagead/js/r20140902/r20140417/show_ads_impl.js",""),'"></',a,">"].join("")},Nb=function(a,b,c,d){return function(){var e=!1;d&&Ib().al(3E4);var f=a.document.getElementById(b);f&&!H(f.contentWindow)&&3==
a.google_top_js_status&&(a.google_top_js_status=6);try{if(H(a.document.getElementById(b).contentWindow)){var h=a.document.getElementById(b).contentWindow,g=h.document;g.body&&g.body.firstChild||(g.open(),h.google_async_iframe_close=!0,g.write(c))}else{var m=a.document.getElementById(b).contentWindow,l;f=c;f=String(f);if(f.quote)l=f.quote();else{h=['"'];for(g=0;g<f.length;g++){var k=f.charAt(g),p=k.charCodeAt(0),E=g+1,B;if(!(B=A[k])){var z;if(31<p&&127>p)z=k;else{var n=k;if(n in D)z=D[n];else if(n in
A)z=D[n]=A[n];else{var r=n,C=n.charCodeAt(0);if(31<C&&127>C)r=n;else{if(256>C){if(r="\\x",16>C||256<C)r+="0"}else r="\\u",4096>C&&(r+="0");r+=C.toString(16).toUpperCase()}z=D[n]=r}}B=z}h[E]=B}h.push('"');l=h.join("")}m.location.replace("javascript:"+l)}e=!0}catch(t){m=Ya().google_jobrunner,Hb(m)&&m.rl()}e&&(e=Db("google_async_rrc",c),(new X(a)).set(b,Nb(a,b,e,!1)))}},Ob=function(a){var b=["<iframe"];K(a,function(a,d){null!=a&&b.push(" "+d+'="'+a+'"')});b.push("></iframe>");return b.join("")},Pb=function(a,
b,c,d){d=d?'"':"";var e=d+"0"+d;a.width=d+b+d;a.height=d+c+d;a.frameborder=e;a.marginwidth=e;a.marginheight=e;a.vspace=e;a.hspace=e;a.allowtransparency=d+"true"+d;a.scrolling=d+"no"+d;a.allowfullscreen=d+"true"+d},Rb=function(a,b,c){Qb(a,b,c,function(a,b,f){a=a.document;for(var h=b.id,g=0;!h||a.getElementById(h);)h="aswift_"+g++;b.id=h;b.name=h;h=Number(f.google_ad_width);g=Number(f.google_ad_height);16==f.google_reactive_ad_format?(f=a.createElement("div"),f.innerHTML=Na(b,h,g),c.appendChild(f.firstChild)):
c.innerHTML=Na(b,h,g);return b.id})},Qb=function(a,b,c,d){var e=G("script"),f={};Pb(f,b.google_ad_width,b.google_ad_height,!0);f.onload='"'+Cb+'"';d=d(a,f,b);var f=b.google_override_format||!Za[b.google_ad_width+"x"+b.google_ad_height]&&"aa"==b.google_loader_used?M(["c","e"],Ga):null,h=b.google_ad_output,g=b.google_ad_format;g||"html"!=h&&null!=h||(g=b.google_ad_width+"x"+b.google_ad_height,"e"==f&&(g+="_as"));h=!b.google_ad_slot||b.google_override_format||!Za[b.google_ad_width+"x"+b.google_ad_height]&&
"aa"==b.google_loader_used;g=g&&h?g.toLowerCase():"";b.google_ad_format=g;for(var g=[b.google_ad_slot,b.google_ad_format,b.google_ad_type,b.google_ad_width,b.google_ad_height],h=[],m=0,l=c;l&&25>m;l=l.parentNode,++m)h.push(9!=l.nodeType&&l.id||"");(h=h.join())&&g.push(h);b.google_ad_unit_key=pa(g.join(":")).toString();g=a.google_adk2_experiment=a.google_adk2_experiment||M(["C","E"],Fa)||"N";if("E"==g){g=c;h=[];for(m=0;g&&25>m;++m){var l=(l=9!=g.nodeType&&g.id)?"/"+l:"",k;t:{var p=g.parentElement;
k=g.nodeName.toLowerCase();if(p)for(var p=p.childNodes,E=0,B=0;B<p.length;++B){var z=p[B];if(z.nodeName&&z.nodeName.toLowerCase()==k){if(g==z){k="."+E;break t}++E}}k=""}h.push((g.nodeName&&g.nodeName.toLowerCase())+l+k);g=g.parentElement}g=h.join()+":";h=a;m=[];if(h)try{for(var n=h.parent,l=0;n&&n!=h&&25>l;++l){var r=n.frames;for(k=0;k<r.length;++k)if(h==r[k]){m.push(k);break}h=n;n=h.parent}}catch(C){}b.google_ad_unit_key_2=pa(g+m.join()).toString()}else"C"==g&&(b.google_ad_unit_key_2="ctrl");if(n=
a)n=H(a.top)?a.top:null;if(n){var n=b.google_reactive_ad_format,t;t:{for(t in ta)if(ta[t]==n){t=!0;break t}t=!1}n=!(t&&""+n)}c=n?Bb(c,b.google_ad_width,b.google_ad_height):"XS";b.google_ablation_signals=c;b=sa(b);var u;if(c=Lb){if(!T)r:{t=[J.top];c=[];for(n=0;r=t[n++];){c.push(r);try{if(r.frames)for(var y=r.frames.length,g=0;g<y&&1024>t.length;++g)t.push(r.frames[g])}catch(cc){}}for(y=0;y<c.length;y++)try{if(u=c[y].frames.google_esf){T=u;break r}}catch(dc){}T=null}c=!T}c?(u={},Pb(u,0,0,!1),u.style=
"display:none",u.id="google_esf",u.name="google_esf",y=nb(xa("","googleads.g.doubleclick.net"),"/pagead/html/r20140902/r20140417/zrt_lookup.html"),u.src=y,u=Ob(u)):u="";y=(new Date).getTime();c=a.google_top_experiment;if(t=a.google_async_for_oa_experiment)a.google_async_for_oa_experiment=void 0;n=a.google_always_use_delayed_impressions_experiment;r=a.google_auto_width_experiment;g=a.google_responsive_optimization_experiment;
h=a.google_floating_ads_js_experiment;f=["<!doctype html><html><body>",u,"<",e,">",b,"google_show_ads_impl=true;google_unique_id=",a.google_unique_id,';google_async_iframe_id="',d,'";google_start_time=',v,";",c?'google_top_experiment="'+c+'";':"",t?'google_async_for_oa_experiment="'+t+'";':"",n?'google_always_use_delayed_impressions_experiment="'+n+'";':"",f?'google_append_as_for_format_override="'+f+'";':"",r?'google_auto_width_experiment="'+r+'";':"",g?'google_responsive_optimization_experiment="'+
g+'";':"",h?'google_floating_ads_js_experiment="'+h+'";':"","google_bpp=",y>v?y-v:1,";google_async_rrc=0;</",e,">",Mb(),"</body></html>"].join("");(a.document.getElementById(d)?Jb:Kb)(Nb(a,d,f,!0))},Sb=function(){if(void 0===window.google_auto_width_experiment){var a=["C","E"],b=za;window.google_auto_width_experiment=M(a,b);if(window.google_auto_width_experiment)return window.google_auto_width_experiment;b=Aa;a=["CI","EI"];window.google_auto_width_experiment=M(a,b);return window.google_auto_width_experiment}return""},
Tb=Math.floor(1E6*Math.random()),Ub=function(a){for(var b=a.data.split("\n"),c={},d=0;d<b.length;d++){var e=b[d].indexOf("=");-1!=e&&(c[b[d].substr(0,e)]=b[d].substr(e+1))}b=c[3];if(c[1]==Tb&&(window.google_top_js_status=4,a.source==top&&0==b.indexOf(a.origin)&&(window.google_top_values=c,window.google_top_js_status=5),window.google_top_js_callbacks)){for(a=0;a<window.google_top_js_callbacks.length;a++)window.google_top_js_callbacks[a]();window.google_top_js_callbacks.length=0}},Vb=function(a,b){var c=
navigator;if(Ha&&a&&b&&c){var d=a.document,c=d.createElement("script"),e;(e=b)?(e=e.toLowerCase())&&"ca-"!=e.substring(0,3)&&(e="ca-"+e):e="";c.async=!0;c.type="text/javascript";c.src=nb("www.gstatic.com","/pub-config/"+e+".js");d=d.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d)}};var Wb=function(a){return qa.test(a.className)&&"done"!=a.getAttribute("data-adsbygoogle-status")},Yb=function(a,b,c){oa(c);Xb(a,b,c);var d=O(a,c);if(!d||"none"!=d.display||"on"==b.google_adtest||0<b.google_reactive_ad_format){1==N(c)&&Vb(c,b.google_ad_client);K(ra,function(a,d){b[d]=b[d]||c[d]});b.google_loader_used="aa";if((d=b.google_ad_output)&&"html"!=d)throw Error("No support for google_ad_output="+d);Sa("aa::main",function(){Rb(c,b,a)})}else c.document.createComment&&a.appendChild(c.document.createComment("No ad requested because of display:none on the adsbygoogle tag"))},
Xb=function(a,b,c){for(var d=a.attributes,e=d.length,f=0;f<e;f++){var h=d[f];if(/data-/.test(h.nodeName)){var g=h.nodeName.replace("data","google").replace(/-/g,"_");b.hasOwnProperty(g)||(h=h.nodeValue,"google_reactive_ad_format"==g&&(h=+h,h=isNaN(h)?null:h),null===h||(b[g]=h))}}if(b.google_enable_content_recommendations&&1==b.google_reactive_ad_format)b.google_ad_width=P(c),void 0===window.google_floating_ads_js_experiment&&(window.google_floating_ads_js_experiment=M(["4091000","4091001"],Ia)),"4091001"==
window.google_floating_ads_js_experiment?b.google_ad_height=Ka:b.google_ad_height=50,a.style.display="none";else if(1==b.google_reactive_ad_format)b.google_ad_width=320,b.google_ad_height=50,a.style.display="none";else if(8==b.google_reactive_ad_format)b.google_ad_width=P(c),b.google_ad_height=ua(c),a.style.display="none";else if(d=b.google_ad_format,"auto"==d||/^((^|,) *(horizontal|vertical|rectangle) *)+$/.test(d)){void 0===window.google_responsive_optimization_experiment&&(d=468>P(window),e=window,
(f=M(["C","E1"],Ba))||(f=["C320","E320"],f=d?M(f,Ca):null),f||(f=["CMATF","EMATF"],f=d?M(f,Ea):null),e.google_responsive_optimization_experiment=f||M(["SC","SE"],Da));d=a.offsetWidth;e=b.google_ad_format;f=jb;"E1"==c.google_responsive_optimization_experiment&&(f=mb);f=f(d,e,c,b,a);if(!f)throw Error("Cannot find a responsive size for a container of width="+d+"px and data-ad-format="+e);d="SE"==c.google_responsive_optimization_experiment?f.width:300<d&&300<f.height?f.width:1200<d?1200:Math.round(d);
b.google_ad_height="E320"==c.google_responsive_optimization_experiment&&320==f.width&&50==f.height?100:f.height;b.google_ad_width=d;a.style.height=b.google_ad_height+"px";b.google_ad_resizable=!0;delete b.google_ad_format;b.google_loader_features_used=128}else!bb.test(b.google_ad_width)&&!ab.test(a.style.width)||!bb.test(b.google_ad_height)&&!ab.test(a.style.height)?(c=O(a,c),a.style.width=c.width,a.style.height=c.height,S(c,b,["width","height"]),b.google_loader_features_used=256):"E"==Sb()||Zb(c)?
(d="CI"!=c.google_auto_width_experiment,e=a.style,S(e,b,["height"]),f=a.style.width,a.style.width="100%",g=a.offsetWidth,a.style.width=f,f=g,g=eb(e.width),h=eb(e.height),!h||!g||50>h||120>f||Za[g+"x"+h]?(S(e,b,["width"]),a=!1):(f=Math.min(1200,f),300<h&&(f=Math.min(300,f)),f<=g?(S(e,b,["width"]),a=!1):(d?(b.google_ad_width=f,b.google_original_width=g,a.style.width=f+"px"):(b.google_ad_width=g,b.google_available_width=f),a=!0)),!a&&Zb(c)&&(c.google_auto_width_experiment=null)):S(a.style,b,["width",
"height"])},Zb=function(a){a=a.google_auto_width_experiment;return"EI"==a||"CI"==a},$b=function(a){for(var b=document.getElementsByTagName("ins"),c=0,d=b[c];c<b.length;d=b[++c])if(Wb(d)&&(!a||d.id==a))return d;return null},ac=function(a){var b=a.element;a=a.params||{};if(b){if(!Wb(b)&&(b=b.id&&$b(b.id),!b))throw Error("adsbygoogle: 'element' has already been filled.");if(!("innerHTML"in b))throw Error("adsbygoogle.push(): 'element' is not a good DOM element.");}else if(b=$b(),!b)throw Error("adsbygoogle.push(): All ins elements in the DOM with class=adsbygoogle already have ads in them.");
var c=window;b.setAttribute("data-adsbygoogle-status","done");Yb(b,a,c)},bc=function(){if(!window.google_top_experiment&&!window.google_top_js_status){var a=window;if(2!==(a.top==a?0:H(a.top)?1:2))window.google_top_js_status=0;else if(top.postMessage){var b;try{b=J.top.frames.google_top_static_frame?!0:!1}catch(c){b=!1}if(b){if(window.google_top_experiment=M(["jp_c","jp_zl","jp_wfpmr","jp_zlt","jp_wnt"],ya),"jp_c"!==window.google_top_experiment){a=window;a.addEventListener?a.addEventListener("message",
Ub,!1):a.attachEvent&&a.attachEvent("onmessage",Ub);window.google_top_js_status=3;a={0:"google_loc_request",1:Tb};b=[];for(var d in a)b.push(d+"="+a[d]);top.postMessage(b.join("\n"),"*")}}else window.google_top_js_status=2}else window.google_top_js_status=1}if((d=window.adsbygoogle)&&d.shift)for(b=20;(a=d.shift())&&0<b--;)try{ac(a)}catch(e){throw window.setTimeout(bc,0),e;}window.adsbygoogle={push:ac}};bc();})();
