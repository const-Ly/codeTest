export default {
  // cookie 相关
  setCookie (cname, cvalue, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
  },
  getCookie (cname) {
    let name = cname + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
    }
    return ''
  },
  clearCookie (name) {
    this.setCookie(name, '', -1)
  },
  checkCookie () {
    let user = this.getCookie('username')
    if (user !== '') {
      alert('Welcome again ' + user)
    } else {
      user = prompt('Please enter your name:', '')
      if (user !== '' && user != null) {
        this.setCookie('username', user, 365)
      }
    }
  },

  // 数据类型判断
  isInteger (val) { // 正负整数和0
    let rule = /^-*(0|[1-9][0-9]*)$/
    return rule.test(val)
  },
  isNatural (val) { // 自然数
    let rule = /^(0|[1-9][0-9]*)$/
    return rule.test(val)
  },
  isPosInt (val) { // 正整数
    let rule = /^[1-9][0-9]*$/
    return rule.test(val)
  },
  expactEmptyStr (val) {
    return val.length === 0 || this.isNatural(val)
  },
  isFload (val) {
    let rule = /^(0|[1-9][0-9]*)\.[0-9]*$/
    return rule.test(val.toString())
  },
  isOnlyNum (val) {
    let rule = /^\d*$/
    return rule.test(val)
  },

  // 数据格式化
  formatNum (num) {
    return num * 1 < 10 ? '0' + num : num
  },
  // 调整排序
  handleSort (index, arr, sort) {
    let targetIndex
    if (sort > 0) { // 升序(向下)
      if (index === arr.length - 1) return
      targetIndex = index + 1
    } else {
      if (index === 0) return
      targetIndex = index - 1
    }
    arr.splice(index, 1, ...arr.splice(targetIndex, 1, arr[index]))
  },
  // 深拷贝
  deepCopy (obj) {
    let result = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          result[key] = this.deepCopy(obj[key]) // 递归复制
        } else {
          result[key] = obj[key]
        }
      }
    }
    return result
  },

  // 日期时间相关
  /**
   * [dateToString 把日起对象转化为字符串]
   * @param  {[date]}   date [日期对象]
   * @param  {[string]} type [要转化的类型]
   *    type枚举值如下：
   *      'yyyy-MM-dd': 转化为年月日
   *      'yyyy-MM-dd HH:mm:ss' 转化为年月日时分秒
   *      'yyyy-MM-dd HH:mm' 精确到分  【默认】
   * @param  {[string]} split [分隔符] 【默认-】
   * @return {[string]}      [返回转化后的字符串]
   */
  dateToString (date, type, split) {
    if (!date) return ''
    if (typeof date === 'string') return date
    split = split || '-'
    type = type || 'yyyy-MM-dd HH:mm'
    let year = date.getFullYear()
    let month = this.formatNum(date.getMonth() * 1 + 1)
    let _date = this.formatNum(date.getDate())
    let hour = this.formatNum(date.getHours())
    let minutes = this.formatNum(date.getMinutes())
    let seconds = this.formatNum(date.getSeconds())
    if (type === 'yyyy-MM-dd') {
      return [year, month, _date].join(split)
    } else if (type === 'yyyy-MM-dd HH:mm:ss') {
      return [year, month, _date].join(split) + ' ' + [hour, minutes, seconds].join(':')
    }
    return [year, month, _date].join(split) + ' ' + [hour, minutes].join(':')
  },

  date2str (date) {
    return this.dateToString(date, 'yyyy-MM-dd HH:mm:ss')
  },

  /**
   * 通用验证表单方法
   * @param  {[array]}    arr 数组对象
   *         {[boolean, function]} 验证对象: {test, fun}要验证的值 回调函数
   * @param  {[function]} fun 验证成功后的回调
   */
  testForm (arr, fun) {
    let i, item
    for (i = 0; i < arr.length; i++) {
      item = arr[i]
      if (item.test) {
        item.fun && item.fun(); return false
      }
    }
    fun && fun()
  },

  /**
   * 只能输入Number类型
   * @param  {object}    obj 对象或数组
   * @param              key key 或 下标
   * @param  {String}    value 输入内容
   */
  onlyNum (obj, key, str) {
    setTimeout(() => {
      if (obj instanceof Array) {
        obj.splice(key, 1, obj[key].replace(/\D/g, ''))
      } else {
        obj[key] = str.replace(/\D/g, '')
      }
    }, 1)
  },

  /**
   * 只能输入数字和字母类型
   * @param  {object}    obj 对象或数组
   * @param              key key 或 下标
   * @param  {String}    value 输入内容
   */
  onlyNL (obj, key, str) {
    setTimeout(() => {
      if (obj instanceof Array) {
        obj.splice(key, 1, obj[key].replace(/[^0-9a-zA-Z]/g, ''))
      } else {
        obj[key] = str.replace(/[^0-9a-zA-Z]/g, '')
      }
    }, 1)
  }

}
