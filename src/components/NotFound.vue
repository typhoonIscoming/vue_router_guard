<template>
	<div class="NotFound-container">
		对不起，未发现该页面
		<p @click="back">返回</p>
	</div>
</template>

<script>
	export default {
		name: 'NotFound',
		methods: {
			back() {
				history.back()
			},
		},
	}
</script>

<style>
</style>