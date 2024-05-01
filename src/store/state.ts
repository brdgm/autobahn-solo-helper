import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import { defineStore } from 'pinia'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'
import ColorCard from '@/services/ColorCard'
import Player from '@/services/enum/Player'
import Era from '@/services/enum/Era'
import { name } from '@/../package.json'

export const useStateStore = defineStore(`${name}.store`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.LEVEL1_EASY,
        expansions: []
      },
      turns: []
    } as State
  },
  actions: {
    setupToggleExpansion(expansion: Expansion) {
      toggleArrayItem(this.setup.expansions, expansion)
    },
    turn(turn : Turn) {
      this.turns = this.turns
          .filter(item => item.turn < turn.turn)
      this.turns.push(turn)
    },
    resetGame() {
      this.turns = []
    }
  },
  persist: true
})

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
