import { RouteRecordRaw } from 'vue-router'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import SetupAutobot from '@/views/SetupAutobot.vue'
import TurnBot from '@/views/TurnBot.vue'
import TurnPlayer from '@/views/TurnPlayer.vue'
import createRouter from "brdgm-commons/src/util/router/createRouter"

const LOCALSTORAGE_KEY = process.env.VUE_APP_LOCALSTORAGE_KEY_PREFIX + "route"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  {
    path: '/setupAutobot',
    name: 'SetupAutobot',
    component: SetupAutobot
  },
  {
    path: '/turn/:turn/bot',
    name: 'TurnBot',
    component: TurnBot
  },
  {
    path: '/turn/:turn/player',
    name: 'TurnPlayer',
    component: TurnPlayer
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter(routes, LOCALSTORAGE_KEY, 'AppHome')