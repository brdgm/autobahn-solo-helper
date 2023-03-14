<template>
  <h1>{{t('setupAutobot.title')}}</h1>

  <p>...</p>

  <router-link to="/start" class="btn btn-primary btn-lg mt-4">
    {{t('action.startGame')}}
  </router-link>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'SetupAutobot',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
