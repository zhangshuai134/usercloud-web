import Vue from 'vue'
import VueI18n from 'vue-i18n'

import store from '../store'

Vue.use(VueI18n)

// 适配语言 en 英文 zh 中文 ja 日语
const lang = ['en', 'zh', 'ja'];
// 根据模块去做语言适配
const mods = ['route', 'tips', 'pop', 'p404', 'material', 'media', 'login', 'form', 'board', 'adbbMag', 'activeTable', 'activeMag', 'accountSetting', 'report', 'relateb', 'bill', 'user', 'oplog'];
// ele 公共语言包 和适配语言对齐
const ele = ['en', 'zh-CN', 'ja'];
// 语言包组装工厂
const messages = {};
for (let i = 0; i < lang.length; i++) {
    messages[lang[i]] = {...require('element-ui/lib/locale/lang/' + ele[i]).default}
    mods.forEach(m => {
        messages[lang[i]][m] = require('./mod/' + m).default[lang[i]]
    });
}

const i18n = new VueI18n({
    locale: window.localStorage.getItem('lang') || 'en',
    messages
})

// 国际化适配
Vue.prototype.$i18nAdapt = function(title, data) {
    const hasKey = this.$te(title)
    const t = title.split('.')
    const name = t.length > 1 ? t[t.length - 1] : title
    if (hasKey) {
        return this.$t(title, data)
    }
    return name
}
// 全局改变语言设置
Vue.prototype.$changLang = function(lang) {
    window.localStorage.setItem('lang', lang)
    this.$i18n.locale = lang
    store.commit('mLang', lang)
}

export default i18n
