/**
 * 全局定义的过滤器集合
 */
export default {
  // 货币符号
  currency (val, type) {
    return (val === '' || val === null) ? '--' : (type || '￥') + ' ' + val
  },
  // 百分比
  percentage (val, place) {
    return (val === '' || val === null) ? (place || '--') : val + '%'
  },
  // 占位符
  placeholder (val, place) {
    return (val === '' || val === null) ? (place || '--') : val
  },
  // 溢出显示省略号
  subStr (val, length) {
    return val.length <= length ? val : val.substr(0, length) + '…'
  },
  // 时间戳转时间
  date2str (val) {
    if (!val) return null
    val = new Date(val)
    let Y = val.getFullYear()
    let M = val.getMonth() + 1
    let D = val.getDate()
    let h = val.getHours()
    let m = val.getMinutes()
    // let s = val.getSeconds()
    return [[Y, M > 9 ? M : '0' + M, D > 9 ? D : '0' + D].join('-'), [h > 9 ? h : '0' + h, m > 9 ? m : '0' + m].join(':')].join(' ')
  }
}
