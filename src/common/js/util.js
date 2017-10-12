export function formatDate(date, fmt) {
  console.log(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let key in o) {
    if (new RegExp(`(${key})`).test(fmt)) {
      let str = o[key] + ''
      fmt = fmt.replace(
        RegExp.$1,
        (RegExp.$1.length === 1) ? str : padLeftZero(str)
      )
      console.log(RegExp.$1)
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
