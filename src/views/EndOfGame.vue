<template>
  <h1>{{t('endOfGame.title', {era:navigationState.era})}}</h1>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import { useStore } from '@/store'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons
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
    backButtonRouteTo() : string {
      return `/turn/${this.turn}/endOfEra`
    }
  }
})
</script>
