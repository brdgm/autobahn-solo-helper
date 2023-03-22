import ColorCardDeck from "@/services/ColorCardDeck"
import Difficulty from "@/services/Difficulty"
import Era from "@/services/enum/Era"
import Player from "@/services/enum/Player"
import TaskCardDeck from "@/services/TaskCardDeck"
import { State } from "@/store"
import { RouteLocation } from "vue-router"

export default class NavigationState {

  readonly difficulty : Difficulty
  readonly turn : number
  readonly round : number
  readonly era : Era
  readonly player : Player
  readonly colorCardDeck : ColorCardDeck
  readonly taskCardDeck : TaskCardDeck
  readonly eraEndedLastTurn : boolean
  readonly canEndEra : boolean
  readonly botSkippedLastTurn : boolean
  readonly secondToLastTurn : boolean
  readonly lastTurn : boolean

  public constructor(route : RouteLocation, state : State) {    
    this.difficulty = new Difficulty(state.setup.difficultyLevel)
    this.turn = parseInt(route.params['turn'] as string)

    const turnData = state.turns.find(item => item.turn == this.turn)
    if (turnData) {
      this.round = turnData.round
      this.era = turnData.era
      this.player = turnData.player
      this.colorCardDeck = ColorCardDeck.fromPersistence(turnData.colorCardDeck)
      this.taskCardDeck = TaskCardDeck.fromPersistence(turnData.taskCardDeck)
      this.botSkippedLastTurn = turnData.botSkippedLastTurn ? true : false
      this.eraEndedLastTurn = turnData.eraEndedLastTurn ? true : false
    }
    else {
      console.log(`ERROR: No data found for turn ${this.turn}`)
      this.round = 0
      this.era = Era.ERA1
      this.player = (route.name == "TurnPlayer" ? Player.PLAYER : Player.BOT)
      this.colorCardDeck = ColorCardDeck.new()
      this.taskCardDeck = TaskCardDeck.new()
      this.botSkippedLastTurn = false
      this.eraEndedLastTurn = false
    }

    const era3TurnAfterEraEnd = state.turns.filter(item => item.turn <= this.turn && item.era == Era.ERA3 && item.eraEndedLastTurn)[1]
    this.canEndEra = (era3TurnAfterEraEnd == undefined)
    if (era3TurnAfterEraEnd) {
      this.secondToLastTurn = (era3TurnAfterEraEnd.turn == this.turn)
      this.lastTurn = (era3TurnAfterEraEnd.turn + 1 == this.turn)
    }
    else {
      this.secondToLastTurn = false
      this.lastTurn = false
    }
  }

}
