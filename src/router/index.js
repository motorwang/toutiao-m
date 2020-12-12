import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);



const routes = [
    {
        path: '/login',
        name: 'login',
        component: ()=>import('@/views/login/index')
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
            },
            {
                path: '/question',
                name: 'question',
                component: ()=>import('@/views/question/index'),
            },
            {
                path: '/video',
                name: 'video',
                component: ()=>import('@/views/video/index'),
            },
            {
                path: '/my',
                name: 'my',
                component: ()=>import('@/views/my/index'),
            },
        ]
    }

]

const router = new VueRouter({
    routes
})

export default router;
