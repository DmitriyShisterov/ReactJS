!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){!function(e){let t={};function n(e){let t=document.querySelector("#eventsWrap");if(0!=t.childElementCount&&(t.innerHTML=""),e.length>0)for(let n=0;n<e.length;n++){let o=e[n].name,l=e[n].date,c=e[n].image,r=document.createElement("div");r.className="event",r.style.backgroundImage=`url(${c})`,console.log();let a=document.createElement("div");a.className="dateBookmark";let i=document.createElement("div");i.className="date",date=l.slice(0,2),i.innerText=date;let s=document.createElement("div");s.className="bookmark";let u=document.createElement("div");u.className="eventTitle",u.innerText=o,a.append(i,s),r.append(a,u),t.append(r)}else{let e=document.createElement("div");e.className="event",e.classList.add("error"),e.style.border="1px solid #444",e.style.borderRadius="6px",e.innerHTML="По указанным параметрам событий не найдено. <br>Попробуйте повторить поиск с другими параметрами.",t.append(e)}}fetch("https://dmitriyshisterov.github.io/xsolla-frontend-school-2020/src/events.json",{method:"GET",redirect:"follow"}).then((function(e){return e.json()})).then((function(e){t=e,n(t)})).catch((function(){})),eventsWrap.onclick=function(e){let t=e.target.closest(".bookmark");t&&eventsWrap.contains(t)&&(t.classList.contains("checked")?t.classList.toggle("checked",!1):t.classList.toggle("checked",!0))};let o={city:void 0,month:void 0},l=[],c=[];document.querySelectorAll("select").forEach((function(e,r,a){e.addEventListener("change",(function(r){let a=e.value;if("city"===r.target.className?o.city=e.value:"month"===r.target.className&&(o.month=e.value),o.city&&o.month){c=[];let e=0;t.forEach((function(t,n,l){let r;r=t.date.slice(3,5),t.city===o.city&&r===o.month&&(c.push(t),e++),"all"===o.city&&r===o.month&&(c.push(t),e++),o.city===t.city&&"all"===o.month&&(c.push(t),e++),"all"===o.city&&"all"===o.month&&(c.push(t),e++)})),0===e&&(c=[]),n(c),console.log(c)}else l=[],t.forEach((function(e,t,n){let o;"month"===r.target.className&&(o=e.date.slice(3,5)),e.city!==a&&o!==a||l.push(e)})),n(l),console.log(l)}))}))}()}]);