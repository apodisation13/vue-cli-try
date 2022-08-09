import { createRouter, createWebHistory} from 'vue-router'
import store from '@/store'

import MainPage from '@/pages/MainPage'
import GamePage from '@/pages/GamePage'
import AboutPage from '@/pages/AboutPage'
import DeckbuildPage from '@/pages/DeckbuildPage'
import LevelPage from '@/pages/LevelPage'
import LoginPage from "@/pages/LoginPage"
import SettingsPage from "@/pages/SettingsPage"
import BonusPage from "@/pages/BonusPage"
import RulesPage from "@/pages/RulesPage"
import WinPage from "@/pages/WinPage"


const routes = [
  {
    path: '/',
    component: MainPage,
    meta: {
      requireAuth: false,
      image_night: 'mainnight.png',
      image_day: 'mainday.png',
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
  {
    path: '/settings',
    component: SettingsPage,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/bonus',
    component: BonusPage,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/rules',
    component: RulesPage,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/win',
    component: WinPage,
    meta: {
      requireAuth: true,
    },
  },

]

const router = createRouter({
  routes,
  mode: 'history',
  history: createWebHistory()
})


router.beforeEach((to, from, next) => {

  // прячем боковое меню по переходу в любую вкладку
  store.commit('set_show_menu', false)

  // если мы ушли со страницы игры, ставим флажок что мы в игре на фолс, меню хэдер и футер показываем тогда
  if (from.fullPath === '/game') {
    store.commit('SET_GAME', false)
  }

  // если требуется АУФ, и мы залогинены, все ок. Если не залогинены, идем на главную. Если не требуется АУФ - все ок
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.getters.isLoggedIn) next()
    else next('/')
  }
  else next()
})

export default router
