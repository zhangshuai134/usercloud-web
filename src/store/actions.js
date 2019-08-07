import htpObj from '../http'
import { Message } from 'element-ui'

/**
 * 异步请求集中管理
 */
const htp = htpObj.server
export default {
    aLogin({ commit }, data) {
        htp({ ur: 'login', options: data.ops }).then(res => {
            if (res.type == 'ok') {
                commit('mUserInfo', res.result)
            }
            data.callback && data.callback(res)
        }, er => {
            data.er && data.er()
            // Message.error(er)
        })
    },
    aGetCode({ commit }, data) {
    	htp({ ur: 'getCode' }).then(res => {
    	    if (res.type == 'ok') {
                data.callback && data.callback(res.result)
            }
    	}, er => {
    		data.er && data.er()
    	})
    },
    aLogout({ commit }, data) {
        htp({ ur: 'logout' }).then(res => {
            if (res.type == 'ok') {
                commit('mLogout');
                data.callback && data.callback(res)
            }
        }, er => {
            data.er && data.er()
        })
    },
    aGetAccountInfo({ state, commit }, cb) {
        htp({ ur: 'getAccountInfo' }).then(res => {
            if (res.type == 'ok') {
                commit('mUserInfo', res.result)
                cb && cb(res.result.menuList)
            }
        }, er => {
            Message.error(er)
        })
    },
    aUpdateAccount({}, data) {
        htp({ ur: 'updateAccount', options: data.ops }).then(res => {
            if (res.type == 'ok') {
                data.callback && data.callback(res.result)
            }
        }, er => {
            data.er && data.er()
            // Message.error(er)
        })
    },
    aForgetPassword({}, data) {
        htp({ ur: 'forgetPassword', options: data.ops}).then(res => {
            data.callback && data.callback(res.result)
        }, er => {
            data.er && data.er()
            // Message.error(er)
        })
    },
    aGetAmList({ state, commit }) {
        !state.amOption.length && htp({ ur: 'getRoleList', options: { role: 'am' }}).then(res => {
            if (res.type == 'ok') {
                commit('mAMOption', res.result)
                commit('mAMAllOption')
            }
        }, er => {
            // Message.error(er)
        })
        !state.amLeaderOption.length && htp({ ur: 'getRoleList', options: { role: 'amleader' }}).then(res => {
            if (res.type == 'ok') {
                commit('mAMLOption', res.result)
                commit('mAMAllOption')
            }
        }, er => {
            // Message.error(er)
        })
    },
    aGetBDList({ state, commit }) {
        !state.bdOption.length && htp({ ur: 'getRoleList', options: { role: 'bd' }}).then(res => {
            if (res.type == 'ok') {
                commit('mBDOption', res.result)
            }
        }, er => {
            // Message.error(er)
        })
    },
    aGetCountryList({ state, commit }) {
        !state.countryOption.length && htp({ ur: 'getCountryList'}).then(res => {
            if (res.type == 'ok') {
                commit('mCountryList', res.result)
            }
        }, er => {
            // Message.error(er)
        })
    },
    // 公共请求方法
    aCommon({}, data) {
        htp({ ur: data.ur, options: data.ops || {}}).then(res => {
            if (res.type == 'ok') {
                data.cb && data.cb(res.result)
            }
        }, er => {
            data.er && data.er(er)
            // Message.error(er)
        })
    }
}
