(window.webpackJsonppuhelinluettelo=window.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(38)},19:function(e,n,t){},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),c=t(13),r=t.n(c),l=(t(19),t(2)),i=t(3),u=t.n(i),m="https://powerful-fjord-13341.herokuapp.com/api/persons",s=function(){return u.a.get(m)},d=function(e){return u.a.post(m,e)},f=function(e,n){return u.a.put("".concat(m,"/").concat(e),n)},h=function(e){return u.a.delete("".concat(m,"/").concat(e))},g=(t(37),function(e){var n=e.newFilter,t=e.persons,a=e.setPersons,c=e.setErrorMessage,r={display:"inline"};return o.a.createElement("div",null,function(){return(e=n,console.log("persons in filtedPhonebook:",t),t.filter(function(n){return!0===n.name.includes(e)})).map(function(e,n){return o.a.createElement("div",{key:n},o.a.createElement("button",{style:r,onClick:function(){return function(e,n){if(console.log("id and name",e,n),window.confirm("Delete ".concat(n,"?"))){console.log("Clicked yes, sending calling removal service with id",e),h(e).then(function(e){c("Removed ".concat(n)),setTimeout(function(){c(null)},5e3)}).catch(function(e){c("Removing ".concat(n," failed with error message: ").concat(e)),setTimeout(function(){c(null)},5e3)});var o=t.filter(function(n){return n.id!==e});a(o)}}(e._id,e.name)}},"Remove"),o.a.createElement("p",{style:r},e.name," ",e.number))});var e}())}),v=function(e){var n=e.newFilter,t=e.handleFilterChange;return o.a.createElement("div",null,"Filter: ",o.a.createElement("input",{value:n,onChange:t}))},w=function(e){var n=e.newName,t=e.handleNameChange,a=e.newNumber,c=e.handleNumberChange,r=e.addName;return o.a.createElement("form",null,o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:n,onChange:t})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{value:a,onChange:c})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit",onClick:r},"add")))},b=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{className:"error"},n)},p=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(null),i=Object(l.a)(r,2),u=i[0],m=i[1],h=Object(a.useState)(""),p=Object(l.a)(h,2),E=p[0],j=p[1],k=Object(a.useState)(""),C=Object(l.a)(k,2),N=C[0],O=C[1],y=Object(a.useState)(""),F=Object(l.a)(y,2),M=F[0],T=F[1];Object(a.useEffect)(function(){s().then(function(e){c(e.data)})},[]);return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(b,{message:u}),o.a.createElement(v,{newFilter:M,handleFilterChange:function(e){console.log("Handling filter change...",e.target.value),T(e.target.value)}}),o.a.createElement("h2",null,"Add new contact"),o.a.createElement(w,{newName:E,handleNameChange:function(e){console.log("Handling name change...",e.target.value),j(e.target.value)},newNumber:N,handleNumberChange:function(e){console.log("Handling number change...",e.target.value),O(e.target.value)},addName:function(e){e.preventDefault();var n={name:E,number:N,id:Math.floor(Math.random()*Math.floor(1e7))};void 0!==t.find(function(e){return e.name===E})?window.confirm("".concat(E," is already added to phonebook. Replace the old number with new one?"))&&t.forEach(function(e,n){if(e.name===E){var a={name:e.name,number:N,id:e.id};t[n]=a,f(e.id,a).then(function(e){m("Modified the number of ".concat(a.name)),setTimeout(function(){m(null)},5e3)}).catch(function(e){m("Modifying ".concat(a.name," failed with error message: ").concat(e)),setTimeout(function(){m(null)},5e3)}),c(t)}}):(c(t.concat(n)),d(n).then(function(e){m("Added ".concat(n.name)),setTimeout(function(){m(null)},5e3)}).catch(function(e){m("Adding ".concat(n.name," failed with error message: ").concat(e)),setTimeout(function(){m(null)},5e3)}));j(""),O("")}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(g,{newFilter:M,persons:t,setPersons:c,setErrorMessage:m}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[14,1,2]]]);
//# sourceMappingURL=main.2ad74bce.chunk.js.map