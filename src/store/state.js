/*
 * 参数说明:
 * @common 后台接收的公共参数,一般是对用户的校验参数
 * @userInfo 用户相关信息
 * @sideopen 菜单的打开状态
 * @poper 全局过滤组件是否打开
 * @routers 经过权限过滤后的路由
 * @filterData 生成筛选弹框的数据
 * @res 为从后台请求的响应数据列表(公共状态字段)
 */
export default {
    userInfos: {},
    sideopen: !!+window.localStorage.getItem('barSta'),
    menu: [],
    auth: {},
    lang: window.localStorage.getItem('lang') || 'en',
    isLogin: false,
    poper: false,
    filterData: {},
    filterUpdata: {},
    caseListData: {},
    caseList: [],
    advertiserNameOption: [],
    res: {},
    countryOption: [],
    amOption: [],
    amLeaderOption: [],
    amAllOption: [],
    bdOption: [],
    mediaAll: [],
    currentCaseId: null,
    keep: ['balance'],
    offlineCompanyType: [],
    offlineCompany: []
}

