import TaskCardDeck from '@/services/TaskCardDeck'
import { expect } from 'chai'

describe('services/deck', () => {
  it('new', () => {
    const deck = TaskCardDeck.new()

    expect(deck.pile.length, 'pile size').to.eq(5)
    expect(deck.queue.length, 'queue size').to.eq(0)
    expect(deck.used.length, 'used size').to.eq(0)
    expect(deck.advanced.length, 'advanced size').to.eq(3)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile size').to.eq(5)
    expect(persistence.queue.length, 'queue size').to.eq(0)
    expect(persistence.used.length, 'used size').to.eq(0)
    expect(persistence.advanced.length, 'advanced size').to.eq(3)
  })

  it('drawPutShuffle', () => {
    const deck = TaskCardDeck.fromPersistence({
      pile: ['1A','2A','3A'],
      queue: [],
      used: [],
      advanced: ['4B']
    })

    const card1 = deck.draw()
    deck.putToQueue(card1)
    const card2 = deck.draw()
    deck.putToUsed(card2)

    const persistence = deck.toPersistence()
    expect(persistence.pile).to.eql(['3A'])
    expect(persistence.queue).to.eql(['1A'])
    expect(persistence.used).to.eql(['2A'])
    expect(persistence.advanced).to.eql(['4B'])

    deck.reshuffle()
    expect(deck.pile.length, 'pile size').to.eq(3)
    expect(deck.queue.length, 'queue size').to.eq(0)
    expect(deck.used.length, 'used size').to.eq(0)
    expect(deck.advanced.length, 'advanced size').to.eq(1)
  })

  it('reshuffleExceptHighestValueQueueCard', () => {
    const deck = TaskCardDeck.fromPersistence({
      pile: ['1A'],
      queue: ['3A','7A','5A'],
      used: ['2A'],
      advanced: ['4B']
    })

    deck.reshuffleExceptHighestValueQueueCard()

    const persistence = deck.toPersistence()
    expect(persistence.pile.length).to.eq(4)
    expect(persistence.queue).to.eql(['7A'])
    expect(persistence.used.length).to.eq(0)
    expect(persistence.advanced.length).to.eq(1)
  })

  it('reshuffleExceptHighestValueQueueCard_noqueue', () => {
    const deck = TaskCardDeck.fromPersistence({
      pile: ['1A'],
      queue: [],
      used: ['2A'],
      advanced: ['4B']
    })

    deck.reshuffleExceptHighestValueQueueCard()

    const persistence = deck.toPersistence()
    expect(persistence.pile.length).to.eq(2)
    expect(persistence.queue.length).to.eq(0)
    expect(persistence.used.length).to.eq(0)
    expect(persistence.advanced.length).to.eq(1)
  })

  it('addAdvancedCard', () => {
    const deck = TaskCardDeck.fromPersistence({
      pile: ['1A'],
      queue: [],
      used: ['2A'],
      advanced: ['4B']
    })

    deck.addAdvancedCard()

    const persistence = deck.toPersistence()
    expect(persistence.pile.length).to.eq(2)
    expect(persistence.queue.length).to.eq(0)
    expect(persistence.used.length).to.eq(1)
    expect(persistence.advanced.length).to.eq(0)
  })
})
