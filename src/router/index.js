import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store';

Vue.use(VueRouter)

const router = new VueRouter({
    base: process.env.BASE_URL,
    mode: 'history',
    routes: [
        { path: '/', name: 'Auth', component: () => import('@/views/AuthPage.vue') },
        { path: '/home', name: 'Home', component: () => import('@/views/HomePage.vue') },
        { path: '*', redirect: '/' }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Auth' && !store.getters.user) next({ name: 'Auth' })
    else next()
})

export default router
