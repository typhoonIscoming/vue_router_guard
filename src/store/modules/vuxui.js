import * as types from '../mutation-types';



const state={
	isloading:false
}

const getters={
	getStatus(state){
		console.log('getters')
		return state.isloading
	}
}

const actions={
	showloading({commit,state}){
		commit(types.LOADING)
		console.log(state.isloading)
	},
	hideloading({commit}){
		commit(types.HIDELOADING)
	}
}


const mutations={
	[types.LOADING](state){
		state.isloading=true
	},
	[types.HIDELOADING](state){
		
		setTimeout(function(){
			state.isloading=false
		},3000)
	},
	submit(state){
		console.log('submit')
		state.isloading=true
	}
}



export default {
	state,
	actions,
	getters,
	mutations,
	namespaced:true
}
