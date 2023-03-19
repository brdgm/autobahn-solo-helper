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

    // in player's turn load bot data from next round, which is the result of the current round
    let loadRound = this.round;
    if (route.name == "TurnPlayer") {
      loadRound = loadRound + 1
    }

    const roundData = state.rounds.find(item => item.round == loadRound)
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
