import ColorCardDeck from "@/services/ColorCardDeck"
import DifficultyLevel from "@/services/enum/DifficultyLevel"
import Era from "@/services/enum/Era"
import Player from "@/services/enum/Player"
import TaskCardDeck from "@/services/TaskCardDeck"
import { State } from "@/store"
import { RouteLocation } from "vue-router"

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly turn : number
  readonly round : number
  readonly era : Era
  readonly player : Player
  readonly colorCardDeck : ColorCardDeck
  readonly taskCardDeck : TaskCardDeck

  public constructor(route : RouteLocation, state : State) {    
    const setup = state.setup
    this.difficultyLevel = setup.difficultyLevel
    this.turn = parseInt(route.params['turn'] as string)

    const turnData = state.turns.find(item => item.turn == this.turn)
    if (turnData) {
      this.round = turnData.round
      this.era = turnData.era
      this.player = turnData.player
      this.colorCardDeck = ColorCardDeck.fromPersistence(turnData.colorCardDeck)
      this.taskCardDeck = TaskCardDeck.fromPersistence(turnData.taskCardDeck)
    }
    else {
      console.log(`ERROR: No data found for turn ${this.turn}`)
      this.round = 0
      this.era = Era.ERA1
      this.player = (route.name == "TurnPlayer") ? Player.PLAYER : Player.BOT
      this.colorCardDeck = ColorCardDeck.new()
      this.taskCardDeck = TaskCardDeck.new()
    }
  }

}
