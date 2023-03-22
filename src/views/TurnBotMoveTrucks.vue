<template>
  <SideBar :navigation-state="navigationState"/>

  <h1>{{t('turnBotMoveTrucks.title')}}</h1>

  <p class="mt-4" v-html="t('turnBotMoveTrucks.moveSpaces', {numberOfSpaces:numberOfSpaces})"></p>
  <p v-html="t('turnBotMoveTrucks.moveTruckInfo')"></p>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </router-link>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import SideBar from '@/components/turn/SideBar.vue'
import Era from '@/services/enum/Era'

export default defineComponent({
  name: 'TurnBotMoveTrucks',
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

    return { t, navigationState, turn }
  },
  computed: {
    nextButtonRouteTo() : string {
      if (this.navigationState.lastTurn || (this.endEra && this.navigationState.era != Era.ERA3)) {
        return `/turn/${this.turn}/endOfEra`
      }
      else {
        return `/turn/${this.turn + 1}/player`
      }
    },
    backButtonRouteTo() : string {
      return `/turn/${this.turn}/bot`
    },
    endEra() : boolean {
      const nextTurn = this.$store.state.turns.find(item => item.turn == this.turn + 1)
      return nextTurn?.eraEndedLastTurn ? true : false
    },
    numberOfSpaces() : number {
      let spaces = (this.navigationState.era == Era.ERA1) ? 2 : 3
      if (this.navigationState.difficulty.truckMoveAdditionalStep) {
        spaces = spaces + 1
      }
      return spaces
    }
  }
})
</script>
