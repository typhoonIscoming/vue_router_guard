<template>
	<div class="iconBox">
		iconbox
	</div>
</template>

<script>
export default {
	name:'iconcomponent',
	data(){
		return {
			
		}
	},
	asyncData() {
		return new Promise(function(resolve, reject){
	  		const timer2 = setTimeout(function(){
	  			console.log('hello World,this is icon-component page');
	  			resolve()
	  			clearTimeout(timer2)
	  		},50000)
	  	})
	},
	methods:{
		
	},
	created(){
		console.log('hello World,this is icon-component page in created');
	}
}
</script>

<style>
</style>