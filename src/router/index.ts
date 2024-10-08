import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from '@brdgm/brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import SetupAutobot from '@/views/SetupAutobot.vue'
import TurnBot from '@/views/TurnBot.vue'
import TurnBotMoveTrucks from '@/views/TurnBotMoveTrucks.vue'
import TurnPlayer from '@/views/TurnPlayer.vue'
import EndOfEra from '@/views/EndOfEra.vue'
import EndOfGame from '@/views/EndOfGame.vue'

const LOCALSTORAGE_KEY = `${name}.route`

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
    path: '/turn/:turn/botMoveTrucks',
    name: 'TurnBotMoveTrucks',
    component: TurnBotMoveTrucks
  },
  {
    path: '/turn/:turn/player',
    name: 'TurnPlayer',
    component: TurnPlayer
  },
  {
    path: '/turn/:turn/endOfEra',
    name: 'EndOfEra',
    component: EndOfEra
  },
  {
    path: '/turn/:turn/endOfGame',
    name: 'EndOfGame',
    component: EndOfGame
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')