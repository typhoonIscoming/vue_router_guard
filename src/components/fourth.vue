<template>
	<div class="fourth-container">
		<div class="content" ref="content">
			<div class="articel">
			</div>
		</div>
		<!--<div class="nav-bar">
			<a class="nav-mask" />
			<ul class="nav-bar-content"
			@touchstart="touchstart"
			@touchmove="touchmove"
			@touchend="touchend">
				<li v-for="(item, index) in navTxt">{{ item }}</li>
			</ul>
		</div>
		<div class="character"
			v-if="moving">{{ currentcharacter }}
		</div>-->
	</div>
</template>

<script>
	export default {
		name: 'Fifth',
		data() {
			return {
				navTxt: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
				currentcharacter: '',
				moving: false,
				offsetX: 0,
				offsetY: 0,
			}
		},
		mounted() {

		},
		methods: {
			touchstart(e) {
//				if(e.target.tagName !== 'LI') return
				this.moving = true;
				this.offsetX = e.changedTouches[0].clientX;
				this.offsetY = e.changedTouches[0].clientY;


			},
			touchmove(e) {
				e.preventDefault()
				if(e.target.tagName !== 'LI') return
				this.scrollDom(e.changedTouches[0].clientY)


			},
			touchend() {
				setTimeout(() => {
					this.moving = false
				}, 500)

			},
			scrollDom(y) {
				const current = document.elementFromPoint(this.offsetX, y)
				this.currentcharacter = current.innerText
				const dom = document.getElementsByClassName('content')[0]
				const nav = window.getComputedStyle(document.getElementsByClassName('nav-bar')[0])

				let lv = Math.abs(y - this.offsetY) / parseInt(nav.height)
				
				const scrollHeight = document.getElementsByClassName('content')[0].scrollHeight
				
				this.$refs.content.scrollTop = lv * scrollHeight
//				console.log('lv', this.$refs.content.scrollTop)
			},
		},
	}
</script>

<style lang="scss">
.fourth-container{
	height: 100%;
	position: relative;
	.content{
		height: 100%;
		overflow-y: scroll;
		.articel{
			height: 200%;
		}
	}
	.nav-bar{
		position: absolute;
		right: 0;
		top: 0;
		width: 20px;
		height: 100%;
		padding-bottom: 40px;
		box-sizing: border-box;
		.nav-mask{
			display: inline-block;
			position: absolute;
			right: 0;
			width: 20px;
			height: 100%;
			background: black;
			opacity: 0.2;
			z-index: 5;
		}
		.nav-bar-content{
			position: absolute;
			right: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 100%;
			width: 100%;
			padding-bottom: 40px;
			z-index: 10;
			li{
				list-style: none;
				width: 100%;
				line-height: 20px;
				text-align: center;
			}
		}
	}
	.character{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 80px;
		height: 80px;
		border-radius: 5px;
		background: black;
		color: white;
		opacity: 0.8;
		line-height: 80px;
		text-align: center;
		font-size: 28px;
		z-index: 999;
	}
	.loop-array{
		width: 100%;
	}
}
</style>