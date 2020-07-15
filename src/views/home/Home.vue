<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>
          购物街
        </div>
      </template>
    </nav-bar>
    <home-swiper :banners="banners" v-if="banners.length"></home-swiper>
    <h2 v-else>loading...</h2>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'

  import { getHomeMultidata } from 'network/home'
  export default {
    name: 'Home',
    data() {
      return {
        // result: null //用于保存数据
        banners: [],
        recommends: []
      }
    },
    components: {
      NavBar,
      HomeSwiper
    },
    created() {
      // 1.请求多个数据，注意请求数据是异步的，一开始并没有获取到数据，所以传递给homeSwiper的时候，其实还是个空的banners
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list //res指向对象 函数执行完之后，变量res会被回收 如果不再有引用，会触发垃圾回收，将返回的对象回收
        // 上面的赋值将res指向的对象的地址赋值给了result，则result指向对象，结果对象仍被引用，所以不会被回收
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: aliceblue;
  }

  h2 {
    text-align: center;
  }
</style>
