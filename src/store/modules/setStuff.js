
const initFactory = [{
	productPlanCode: 'productPlanCode1',
	planCode: 'planCode1',
	birthday: 'birthday1',
	genderValue: 'genderValue1',
	effectiveDate: 'effectiveDate1',
	expireDate: 'expireDate1',
	outingDays: 'outingDays1', // 出行天数
	socFlag: 'socFlag1', // 是否有社保
	medicalFlag: 'medicalFlag1', // 是否有医保
}]

const initState = {
	factor: [...initFactory],
}


const actions = {
	addPremiumCondition({ commit }, conf) {
		const str = parseInt(Math.random()*100)
		const params = {
	  		productPlanCode: 'productPlanCode'+str,
	  		planCode: 'planCode'+str,
	  		birthday: 'birthday'+str,
	  		genderValue: 'genderValue'+str,
	  		effectiveDate: 'effectiveDate'+str,
	  		expireDate: 'expireDate'+str,
	  		outingDays: 'outingDays'+str, // 出行天数
	  		socFlag: 'socFlag'+str, // 是否有社保
	  		medicalFlag: 'medicalFlag'+str, // 是否有医保
		}
		commit('addcondition', params)
	},
	removePremiumCondition({ commit }, conf) {
		commit('removecondition', conf)
	},
}

const mutations = {
	addcondition(state, conf) {
//		console.log({...state.factor[0]})
		const newfactor = Object.assign({}, {...state.factor[0]}, {...conf})
//		console.log('newfactor', newfactor)
		state.factor = state.factor.concat([newfactor])
	},
	removecondition(state, index) {
		state.factor.splice(index, 1)
	},
}


export default {
	namespaced: true,
	state: initState,
	actions,
	mutations,
}
