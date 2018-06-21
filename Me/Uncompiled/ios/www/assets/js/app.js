!function s(r,i,c){function l(e,t){if(!i[e]){if(!r[e]){var n="function"==typeof require&&require;if(!t&&n)return n(e,!0);if(u)return u(e,!0);var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}var a=i[e]={exports:{}};r[e][0].call(a.exports,function(t){return l(r[e][1][t]||t)},a,a.exports,s,r,i,c)}return i[e].exports}for(var u="function"==typeof require&&require,t=0;t<c.length;t++)l(c[t]);return l}({1:[function(t,e,n){"use strict";var o=angular.module("meApp",["ui.router","ui.router.state.events"]);o.controller("BaseController",t("./controllers/BaseController")),o.provider("ApiRequest",t("./providers/ApiRequestProvider")),o.directive("accountFooter",t("./directives/AccountFooterDirective.js")),o.service("AuthService",t("./services/AuthService")),o.service("IntentService",t("./services/IntentService")),o.service("CredentialsService",t("./services/CredentailsService")),o.service("TransactionService",t("./services/TransactionService")),o.service("QrScannerService",t("./services/QrScannerService")),o.component("welcomeComponent",t("./components/WelcomeComponent")),o.component("authComponent",t("./components/AuthComponent")),o.component("delegatesComponent",t("./components/DelegatesComponent")),o.component("authRegisterComponent",t("./components/AuthRegisterComponent")),o.component("authRestoreComponent",t("./components/AuthRestoreComponent")),o.component("infoComponent",t("./components/InfoComponent")),o.component("infoDelegatesComponent",t("./components/InfoDelegatesComponent")),o.component("recordsComponent",t("./components/RecordsComponent")),o.component("walletPassesComponent",t("./components/WalletPassesComponent")),o.component("walletAssetsComponent",t("./components/WalletAssetsComponent")),o.component("walletTokensComponent",t("./components/WalletTokensComponent")),o.component("profileComponent",t("./components/ProfileComponent")),o.component("shareDataComponent",t("./components/ShareDataComponent")),o.component("shareDataStempasComponent",t("./components/ShareDataStempasComponent.js")),o.component("validatorsComponent",t("./components/ValidatorsComponent")),o.component("validatorDigIdComponent",t("./components/ValidatorDigIdComponent")),o.component("askComponent",t("./components/AskComponent")),o.component("askQrCodeComponent",t("./components/AskQrCodeComponent")),o.component("askTransactionConfirmComponent",t("./components/AskTransactionConfirmComponent")),o.component("sendComponent",t("./components/SendComponent")),o.component("sendAddressComponent",t("./components/SendAddressComponent")),o.component("paymentConfirmationComponent",t("./components/PaymentConfirmationComponent")),o.component("qrScannerComponent",t("./components/QrScannerComponent")),o.component("qrScannerSendComponent",t("./components/QrScannerSendComponent")),o.component("sendConfirmComponent",t("./components/SendConfirmComponent.js")),o.component("voucherTransactionComponent",t("./components/VoucherTransactionComponent")),o.config(t("./routes/router.js")),o.config(["ApiRequestProvider",function(t){t.setHost(qdt_c.platform.env_data.apiUrl)}]),o.run(["$rootScope","$state","CredentialsService",function(t,e,n){var o=["","auth","info","auth-register","auth-restore","welcome"],a=["auth","auth-register","auth-restore"];t.$on("$stateChangeSuccess",function(){return-1!=o.indexOf(e.current.name)||n.get()?-1!=a.indexOf(e.current.name)&&n.get()?e.go("records"):void 0:e.go("auth")})}]),angular.bootstrap(document.getElementById("meApp"),["meApp"])},{"./components/AskComponent":2,"./components/AskQrCodeComponent":3,"./components/AskTransactionConfirmComponent":4,"./components/AuthComponent":5,"./components/AuthRegisterComponent":6,"./components/AuthRestoreComponent":7,"./components/DelegatesComponent":8,"./components/InfoComponent":9,"./components/InfoDelegatesComponent":10,"./components/PaymentConfirmationComponent":11,"./components/ProfileComponent":12,"./components/QrScannerComponent":13,"./components/QrScannerSendComponent":14,"./components/RecordsComponent":15,"./components/SendAddressComponent":16,"./components/SendComponent":17,"./components/SendConfirmComponent.js":18,"./components/ShareDataComponent":19,"./components/ShareDataStempasComponent.js":20,"./components/ValidatorDigIdComponent":21,"./components/ValidatorsComponent":22,"./components/VoucherTransactionComponent":23,"./components/WalletAssetsComponent":24,"./components/WalletPassesComponent":25,"./components/WalletTokensComponent":26,"./components/WelcomeComponent":27,"./controllers/BaseController":28,"./directives/AccountFooterDirective.js":29,"./providers/ApiRequestProvider":30,"./routes/router.js":31,"./services/AuthService":32,"./services/CredentailsService":33,"./services/IntentService":34,"./services/QrScannerService":35,"./services/TransactionService":36}],2:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/ask.html",controller:["$state","$stateParams","TransactionService",function(n,t,e){var o=this;t.data||n.go("wallet-tokens"),o.form={values:{},errors:{}},o.showQrCode=function(){o.form.values.token=t.data.token,e.ask(o.form.values).then(function(t){var e=JSON.parse(JSON.stringify(o.form.values));e.intent=t.data,n.go("ask-qr-code",{data:e})},function(t){o.form.errors=t.data})}}]}},{}],3:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/ask-qr-code.html",controller:["$state","$stateParams","TransactionService",function(t,e,n){var o=this,a=!1;if(o.showAccepted=!1,o.showDeclined=!1,o.request=e.data,!e.data||!e.data.intent)return t.go("wallet-tokens");new QRCode("qrcode").makeCode(e.data.intent.token),a=setInterval(function(){n.askCheck({token:e.data.intent.token}).then(function(t){"pending"!=t.data.state&&("accepted"==t.data.state&&(o.showAccepted=!0,clearInterval(a)),"declined"==t.data.state&&(o.showDeclined=!0,clearInterval(a)))},console.log)},2e3),o.$onDestroy=function(){a&&clearInterval(a)}}]}},{}],4:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/ask-transaction-confirm.html",controller:["$state","$timeout","$stateParams","AuthService","TransactionService",function(t,e,n,o,a){var s=this;if(!n.data||"pending"!=n.data.state)return t.go("qr-scanner");s.showAccepted=!1,s.showDeclined=!1,s.accept=function(){a.askAccept(n.data).then(function(){s.showAccepted=!0},function(t){alert(t.data.message)})},s.decline=function(){a.askDecline(n.data).then(function(){s.showDeclined=!0},function(t){alert(t.data.message)})},s.transaction=n.data}]}},{}],5:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/auth.html",controller:["$state",function(t){}]}},{}],6:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/auth-register.html",controller:["$state","AuthService","CredentialsService",function(e,t,n){var o=this;o.std={first_name:"Jamal",last_name:"Vleij",bsn:"12345678",phone:"12345678"},o.form={errors:{},values:{}};o.fillStd=function(){var t,e;o.form.values=JSON.parse(JSON.stringify(o.std)),o.form.values.email=(t=1e5,e=2e5,Math.floor(Math.random()*(e-t+1))+t+"@forus.io")},o.submit=function(){t.register(o.form.values).then(function(t){n.set(t.data.access_token),o.form.errors={},e.go("delegates")},function(t){o.form.errors=t.data})}}]}},{}],7:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/auth-restore.html",controller:["$state",function(t){}]}},{}],8:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/delegates.html",controller:["$state","$timeout",function(t,e){}]}},{}],9:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/info.html",controller:["$state","$timeout",function(t,e){}]}},{}],10:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/info-delegates.html",controller:["$state","$timeout",function(t,e){}]}},{}],11:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/payment-confirmation.html",controller:["$state",function(t){}]}},{}],12:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/profile.html",controller:["$state","AuthService",function(t,e){e.getUser().then(function(t){new QRCode("qrcode").makeCode(t.data.public_address)},console.error)}]}},{}],13:[function(t,e,n){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.exports={templateUrl:"./assets/tpl/pages/qr-scanner.html",controller:["$state","QrScannerService","IntentService",function(n,t,e){t.scan().then(function(t){e.readToken(t).then(function(t){if("auth"==t.data.type)(e=JSON.parse(JSON.stringify(t.data))).requested={items:["First name","Last name","BSN"]},n.go("share-data",{data:e});else if("voucher"==t.data.type){var e=JSON.parse(JSON.stringify(t.data));n.go("voucher-transaction",{data:e})}else if("ask"==t.data.type){e=JSON.parse(JSON.stringify(t.data));n.go("ask-transaction-confirm",{data:e})}else alert("Unknown type: "+t.data.type)})},function(t){"object"!=(void 0===t?"undefined":o(t))?alert(t):t.data&&void 0!==t.data.message?console.log(t.data.message):console.log(t.data)}),this.$onDestroy=function(){t.cancelScan(console.log)}}]}},{}],14:[function(t,e,n){"use strict";var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.exports={templateUrl:"./assets/tpl/pages/qr-scanner-send.html",controller:["$state","$stateParams","QrScannerService","IntentService",function(n,o,t,e){if(!o.data)return n.go("send");t.scan().then(function(t){var e=JSON.parse(JSON.stringify(o.data));e.address=t,n.go("send-confirm",{data:e})},function(t){"object"!=(void 0===t?"undefined":a(t))?alert(t):console.log(t)}),this.$onDestroy=function(){t.cancelScan(console.log)}}]}},{}],15:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/records.html",controller:["$state","AuthService","CredentialsService",function(e,t,n){var o=this;t.records().then(function(t){o.records=t.data,o.recordCount=Object.keys(o.records).length},function(t){console.log(t.data)}),o.show=!1,o.validate=function(t){"pending"==t.state&&e.go("validators",{data:{record:t}})}}]}},{}],16:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/send-address.html",controller:["$state",function(t){}]}},{}],17:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/send.html",controller:["$state","$stateParams","TransactionService",function(e,t,n){var o=this;t.data||e.go("wallet-tokens"),o.form={values:{},errors:{}},o.scanCode=function(){o.form.values.token=t.data.token,n.validateSendRequest(o.form.values).then(function(t){e.go("qr-scanner-send",{data:JSON.parse(JSON.stringify(o.form.values))})},function(t){o.form.errors=t.data})}}]}},{}],18:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/send-confirm.html",controller:["$state","$stateParams","TransactionService",function(t,e,n){var o=this;o.showSuccess=!1,o.send=function(){n.send(o.params).then(function(t){o.showSuccess=!0},function(t){})},e.data||t.go("send"),o.params=e.data}]}},{}],19:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/share-data.html",controller:["$state","$stateParams","IntentService",function(t,e,n){var o=this;if(!e.data||!e.data.requested)return t.go("qr-scanner");o.showAccepted=!1,o.showDeclined=!1,o.accept=function(){n.acceptToken(e.data.token).then(function(){o.showAccepted=!0},function(t){alert(t.data.message)})},o.decline=function(){n.declineToken(e.data.token).then(function(){o.showDeclined=!0},function(){alert(res.data.message)})},o.items=e.data.requested.items}]}},{}],20:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/share-data-stempas.html",controller:["$state","$stateParams","CredentialsService",function(t,e,n){this.items=e.data.requested.items,this.respond=function(t){t?window.open("demostemapp://login?accessToken="+n.get(),"_system"):window.open("demostemapp://login-declined","_system")}}]}},{}],21:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/validator-digid.html",controller:["$state","$timeout","$stateParams","AuthService",function(t,e,n,o){if(!n.data||"pending"!=n.data.record.state)return t.go("records");this.validate=function(){o.validateRecord(n.data.record.key).then(function(){t.go("records")})}}]}},{}],22:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/validators.html",controller:["$state","$timeout","$stateParams",function(e,t,n){if(!n.data||"pending"!=n.data.record.state)return e.go("records");this.validate=function(t){return e.go("validator-digid",n)}}]}},{}],23:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/voucher-transaction.html",controller:["$state","$timeout","$stateParams","AuthService","IntentService",function(t,e,n,o,a){var s=this;if(!n.data||"pending"!=n.data.state)return t.go("records");s.showAccepted=!1,s.accept=function(){a.acceptToken(n.data.token).then(function(){s.showAccepted=!0},function(t){alert(t.data.message)})},s.voucher=n.data.voucher}]}},{}],24:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/wallet-assets.html",controller:["$state","AuthService",function(t,e){}]}},{}],25:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/wallet-passes.html",controller:["$state","AuthService",function(t,e){var n=this;e.getUser().then(function(t){n.stem_points=t.data.stem_points})}]}},{}],26:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/wallet-tokens.html",controller:["$state","AuthService",function(e,t){var n=this;n.sendTokens=function(t){e.go("send",{data:{token:t}})},n.askTokens=function(t){e.go("ask",{data:{token:t}})},t.tokens().then(function(t){n.tokens=t.data},function(t){console.log(t.data)})}]}},{}],27:[function(t,e,n){"use strict";e.exports={templateUrl:"./assets/tpl/pages/welcome.html",controller:["$state","$timeout","AuthService","CredentialsService",function(t,e,n,o){var a=function(){"welcome"==t.current.name&&t.go("auth")};e(function(){o.get()?n.getUser().then(function(){"welcome"==t.current.name&&t.go("records")},function(){a()}):a()},2e3)}]}},{}],28:[function(t,e,n){"use strict";e.exports=["$rootScope","$scope","$q","$attrs","$state","$timeout",function(t,e,n,o,a,s){t.$state=e.$state=a,t.$thisState=e.$thisState=a.current,window.handleOpenURL=function(o){setTimeout(function(){var t=o.slice("demomeapp://".length),e=new URL("http://forus.io/"+t),n=e.searchParams.get("request");"/auth"==e.pathname&&"StemApp"==n&&a.go("share-data-stempas",{data:{requested:{items:["Stempas"]}}},{title:"StemAPP",subtitle:"Share your voting pass"})},100)};var r=function t(){window.Connection&&navigator.connection.type==window.Connection.NONE&&(alert("No internet connection!"),s(t,1e3))};s(function(){r(),document.addEventListener("offline",function(){s(r,0)},!1),document.addEventListener("online",function(){a.reload()},!1)},1e3)}]},{}],29:[function(t,e,n){"use strict";e.exports=[function(){return{templateUrl:"./assets/tpl/directives/account-footer.html",controller:["$scope",function(t){}]}}]},{}],30:[function(t,e,n){"use strict";e.exports=function(){return new function(){var p=!1;this.setHost=function(t){for(;"/"==t[t.length-1];)t=t.slice(0,t.length-1);p=t},this.$get=["$q","$http","$state","$timeout","$rootScope","CredentialsService",function(i,c,l,t,e,u){var m=function(t){var e=document.createElement("a");e.href=t;var n=e.pathname.split("/");return""!==n[0]&&n.unshift(""),e.protocol+"//"+e.host+n.join("/")},o=function(t,e,n,o,a){var s={};if("GET"==t)for(var r in s.params=n||{},s.params)Array.isArray(s.params[r])&&(s.params[r+"[]"]=s.params[r],delete s.params[r]);else s.data=n||{};return s.headers=Object.assign({Accept:"application/json","Content-Type":"application/json","Access-Token":u.get()}),s.url=m(p+e),s.method=t,i(function(e,n){c(s).then(function(t){e(t)},function(t){401==t.status&&(u.set(null),l.go("auth")),n(t)})})};return{get:function(t,e,n){return o("GET",t,e,n)},post:function(t,e,n){return o("POST",t,e,n)},put:function(t,e,n){return o("PUT",t,e,n)},delete:function(t,e,n){return o("DELETE",t,e,n)},ajax:o,endpointToUrl:function(t){return m(p+(t||""))}}}]}}},{}],31:[function(t,e,n){"use strict";e.exports=["$stateProvider",function(t){t.state({url:"/logout",name:"logout",controller:["$state","CredentialsService",function(t,e){e.set(null),t.go("auth")}]}).state({url:"/",name:"welcome",component:"welcomeComponent",data:{header:!1}}).state({url:"/auth",name:"auth",component:"authComponent",data:{header:!1}}).state({url:"/auth-register",name:"auth-register",component:"authRegisterComponent",data:{header:{title:"New profile",subtitle:"Fill in your first identity records",navbar:{text:"",left:{class:"mdi mdi-arrow-left",sref:"auth"},right:!1}}}}).state({url:"/info",name:"info",component:"infoComponent",data:{header:{title:"Info",subtitle:"Lorem ipsum dolor sit amet, consectetur",navbar:{text:"",left:{class:"mdi mdi-arrow-left",sref:"auth"},right:!1}}}}).state({url:"/info-delegates",name:"info-delegates",component:"infoDelegatesComponent",data:{header:{title:"Info delegates",subtitle:"Lorem ipsum dolor sit amet, consectetur",navbar:{text:"",left:{class:"mdi mdi-arrow-left",sref:"delegates"},right:!1}}}}).state({url:"/delegates",name:"delegates",component:"delegatesComponent",data:{header:{title:"Delegates",subtitle:"Assign delegates you trust for you identity",navbar:{text:"",left:{class:"mdi mdi-arrow-left",sref:"auth-register"},right:!1},pad:!0}}}).state({url:"/auth-restore",name:"auth-restore",component:"authRestoreComponent",data:{header:{class:"view-header-dark-blue",title:"Restore",pad:!0,navbar:{text:"",left:{class:"mdi mdi-arrow-left",sref:"auth"},right:!1}}}}).state({url:"/wallet-tokens",name:"wallet-tokens",component:"walletTokensComponent",data:{header:{title:"Wallet",title_btn:{class:"mdi mdi-account-outline",sref:"profile"},navbar:!1,tabs:{tokens:"Tokens",assets:"Assets",passes:"Passes"},tab_active:"tokens",search:!0,search_text:"Search Token"}}}).state({url:"/wallet-assets",name:"wallet-assets",component:"walletAssetsComponent",data:{header:{title:"Wallet",title_btn:{class:"mdi mdi-account-outline",sref:"profile"},navbar:!1,tabs:{tokens:"Tokens",assets:"Assets",passes:"Passes"},tab_active:"assets",search:!0,search_text:"Search Asset"}}}).state({url:"/wallet-passes",name:"wallet-passes",component:"walletPassesComponent",data:{header:{title:"Wallet",title_btn:{class:"mdi mdi-account-outline",sref:"profile"},navbar:!1,tabs:{tokens:"Tokens",assets:"Assets",passes:"Passes"},tab_active:"passes",search:!0,search_text:"Search Pass"}}}).state({url:"/records",name:"records",component:"recordsComponent",data:{header:{title:"Records",title_btn:{class:"mdi mdi-account-outline",sref:"profile"},navbar:!1}}}).state({url:"/profile",name:"profile",component:"profileComponent",data:{header:{title:"QR-Code",navbar:{text:"",left:{class:"mdi mdi-arrow-left",sref:"records"},right:{class:"mdi mdi-logout-variant",sref:"logout"}},pad_lg:!0}}}).state({url:"/share-data",name:"share-data",component:"shareDataComponent",data:{header:{title:"Login",navbar:{text:"",left:{class:"mdi mdi-arrow-left",sref:"records"},right:{class:"mdi mdi-account-outline",sref:"profile"}}}},params:{data:null}}).state({url:"/share-data-stempas",name:"share-data-stempas",component:"shareDataStempasComponent",data:{header:{title:"StemAPP",subtitle:"Share your voting pass",navbar:!1}},params:{data:null}}).state({url:"/validators",name:"validators",component:"validatorsComponent",data:{header:{title:"Jamal",navbar:{text:"First name",left:{class:"mdi mdi-arrow-left",sref:"records"},right:{class:"mdi mdi-account-outline",sref:"profile"}}}},params:{data:null}}).state({url:"/validator-digid",name:"validator-digid",component:"validatorDigIdComponent",data:{},params:{data:null}}).state({url:"/ask",name:"ask",component:"askComponent",data:{header:{title:"Ask",subtitle:"Fill in details of your request",navbar:{text:"",left:{class:"mdi mdi-arrow-left",sref:"wallet-tokens"},right:!1}}},params:{data:null}}).state({url:"/ask-qr-code",name:"ask-qr-code",component:"askQrCodeComponent",data:{header:{title:"Payment request",subtitle:"Fill in details of your request",pad_lg:!0,navbar:{text:"",left:{class:"mdi mdi-arrow-left",sref:"ask"},right:!1}}},params:{data:null}}).state({url:"/send",name:"send",component:"sendComponent",data:{header:{title:"Send",subtitle:"Fill in details of your payment.",navbar:{text:"",left:{class:"mdi mdi-arrow-left",sref:"wallet-tokens"},right:!1}}},params:{data:null}}).state({url:"/send-address",name:"send-address",component:"sendAddressComponent",data:{header:{title:"Send",subtitle:"Fill in the destination address.",navbar:{text:"",left:{class:"mdi mdi-arrow-left",sref:"send"},right:!1}}}}).state({url:"/payment-confirmation",name:"payment-confirmation",component:"paymentConfirmationComponent",data:{header:{title:"Payment",subtitle:"Lorem ipsum dolor sit amet, consectetur.",navbar:{text:"",left:{class:"mdi mdi-arrow-left",sref:"wallet"},right:!1}}}}).state({url:"/qr-scanner",name:"qr-scanner",component:"qrScannerComponent",data:{header:{title:"QR-Scanner",subtitle:"Please scan a public key or login QRCode."}}}).state({url:"/qr-scanner-send",name:"qr-scanner-send",component:"qrScannerSendComponent",data:{header:{title:"QR-Scanner",subtitle:"Please scan a public key."}},params:{data:null}}).state({url:"/send-confirm",name:"send-confirm",component:"sendConfirmComponent",data:{header:{title:"Confirm sending"}},params:{data:null}}).state({url:"/voucher-transaction",name:"voucher-transaction",component:"voucherTransactionComponent",data:{header:{title:"Transaction",subtitle:"Confirm your transaction."}},params:{data:null}}).state({url:"/ask-transaction-confirm",name:"ask-transaction-confirm",component:"askTransactionConfirmComponent",data:{header:{title:"Transaction",subtitle:"Confirm your transaction."}},params:{data:null}}),document.location.hash||(document.location.hash="#!/")}]},{}],32:[function(t,e,n){"use strict";e.exports=["ApiRequest","CredentialsService",function(e,n){return new function(){this.register=function(t){return e.post("/auth/register",t)},this.signOut=function(t){n.set(null)},this.getUser=function(){return e.get("/user")},this.records=function(){return e.get("/user/records")},this.tokens=function(){return e.get("/user/tokens")},this.qrDetails=function(t){return e.get("/qr-code",t)},this.validateRecord=function(t){return e.post("/user/records/validate",{key:t})}}}]},{}],33:[function(t,e,n){"use strict";e.exports=[function(){return new function(){this.set=function(t){return console.log("setItem",t),localStorage.setItem("access_token",JSON.stringify(t))},this.get=function(){return JSON.parse(localStorage.getItem("access_token"))}}}]},{}],34:[function(t,e,n){"use strict";e.exports=["ApiRequest",function(e){return new function(){this.readToken=function(t){return e.get("/intent/read/"+t)},this.acceptToken=function(t){return e.post("/intent/accept/"+t)},this.declineToken=function(t){return e.post("/intent/decline/"+t)}}}]},{}],35:[function(t,e,n){"use strict";e.exports=["$q",function(t){return new function(){var a=window.document.querySelector("html");this.scan=function(){return t(function(n,o){function t(t){QRScanner.prepare(function(t,e){t&&console.error(t),e.authorized?(a.style.display="none",setTimeout(function(){a.style.display="block"},1),QRScanner.scan(function(t,e){t?o(t):(navigator.vibrate(250),n(e))}),QRScanner.show()):e.denied?o("You have denied permission request for the camera."):o("Camera permission is required.")})}"undefined"==typeof QRScanner?setTimeout(t,1e3):t()})},this.cancelScan=function(){QRScanner.hide(function(t){console.log(JSON.stringify(t))}),QRScanner.cancelScan(function(t){console.log(JSON.stringify(t))})}}}]},{}],36:[function(t,e,n){"use strict";e.exports=["ApiRequest",function(e){return new function(){this.validateSendRequest=function(t){return e.post("/transaction/send/validate",t)},this.send=function(t){return e.post("/transaction/send",t)},this.ask=function(t){return e.post("/transaction/ask",t)},this.askCheck=function(t){return e.post("/transaction/ask/check",t)},this.askAccept=function(t){return e.post("/transaction/ask/accept",t)},this.askDecline=function(t){return e.post("/transaction/ask/decline",t)}}}]},{}],37:[function(t,e,n){},{}]},{},[31,32,33,34,35,36,30,29,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,1,37]);
//# sourceMappingURL=app.js.map