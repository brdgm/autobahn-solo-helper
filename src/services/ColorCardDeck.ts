import { ColorCardDeckPersistence } from '@/store'
import * as _ from 'lodash'
import ColorCard from './ColorCard'
import AutobahnColor from './enum/AutobahnColor'

export default class ColorCardDeck {

  private _pile : ColorCard[]
  private _used : ColorCard[]

  public constructor(pile : ColorCard[], used : ColorCard[]) {
    this._pile = pile
    this._used = used
  }

  public get pile() : readonly ColorCard[] {
    return this._pile
  }

  public get used() : readonly ColorCard[] {
    return this._used
  }

  public isPileEmpty() : boolean {
    return this._pile.length == 0
  }

  public isUsedEmpty() : boolean {
    return this._used.length == 0
  }

  /**
   * Draws a card from the draw pile.
   * @returns Next card
   */
  public draw() : ColorCard {
    const nextCard = this._pile.shift()
    if (!nextCard) {
      throw new Error('Color card draw pile is empty.')
    }
    return nextCard
  }

  /**
   * Put card to used pile.
   * @param card Card
   */
  public putToUsed(card : ColorCard) {
    this._used.push(card)
  }

  /**
   * Reshuffles all cards in a new draw pile.
   */
  public reshuffle() : void {
    this._pile.push(...this._used)
    this._used = []
    this._pile = _.shuffle(this._pile)
  }

  /**
   * Add a new card to draw pile and shuffle it.
   * @param card New card
   */
  public addCard(card : ColorCard) {
    this._pile.push(card)
    this._pile = _.shuffle(this._pile)
  }

  /**
   * Adds the yellow card for era 3 on top of the draw pile.
   */
  public addYellowCardForEra3() {
    this._pile.unshift({colors:[AutobahnColor.YELLOW],additionalBuildRoadAction:true})
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : ColorCardDeckPersistence {
    return {
      pile: _.clone(this._pile),
      used: _.clone(this._used)
    }
  }

  /**
   * Creates shuffled new deck of all non-yellow color cards.
   */
  public static new() : ColorCardDeck {
    const pile = _.shuffle(Object.values(AutobahnColor)
      .filter(color => color != AutobahnColor.YELLOW)
      .map(color => ({ colors: [color] })))
    return new ColorCardDeck(pile, [])
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : ColorCardDeckPersistence) : ColorCardDeck {
    return new ColorCardDeck(
      _.clone(persistence.pile),
      _.clone(persistence.used)
    )
  }

}
