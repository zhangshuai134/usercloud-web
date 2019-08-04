// 懒加载适配器
let _import

_import = file => () => import('@/views/' + file + '.vue')

// 基础路由映射
const routes = [
    {
        path: '/',
        component: _import('index'),
        redirect: 'home',
        children: [{
            name: 'home',
            path: '/home',
            component: _import('board'),
            meta: { icon: 'dashboard', unauth: false, noCache: true }
        }, {
            name: 'user',
            path: '/user',
            component: _import('user'),
            meta: { noCache: true, unauth: true, tree: 'permission'}
        }, {
            name: 'role',
            path: '/role',
            component: _import('role'),
            meta: { noCache: true, unauth: true, tree: 'permission'}
        }, {
            name: 'resource',
            path: '/resource',
            component: _import('resource'),
            meta: { noCache: true, unauth: true, tree: 'permission'}
        }, {
            name: 'oplog',
            path: '/oplog',
            component: _import('oplog'),
            meta: { icon: 'oplog', unauth: true, btn: [] }
        }]
    },
    { name: 'login', path: '/login', component: () => import('@/views/login') },
    { name: '404', path: '/404', component: () => import('@/views/404') },
    { name: 'other', path: '*', redirect: '/404' }
]

export default routes
