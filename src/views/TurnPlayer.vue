<template>
  <h1>{{t('turnPlayer.title')}}</h1>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </router-link>

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
  name: 'TurnPlayer',
  components: {
    FooterButtons,
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const store = useStore()
    const navigationState = new NavigationState(route, store.state)
    const round = navigationState.round
    return { t, round }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/round/${this.round}/bot`
    },
    nextButtonRouteTo() : string {
      return `/round/${this.round + 1}/bot`
    },
  },
})
</script>
