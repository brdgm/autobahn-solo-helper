<template>
  <SideBar :navigation-state="navigationState" />

  <h1>{{t('endOfEra.title', {era:navigationState.era})}}</h1>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </router-link>

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

export default defineComponent({
  name: 'EndOfEra',
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
      if (this.navigationState.lastTurn) {
        return `/turn/${this.turn}/endOfGame`
      }
      else if (this.navigationState.player == Player.PLAYER) {
        return `/turn/${this.turn + 1}/bot`
      }
      else {
        return `/turn/${this.turn + 1}/player`
      }
    },
    backButtonRouteTo() : string {
      return `/turn/${this.turn}/${this.navigationState.player}`
    }
  }
})
</script>
