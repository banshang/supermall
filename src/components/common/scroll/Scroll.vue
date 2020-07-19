<template>
  <!--ref一般绑定在子组件上，但也可以绑定在div等dom元素上-->
  <!--如果绑定在组件上，那么可以通过this.$refs.refname获取到组件对象-->
  <!--如果绑定在普通元素中，那么通过this.$refs.refname获取到的是元素对象-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      if (
        this.probeType === 1 ||
        this.probeType === 2 ||
        this.probeType === 3
      ) {
        this.scroll.on('scroll', position => {
          this.$emit('scroll', position)
        })
      }

      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped></style>
