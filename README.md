# supermall

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# 项目笔记

## 一 目录结构的划分

## 二 引用两个 css 文件

## 三 配置路径别名 vue.config.js

## 四 配置.editorconfig

## 五 开发 tabbar(已完成)直接复制

## 六 项目的模块划分 路由映射关系

## 七 首页导航

## 八 首页轮播图

## 九 首页推荐

## 十 首页流行

## 11 TabControl

## 12 首页商品展示

## 13 引入 betterScroll

## 14 完成 backToTop 组件

## 15 实现上拉加载更多

## 16 下拉拉不动 bug 解决

## 17 防抖与节流 debounce & throttle 使用防抖 debounce

## 18 完善上拉加载更多

## 19 重做 tabControl 的吸顶效果

### 这里有 bug：

- 1.在移动到 tabControl 位置时，下面的内容会突然上移

- 2.tabControl 虽然设置了 fixed，但是也随着 BetterScroll 一起滚出去了

### 解决方案：

#### 复制一份 tabControl（PlaceHolderTabControl）组件对象，当用户滚动到一定位置时，PlaceHolderTabControl 显示出来；没有滚动到一定位置时，将其隐藏起来

## 20 详情页

- 详情页顶部轮播图
- 详情页详情信息
- 详情页商家信息
- 详情页图片
- 详情页评论
-
