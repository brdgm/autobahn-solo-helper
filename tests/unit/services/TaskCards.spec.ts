import TaskCardLevel from '@/services/enum/TaskCardLevel'
import TaskCards from '@/services/TaskCards'
import { expect } from 'chai'

describe('services/TaskCards', () => {
  it('get', () => {
    const card = TaskCards.get('1A')

    expect(card).not.undefined
    expect(card?.id).to.eq('1A')
  })

  it('getAll', () => {
    const cardsA = TaskCards.getAll(TaskCardLevel.A)
    expect(cardsA.length).eq(5)

    const cardsB = TaskCards.getAll(TaskCardLevel.B)
    expect(cardsB.length).eq(3)
  })
})
