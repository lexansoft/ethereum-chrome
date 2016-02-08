page_bundle_str_js="___require___=function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof ___require___==\"function\"&&___require___;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error(\"Cannot find module '\"+o+\"'\");throw f.code=\"MODULE_NOT_FOUND\",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof ___require___==\"function\"&&___require___;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(___require___,module,exports){(function(global){var rng;if(global.crypto&&crypto.getRandomValues){var _rnds8=new Uint8Array(16);rng=function whatwgRNG(){crypto.getRandomValues(_rnds8);return _rnds8}}if(!rng){var _rnds=new Array(16);rng=function(){for(var i=0,r;i<16;i++){if((i&3)===0)r=Math.random()*4294967296;_rnds[i]=r>>>((i&3)<<3)&255}return _rnds}}module.exports=rng}).call(this,typeof global!==\"undefined\"?global:typeof self!==\"undefined\"?self:typeof window!==\"undefined\"?window:{})},{}],\"/src/background/queue.js\":[function(___require___,module,exports){module.exports=function(max_total,expiration_time){this.max_total=max_total;this.expiration_time=expiration_time;this.transactions={};this.add=function(tr,id){if(this.transactions.length>=this.max_total){for(var r in this.transactions){if((new Date).getTime()-r.created>this.TIMEOUT){delete this.transactions[r.id]}}}if(this.transactions.length>=this.max_total)throw new Error(\"Ethereum Plugin: ERROR: Too many pending transactions\");r={data:tr,id:id,created:(new Date).getTime()};this.transactions[id]=r};this.get=function(id){r=this.transactions[id];if(!!r)return r.data;else return null};this.delete=function(id){delete this.transactions[r.id]};this.getN=function(){return Object.keys(this.transactions).length}}},{}],uuid:[function(___require___,module,exports){var _rng=___require___(\"./rng\");var _byteToHex=[];var _hexToByte={};for(var i=0;i<256;i++){_byteToHex[i]=(i+256).toString(16).substr(1);_hexToByte[_byteToHex[i]]=i}function parse(s,buf,offset){var i=buf&&offset||0,ii=0;buf=buf||[];s.toLowerCase().replace(/[0-9a-f]{2}/g,function(oct){if(ii<16){buf[i+ii++]=_hexToByte[oct]}});while(ii<16){buf[i+ii++]=0}return buf}function unparse(buf,offset){var i=offset||0,bth=_byteToHex;return bth[buf[i++]]+bth[buf[i++]]+bth[buf[i++]]+bth[buf[i++]]+\"-\"+bth[buf[i++]]+bth[buf[i++]]+\"-\"+bth[buf[i++]]+bth[buf[i++]]+\"-\"+bth[buf[i++]]+bth[buf[i++]]+\"-\"+bth[buf[i++]]+bth[buf[i++]]+bth[buf[i++]]+bth[buf[i++]]+bth[buf[i++]]+bth[buf[i++]]}var _seedBytes=_rng();var _nodeId=[_seedBytes[0]|1,_seedBytes[1],_seedBytes[2],_seedBytes[3],_seedBytes[4],_seedBytes[5]];var _clockseq=(_seedBytes[6]<<8|_seedBytes[7])&16383;var _lastMSecs=0,_lastNSecs=0;function v1(options,buf,offset){var i=buf&&offset||0;var b=buf||[];options=options||{};var clockseq=options.clockseq!==undefined?options.clockseq:_clockseq;var msecs=options.msecs!==undefined?options.msecs:(new Date).getTime();var nsecs=options.nsecs!==undefined?options.nsecs:_lastNSecs+1;var dt=msecs-_lastMSecs+(nsecs-_lastNSecs)/1e4;if(dt<0&&options.clockseq===undefined){clockseq=clockseq+1&16383}if((dt<0||msecs>_lastMSecs)&&options.nsecs===undefined){nsecs=0}if(nsecs>=1e4){throw new Error(\"uuid.v1(): Can't create more than 10M uuids/sec\")}_lastMSecs=msecs;_lastNSecs=nsecs;_clockseq=clockseq;msecs+=122192928e5;var tl=((msecs&268435455)*1e4+nsecs)%4294967296;b[i++]=tl>>>24&255;b[i++]=tl>>>16&255;b[i++]=tl>>>8&255;b[i++]=tl&255;var tmh=msecs/4294967296*1e4&268435455;b[i++]=tmh>>>8&255;b[i++]=tmh&255;b[i++]=tmh>>>24&15|16;b[i++]=tmh>>>16&255;b[i++]=clockseq>>>8|128;b[i++]=clockseq&255;var node=options.node||_nodeId;for(var n=0;n<6;n++){b[i+n]=node[n]}return buf?buf:unparse(b)}function v4(options,buf,offset){var i=buf&&offset||0;if(typeof options==\"string\"){buf=options==\"binary\"?new Array(16):null;options=null}options=options||{};var rnds=options.random||(options.rng||_rng)();rnds[6]=rnds[6]&15|64;rnds[8]=rnds[8]&63|128;if(buf){for(var ii=0;ii<16;ii++){buf[i+ii]=rnds[ii]}}return buf||unparse(rnds)}var uuid=v4;uuid.v1=v1;uuid.v4=v4;uuid.parse=parse;uuid.unparse=unparse;module.exports=uuid},{\"./rng\":1}]},{},[]);\n"+
"";
