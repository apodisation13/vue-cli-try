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
import LoadingPage from "@/pages/LoadingPage"

import {images} from "@/router/const/images"


const routes = [
  {
    path: '/',
    component: MainPage,
    meta: {
      requireAuth: false,
      image: images.main,
    },
  },
  {
    path: '/loading',
    component: LoadingPage,
    meta: {
      requireAuth: false,
      notRequireMenu: true,
      image: images.loading,
    },
  },
  {
    path: '/login',
    component: LoginPage,
    meta: {
      requireAuth: false,
      image: images.login,
    },
  },
  {
    path: '/game',
    component: GamePage,
    meta: {
      requireAuth: true,
      notRequireMenu: true,
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

  if (from.path == '/game'){
    store.commit('set_isGame', false)
  }

  // если требуется АУФ, и мы залогинены, все ок. Если не залогинены, идем на главную. Если не требуется АУФ - все ок
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.getters.isLoggedIn) next()
    else next('/')
  }
  else next()

  
})

export default router
