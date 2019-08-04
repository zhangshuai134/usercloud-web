export function toTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }

    if ((time + '').length === 10) {
        time = +time * 1000
    }

    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        date = new Date(parseInt(time))
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

/* 数字 格式化*/
export function nFormatter(num, digits) {
    const si = [{
            value: 1E18,
            symbol: 'E'
        }, {
            value: 1E15,
            symbol: 'P'
        }, {
            value: 1E12,
            symbol: 'T'
        }, {
            value: 1E9,
            symbol: 'G'
        }, {
            value: 1E6,
            symbol: 'M'
        }, {
            value: 1E3,
            symbol: 'k'
        }
    ]
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
        }
    }
    return num.toString()
}

export function html2Text(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
    return !isNaN(num) ? (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ',')) : num
}

export function toFixed2(val) {
    const realVal = parseFloat(val).toFixed(2)
    return parseFloat(realVal)
}

export function filterNull(val) {
   if (!val) {
       return '-'
   } else {
       return val
   }
}

export function toFixedTwo(val) {
    let realVal = val
    if (!isNaN(val)) {
        if (!val && val !== 0) {
            return realVal
        }
        const arr = val.toString().split(".");
        if (arr[1] && (arr[1].length > 2)) {
            realVal = parseFloat(val).toFixed(2)
        }
        return realVal.toLocaleString()
    } else {
        return realVal
    }
}
