import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import toggleArrayItem from "brdgm-commons/src/util/array/toggleArrayItem"
import ColorCard from '@/services/ColorCard'
import Player from '@/services/enum/Player'
import Era from '@/services/enum/Era'

const LOCALSTORAGE_KEY = process.env.VUE_APP_LOCALSTORAGE_KEY_PREFIX + "store"

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  turns: Turn[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  expansions: Expansion[]
}
export interface Turn {
  turn: number
  round: number
  era: Era
  player: Player
  colorCardDeck: ColorCardDeckPersistence
  taskCardDeck: TaskCardDeckPersistence
  botSkippedLastTurn?: boolean
  eraEndedLastTurn?: boolean
}
export interface TaskCardDeckPersistence {
  pile: string[]
  queue: string[]
  used: string[]
  advanced: string[]
}
export interface ColorCardDeckPersistence {
  pile: ColorCard[]
  used: ColorCard[]
}

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    language: "en",
    baseFontSize: 1.0,
    setup: {
      difficultyLevel: DifficultyLevel.LEVEL1_EASY,
      expansions: []
    },
    turns: []
  },
  mutations: {
    // reload state from local storage
    initialiseStore(state) {
      const localStorageCache = localStorage.getItem(LOCALSTORAGE_KEY)
      if (localStorageCache) {
        this.replaceState(Object.assign(state, JSON.parse(localStorageCache)));
      }
    },
    language(state : State, language: string) {
      state.language = language
    },
    setupDifficultyLevel(state : State, level: number) {
      state.setup.difficultyLevel = level
    },
    setupToggleExpansion(state : State, expansion: Expansion) {
      toggleArrayItem(state.setup.expansions, expansion)
    },
    turn(state : State, turn : Turn) {
      state.turns = state.turns
          .filter(item => item.turn < turn.turn)
      state.turns.push(turn)
    },
    resetGame(state : State) {
      state.turns = []
    },
    zoomFontSize(state : State, baseFontSize: number) {
      state.baseFontSize = baseFontSize
    }
  }
})

store.subscribe((_mutation, state) => {
	// store state asJSON string in local storage
	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
})

// define your own `useStore` composition function
export function useStore() : Store<State> {
  return baseUseStore(key)
}
