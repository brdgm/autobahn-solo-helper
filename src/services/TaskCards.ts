import findMandatory from 'brdgm-commons/src/util/map/findMandatory';
import Action from './enum/Action';
import BonusAction from './enum/BonusAction';
import TaskCardLevel from './enum/TaskCardLevel';
import Card from './TaskCard';

const cards = [
  {
    id: '1A',
    order: 1,
    level: TaskCardLevel.A,
    action: Action.BUILD_ROAD_UPGRADE_LINK
  },
  {
    id: '2A',
    order: 2,
    level: TaskCardLevel.A,
    action: Action.BUILD_ROAD_UPGRADE_LINK,
    bonusAction: BonusAction.DISCARD
  },
  {
    id: '3A',
    order: 3,
    level: TaskCardLevel.A,
    action: Action.BUILD_ROAD_UPGRADE_LINK,
    bonusAction: BonusAction.DEVELOP_1
  },
  {
    id: '4B',
    order: 4,
    level: TaskCardLevel.B,
    action: Action.BUILD_ROAD_UPGRADE_LINK,
    bonusAction: BonusAction.DEVELOP_1
  },
  {
    id: '5A',
    order: 5,
    level: TaskCardLevel.A,
    action: Action.LOAD_TRUCK
  },
  {
    id: '6B',
    order: 6,
    level: TaskCardLevel.B,
    action: Action.LOAD_TRUCK,
    bonusAction: BonusAction.DEVELOP_1
  },
  {
    id: '7A',
    order: 7,
    level: TaskCardLevel.A,
    action: Action.BUILD_SERVICE_STATION
  },
  {
    id: '8B',
    order: 8,
    level: TaskCardLevel.B,
    action: Action.BUILD_SERVICE_STATION,
    bonusAction: BonusAction.DEVELOP_1
  },
]

const cardsMap = new Map<string,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param grade Luna Card Grade
   * @returns cards
   */
  getAll(level: TaskCardLevel) : Card[] {
    return cards.filter(item => item.level == level)
  }

}
