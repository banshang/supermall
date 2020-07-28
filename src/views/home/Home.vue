<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>
          购物街
        </div>
      </template>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        ref="homeSwiper"
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"> </goods-list>
    </scroll>
    <!-- 自定义组件的原生事件需要使用 .native 修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import { getHomeMultidata, getHomeGoods } from 'network/home'
  import { debounce } from 'common/utils'

  export default {
    name: 'Home',
    data() {
      return {
        // result: null //用于保存数据
        banners: [],
        recommends: [],
        // goods数据结构的设计
        goods: {
          pop: { page: 0, list: [] },
          new: { page: 0, list: [] },
          sell: { page: 0, list: [] }
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {},
    activated() {
      // console.log('activated')
      // console.log('saveY:' + this.saveY)
      //this.$refs.scroll.scrollTo(0, this.saveY, 0)

      // 先refresh()是可以的，后refresh不行
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log('deactivated')
      // console.log('saveY:' + this.saveY)
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // 1. 图片加载完成事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 500)
      // 监听item中图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })

      // 2. 获取tabControl的offsetTop -- 组件有无offsetTop？
    },

    methods: {
      /**
       * 事件监听的相关方法
       */

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },

      contentScroll(position) {
        // 1. 判断backTop组件是否显示
        this.isShowBackTop = position.y < -800

        // 2. 判断tabControl是否吸顶
        this.isTabFixed = position.y < -this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$nextTick(() => {
          this.$refs.scroll.scroll.refresh()
        })
      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        // 1.请求多个数据，注意请求数据是异步的，一开始并没有获取到数据，所以传递给homeSwiper的时候，其实还是个空的banners
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list //res指向对象 函数执行完之后，变量res会被回收 如果不再有引用，会触发垃圾回收，将返回的对象回收
          // 上面的赋值将res指向的对象的地址赋值给了result，则result指向对象，结果对象仍被引用，所以不会被回收
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        // getHomeGoods(type)是这里定义的， getHomeGoods(type, page)是在network/home.js里面定义的
        // 2. 请求商品数据
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // push(...res.data.list)相当于遍历list里面的元素，并将其一个个push进去
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      },
      swiperImageLoad() {
        // 首先要获取组件的offsetTop。直接获取的话是不正确的，因为图片不一定加载完成
        // 正确的方法是监听图片的加载，加载完成后发出事件，在home中监听，监听到以后即可获取
        // 减少发生次数，用isLoad标记是否已发出过
        // 注意与防抖debounce的区别
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home {
    /** vh viewport height */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: aliceblue;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  h3 {
    text-align: center;
  }

  /* .content {
    height: calc(100% - 93px);
    margin-top: 44px;
  } */

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
