import DifficultyLevel from './enum/DifficultyLevel';
import SoloBoard from './enum/SoloBoard';

export default class Difficulty {

  private _level : DifficultyLevel

  public constructor(difficultyLevel: DifficultyLevel) {
    this._level = difficultyLevel
  }

  public get level() : DifficultyLevel {
    return this._level
  }

  public get soloBoard() : SoloBoard {
    if (this._level > 6) {
      return SoloBoard.HARD
    }
    return SoloBoard.EASY
  }

  public get truckMoveAdditionalStep() : boolean {
    return between(this._level, 2, 6) || between(this._level, 8, 12)
  }

  public get playerTruckPassesServiceStationDevelopmentStep() : boolean {
    return between(this._level, 3, 6) || between(this._level, 9, 12)
  }

  public get skipTurnDevelopmentStep() : boolean {
    return between(this._level, 4, 6) || between(this._level, 10, 12)
  }

  public get endOfEraPromotions112() : boolean {
    return this._level == 5 || this._level == 11
  }

  public get endOfEraPromotions122() : boolean {
    return this._level == 6 || this._level == 12
  }

}

function between(value : number, min : number, max : number) : boolean {
  return value >= min && value <= max;
}
