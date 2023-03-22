import ColorCardDeck from '@/services/ColorCardDeck'
import AutobahnColor from '@/services/enum/AutobahnColor'
import { expect } from 'chai'

describe('services/ColorCardDeck', () => {
  it('new', () => {
    const deck = ColorCardDeck.new()

    expect(deck.pile.length, 'pile size').to.eq(6)
    expect(deck.used.length, 'used size').to.eq(0)

    expect(deck.isPileEmpty(), 'pile empty').to.false
    expect(deck.isUsedEmpty(), 'used empty').to.true

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile size').to.eq(6)
    expect(persistence.used.length, 'used size').to.eq(0)
  })

  it('drawShuffle', () => {
    const deck = ColorCardDeck.fromPersistence({
      pile: [{colors:[AutobahnColor.BLACK]},{colors:[AutobahnColor.ORANGE]},{colors:[AutobahnColor.PURPLE]}],
      used: []
    })

    const card1 = deck.draw()
    deck.putToUsed(card1)
    expect(card1.colors[0]).to.eq(AutobahnColor.BLACK)
    expect(deck.pile.includes(card1)).to.false
    expect(deck.used.includes(card1)).to.true

    const card2 = deck.draw()
    deck.putToUsed(card2)
    expect(card2.colors[0]).to.eq(AutobahnColor.ORANGE)
    expect(deck.pile.includes(card2)).to.false
    expect(deck.used.includes(card2)).to.true

    deck.reshuffle()
    expect(deck.pile.length, 'pile size').to.eq(3)
    expect(deck.used.length, 'used size').to.eq(0)
  })

  it('addCard', () => {
    const deck = ColorCardDeck.new()
    deck.addCard({colors: [AutobahnColor.YELLOW,AutobahnColor.WHITE], additionalBuildRoadAction: true})

    expect(deck.pile.length, 'pile size').to.eq(7)
    expect(deck.used.length, 'used size').to.eq(0)
  })

  it('addYellowCardForEra3', () => {
    const deck = ColorCardDeck.new()
    deck.addYellowCardForEra3()

    expect(deck.pile.length, 'pile size').to.eq(7)
    expect(deck.pile[0], '1st card').to.eql({colors:[AutobahnColor.YELLOW],additionalBuildRoadAction:true})
    expect(deck.used.length, 'used size').to.eq(0)
  })
})
