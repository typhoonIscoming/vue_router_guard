<template>
	<div>
		<button @click="submit">提交</button>
	</div>
</template>

<script>
export default {
	name:'item',
	data(){
		return {
			
		}
	},
	props:[],
	created(){
		eventbus.$on('brother',function(params){
			console.log(params)
		})
	},
	methods:{
		submit(){
			
		}
	}
}
</script>

<style lang="scss" scoped>
</style>