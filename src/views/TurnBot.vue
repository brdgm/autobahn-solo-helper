<template>
  <h1>{{t('turnBot.title')}}</h1>

  <button @click="next" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" :endGameButtonType="endGameButtonType"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const store = useStore()
    const navigationState = new NavigationState(route, store.state)
    const round = navigationState.round
    const colorCardDeck = navigationState.colorCardDeck
    const taskCardDeck = navigationState.taskCardDeck
    return { t, round, colorCardDeck, taskCardDeck }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.round == 1) {
        return ''
      }
      return `/round/${this.round - 1}/player`
    },
    endGameButtonType() : string {
      if (this.round === 1) {
        return 'abortGame'
      }
      else {
        return 'endGame'
      }
    }
  },
  methods: {
    next() : void {
      const round = { round: this.round + 1,
        colorCardDeck: this.colorCardDeck.toPersistence(),
        taskCardDeck: this.taskCardDeck.toPersistence() }
      this.$store.commit('round', round)
      const nextButtonRouteTo = `/round/${this.round}/player`
      this.$router.push(nextButtonRouteTo)
    }
  }
})
</script>
