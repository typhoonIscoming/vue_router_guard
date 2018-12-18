import Vue from 'vue'
import Component from './alert.vue'

// 构造子类，相当于一个小型的 Vue，也可以通过 new 实例化，然后通过 mount 方法挂载。
const Constructor = Vue.extend(Component)

// 初始化，通过实例化挂载子类组件。生成一个DOM元素。你可以想成一个小型的 app
const initInstance = () => {
  const instance = new Constructor({
    el: document.createElement('div'),
    
    
  })
  return instance
}

// 实现 ALert 组件插件流程
const ALert = function(options = {}) {
//	console.log("diaoyong",options)
  // 实例化弹框，获取到一个 vueComponent
  const vueComponent = initInstance()

  // 设计通过传参数的方式，来实现对组件进行配置。
  // 如果有配置则覆盖，如果没有设置保持原有的配置
  Object.keys(options).forEach(key => {
//  vueComponent.$data[key] = options[key]
	if(vueComponent.$data[key]){
		vueComponent.$data[key]=options[key]
	}
	else{
		vueComponent.$props[key]=options[key]
	}
  })
  
  // 笔者在设计过程中发现，如果已经有默认的配置，再重新配置时会有抖动的现象。
  // 为了解决这个问题，调整为当前的顺序，等DOM渲染完成之后再添加到document中。
  // 虽然解决抖动的现象，但仍然有轻微迟缓
  vueComponent.$nextTick(() => {
    document.body.appendChild(vueComponent.$el)
  })
}

// 导出一个对象，里面必须要有 install 方法，使用 prototype 把方法挂到 Vue的原型链上。
export default {
  install(Vue, options) {
    Vue.prototype.$alert = ALert
  }
}

