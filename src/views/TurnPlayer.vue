<template>
  <SideBar :navigation-state="navigationState" />

  <h1>{{t('turnPlayer.title')}}</h1>

  <button @click="nextTurn" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
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
  computed: {
    backButtonRouteTo() : string {
      return `/turn/${this.turn - 1}/bot`
    }
  },
  methods: {
    nextTurn() : void {
      const turn = {
        turn: this.turn + 1,
        round: this.navigationState.round + 1,
        era: this.navigationState.era,
        player: Player.BOT,
        colorCardDeck: this.colorCardDeck.toPersistence(),
        taskCardDeck: this.taskCardDeck.toPersistence()
      }
      this.$store.commit('turn', turn)
      const nextButtonRouteTo = `/turn/${this.turn + 1}/bot`
      this.$router.push(nextButtonRouteTo)
    }
  }
})
</script>
