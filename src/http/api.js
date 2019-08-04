// 接口统一管理
const api = {
    getCode: { api: '/proxy/api/web/defaultKaptcha', method: 'get' },
    login: { api: '/proxy/api/web/login', method: 'post' },
    logout: { api: '/proxy/api/web/logout', method: 'get' },
    getCaseList: { api: '/proxy/api/case/list', method: 'get' },
    getAdvertiserList: { api: '/proxy/api/advertiser/list', method: 'get' },
    getMediaList: { api: '/proxy/api/media/list', method: 'get' },
    getChannelList: { api: '/proxy/api/channel/list', method: 'get' },
    getAccountInfo: { api: '/proxy/api/account/getAccountInfo', method: 'get' },
    updateAccount: { api: '/proxy/api/account/updateAccount', method: 'post' },
    getAdvertiserAll: { api: '/proxy/api/advertiser/all', method: 'get' },
    mediaAll: { api: '/proxy/api/media/all', method: 'get' },
    getEventInfo: { api: '/proxy/api/case/getById', method: 'get' },
    createChannel: { api: '/proxy/api/channel/create', method: 'post' },
    updateChannel: { api: '/proxy/api/channel/update', method: 'post' },
    getChannelInfo: { api: '/proxy/api/channel/getById', method: 'get' },
    forgetPassword: { api: '/proxy/api/account/forgetPassword', method: 'get' },
    getRoleList: { api: '/proxy/api/user/getUserByRoleName', method: 'get' },
    getCountryList: { api: '/proxy/api/area/get_all_countrys', method: 'get' },
    createCase: { api: '/proxy/api/case/create', method: 'post' },
    updateCase: { api: '/proxy/api/case/update', method: 'post' },
    getMater: { api: '/proxy/api/adcreative/list', method: 'get' },
    getReport: { api: '/proxy/api/adreport/list', method: 'post' },
    changeChannelStatus: { api: '/proxy/api/channel/updateStatus', method: 'post'},
    createad: { api: '/proxy/api/advertiser/create', method: 'post' },
    updatead: { api: '/proxy/api/advertiser/update', method: 'post' },
    findCaseName: { api: '/proxy/api/case/getByName', method: 'post' },
    getContract: { api: '/proxy/api/contract/getContractNo', method: 'get' },
    checkAdname: { api: '/proxy/api/advertiser/getByName', method: 'get' },
    getBindInfoByChannel: { api: '/proxy/api/media/bindInfoByChannel', method: 'get' },
    getAlreadyBindObject: { api: '/proxy/api/channel/getAlreadyBindObject', method: 'get' },
    searchBindObject: { api: '/proxy/api/channel/searchBindObject', method: 'get' },
    bindObject: { api: '/proxy/api/channel/bindObject', method: 'post' },
    deleteBindObjectSearch: { api: '/proxy/api/channel/deleteBindObjectSearch', method: 'get' },
    facebookList: { api: '/proxy/api/facebook/adAccount/list', method: 'get'},
    facebookAddad: { api: '/proxy/api/facebook/changeAccountList', method: 'get'},
    facebookBind: { api: '/proxy/api/facebook/syncEntrustAccount', method: 'post' },
    facebookUnbind: { api: '/proxy/api/facebook/unBindFbUser', method: 'get' },
    facebookDelad: { api: '/proxy/api/facebook/unBindEntrustAccount', method: 'post' },
    googleList: { api: '/proxy/api/google/adAccountList', method: 'get'},
    googleAddad: { api: '/proxy/api/google/changeList', method: 'get' },
    googleBind: { api: '/proxy/api/google/syncAdAccount', method: 'post'},
    googleUnbind: { api: '/proxy/api/google/unbind', method: 'get' },
    googleDelad: { api: '/proxy/api/google/deleteAdAccount', method: 'get' },
    byteList: { api: '/proxy/api/bytedance/adAccountList', method: 'get'},
    imobileList: { api: '/proxy/api/imobi/list', method: 'get'},
    imobileBind: { api: '/proxy/api/imobi/create', method: 'post'},
    imobileDelad: { api: '/proxy/api/imobi/unbind', method: 'get'},
    imobileUnbind: { api: '/proxy/api/imobi/unbind', method: 'get'},
    byteAddad: { api: '/proxy/api/bytedance/changeList', method: 'get' },
    byteBind: { api: '/proxy/api/bytedance/syncAdAccount', method: 'post'},
    byteUnbind: { api: '/proxy/api/bytedance/unbind', method: 'get' },
    byteDelad: { api: '/proxy/api/bytedance/deleteAdAccount', method: 'get' },
    twList: { api: '/proxy/api/tw/adAccountList', method: 'get'},
    twAddad: { api: '/proxy/api/tw/changeList', method: 'get' },
    twBind: { api: '/proxy/api/tw/syncAdAccount', method: 'post' },
    twDelad: { api: '/proxy/api/tw/deleteAdAccount', method: 'get' },
    twUnbind: { api: '/proxy/api/tw/unbind', method: 'get' },
    getCostById: { api: '/proxy/api/case/getCostById', method: 'post' },
    getBalaList: { api: '/proxy/api/balancesheet/list', method: 'get' },
    getBalaMore: { api: '/proxy/api/balancesheet/mediaList', method: 'get' },
    getMediaAndCompany: { api: '/proxy/api/media/mediaAndCompany', method: 'get' },
    balaCurrencyList: { api: '/proxy/api/balancesheet/mediaCurrencyList', method: 'get' },
    getUnitPrice: { api: '/proxy/api/channel/getUnitPrice', method: 'get' },
    getBossList: { api: '/proxy/api/uploadBoss/list', method: 'get' },
    bossChangeStatus: { api: '/proxy/api/uploadBoss/changeStatus', method: 'get' },
    saveBossData: { api: '/proxy/api/uploadBoss/saveUploadBossData', method: 'get' },
    getChannelName: { api: '/proxy/api/channel/getByName', method: 'post' },
    getJobList: { api: '/proxy/api/job/search', method: 'get' },
    getJobMedia: { api: '/proxy/api/job/getMedia', method: 'get' },
    deleteJobById: { api: '/proxy/api/job/delete', method: 'post' },
    executeJobById: { api: '/proxy/api/job/execute', method: 'post' },
    startJobById: { api: '/proxy/api/job/resume', method: 'post' },
    pauseJobById: { api: '/proxy/api/job/pause', method: 'post' },
    addJob: { api: '/proxy/api/job/add', method: 'post' },
    updateJob: { api: '/proxy/api/job/update', method: 'post' },
    jobLogList: { api: '/proxy/api/job/log/search', method: 'get' },
    getUserList: { api: '/proxy/api/user/search', method: 'get' },
    addUser: { api: '/proxy/api/user/add', method: 'post' },
    updateUser: { api: '/proxy/api/user/update', method: 'post' },
    deleteUserById: { api: '/proxy/api/user/delete', method: 'post' },
    getRoleAll: { api: '/proxy/api/role/getRoleAll', method: 'get' },
    getRolesList: { api: '/proxy/api/role/search', method: 'get' },
    getRoleResource: { api: '/proxy/api/role/getRoleResource', method: 'post' },
    addRole: { api: '/proxy/api/role/add', method: 'post' },
    updateRole: { api: '/proxy/api/role/update', method: 'post' },
    deleteRoleById: { api: '/proxy/api/role/delete', method: 'post' },
    getResourceTree: { api: '/proxy/api/role/getResourceTree', method: 'post' },
    getPidResource: { api: '/proxy/api/resource/getPidResource', method: 'post' },
    getResourceTable: { api: '/proxy/api/resource/getResourceTable', method: 'post' },
    addResource: { api: '/proxy/api/resource/add', method: 'post' },
    updateResource: { api: '/proxy/api/resource/update', method: 'post' },
    deleteResource: { api: '/proxy/api/resource/delete', method: 'post' },
    getOplogList: { api: '/proxy/api/oplog/search', method: 'get' },
    getContent: { api: '/proxy/api/oplog/execute', method: 'post' },
    sendEmail: { api: '/proxy/api/oplog/sendEmail', method: 'get' },
    offlineMediaList: { api: '/proxy/api/offline/dataList', method: 'get' },
    companyTypeList: { api: '/proxy/api/offline/companyTypeList', method: 'get' },
    companyList: { api: '/proxy/api/offline/companyListByType', method: 'get' },
    download: { api: '/proxy/api/offline/download', method: 'get' },
    deleteUploadfile: { api: '/proxy/api/offline/deleteFile', method: 'get' },
    addOfflinePartner: { api: '/proxy/api/offline/createData', method: 'post' },
    updateOfflinePartner: { api: '/proxy/api/offline/updateData', method: 'post' },
    getOfflineMediaInfo: { api: '/proxy/api/offline/getDataById', method: 'get' },
    offlineCompanyAllList: { api: '/proxy/api/offline/companyList', method: 'get' }
}
// 不同环境分发
for (var k in api) {
    // if (process.env.NODE_ENV != 'development') {
        // api[k].api = htp.api + api[k].api.replace(/^\/[^\/]+/, '');
        api[k].api = api[k].api.replace(/^\/[^\/]+/, '');
    // }
}

export default api
