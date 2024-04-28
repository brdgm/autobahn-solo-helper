<template>
  <h3 class="mt-4 mb-3">{{t('setup.difficultyLevel.title')}}</h3>

  <div class="row">
    <div class="col-1 text-end">
      <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.easy')}}</label>
    </div>
    <div class="col-8 col-md-6">
      <input type="range" class="form-range" min="1" max="12" id="difficultyLevel"
          :value="difficultyLevel" @input="updateDifficultyLevel($event)">
    </div>
    <div class="col-1">
      <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.hard')}}</label>
    </div>
  </div>  
  <div class="row">
    <div class="offset-md-1 col-10 col-md-7 text-muted small">
      <span v-html="t('setup.difficultyLevel.level', {level:difficultyLevel})"></span>
      <ul>
        <li v-html="t(`soloBoard.${difficulty.soloBoard}`)"></li>
        <li v-if="difficulty.truckMoveAdditionalStep" v-html="t('setup.difficultyLevel.truckMoveAdditionalStep')"></li>
        <li v-if="difficulty.playerTruckPassesServiceStationDevelopmentStep" v-html="t('setup.difficultyLevel.playerTruckPassesServiceStationDevelopmentStep')"></li>
        <li v-if="difficulty.skipTurnDevelopmentStep" v-html="t('setup.difficultyLevel.skipTurnDevelopmentStep')"></li>
        <li v-if="difficulty.endOfEraPromotions112" v-html="t('setup.difficultyLevel.endOfEraPromotions112')"></li>
        <li v-if="difficulty.endOfEraPromotions122" v-html="t('setup.difficultyLevel.endOfEraPromotions122')"></li>
      </ul>
    </div>
  </div>  

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Difficulty from '@/services/Difficulty'

export default defineComponent({
  name: 'DifficultyLevel',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const difficultyLevel = ref(state.setup.difficultyLevel)

    return { t, state, difficultyLevel }
  },
  computed: {
    difficulty() : Difficulty {
      return new Difficulty(this.difficultyLevel)
    }
  },
  methods: {
    updateDifficultyLevel(event: Event) {
      this.difficultyLevel = parseInt((event.target as HTMLInputElement).value)
      this.state.setup.difficultyLevel = this.difficultyLevel
    },
  }
})
</script>
