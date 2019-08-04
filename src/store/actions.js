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
    aGetCaseList({ state, commit }, data = {}) {
        htp({ ur: 'getCaseList', options: state.filterUpdata}).then(res => {
            if (res.type == 'ok') {
                commit('mUpdateCaseData', res.result)
                const ids = state.caseList
                htp({ ur: 'getCostById', options: { ids }}).then(res => {
                    if (res.type == 'ok') {
                        commit('mUpdateCaseSpend', res.result)
                        commit('mPop', 'close')
                    }
                }, er => {
                    data.er && data.er()
                    // Message.error(er)
                })
            }
        }, er => {
            data.er && data.er()
            // Message.error(er)
        })
    },
    aGetAdvertiserList({ state, commit }, data = {}) {
        htp({ ur: 'getAdvertiserList', options: state.filterUpdata }).then(res => {
            if (res.type == 'ok') {
                commit('mRes', res.result)
                commit('mPop', 'close')
            }
        }, er => {
            data.er && data.er()
        })
    },
    aGetMediaList({ state, commit }, data = {}) {
        htp({ ur: 'getMediaList', options: state.filterUpdata }).then(res => {
            if (res.type == 'ok') {
                commit('mRes', res.result)
                commit('mPop', 'close')
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
    aGetAdvertiserAll({ commit }) {
        htp({ ur: 'getAdvertiserAll'}).then(res => {
            if (res.type == 'ok') {
                commit('mAdvertiserNameList', res.result)
            }
        }, er => {
            // Message.error(er)
        })
    },
    aGetEventInfo({}, data) {
        htp({ ur: 'getEventInfo', options: data.ops}).then(res => {
            if (res.type == 'ok') {
                data.callback && data.callback(res.result)
            }
        }, er => {
            data.er && data.er()
            // Message.error(er)
        })
    },
    aCreateChannel({}, data) {
        htp({ ur: 'createChannel', options: data.ops}).then(res => {
            if (res.type == 'ok') {
                data.callback && data.callback(res.result)
            }
        }, er => {
            data.er && data.er()
            // Message.error(er)
        })
    },
    aUpdateChannel({}, data) {
        htp({ ur: 'updateChannel', options: data.ops}).then(res => {
            if (res.type == 'ok') {
                data.callback && data.callback(res.result)
            }
        }, er => {
            data.er && data.er()
            // Message.error(er)
        })
    },
    aGetChannelInfo({}, data) {
        htp({ ur: 'getChannelInfo', options: data.ops}).then(res => {
            data.callback && data.callback(res.result)
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
    aCreateCase({}, data) {
        htp({ ur: 'createCase', options: data.ops}).then(res => {
            if (res.type == 'ok') {
                data.callback && data.callback(res.result)
            }
        }, er => {
            // Message.error(er)
        })
    },
    aUpdateCase({}, data) {
        htp({ ur: 'updateCase', options: data.ops}).then(res => {
            if (res.type == 'ok') {
                data.callback && data.callback(res.result)
            }
        }, er => {
            data.er && data.er()
            // Message.error(er)
        })
    },
    aMediaAll({ state, commit }) {
        !state.mediaAll.length && htp({ ur: 'mediaAll' }).then(res => {
            if (res.type == 'ok') {
                commit('mMediaAll', res.result)
            }
        }, er => {
            // Message.error(er)
        })
    },
    aMaterList({ state, commit }) {
        htp({ ur: 'getMater', options: state.filterUpdata }).then(res => {
            if (res.type == 'ok') {
                commit('mRes', res.result)
                commit('mPop', 'close')
            }
        }, er => {
            // Message.error(er)
        })
    },
    aFindCaseName({}, data) {
        htp({ ur: 'findCaseName', options: data.ops}).then(res => {
            if (res.type == 'ok') {
                data.callback && data.callback(res.result)
            }
        }, er => {
            data.er && data.er()
            // Message.error(er)
        })
    },
    aGetChannelList({}, data) {
        htp({ ur: 'getChannelList', options: data.ops}).then(res => {
            if (res.type == 'ok') {
                data.callback && data.callback(res.result)
            }
        }, er => {
            data.er && data.er()
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
    },
    aGetOfflineMediaList({ state, commit }, data = {}) {
        htp({ ur: 'offlineMediaList', options: state.filterUpdata }).then(res => {
            if (res.type == 'ok') {
                commit('mRes', res.result)
                commit('mPop', 'close')
            }
        }, er => {
            data.er && data.er()
        })
    },
    aGetCompanyType({ state, commit }, data) {
        !state.offlineCompanyType.length && htp({ ur: 'companyTypeList' }).then(res => {
            if (res.type == 'ok') {
                commit('mOfflineCompanyType', res.result)
            }
        }, er => {
            data.er && data.er()
            // Message.error(er)
        })
    },
    aGetofflineCompany({ state, commit }, data) {
        !state.offlineCompanyType.length && htp({ ur: 'offlineCompanyAllList' }).then(res => {
            if (res.type == 'ok') {
                commit('mOfflineCompany', res.result)
            }
        }, er => {
            data.er && data.er()
            // Message.error(er)
        })
    }
}
