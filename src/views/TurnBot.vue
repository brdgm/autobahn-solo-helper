<template>
  <SideBar :navigation-state="navigationState" :key="taskCard.id"/>

  <h1>{{t('turnBot.title')}}</h1>

  <template v-if="noViableActionAllTaskCards">
    <p class="mt-4" v-html="t('turnBot.turnSkipInfo')"></p>
    <button @click="skipTurn" class="btn btn-primary btn-lg mt-4">
      {{t('turnBot.turnSkip')}}
    </button>
  </template>
  <template v-else>
    <BotActions :color-card="colorCard" :task-card="taskCard"/>

    <button @click="actionCompleted" class="btn btn-success btn-lg mt-4">
      {{t('turnBot.actionCompleted')}}
    </button>
    <button @click="actionNotViable" class="btn btn-danger btn-lg mt-4 ms-3">
      {{t('turnBot.actionNotViable')}}
    </button>

    <div class="form-check mt-4" v-if="navigationState.canEndEra">
      <input class="form-check-input" type="checkbox" :value="true" id="endEraCheckbox" v-model="endEra">
      <label class="form-check-label" for="endEraCheckbox" v-html="t('turnBot.endEra', {era:navigationState.era})"></label>
    </div>
  </template>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import BotActions from '@/components/turn/BotActions.vue'
import SideBar from '@/components/turn/SideBar.vue'
import Player from '@/services/enum/Player'
import Era from '@/services/enum/Era'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    BotActions,
    SideBar
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const store = useStore()
    const navigationState = new NavigationState(route, store.state)
    const turn = navigationState.turn
    const colorCardDeck = navigationState.colorCardDeck
    const taskCardDeck = navigationState.taskCardDeck

    // draw color and task card
    const colorCard = colorCardDeck.draw()
    const taskCard = ref(taskCardDeck.draw())

    return { t, navigationState, turn, colorCardDeck, taskCardDeck, colorCard, taskCard }
  },
  data() {
    return {
      noViableActionAllTaskCards: false,
      endEra: false
    }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.turn == 1) {
        return ''
      }
      else if (this.navigationState.eraEndedLastTurn) {
        return `/turn/${this.turn - 1}/endOfEra`
      }
      return `/turn/${this.turn - 1}/player`
    }
  },
  methods: {
    actionNotViable() : void {
      if (this.taskCardDeck.isPileEmpty() && this.taskCardDeck.isUsedEmpty()) {
        this.noViableActionAllTaskCards = true
      }
      else {
        this.taskCardDeck.putToQueue(this.taskCard)
        this.taskCard = this.taskCardDeck.drawFromPile()
      }
    },
    actionCompleted() : void {
      this.colorCardDeck.putToUsed(this.colorCard)
      this.taskCardDeck.putToUsed(this.taskCard)

      // reshuffle decks if no color card left
      if (this.colorCardDeck.isPileEmpty()) {
        this.colorCardDeck.reshuffle()
        this.taskCardDeck.reshuffleExceptHighestValueQueueCard()
      }

      this.storeNextTurn();
      this.$router.push(`/turn/${this.turn}/botMoveTrucks`)
    },
    skipTurn() : void {
      this.colorCardDeck.reshuffle()
      this.taskCardDeck.putToUsed(this.taskCard)
      this.taskCardDeck.reshuffle()
      this.storeNextTurn(true);
      this.$router.push(`/turn/${this.turn + 1}/player`)
    },
    storeNextTurn(skipTurn = false) : void {
      if (this.endEra && this.navigationState.era == Era.ERA2) {
        this.colorCardDeck.addYellowCardForEra3()
      }
      const turn = {
        turn: this.turn + 1,
        round: this.navigationState.round,
        era: this.endEra && this.navigationState.era < Era.ERA3 ? this.navigationState.era + 1 : this.navigationState.era,
        player: Player.PLAYER,
        colorCardDeck: this.colorCardDeck.toPersistence(),
        taskCardDeck: this.taskCardDeck.toPersistence(),
        botSkippedLastTurn: skipTurn ? true : undefined,
        eraEndedLastTurn: this.endEra ? true : undefined
      }
      this.$store.commit('turn', turn)
    }
  }
})
</script>
