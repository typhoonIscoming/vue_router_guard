<template>
	<transition name="fade">
		<div class="c-customer-box">
				customer主页面''
			<p>
				<button @click="skip('A')">A页面</button>
				<button @click="skip('B')">B页面</button>
			</p>
			<transition mode="out-in">
				<component
					:is="currentview"/>
			</transition>
	
			<div contenteditable="true" class="c-customer-div"></div>
			<pre>
				'kebukeyi'ddw
			</pre>
			<p>
				<button @click="open">跳转</button>
			</p>
			<definemarquee
				:lists="list"/>
			<p>
				<button @click="add">增加人员</button>
			</p>
			<div class="loop-array">
				<div
					class="item"
					v-for="(item, index) in factor">
					{{item.productPlanCode}}  <span @click="remove(index)">删除</span>
				</div>
			</div>

			<p @click="getperline">获取每一个的值</p>
			<div class="marquee-box">
				<div class="content-box">
					<span class="marquee-content">{{ text }}</span>
				</div>
			</div>
			<div class="checklist">
				<p v-for="(item, index) in itemslist">
					<input type="checkbox" :id="item.id" :value="item.value" v-model="checkedNames">
					<label :for="item.id">{{ item.name }}</label>
				</p>
			</div>
			<p>
				<span>Checked names: {{ checkedNames }}</span>
			</p>
		</div>
		
	</transition>
</template>

<script>
	import definemarquee from '@/component/marquee'
	import { mapState, mapActions } from 'vuex'
	
	import customerA from '@/ChildRouter/customerA'
	import customerB from '@/ChildRouter/customerB'
	export default {
		name: 'customer',
		data() {
			return {
				people: {
					name: 'xie',
					age: 20,
				},
				list: ['xixixixixixixxwidth父组件传入数据， 数组形式数组形式数组形式数组形式'],
				currentview: customerA,
				current: 0,
				list: [{value: 0},{value: 1}, {value: 0}, {value: 1}, {value:1}],

				text: '一种是通过obj.offsetAttr来获取样式，通过这种方法来获取元素的宽高时，如果没有边框，可以正确获取，如果使用边框属性则会出现问题',
				checkedNames: [],
				itemslist: [
				{id: 1, value: '1', name: 'zhang', age: 20},
				{id: 2, value: '2', name: 'li', age: 25},
				{id: 3, value: '3', name: 'yang', age: 26},
				]
			}
		},
		components: {
			definemarquee,
			customerA,
			customerB,
		},
		computed: {
			...mapState('setStuff', ['factor']),
			items: {
				get() {
					return this.list
				},
				set(value) {
					console.log(value)
				},
			},
		},
		mounted() {
			const arr = [1,1,2,2,3,3,5,5,6,7,8]
			const newarr = new Set(arr)
			console.log(...newarr)
			
			const parent = document.getElementsByClassName('marquee-box')[0]
			const child = document.getElementsByClassName('marquee-content')[0]
			const parentWidth = parent.getBoundingClientRect().width
			const childWidth = child.offsetWidth
			
			let prePosition = parentWidth
			console.log(childWidth)
			setInterval(() => {
				prePosition-=1
				child.style.transform = `translateX(${prePosition}px)`
//				child.style.left = `${prePosition}px`
//				const position = child.getBoundingClientRect().left

				if (Math.abs(prePosition) >= childWidth) prePosition = parentWidth


			}, 20)
			
			const link = this.$router.resolve({
				path: '/index',
				query: {
					params: 'thisIsParams',
					methods: 1,
				},
			}).href
			console.log('link=', link)
		},
		methods: {
			...mapActions('setStuff', ['addPremiumCondition', 'removePremiumCondition']),
			skip(name) {

				const page = name == 'A' ? customerA : customerB
				this.currentview = page
			},
			open() {
				this.$router.push({
					name: 'HelloWorld',
					params: {
						str: 'aaaa'
					},
				})
			},
			add() {
				this.addPremiumCondition()
			},
			remove(index) {

				this.removePremiumCondition(index)
			},
			change(index) {
				this.current = index
			},
			getperline() {
				const parent = document.getElementsByClassName('checkboxes')[0];
				const children = parent.childNodes
				for(var i=0;i<children.length;i++) {
					console.log(children[i].childNodes.value)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.c-customer-box{
		height: 100%;
		overflow-y: scroll;
		.c-user-text{
			min-height: 20px;
			overflow-y: visible;
		}
		.c-customer-div{
			width: 100px;
			min-height: 40px;
			border: 1px solid red;
			box-sizing: border-box;
			max-height: 150px;
			overflow-y: auto;
			overflow-x: hidden;
			text-align: left;
		}
		.loop-array{
			width: 100%;
			border: 1px solid red;
			box-sizing: border-box;
			height: 200px;
			overflow-y: auto;
		}
		.marquee-box{
			width: 200px;
			overflow: hidden;
			.content-box{
				width: 100%;
				height: 20px;
				position: relative;
				.marquee-content{
					/*position: absolute;*/
					display: inline-block;
					white-space: nowrap;
				}
			}

		}
	}
</style>