import { createRouter, createWebHistory} from 'vue-router'
import MainPage from '@/pages/MainPage'
import GamePage from '@/pages/GamePage'
import AboutPage from '@/pages/AboutPage'


const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/game',
        component: GamePage
    },
    {
        path: '/about',
        component: AboutPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})


export default router
