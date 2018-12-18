<template>
  <div class="hello">
  	<marquee>修改客户信息备注、身份证号、出生日期、性别，虽然提示修改成功但再次进入内容未变化</marquee>
  	<div class="box">
	  	<div id="marqueebox">
	  		修改客户信息备注、身份证号、出生日期、性别，虽然提示修改成功但再次进入内容未变化
	  	</div>
  	</div>
    <p @click="getdata">点击，获取fullName的值</p>
    <span>{{firstName}}</span>
    <span>{{lastName}}</span>
    <input 
    	v-model="mobile" 
    	placeholder="输入值" 
    	v-validate="'required|mobile'"
    	name="mobile"
    	data-vv-as="手机号"
    	:class="{'input':true,'is-error':errors.has('mobile')}" />
    	
		<button @click="submit">提交</button>
		<p @click="async">异步请求数据</p>
		<div class="parent">
			<div class="child1"></div>
			<div class="child2"></div><span>hahahah</span>
		</div>
		<input v-bind:value="str|trim" />
		<span>str={{str}}</span>
		<icon-component ></icon-component>
		<div>
			商品名：{{items.proName}} <br  />
			价格：{{items.price}}   <br  />
			是否显示：{{items.show.value?'显示':'不显示'}}
			<p v-for="item in items.show.how">显示how: {{ item.type  }} {{items.show.when}}</p>
		</div>
		<p v-my-directive.foo.bar="{a:true,b:false}">这里是自定义directive</p>
		<input class="inp" placeholder="输入内容" />
		<button @click="getFun">请求本地服务器</button>
		<p v-for="item in arr">
			{{ item.name }} 今年 {{ item.age }}
		</p>
  </div>
  
</template>

<script>
import iconComponent from '../component/icon-component'
import Vue from 'vue'
import tool from '@/js/axiosTool'


export default {
  name: 'HelloWorld',
  components:{
  	iconComponent
  },
  data () {
    return {
      firstName: 'Foo',
    	lastName: 'Bar',
    	mobile:'',
    	str:"dad  dada",
    	items:{
    		proName:"电风扇",
    		price:'500.00',
    		show:{
    			when:'12:30',
    			how:[{
    				type:'anyway'
    			}],
    			value: false,
    		}
    	},
    	isShowMarquee: true,
    	tag: 0,
    	arr:[{name: 'xie',age: 26}]
    }
  },
  asyncData() {
  	return new Promise(function(resolve, reject){
  		const timer1 = setTimeout(function(){
  			console.log('hello World');
  			resolve()
  			clearTimeout(timer1)
  		},200)
  	})
  },
  created(){
  	var _this=this;
		setTimeout(function(){
			_this.items.show.how.type='somewhere'
			_this.items.show.when= '13:00'
//			console.log(_this.items)
				_this.mobile='123';
//				new Proxy(_this.items,{
//					get:function(target, key, receiver){
//						return Reflect.get(target, key, receiver);
//					},
//					set:function(target, key, value, receiver){
//					 	return Reflect.set(target, key, value, receiver);
//					}
//				})
//					_this.$set(_this.items,'price','13:00')
//				_this.items.price="600.00"
//				Vue.set(_this.items,'show',true)
				_this.arr=Object.assign(_this.arr,[{name: 'li', age: 29}])
		},2000)
  },
  mounted() {
//	console.log(this.$route.params)
  	
  },
  methods:{
  	getFun() {
  		tool.get('/',{},function(res){
  			console.log(res)
  		})
  	},
  	scrollmarquee(){
  		
  	},
  	getdata(){
  		this.fullName = 'John Doe '+parseInt(Math.random()*100)
  	},
  	submit(){
  		this.$validator.validateAll().then(success => {
  			if(!success){
  				let msg=this.errors.all()[0];
  				console.log('错误信息=',msg)
  			}
  		})
  		
  		
  	},
  	async(){
  		var params={
  			isRenewal: 1,
				productCode: 'EHRS3',
				birthday: '1985-05-01',
				socFlag: 'Y',
				calculateDate: '1529683199000',
				beforeProductCode: 'SMBY03'
  		}
  		var header={
  			headers:{
            'Content-Type': 'application/json'
        },
        emulateJSON:true
  		}
  			this.$http.post('premium/calculate',JSON.stringify(params),header).then(
  				res=>{
  				console.log(res)
  			})
  	}
  },
  computed:{
  	fullName: {
	    // getter
	    get: function () {
	      return this.firstName + ' ' + this.lastName
	    },
	    // setter
	    set: function (newValue) {
	      var names = newValue.split(' ')
	      this.firstName = names[0]
	      this.lastName = names[names.length - 1]
	    }
	  }
  	
  },
  filters:{
  	trim:function(value){
//		console.log('value=',value)
			return value.replace(/\s+/g,'')
//		return value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
  	}
  },
  watch:{
  	'items': {
  		handler: function(value,oldvalue){
//	  		console.log('value=',value);
//	  		console.log('oldvalue=',oldvalue)
//	  		console.log(value===oldvalue)
	  	},
	  	deep: true
		},
  	mobile(value){
  		// console.log(value)
  	}
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
	overflow: hidden;
	position: relative;
}
.is-error{
	color: red;
}
.parent{
	width: 200px;
	height: 200px;
	background: #ccc;
}
.parent div{
	width: 50px;
	height: 50px;
}
.parent div:nth-child(1){
	background: red;
}
.parent div:nth-child(2){
	background: greenyellow;
	position: absolute;
	/*left: 0;
	top: 0;*/
}
input.inp{
	color: yellow;
}
input.inp::-webkit-input-placeholder{
	color:red;
}

input::-moz-placeholder{   /* Mozilla Firefox 19+ */
	color:red;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
	color:red;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
	color:red;
}
.box{
	width: 100%;
	height: 40px;
	position: relative;
}
#marqueebox{
	height: 40px;
	line-height: 40px;
	white-space:nowrap;
	position: absolute;
	right: 0;
}
</style>
