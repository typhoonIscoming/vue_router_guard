import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

import vuxui from './modules/vuxui'
import setStuff from './modules/setStuff'

const state={
	rootData:'root'
}






let store=new Vuex.Store({
	state,
	modules:{
		vuxui,
		setStuff,
	},
	strict:false
})


export default store