<template>
  <h1>{{t('turnBot.title')}}</h1>

  <BotActions :color-card="colorCard" :task-card="taskCard"/>

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
import BotActions from '@/components/round/BotActions.vue'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    BotActions
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const store = useStore()
    const navigationState = new NavigationState(route, store.state)
    const round = navigationState.round
    const colorCardDeck = navigationState.colorCardDeck
    const taskCardDeck = navigationState.taskCardDeck

    // draw color and task card
    const colorCard = colorCardDeck.draw()
    if (taskCardDeck.isPileEmpty()) {
      taskCardDeck.reshuffleExceptHighestValueTaskQueue()      
    }
    const taskCard = taskCardDeck.draw()

    return { t, round, colorCardDeck, taskCardDeck, colorCard, taskCard }
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
      this.taskCardDeck.putToUsed(this.taskCard)

      // reshuffle decks if no color card left
      if (this.colorCardDeck.isPileEmpty()) {
        this.colorCardDeck.reshuffle()
        this.taskCardDeck.reshuffleExceptHighestValueTaskQueue()
      }

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
