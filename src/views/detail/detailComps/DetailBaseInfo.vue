<template>
  <!-- Object的keys方法可以返回一个对象的所有键 然后获取它的length，判断是否为0即可确定是否渲染该组件 -->
  <div class="description-wrapper" v-if="Object.keys(goods).length !== 0">
    <div class="goods-title">{{ goods.title }}</div>
    <div class="price-wrapper">
      <span class="new-price">{{ goods.newPrice }}</span>
      <span class="old-price">{{ goods.oldPrice }}</span>
      <span class="discount">{{ goods.discount }}</span>
    </div>
    <div class="description">
      <span class="number-sold description-item left">{{
        goods.columns[0]
      }}</span>
      <span class="number-collect description-item center">{{
        goods.columns[1]
      }}</span>
      <span class="service3 description-item right">{{
        goods.services[goods.services.length - 1].name
      }}</span>
    </div>
    <div class="services">
      <span class="left">
        <img :src="goods.services[0].icon" alt="" />
        <span>{{ goods.services[0].name }}</span>
      </span>
      <span class="center">
        <img :src="goods.services[1].icon" alt="" />
        <span>{{ goods.services[1].name }}</span>
      </span>
      <span class="right">
        <img :src="goods.services[2].icon" alt="" />
        <span>{{ goods.services[2].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .description-wrapper {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .price-wrapper {
    margin-top: 10px;
  }

  .goods-title {
    color: #222;
  }

  .description {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
    justify-content: space-between;
  }

  .price-wrapper .new-price {
    font-size: 24pxpx;
    color: var(--color-high-text);
  }

  .price-wrapper .old-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }

  .price-wrapper .discount {
    background-color: var(--color-high-text);
    color: #fff;
    border-radius: 8px;
    padding: 2px 5px;
    font-size: 12px;
    margin-left: 5px;

    /*让元素上浮一些：使用相对布局即可*/
    position: relative;
    top: -8px;
  }

  .services {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

  .services span {
    font-size: 13px;
    color: #333;
  }

  .services img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .left {
    text-align: left;
  }

  .center {
    text-align: center;
  }

  .right {
    text-align: right;
  }
</style>
