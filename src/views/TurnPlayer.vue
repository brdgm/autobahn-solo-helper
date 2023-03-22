<template>
  <SideBar :navigation-state="navigationState" />

  <h1>{{t('turnPlayer.title')}}</h1>

  <ol class="mt-4">
    <li v-html="t('turnPlayer.claimDeliveryBonus')"></li>
    <li v-html="t('turnPlayer.takeAction')"></li>
    <li v-html="t('turnPlayer.moveTrucks')"></li>
    <ul>
      <li v-html="t('turnPlayer.moveTrucksAutobotInfo')"></li>
    </ul>
  </ol>

  <button @click="nextTurn" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </button>

  <div class="form-check mt-4" v-if="navigationState.canEndEra">
    <input class="form-check-input" type="checkbox" :value="true" id="endEraCheckbox" v-model="endEra">
    <label class="form-check-label" for="endEraCheckbox" v-html="t('turnPlayer.endEra', {era:navigationState.era})"></label>
  </div>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import { useStore } from '@/store'
import SideBar from '@/components/turn/SideBar.vue'
import Player from '@/services/enum/Player'
import Era from '@/services/enum/Era'

export default defineComponent({
  name: 'TurnPlayer',
  components: {
    FooterButtons,
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
    return { t, navigationState, turn, colorCardDeck, taskCardDeck }
  },
  data() {
    return {
      endEra: false
    }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.navigationState.eraEndedLastTurn) {
        return `/turn/${this.turn - 1}/endOfEra`
      }
      else if (this.navigationState.botSkippedLastTurn) {
        return `/turn/${this.turn - 1}/bot`
      }
      return `/turn/${this.turn - 1}/botMoveTrucks`
    }
  },
  methods: {
    nextTurn() : void {
      if (this.endEra && this.navigationState.era == Era.ERA2) {
        this.colorCardDeck.addYellowCardForEra3()
      }
      const turn = {
        turn: this.turn + 1,
        round: this.navigationState.round + 1,
        era: this.endEra && this.navigationState.era < Era.ERA3 ? this.navigationState.era + 1 : this.navigationState.era,
        player: Player.BOT,
        colorCardDeck: this.colorCardDeck.toPersistence(),
        taskCardDeck: this.taskCardDeck.toPersistence(),
        eraEndedLastTurn: this.endEra ? true : undefined
      }
      this.$store.commit('turn', turn)
      let nextButtonRouteTo
      if (this.navigationState.lastTurn || (this.endEra && this.navigationState.era < Era.ERA3)) {
        nextButtonRouteTo = `/turn/${this.turn}/endOfEra`
      }
      else {
        nextButtonRouteTo = `/turn/${this.turn + 1}/bot`
      }
      this.$router.push(nextButtonRouteTo)
    }
  }
})
</script>
