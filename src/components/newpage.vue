<template>
	<transition name="slide">
		<div class="box">
			<div class="box-back"></div>
			<p class="box-computed background-red">计算属性{{user}}</p>
			<p @click="changeType">点击改变用户类型</p>
			<p>用户类型{{userType}}</p>
			<item></item>
			<group></group>
			<input 
				name="邮箱"
	         	type="text"
	         	placeholder="Email"
	         	v-validate data-vv-rules='required|email' 
	         	:class="{
	           		'input': true,
	           		'is-danger': errors.has('email')
	         	}"
	         	class="c-user-input" />
	         <span class="help is-danger" v-show="errors.has('email')" >{{ errors.first('email') }}</span>
			<button @click="sub">click</button>
			<a class="c-link" href="http://www.baidu.com">百度一下</a>
			<div id='mount' ref='mount'></div>
			<mycomponent>
				<span slot="center">我是插槽center的内容</span>
			</mycomponent>
			<div class="c-user-text" v-html="innertxt">
			</div>
			<ul class="c-test-scss">
				<li
					v-for="(item, index) in list"
					:key="index"
					:class="'icon_' + index"
				>

				</li>
			</ul>
			
		</div>
	</transition>
</template>

<script>
import Vue from 'vue'
var Profile = Vue.extend({
  	template: '<p>{{firstName}}<slot name="center" /> {{lastName}} aka {{alias}}<!--this is zhushi--></p>',
  	data: function () {
	    return {
	      	firstName: 'Walter',
	      	lastName: 'White',
			alias: 'Heisenberg',
			bg: 'red',
			
	    }
  	},
  	mounted(){
//		console.log('this.$slot',this.$slots.center)
  	},
  	render(){
//		console.log('this.$slot',this.$slots.center)
  	},
})
Vue.component("mycomponent",Profile)
var myco=Vue.component("mycomponent")
import item from './item.vue'
import group from './group.vue'
import {mapActions,mapState ,mapMutations,mapGetters} from 'vuex'
import * as types from '../store/mutation-types'
import store from '../store/index'
import mixin from '@/mixin'
import logoImg from '@/assets/anne.jpg'
import qs from 'qs'
export default{
	name:'newpage',
	data(){
		return {
			type:1,
			userType:'普通',
			innertxt: '在Web页面上常常可以看到某个元素内部有一个很长的单词',
			bg: 'red',
			list: [
				{name: 'a'},{name: 'b'},{name: 'c'},{name: 'd'}
			],
		}
	},
	comments: true,
	components:{
		item,
		group,
		myco,
	},
	mixins: [mixin],
	asyncData() {
		return new Promise(function(resolve, reject){
			const timer = setTimeout(function(){
				resolve()
				clearTimeout(timer)
			},0)
		})
	},
	created(){
		const _this = this
//		console.log('aaa=',aaa)
		// console.log(window.location.protocol)
		// console.log(window.location.host)
		// console.log(window.location.port)
		// console.log(window.location.pathname)
		// console.log('this.isloading=',this.isloading)
		// console.log('this.rootData=',this.rootData)
		// console.log('this.$store.state.isloading',this.$store.state.vuxui.isloading)
		var channel=new MessageChannel()
		// console.log('channel',channel)
//		this.print()
		console.log('this.$slot',this.$slots.center)
		setTimeout(function(){
			_this.innertxt = `<img src=${logoImg} />`
		},3000)
		const testQS = {
			productCode: 'ZAQJB',
			company: '众安保险',
			insurceHolder: {
				name: '谢航',
				age: 27
			},
			insurants: [{
				name: 'xixi',
				age: 20,
			}],
		}
//		console.log('qs=', qs.stringify(testQS))
const str = 'https://giac-ishare-tst.zaouter.com/product/outorder?productCode=ZHSZ&orderSign=CF037C48C37ACE12EBE4032AAAA03D96&orderNo=ZHS201866441443&premium=15.00&cstmrName=6LCi6Iiq&productName=57q15qiq56We5beeIC0g5a6J6IGU5aKD5YaF5peF6KGM5L-d6Zmp&componyName=5a6J6IGU6LSi5Lqn5L-d6Zmp77yI5Lit5Zu977yJ5pyJ6ZmQ5YWs5Y-4'
		console.log('qs.parse', qs.parse(str))
//		console.log('json', JSON.stringify(testQS))
		console.log('位运算', 8 << 2)
	},
	mounted(){
		new Profile().$mount('#mount')
		login("我在newpage页面传过来的值")
		
	},
	computed:{
		...mapState('vuxui',{
			isloading:state=>state.isloading
		}),
		...mapState(['rootData']),
		...mapGetters('vuxui',['getStatus']),
		user:{
			get(){
				return this.type
			},
			set(value){
				this.userType=value==1?'普通':'专业'
			}
		}
		
	},
	methods:{
		...mapActions('vuxui',['showloading','hideloading']),
		...mapMutations('vuxui',['submit']),
		changeType(){
			this.user=2;
			this.$alert({
				show:true,
				text:"this is alert message"
			})
			console.log("1=",this.isloading)
//			this.showloading();
//			this.submit()
			store.dispatch('vuxui/showloading',null,{root:true})

		},
		sub(){
			this.$validator.validateAll().then(success=>{
				if(!success){
                    let msg=this.errors.all()[0];
                    console.log('msg=',msg)
                    return
                }
			})
		},
	}
}
</script>

<style lang="scss" scoped>
@import '@/theme/sprites/sprite.scss';
@import '@/theme/overall.scss';

.box{
	width: 100%;
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	.c-user-mar{
		width: 200px;
		height: 40px;
		white-space: nowrap;
		position: relative;
		span{
			position: absolute;
		}
	}
	.c-user-input{
		height: 50px;
	}
	.c-user-text{
		padding: 28px 20px 0 20px;
		height: 100px;
		text-align: left;
		overflow-x: auto;
		>img{
			width: 100%;

		}
	}
	.c-test-scss{
		width: 100%;
		li{
			display: inline-block;
			position: relative;
			&.icon_0{
				@include sprite($feedback)
			}
			&.icon_1{
				@include sprite($family)
			}
			&.icon_2{
				@include sprite($guide)
			}
			&.icon_3{
				@include sprite($regarding)
			}
		}
	}
	.c-link{
		@include link-color
	}
}
</style>
<style lang="scss">
@import '@/theme/overall.scss';
.box{
	.c-user-text{
		img{
			width: 100%;
		}
	}
}

</style>
