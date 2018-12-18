// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'
Vue.use(VueResource)

/****************vee-validate  config  start***********************/
import VeeValidate , { Validator }from 'vee-validate';
import messagesCN from '../assets/zh_CN';
import * as VeeValidateExtends from '../assets/extends';
import store from './store/index'

import install from  './component/alert.js'

Vue.use(install)

//import * as types from './js/stage.js'

const veeconfig={
	errorBagName:'errors',
	delay:0,
	locale: 'cn',
	messages:null,
	strict:true,
	dictionary: {
    cn: {
      messages: messagesCN
    }
  }
}
/********************vee-validate   end****************************/
Vue.config.devtools=process.env.NODE_ENV==='development'?true:false
Vue.config.silent=true
Vue.config.ignoredElements=[
	/^icon-/
]
Vue.config.productionTip=false
//设置请求头
const BASE_API=process.env.NODE_ENV==='development'?'/api':'/'
Vue.http.options={
	root:BASE_API,
	headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
	emulateJSON: true
}
//异步请求拦截器
Vue.http.interceptors.push((request,next)=>{
	next((response)=>{
		if(response.status==404){
			console.log('未请求到数据');
			return 404
		}
	})
})
//Vue.mixin({
//created: function () {
//  var myOption = this.$options.myOption
//  if (myOption) {
//       console.log(myOption)
//  }
//}
//})
console.log("vue正在使用的版本",Vue.version)
window.eventbus=new Vue()

window.login=function(data){
	console.log("在main.js中打印传过来的data",data)
}

Vue.use(VeeValidate,veeconfig)

//Vue.config.errorHandler=function(err, vm, info){
//	console.log("info",info)
//	console.log("err",err)
//}
Vue.config.silent=true
Vue.directive('my-directive',function(el,binding,vnode,oldVnode){
// 	console.log("el=",el)
//	console.log(binding.value)
//	console.log(binding.expression)
//	console.log(binding.arg)
//	console.log(binding.modifiers)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  myOption:'hello',
  linkActiveClass: 'defined-actived-class',
  exactactiveclass: 'defined-exact-active-class',
  components: { App },
  template: '<App/>'
})
