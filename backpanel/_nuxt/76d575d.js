(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{408:function(t,e,n){var content=n(440);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("3a31a41f",content,!0,{sourceMap:!1})},439:function(t,e,n){"use strict";n(408)},440:function(t,e,n){var o=n(11)(!1);o.push([t.i,".content[data-v-3ad1f0b9]{position:relative;bottom:0;-webkit-animation:content-data-v-3ad1f0b9 .4s ease-in forwards;animation:content-data-v-3ad1f0b9 .4s ease-in forwards}.error[data-v-3ad1f0b9]{color:red}@-webkit-keyframes content-data-v-3ad1f0b9{0%{bottom:-15vh}to{bottom:0}}@keyframes content-data-v-3ad1f0b9{0%{bottom:-15vh}to{bottom:0}}.card-title[data-v-3ad1f0b9]{position:relative;top:0;-webkit-animation:title-data-v-3ad1f0b9 .4s ease-in forwards;animation:title-data-v-3ad1f0b9 .4s ease-in forwards}@-webkit-keyframes title-data-v-3ad1f0b9{0%{top:-10vh}to{top:0}}@keyframes title-data-v-3ad1f0b9{0%{top:-10vh}to{top:0}}",""]),t.exports=o},457:function(t,e,n){"use strict";n.r(e);n(54);var o=n(40),r=n(19),l=n.n(r),d=n(28),c={mixins:[o.a,d.a],data:function(){return{error:"Required Field",isLoading:!1,fullPage:!0,color:"#5f76e8",usersData:{}}},components:{Loading:l.a},mounted:function(){this.getUsersList()},methods:{getUsersList:function(){var t=this;this.isLoading=!0,this.$axios.get("/b_users/getAllUsers").then((function(e){t.usersData=e.data.result,t.isLoading=!1}))}}},v=(n(439),n(8)),component=Object(v.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12"},[n("div",{staticClass:"card"},[n("div",{staticClass:"card-body"},[t._m(0),t._v(" "),n("hr"),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-lg-12 col-md-12 col-sm-12 col-xs-12"},[n("loading",{attrs:{active:t.isLoading,"is-full-page":t.fullPage,color:t.color},on:{"update:active":function(e){t.isLoading=e}}}),t._v(" "),n("div",{staticClass:"table-responsive"},[n("span",{attrs:{id:"PrintDepartmentList"}},[n("table",{staticClass:"table table-sm mb-0 table-bordered table-striped table-hover",attrs:{id:"DepartmentList"}},[t._m(1),t._v(" "),n("tbody",[t.usersData.length?t._e():n("tr",[n("td",{staticClass:"text-danger text-center",staticStyle:{"font-weight":"bold",padding:"15px","font-size":"17px","font-family":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"},attrs:{colspan:"8"}},[t._v("No record to show")])]),t._v(" "),t._l(t.usersData,(function(e,o){return n("tr",{key:o},[n("td",[n("span",{staticClass:"badge badge-pill badge-secondary"},[t._v(t._s(o+1))])]),t._v(" "),n("td",[t._v(" "+t._s(e.name))]),t._v(" "),n("td",[t._v(" "+t._s(e.email))]),t._v(" "),n("td",[t._v(" "+t._s(e.phone))]),t._v(" "),n("td",[t._v(t._s(e.user_type))]),t._v(" "),n("td",[t._v(" "+t._s(t.DateFormat(e.created_at)))]),t._v(" "),n("td",{staticClass:"text-center"},[n("span",{staticClass:"label",class:t.statusLabel(e.status).class},[t._v(t._s(t.statusLabel(e.status).status))])]),t._v(" "),n("td",[n("div",{staticClass:"dropdown"},[t._m(2,!0),t._v(" "),n("ul",{staticClass:"dropdown-menu",attrs:{role:"menu","aria-labelledby":"menu1"}},[n("li",{staticStyle:{cursor:"pointer"},attrs:{role:"presentation"},on:{click:function(n){return t.deleteUser(e._id,o,t.usersData,3)}}},[n("a",{staticClass:"delete-modal btn"},[t._v("\n                                                        Suspend\n                                                    ")])]),t._v(" "),n("li",{staticStyle:{cursor:"pointer"},attrs:{role:"presentation"},on:{click:function(n){return t.deleteUser(e._id,o,t.usersData,2)}}},[n("a",{staticClass:"delete-modal btn"},[t._v("\n                                                        Delete\n                                                    ")])]),t._v(" "),n("li",{staticStyle:{cursor:"pointer"},attrs:{role:"presentation"},on:{click:function(n){return t.deleteUser(e._id,o,t.usersData,1)}}},[n("a",{staticClass:"delete-modal btn"},[t._v("\n                                                        Active\n                                                    ")])])])])])])}))],2)])])])],1)])])])])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-8"},[n("h4",{staticClass:"card-title"},[t._v("View Users")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("S.No")]),t._v(" "),n("th",[t._v("Name")]),t._v(" "),n("th",[t._v("Email")]),t._v(" "),n("th",[t._v("Phone")]),t._v(" "),n("th",[t._v("Type")]),t._v(" "),n("th",[t._v("Created at")]),t._v(" "),n("th",[t._v("Status")]),t._v(" "),n("th",[t._v("Actions")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"btn btn-dashboard dropdown-toggle btn-xs",attrs:{type:"button",id:"menu1","data-toggle":"dropdown"}},[e("i",{staticClass:"fas fa-caret-down"})])}],!1,null,"3ad1f0b9",null);e.default=component.exports}}]);