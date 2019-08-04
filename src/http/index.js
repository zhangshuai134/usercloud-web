// 封装请求
import api from './api'
import rule from './rule'
import axios from 'axios'
import qs from 'qs'
import router from '../router'
import { setCookie } from '../utils/index'
// import store from '../store'
import { Message, Loading } from 'element-ui'

// 全局设置
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

const htp = axios.create({
	baseURL: '/',
    timeout: 60000
})

htp.interceptors.request.use(config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['Authorization'] = localStorage.getItem('token')
	return config
}, err => {
    console.log('no sent:')
    console.log(err)
})

// htp.interceptors.response.use(response => { return response }, err => {})

// 服务器错误信息国际化
const lang = {
    en: {
        error: 'The server responded incorrectly, please try again later',
        acRepeat: 'This binding relationship already exists',
        unbind: 'Unbind failed! Until you unbind the case and try again!'
    },
    zh: {
        error: '服务器未响应，请稍后重试',
        acRepeat: '此绑定关系已存在',
        unbind: '解绑失败！请先解除与活动绑定关系再试！'
    },
    ja: {
        error: 'サーバーが応答していません。しばらくしてからもう一度お試しください',
        acRepeat: 'この結合関係は既に存在します',
        unbind: '失敗するまで！ まず活動との関係を解き、もう一度やり直してください。'
    }
}

// 处理接口规范的公有方法
const server = ({ ur, options = {}}) => {
    let p;
    let d = null;
    const t = setTimeout(() => {
        d = Loading.service({background: 'rgba(0, 0, 0, 0)', spinner: 'b-loading'});
    }, 2000)

    // options = {...store.state.filterUpdata, ...options};
	switch (api[ur].method) {
        case 'get':
			p = new Promise(function(resolve, reject) {
				htp.get(api[ur].api + '?' + qs.stringify({...options, tt: new Date().getTime()})).then(response => {
                    d && d.close()
                    clearTimeout(t)
					if (response.data.code) {
                        const body = {}
                        switch (response.data.code) {
                            case rule.ok:
                                body.type = 'ok'
                                body.result = response.data.data
                                resolve(body)
                                break
                            case rule.ercode:
                                body.type = 'vcode'
                                body.result = response.data.data
                                Message.error(response.data.msg)
                                resolve(body)
                                break
                            case rule.out:
                                window.location.reload()
                                break
                            case rule.erauth:
                                window.localStorage.removeItem('token')
                                setCookie('remember', '', -1)
                                router.push({path: '/login'})
                                break
                            case rule.acRepeat:
                                Message.error(lang[localStorage.getItem('lang') || 'en'].acRepeat)
                                reject()
                                break
                            case rule.unbind:
                                Message.error(lang[localStorage.getItem('lang') || 'en'].unbind)
                                reject()
                                break
                            default:
                                Message.error(response.data.msg)
                                reject(response.data.msg)
                                break
                        }
                    }
				}, er => {
                    d && d.close()
                    clearTimeout(t)
					errHandler(er)
				})
			})
			break
		case 'post':
			p = new Promise(function(resolve, reject) {
				htp.post(api[ur].api + '?tt=' + new Date().getTime(), options).then(response => {
                    d && d.close()
                    clearTimeout(t)
                    if (response.data.code) {
                        const body = {}
                        switch (response.data.code) {
                            case rule.ok:
                                body.type = 'ok'
                                body.result = response.data.data
                                resolve(body)
                                break
                            case rule.ercode:
                                body.type = 'vcode'
                                body.result = response.data.data
                                Message.error(response.data.msg)
                                resolve(body)
                                break
                            case rule.out:
                                window.location.reload()
                                break
                            case rule.erauth:
                                window.localStorage.removeItem('token')
                                window.location.reload()
                                break
                            case rule.acRepeat:
                                Message.error(lang[localStorage.getItem('lang') || 'en'].acRepeat)
                                break
                            default:
                                Message.error(response.data.msg)
                                reject(response.data.msg)
                                break
                        }
                    }
				}, er => {
                    d && d.close()
                    clearTimeout(t)
					errHandler(er)
				})
			})
			break
        default:
            d && d.close()
            clearTimeout(t)
			break
	}
	return p
}

function errHandler(er) {
	Message.error(lang[localStorage.getItem('lang') || 'en'].error)
}

export default {
    server,
    htp
}
