import ColorCardDeck from "@/services/ColorCardDeck"
import DifficultyLevel from "@/services/enum/DifficultyLevel"
import TaskCardDeck from "@/services/TaskCardDeck"
import { State } from "@/store"
import { RouteLocation } from "vue-router"

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly round : number
  readonly colorCardDeck : ColorCardDeck
  readonly taskCardDeck : TaskCardDeck

  public constructor(route : RouteLocation, state : State) {    
    const setup = state.setup
    this.difficultyLevel = setup.difficultyLevel
    this.round = parseInt(route.params['round'] as string)

    const roundData = state.rounds.find(item => item.round == this.round)
    if (roundData) {
      this.colorCardDeck = ColorCardDeck.fromPersistence(roundData.colorCardDeck)
      this.taskCardDeck = TaskCardDeck.fromPersistence(roundData.taskCardDeck)
    }
    else {
      console.log(`No data found for round ${this.round}`)
      this.colorCardDeck = ColorCardDeck.new()
      this.taskCardDeck = TaskCardDeck.new()
    }
  }

}
