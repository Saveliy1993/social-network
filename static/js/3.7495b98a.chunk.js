/*! For license information please see 3.7495b98a.chunk.js.LICENSE.txt */
(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[3],{254:function(e,t,n){e.exports={selectedPage:"Paginator_selectedPage__2PNeg",paginator:"Paginator_paginator__yI1dX",pageNumber:"Paginator_pageNumber__1YooQ"}},255:function(e,t,n){var r;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var s=typeof r;if("string"===s||"number"===s)e.push(r);else if(Array.isArray(r)&&r.length){var i=o.apply(null,r);i&&e.push(i)}else if("object"===s)for(var a in r)n.call(r,a)&&r[a]&&e.push(a)}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r)}()},256:function(e,t,n){e.exports={avatar:"Users_avatar__JDA9B"}},261:function(e,t,n){"use strict";n.r(t);var r=n(3),o=n(4),s=n(7),i=n(8),a=n(1),u=n(16),c=n(109),l=function(e){return e.usersPage.users},g=function(e){return e.usersPage.pageSize},p=function(e){return e.usersPage.totalItemsCount},f=function(e){return e.usersPage.currentPage},d=function(e){return e.usersPage.isFetching},j=function(e){return e.usersPage.followingInProgress},h=function(e){return e.usersPage.portionSize},b=n(17);function P(e,t){if(null==e)return{};var n,r,o=Object(b.a)(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var O=n(0),v=n.n(O),m=n(77),x=n(26),w=n(254),C=n.n(w),S=n(255),z=n.n(S),y=function(e){for(var t=e.portionSize,n=e.totalItemsCount,r=e.pageSize,o=e.currentPage,s=e.onPageChanged,i=Math.ceil(n/r),u=[],c=1;c<=i;c++)u.push(c);var l=Math.ceil(i/t),g=Object(O.useState)(1),p=Object(x.a)(g,2),f=p[0],d=p[1],j=(f-1)*t+1,h=f*t;return Object(a.jsxs)("div",{className:C.a.paginator,children:[f>1&&Object(a.jsx)("button",{onClick:function(){return d(f-1)},children:"Left"}),u.filter((function(e){return e>=j&&e<=h})).map((function(e){return Object(a.jsx)("span",{className:z()(Object(m.a)({},C.a.selectedPage,o===e),C.a.pageNumber),onClick:function(t){s(e)},children:e})})),f<l&&Object(a.jsx)("button",{onClick:function(){return d(f+1)},children:"Right"})]})},I=n(256),_=n.n(I),k=n(78),N=n(14),F=function(e){e.portionSize;var t=e.totalItemsCount,n=e.pageSize,r=e.currentPage,o=e.onPageChanged,s=e.user,i=P(e,["portionSize","totalItemsCount","pageSize","currentPage","onPageChanged","user"]);return Object(a.jsxs)("div",{children:[Object(a.jsx)(y,{totalItemsCount:t,pageSize:n,currentPage:r,onPageChanged:o}),Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{children:s.followed?Object(a.jsx)("button",{disabled:i.followingInProgress.some((function(e){return e===s.id})),onClick:function(){i.unfollow(s.id)},children:"Unfollow"}):Object(a.jsx)("button",{disabled:i.followingInProgress.some((function(e){return e===s.id})),onClick:function(){i.follow(s.id)},children:"Follow"})}),Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{children:Object(a.jsx)(N.b,{to:"/profile/"+s.id,children:Object(a.jsx)("img",{className:_.a.avatar,src:null!=s.photos.small?s.photos.small:k.a})})}),Object(a.jsx)("div",{children:s.status})]}),Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{children:s.name}),Object(a.jsxs)("div",{children:["user.location.country","user.location.city"]})]})]})]})},U=function(e){var t=e.totalItemsCount,n=e.pageSize,r=e.currentPage,o=e.onPageChanged,s=e.portionSize,i=e.users,u=P(e,["totalItemsCount","pageSize","currentPage","onPageChanged","portionSize","users"]);return Object(a.jsxs)("div",{children:[Object(a.jsx)(y,{portionSize:s,totalItemsCount:t,pageSize:n,currentPage:r,onPageChanged:o}),Object(a.jsx)("div",{children:i.map((function(e){return Object(a.jsx)(F,{user:e,followingInProgress:u.followingInProgress,unfollow:u.unfollow,follow:u.follow},e.id)}))})]})},A=n(43),q=n(21),J=function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(){var e;Object(r.a)(this,n);for(var o=arguments.length,s=new Array(o),i=0;i<o;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).onPageChanged=function(t){e.props.requestUsers(t,e.props.pageSize)},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.props.requestUsers(this.props.currentPage,this.props.pageSize)}},{key:"render",value:function(){return Object(a.jsxs)("div",{children:[this.props.isFetching?Object(a.jsx)(A.a,{}):null,Object(a.jsx)(U,{totalItemsCount:this.props.totalItemsCount,pageSize:this.props.pageSize,currentPage:this.props.currentPage,follow:this.props.follow,unfollow:this.props.unfollow,onPageChanged:this.onPageChanged,users:this.props.users,followingInProgress:this.props.followingInProgress,portionSize:this.props.portionSize})]})}}]),n}(v.a.Component);t.default=Object(q.d)(Object(u.b)((function(e){return{users:l(e),pageSize:g(e),totalItemsCount:p(e),currentPage:f(e),isFetching:d(e),followingInProgress:j(e),portionSize:h(e)}}),{follow:c.b,unfollow:c.f,setCurrentPage:c.d,toggleFollowingProgress:c.e,requestUsers:c.c}))(J)}}]);
//# sourceMappingURL=3.7495b98a.chunk.js.map