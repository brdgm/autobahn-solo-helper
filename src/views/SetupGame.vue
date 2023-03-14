<template>
  <h1>{{t('setup.title')}}</h1>

  <DifficultyLevel />
  <ExpansionsSetup/>

  <router-link to="/setupAutobot" class="btn btn-primary btn-lg mt-4">
    {{t('setupAutobot.title')}}
  </router-link>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import ExpansionsSetup from '@/components/setup/ExpansionsSetup.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    DifficultyLevel,
    ExpansionsSetup
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
