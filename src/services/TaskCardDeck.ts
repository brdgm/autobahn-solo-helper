import { TaskCardDeckPersistence } from "@/store"
import * as _ from "lodash"
import TaskCardLevel from "./enum/TaskCardLevel"
import TaskCard from "./TaskCard"
import TaskCards from "./TaskCards"

export default class TaskCardDeck {

  private _pile : TaskCard[]
  private _queue : TaskCard[]
  private _used : TaskCard[]
  private _advanced : TaskCard[]

  public constructor(pile : TaskCard[], queue : TaskCard[], used : TaskCard[], advanced : TaskCard[]) {
    this._pile = pile
    this._queue = queue
    this._used = used
    this._advanced = advanced
  }

  public get pile() : readonly TaskCard[] {
    return this._pile
  }

  public get queue() : readonly TaskCard[] {
    return this._queue
  }

  public get used() : readonly TaskCard[] {
    return this._used
  }

  public get advanced() : readonly TaskCard[] {
    return this._advanced
  }

  public isPileEmpty() : boolean {
    return this._pile.length == 0
  }

  public isQueueEmpty() : boolean {
    return this._queue.length == 0
  }

  public isUsedEmpty() : boolean {
    return this._used.length == 0
  }

  /**
   * Draw next card either from queue (if present) or from pile.
   */
  public draw() : TaskCard {
    if (!this.isQueueEmpty()) {
      return this.drawFromQueue()
    }
    return this.drawFromPile()
  }

  /**
   * Draws a card from the draw pile.
   * If the pile is empty it is reshuffled before drawing (keeping highest value queue card).
   * @returns Next card
   */
  public drawFromPile() : TaskCard {
    if (this.isPileEmpty()) {
      this.reshuffleExceptHighestValueQueueCard()      
    }
    const nextCard = this._pile.shift()
    if (!nextCard) {
      throw new Error('Task card draw pile is empty.')
    }
    return nextCard
  }

  /**
   * Draws a card from the queue.
   * @returns Next card
   */
  public drawFromQueue() : TaskCard {
    const nextCard = this._queue.shift()
    if (!nextCard) {
      throw new Error('Task card queue is empty.')
    }
    return nextCard
  }

  /**
   * Put card to used pile. In case the card was not draw from pile but from
   * task queue, it is removed form the task queue.
   * @param card Card
   */
  public putToUsed(card : TaskCard) {
    this._queue = this._queue
        .filter(item => item.id != card.id)
    this._used.push(card)
  }

  /**
   * Put a card to the task queue.
   * @param card Card
   */
  public putToQueue(card : TaskCard) {
    this._queue.push(card)
    // sort descendant by card order value
    this._queue.sort((cardA, cardB) => cardB.order - cardA.order)
  }

  /**
   * Reshuffles all cards in a new draw pile.
   */
  public reshuffle() : void {
    this._pile.push(...this._used)
    this._used = []
    this._pile.push(...this._queue)
    this._queue = []
    this._pile = _.shuffle(this._pile)
  }

  /**
   * Reshuffles all cards in a new draw pile except the highest value card in the task queue (if any present).
   */
  public reshuffleExceptHighestValueQueueCard() : void {
    const highestValueCard = this._queue.reduce(
      (highestCard, card) => (highestCard == undefined || card.order > highestCard.order) ? card : highestCard,
      this._queue[0]
    )
    this.reshuffle()
    if (highestValueCard) {
      this._pile = this._pile.filter(item => item.id != highestValueCard.id)
      this._queue.push(highestValueCard)
    }
  }

  /**
   * Add advanced card to draw pile and shuffle it.
   */
  public addAdvancedCard() : void {
    const card = this._advanced.shift()
    if (!card) {
      throw new Error('No advanced card left.')
    }
    this._pile.push(card)
    this._pile = _.shuffle(this._pile)
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : TaskCardDeckPersistence {
    return {
      pile: this._pile.map(card => card.id),
      queue: this._queue.map(card => card.id),
      used: this._used.map(card => card.id),
      advanced: this._advanced.map(card => card.id)
    }
  }

  /**
   * Creates a shuffled new deck with all task cards level A, and advanced level B cards in reserve.
   */
  public static new() : TaskCardDeck {
    const pile = _.shuffle(TaskCards.getAll(TaskCardLevel.A))
    const advanced = _.shuffle(TaskCards.getAll(TaskCardLevel.B))
    return new TaskCardDeck(pile, [], [], advanced)
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : TaskCardDeckPersistence) : TaskCardDeck {
    return new TaskCardDeck(
      persistence.pile.map(TaskCards.get),
      persistence.queue.map(TaskCards.get),
      persistence.used.map(TaskCards.get),
      persistence.advanced.map(TaskCards.get)
    )
  }

}
