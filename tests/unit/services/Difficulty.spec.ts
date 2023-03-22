import Difficulty from '@/services/Difficulty'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import SoloBoard from '@/services/enum/SoloBoard'
import { expect } from 'chai'

describe('services/Difficulty', () => {
  it('level5', () => {
    const difficulty = new Difficulty(DifficultyLevel.LEVEL5_EASY)
    expect(difficulty.level).to.eq(DifficultyLevel.LEVEL5_EASY)
    expect(difficulty.soloBoard).to.eq(SoloBoard.EASY)
    expect(difficulty.truckMoveAdditionalStep).to.true
    expect(difficulty.playerTruckPassesServiceStationDevelopmentStep).to.true
    expect(difficulty.skipTurnDevelopmentStep).to.true
    expect(difficulty.endOfEraPromotions112).to.true
    expect(difficulty.endOfEraPromotions122).to.false
  })

  it('level7', () => {
    const difficulty = new Difficulty(DifficultyLevel.LEVEL7_HARD)
    expect(difficulty.level).to.eq(DifficultyLevel.LEVEL7_HARD)
    expect(difficulty.soloBoard).to.eq(SoloBoard.HARD)
    expect(difficulty.truckMoveAdditionalStep).to.false
    expect(difficulty.playerTruckPassesServiceStationDevelopmentStep).to.false
    expect(difficulty.skipTurnDevelopmentStep).to.false
    expect(difficulty.endOfEraPromotions112).to.false
    expect(difficulty.endOfEraPromotions122).to.false
  })
})
