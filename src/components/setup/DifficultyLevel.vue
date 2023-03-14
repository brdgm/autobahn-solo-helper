<template>
  <h3 class="mt-4 mb-3">{{t('setup.difficultyLevel.title')}}</h3>

  <div class="row">
    <div class="col-1 text-end">
      <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.easy')}}</label>
    </div>
    <div class="col-8 col-md-4">
      <input type="range" class="form-range" min="1" max="12" id="difficultyLevel"
          :value="difficultyLevel" @input="updateDifficultyLevel($event)">
    </div>
    <div class="col-1">
      <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.hard')}}</label>
    </div>
  </div>  
  <div class="row">
    <div class="offset-md-1 col-10 col-md-5 text-muted small">
      <span v-html="t('setup.difficultyLevel.level', {level:difficultyLevel})"></span>
      <ul>
        <li v-if="difficultyLevel < 7" v-html="t('setup.difficultyLevel.easySoloBoard')"></li>
        <li v-else v-html="t('setup.difficultyLevel.hardSoloBoard')"></li>
        <li v-if="between(difficultyLevel, 2, 6) || between(difficultyLevel, 8, 12)" v-html="t('setup.difficultyLevel.increaseDifficulty1')"></li>
        <li v-if="between(difficultyLevel, 3, 6) || between(difficultyLevel, 9, 12)" v-html="t('setup.difficultyLevel.increaseDifficulty2')"></li>
        <li v-if="between(difficultyLevel, 4, 6) || between(difficultyLevel, 10, 12)" v-html="t('setup.difficultyLevel.increaseDifficulty3')"></li>
        <li v-if="difficultyLevel==5 || difficultyLevel==11" v-html="t('setup.difficultyLevel.increaseDifficulty4')"></li>
        <li v-if="difficultyLevel==6 || difficultyLevel==12" v-html="t('setup.difficultyLevel.increaseDifficulty5')"></li>
      </ul>
    </div>
  </div>  

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'

export default defineComponent({
  name: 'DifficultyLevel',
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  data() {
    return {
      difficultyLevel: this.$store.state.setup.difficultyLevel
    }
  },
  methods: {
    updateDifficultyLevel(event: Event) {
      this.difficultyLevel = parseInt((event.target as HTMLInputElement).value)
      this.$store.commit('setupDifficultyLevel', this.difficultyLevel)
    },
    between(value : number, min : number, max : number) : boolean {
      return value >= min && value <= max;
    }
  }
})
</script>
