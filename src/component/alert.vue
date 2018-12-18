<template>
	<div class="box" v-if="show">
		<div class="mask"></div>
		<div class="content" @click="clk">
			<p>这是公共弹框{{text}}</p>
		</div>
	</div>
</template>

<script>
	
	export default{
		name:'alert',
		data(){
			return {
				time:2000,
				show:true,

			}
		},
		props:['text'],
		methods:{
			clk(){
				this.show=false;
				console.log("你点击的是content")
			}
		},
		created(){
			let _this=this;
			let timer=setTimeout(function(){
				_this.show=false
			},this.time)
		}
		
	}
</script>

<style scoped>
	.box{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	.mask{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9;
		background: black;
		opacity: 0.5;
	}
	.content{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		
		
	}
	.content p{
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		padding: 0 5px;
		min-width: 110px;
		min-height: 40px;
		background: white;
		text-align: center;
	}
</style>