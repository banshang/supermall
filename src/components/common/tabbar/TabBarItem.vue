<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
	</div>
</template>

<script>
	export default {
    name: 'TabBarItem',
    // TabBarItem的属性定义。props定义了以后，在使用时<tab-bar-item></tab-bar-item>时可以传入数据
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'deeppink'
      }
    },
    data() {
      return {
      }
    },
    computed: {
      isActive() {
        //判断当前活跃路径中有无path(props中传入的path)，有则isActive为true
        //indexof('xxx') = -1表示没有找到xxx
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    },
	}
</script>

<style scoped>
	.tab-bar-item {
		flex: 1;
		text-align: center;
    height: 49px;
    font-size: 14px;
	}
	.tab-bar-item img {
		width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
