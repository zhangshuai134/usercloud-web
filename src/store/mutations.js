import { objectMerge } from '@/utils'
export default {
    // 改变并记录菜单的打开状态
    mToggleBar(state) {
        state.sideopen = !state.sideopen
        if (state.sideopen) {
            window.localStorage.setItem('barSta', 1)
        } else {
            window.localStorage.setItem('barSta', 0)
        }
    },
    // 储存登录用户信息
    mUserInfo(state, data) {
        data.token && window.localStorage.setItem('token', data.token)
        data.menuList.forEach(m => (state.auth[m.menu] = m.button || []))
        state.userInfos = data.user
    },
    // 用户登出
    mLogout(state) {
    	window.localStorage.removeItem('token')
        state.userInfos = {}
        state.auth = {}
        state.menu = []
        state.isLogin = false
    },
    // 初始化完成，用户登录，一次应用执行一次
    mIslogin(state) {
        state.isLogin = true
    },
    // 设置语言类型
    mLang(state, type) {
        state.lang = type;
    },
    // 注入导航路由
    mMenu(state, data) {
        // 菜单排序控制
        const sort = [{ name: 'home', icon: 'dashboard' }, { name: 'activemag', icon: 'activity' }, { name: 'adbbmag', icon: 'advertiser' }, { name: 'relateb', icon: 'relate' }, { name: 'report', icon: 'report' }, { name: 'material', icon: 'material' }, { name: 'settle', icon: 'settlement' }, { name: 'job', icon: 'activity' }, { name: 'permission', icon: 'settlement' }, { name: 'oplog', icon: 'settlement' }]
        // 数组对象化
        const uu = {}
        const u = []
        // 装配菜单路由
        data.forEach((item) => {
            if (item.meta.tree) {
                !uu[item.meta.tree] && (uu[item.meta.tree] = [])
                uu[item.meta.tree].push(item)
            } else {
                uu[item.name] = item
            }
        })
        sort.forEach((m, k) => {
            if (uu[m.name]) {
                if (uu[m.name].length) {
                    const mm = uu[m.name]
                    uu[m.name] = { ...m, redirect: mm[0].path, children: mm }
                } else {
                    uu[m.name] = { ...uu[m.name], ...m }
                }
                u.push(uu[m.name])
            }
        })

        state.menu = u
    },
    // 筛选弹框组件打开与否状态
    mPop(state, data) {
        state.poper = data == 'close' ? false : !state.poper
    },
    mFilter(state, data) {
        state.filterData = objectMerge({}, data)
    },
    mFilterUpdata(state, data) {
        state.filterUpdata = JSON.parse(JSON.stringify(data))
    },
    mUpdateCaseData(state, data) {
        state.caseListData = JSON.parse(JSON.stringify(data))
        state.caseList = []
        state.caseListData.result && state.caseListData.result.forEach((item, index) => {
            state.caseList.push(item.caseId)
        })
    },
    mRes(state, data) {
        state.res = JSON.parse(JSON.stringify(data))
    },
    mAdvertiserNameList(state, data) {
        state.advertiserNameOption = JSON.parse(JSON.stringify(data))
    },
    mCountryList(state, data) {
        state.countryOption = JSON.parse(JSON.stringify(data))
    },
    mAMOption(state, data) {
        state.amOption = data
    },
    mAMLOption(state, data) {
        state.amLeaderOption = data
    },
    mAMAllOption(state, data) {
        if (state.amOption.length && state.amLeaderOption.length) {
            state.amAllOption = state.amOption.concat(state.amLeaderOption)
        }
    },
    mBDOption(state, data) {
        state.bdOption = JSON.parse(JSON.stringify(data))
    },
    mMediaAll(state, data) {
        state.mediaAll = JSON.parse(JSON.stringify(data))
    },
    mOfflineCompanyType(state, data) {
        state.offlineCompanyType = JSON.parse(JSON.stringify(data))
    },
    mOfflineCompany(state, data) {
        state.offlineCompany = JSON.parse(JSON.stringify(data))
    },
    mUpdateCaseId(state, data) {
        state.currentCaseId = data
    },
    mAddRes(state, data) {
        const arrStart = state.res.result.slice(0, data.index)
        const arrEnd = state.res.result.slice(data.index, state.res.result.length)
        state.res.result = arrStart.concat(data.childTable).concat(arrEnd)
    },
    mChangeRes(state, data) {
        state.res.result[data].channelOpen = !state.res.result[data].channelOpen
    },
    mDeleteRes(state, data) {
        state.res.result.splice(data.index, data.length)
    },
    mUpdateCaseSpend(state, data) {
        state.caseListData.result && state.caseListData.result.forEach((item, index) => {
            data[item.caseId] && (state.caseListData.result[index].cost = data[item.caseId])
        })
    },
    mChangeChannelStatus(state, data) {
        if (state.res.result[data.index].status === 'active') {
            state.res.result[data.index].status = 'pause'
        } else {
            state.res.result[data.index].status = 'active'
        }
    },
    mKeep(state, data) {
        state.keep = data
    }
}
