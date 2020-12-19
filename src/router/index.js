import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);



const routes = [
    {
        path: '/login',
        name: 'login',
        component: ()=>import('@/views/login/index'),
        meta:{
            title: '登录'
        }
    },
    {
        path: '/',
        name: 'tabBar',
        component: ()=>import('@/views/tabBar/index'),
        children:[
            {
                path: '',
                name: 'home',
                component: ()=>import('@/views/home/index'),
                meta:{
                    title: '首页'
                }
            },
            {
                path: '/question',
                name: 'question',
                component: ()=>import('@/views/question/index'),
                meta:{
                    title: '问答'
                }
            },
            {
                path: '/video',
                name: 'video',
                component: ()=>import('@/views/video/index'),
                meta:{
                    title: '视频'
                }
            },
            {
                path: '/my',
                name: 'my',
                component: ()=>import('@/views/my/index'),
                meta:{
                    title: '我的'
                }
            },
        ]
    },
    {
        path: '/search',
        name: 'search',
        component: ()=>import('@/views/search/index'),
        meta:{
            title: '搜索'
        }
    },
    {
        path: '/detail',
        name: 'detail',
        component: ()=>import('@/views/detail/index'),
        meta:{
            title: '文章详情'
        },
        // props: true,  // 开启路由参数映射, 将路由参数映射到组件的 props 参数中, 必须接收一下
    }

]

const router = new VueRouter({
    routes
})

export default router;
