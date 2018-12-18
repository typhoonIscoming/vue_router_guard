<template>
  <div class="wrap">
    <div id="box">
      <div id="marquee">{{text}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Marquee',
  props: ['lists'], // 父组件传入数据， 数组形式 [ "连雨不知春去"，"一晴方觉夏深"]
  data () {
    return {
      text: '' // 数组文字转化后的字符串
    }
  },
  methods: {
    move () {
    	const box = document.getElementById('box')
      let width = document.getElementById('box').getBoundingClientRect().width 
			const marqueebox = document.getElementById('marquee').getBoundingClientRect().width
			console.log('marqueebox', marqueebox)
      let distance = marqueebox // 位移距离
//设置位移
      setInterval(function () { 
        distance = distance - 1
 // 如果位移超过文字宽度，则回到起点
        if (-distance >= marqueebox) {
          distance = width
        }
        box.style.transform = 'translateX(' + distance + 'px)'
      }, 20) 
    }
  },
// 把父组件传入的arr转化成字符串
  mounted: function () {
    for (let i = 0; i < this.lists.length; i++) {
      this.text += ' ' + this.lists[i]
    }
  },
// 更新的时候运动
  updated: function () {
    this.move()
  }
}
</script>
<style lang="scss" scoped>

.wrap {
  overflow: hidden;
}

#box {
  width: 100%;
}

#box div {
  float: left;
}

#marquee {
	white-space: nowrap;
}

#node {
  position: absolute;
  z-index: -999;
  top: -999999px;
}
</style>
