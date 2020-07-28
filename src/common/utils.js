// 工具

// 防抖
export function debounce(func, delay) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 日期格式化
export function formatDate(date, fmt) {
  // 1.获取年份
  // y+ 匹配表示大于1个的y
  // y* 匹配大于0个的y
  // y? 匹配0个或者1个
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1, // 上面匹配到的东西
      (date.getFullYear() + '').substr(4 - RegExp.$1.length) // 数字+''
    )
  }
  // 2.获取其他
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      // console.log(RegExp.$1)
      let str = o[k] + ''
      // console.log(str)
      // console.log(RegExp.$1.length)
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str) // 这里的长度为1表示的是正则表达式的长度，这里都为2，所以是后者
      )
    }
  }
  return fmt
}
// 如果长度为1，前面补0， 长度为2，不变
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
