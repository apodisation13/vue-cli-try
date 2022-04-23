import { createRouter, createWebHistory} from 'vue-router'
import store from '@/store'

import MainPage from '@/pages/MainPage'
import GamePage from '@/pages/GamePage'
import AboutPage from '@/pages/AboutPage'
import DeckbuildPage from '@/pages/DeckbuildPage'
import LevelPage from '@/pages/LevelPage'
import LoginPage from "@/pages/LoginPage"


const routes = [
    {
        path: '/',
        component: MainPage,
        meta: {
           requireAuth: false,
        },
    },
    {
        path: '/game',
        component: GamePage,
        meta: {
            requireAuth: true,
        },
    },
    {
        path: '/about',
        component: AboutPage,
        meta: {
            requireAuth: false,
        },
    },
    {
        path: '/deckbuild',
        component: DeckbuildPage,
        meta: {
            requireAuth: true,
        },
    },
    {
        path: '/levelselect',
        component: LevelPage,
        meta: {
            requireAuth: true,
        },
    },
    {
        path: '/login',
        component: LoginPage,
        meta: {
            requireAuth: false,
        },
    },
    
]

const router = createRouter({
    routes,
    mode: 'history',
    history: createWebHistory()
})


router.beforeEach((to, rom, next) => {
    store.commit('set_show_menu', false)
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (store.getters.isLoggedIn) next()
        else {
            next('/login')
            // router.push({ name: 'Login', query: { redirect: to } })
        }
    }
    else next()
})

export default router
