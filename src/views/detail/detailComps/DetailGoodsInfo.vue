<template>
  <div class="detail-info" v-if="Object.keys(detailInfo).length > 0">
    <div>{{ detailInfo.desc }}</div>
    <div>xxx</div>
    <div v-for="(item, index) in detailInfo.detailImage[0].list" :key="index">
      <img :src="item" alt="" @load="imageLoad" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailGoodsInfo',
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    methods: {
      imageLoad() {
        // 所有图片都加载完以后
        if (++this.counter === this.imagesLength) {
          this.$emit('imageLoad')
        }
      }
    },
    watch: {
      detailInfo() {
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
  .detail-info img {
    width: 100vw;
  }
</style>
