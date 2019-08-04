// 工具类库 纯逻辑和通用业务方法
// 时间格式化方法 可接受时间对象，精确到秒或毫秒的时间戳，第二个参数为时间格式字符串， y年份 m月份 d日期 h小时 i分钟 s秒 a周，最终返回经过格式化后的时间字符串
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) {
            time = parseInt(time) * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s)+}/g, (result, key) => {
        let value = formatObj[key]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

// 从地址栏获取所传递的参数
export function getQuery(url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1)
        let val = decodeURIComponent($2)
        val = String(val)
        obj[name] = val
        return rs
    })
    return obj
}

/**
 * 获取字节长度，一个汉字算两个字节，数字和字母算一个字节
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getBLen(val) {
    let len = 0
    for (let i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/ig) != null) {
            len += 2
        } else {
            len += 1
        }
    }
    return Math.floor(len)
}
// 干净的数组，去除所有为'' || null || false || underfind 等值, includ可以设置需要运行的空项类型,返回干净的数组
export function cleanArray(actual, includ) {
    const newArray = []
    includ = includ || []
    for (let i = 0; i < actual.length; i++) {
        if (actual[i] || includ.indexOf(actual[i]) > -1) {
            newArray.push(actual[i])
        }
    }
    return newArray
}
// 将json数据进行序列化，返回序列化后的字符串
export function param(json) {
    if (!json) {
        return ''
    }
    return cleanArray(Object.keys(json).map(key => {
        if (json[key] === undefined) {
            return ''
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })).join('&')
}
// 提取html字符串里面的内容文本
export function html2Text(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
}
// 对象合并，第一个参数为merge目标对象，第二个为将要merge的对象，可进行多级合并
export function objectMerge(target, source) {
    if (typeof target !== 'object') {
        target = {}
    }
    if (Array.isArray(source)) {
        return source.slice()
    }
    Object.keys(source).forEach((property) => {
        const sourceProperty = source[property]
        if (typeof sourceProperty === 'object') {
            target[property] = objectMerge(target[property], sourceProperty)
        } else {
            target[property] = sourceProperty
        }
    })
    return target
}
// 缓慢滚动动画，element 滚动对象 to 目标位置 duration时间间隔
export function scrollTo(element, to, duration) {
    if (duration <= 0) {
        return
    }
    const difference = to - element.scrollTop
    const perTick = difference / duration * 10
    setTimeout(() => {
        element.scrollTop = element.scrollTop + perTick
        if (element.scrollTop === to) {
            return
        }
        scrollTo(element, to, duration - 10)
    }, 10)
}
// 延时器，func 延时函数、 wait等待的时间间隔毫秒、 immediate 第一次调用是否立即生效
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) {
                    context = args = null
                }
            }
        }
    }

    return function(...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) {
            timeout = setTimeout(later, wait)
        }
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}
// 利用时间生成随机的32位进制字符串，大概12个字符
export function random12() {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
}
// 打开模态窗口 url 需要打开的页面地址  title新窗口的名称 w新窗口的宽度 h新窗口的高度 会居中显示
export function openWindow(url, title, w, h) {
    // Fixes dual-screen position                            Most browsers       Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

    const left = ((width / 2) - (w / 2)) + dualScreenLeft
    const top = ((height / 2) - (h / 2)) + dualScreenTop
    const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus()
    }
}
// 合法性验证库
import rule from './validate'
export function regs(str, is) {
    return rule[is].test(str)
}
// 获取cookie
export function getCookie(k) {
    var name = k + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim()
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}
// 设置cookie
export function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ";expires=" + exdate.toGMTString() + ";path=/";
}
