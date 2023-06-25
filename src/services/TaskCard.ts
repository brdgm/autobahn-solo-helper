import Action from './enum/Action'
import BonusAction from './enum/BonusAction'
import TaskCardLevel from './enum/TaskCardLevel'

export default interface TaskCard {
  id: string
  order: number
  level: TaskCardLevel
  action: Action
  bonusAction?: BonusAction
}
