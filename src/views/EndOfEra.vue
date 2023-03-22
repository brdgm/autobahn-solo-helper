<template>
  <SideBar :navigation-state="navigationState" />

  <h1>{{t('endOfEra.title', {era:navigationState.era})}}</h1>

  <ol class="mt-4">
    <li v-html="t(`endOfEra.lastSectionBuildPromotion.${navigationState.player}`)"></li>
    <li v-if="botExtraPromotions > 0" v-html="t(`endOfEra.botExtraPromotions`, {count:botExtraPromotions})"></li>
    <li v-html="t('endOfEra.routeCard')"></li>
    <li v-html="t('endOfEra.constructionBudget')"></li>
    <ul>
      <li v-html="t('endOfEra.constructionBudgetAutobotInfo')"></li>
    </ul>
    <li v-if="showAutobotWineInfo" v-html="t('endOfEra.autobotWineInfo')"></li>
  </ol>

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
import Era from '@/services/enum/Era'
import Expansion from '@/services/enum/Expansion'

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
    const era = navigationState.era
    return { t, navigationState, turn, era }
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
    },
    botExtraPromotions() : number {
      if (this.navigationState.difficulty.endOfEraPromotions112) {
        return (this.era == Era.ERA1 || this.era == Era.ERA2) ? 1 : 2
      }
      else if (this.navigationState.difficulty.endOfEraPromotions122) {
        return (this.era == Era.ERA1) ? 1 : 2
      }
      return (this.era == Era.ERA1) ? 0 : 1
    },
    showAutobotWineInfo() : boolean {
      return this.$store.state.setup.expansions.includes(Expansion.WINE)
        && this.era == Era.ERA2
    },
  }
})
</script>
