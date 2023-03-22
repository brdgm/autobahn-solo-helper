import TaskCardDeck from '@/services/TaskCardDeck'
import { expect } from 'chai'

describe('services/deck', () => {
  it('new', () => {
    const deck = TaskCardDeck.new()

    expect(deck.pile.length, 'pile size').to.eq(5)
    expect(deck.queue.length, 'queue size').to.eq(0)
    expect(deck.used.length, 'used size').to.eq(0)
    expect(deck.advanced.length, 'advanced size').to.eq(3)

    expect(deck.isPileEmpty(), 'pile empty').to.false
    expect(deck.isQueueEmpty(), 'queue empty').to.true
    expect(deck.isUsedEmpty(), 'used empty').to.true

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile size').to.eq(5)
    expect(persistence.queue.length, 'queue size').to.eq(0)
    expect(persistence.used.length, 'used size').to.eq(0)
    expect(persistence.advanced.length, 'advanced size').to.eq(3)
  })

  it('drawPutToQueue', () => {
    const deck = TaskCardDeck.fromPersistence({
      pile: ['1A','2A','3A'],
      queue: [],
      used: [],
      advanced: ['4B']
    })

    const card1 = deck.draw()
    deck.putToQueue(card1)

    const persistence = deck.toPersistence()
    expect(persistence.pile, 'pile').to.eql(['2A','3A'])
    expect(persistence.queue, 'queue').to.eql(['1A'])
    expect(persistence.used, 'used').to.eql([])
    expect(persistence.advanced, 'advanced').to.eql(['4B'])
  })

  it('drawPutToUsed', () => {
    const deck = TaskCardDeck.fromPersistence({
      pile: ['1A','3A'],
      queue: ['2A'],
      used: [],
      advanced: ['4B']
    })

    // first card from queue
    const card1 = deck.draw()
    deck.putToUsed(card1)

    // second card from pile
    const card2 = deck.draw()
    deck.putToUsed(card2)

    const persistence = deck.toPersistence()
    expect(persistence.pile, 'pile').to.eql(['3A'])
    expect(persistence.queue, 'queue').to.eql([])
    expect(persistence.used, 'used').to.eql(['2A','1A'])
    expect(persistence.advanced, 'advanced').to.eql(['4B'])
  })

  it('drawReshuffle', () => {
    const deck = TaskCardDeck.fromPersistence({
      pile: [],
      queue: [],
      used: ['1A','2A','3A'],
      advanced: ['4B']
    })

    const card1 = deck.draw()
    deck.putToUsed(card1)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile size').to.eq(2)
    expect(persistence.queue.length, 'queue size').to.eq(0)
    expect(persistence.used.length, 'used size').to.eq(1)
    expect(persistence.advanced.length, 'advanced size').to.eq(1)
  })

  it('reshuffle', () => {
    const deck = TaskCardDeck.fromPersistence({
      pile: ['1A'],
      queue: ['3A','7A','5A'],
      used: ['2A'],
      advanced: ['4B']
    })

    deck.reshuffle()

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile size').to.eq(5)
    expect(persistence.queue.length, 'queue size').to.eq(0)
    expect(persistence.used.length, 'used size').to.eq(0)
    expect(persistence.advanced.length, 'advanced size').to.eq(1)
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
    expect(persistence.pile.length, 'pile size').to.eq(4)
    expect(persistence.queue, 'queue').to.eql(['7A'])
    expect(persistence.used.length, 'used size').to.eq(0)
    expect(persistence.advanced.length, 'advanced size').to.eq(1)
  })

  it('reshuffleExceptHighestValueQueueCard_noQueue', () => {
    const deck = TaskCardDeck.fromPersistence({
      pile: ['1A'],
      queue: [],
      used: ['2A'],
      advanced: ['4B']
    })

    deck.reshuffleExceptHighestValueQueueCard()

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile size').to.eq(2)
    expect(persistence.queue.length, 'queue size').to.eq(0)
    expect(persistence.used.length, 'used size').to.eq(0)
    expect(persistence.advanced.length, 'advanced size').to.eq(1)
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
    expect(persistence.pile.length, 'pile size').to.eq(2)
    expect(persistence.pile.includes('4B'), 'pile includes 4B').to.true
    expect(persistence.queue.length, 'queue size').to.eq(0)
    expect(persistence.used.length, 'used size').to.eq(1)
    expect(persistence.advanced.length, 'advanced size').to.eq(0)
  })
})
