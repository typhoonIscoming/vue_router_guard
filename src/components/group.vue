<template>
	<div>
		<button @click="clickbtn">点击</button>
	</div>
</template>

<script>
	export default {
		name:'group',
		data(){
			return {
				msg:'this components is group'
			}
		},
		methods:{
			clickbtn(){
				eventbus.$emit('brother',this.msg)
			}
			
		}
	}
</script>

<style>
</style>