<template>
  <h1>{{t('setupAutobot.title')}}</h1>

  <p v-html="t('setupAutobot.twoPlayers')"></p>
  <p v-html="t('setupAutobot.pickPlayerColor')"></p>
  <p v-html="t('setupAutobot.setupAutobotComponents')"></p>
  <ol>
    <li v-html="t('setupAutobot.placeSoloBoard', {soloBoard:t(`soloBoard.${soloBoardMode}`)})"></li>
    <li v-html="t('setupAutobot.chooseDeliveryBoard')"></li>
    <li v-html="t('setupAutobot.placeEmployees')"></li>
    <li v-html="t('setupAutobot.placeServiceStations')"></li>
    <li v-html="t('setupAutobot.placeDevelopmentToken')"></li>
    <li v-html="t('setupAutobot.placeBlackConstructionOffice')"></li>
    <li v-html="t('setupAutobot.setupPlayerPlayArea')"></li>
    <li v-if="hasWineExpansion" v-html="t('setupAutobot.winePickCard')"></li>
  </ol>
  <p v-html="t('setupAutobot.unlimitedBudget')"></p>
  
  <img class="bot-setup" src="../assets/bot-setup.png"/>

  <button @click="startGame" class="btn btn-primary btn-lg mt-4">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { store, useStore } from '@/store'
import Expansion from '@/services/enum/Expansion'
import ColorCardDeck from '@/services/ColorCardDeck'
import TaskCardDeck from '@/services/TaskCardDeck'
import router from '@/router'

export default defineComponent({
  name: 'SetupAutobot',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  computed: {
    difficultyLevel() : number {
      return this.$store.state.setup.difficultyLevel;
    },
    soloBoardMode() : string {
      if (this.difficultyLevel >= 7) {
        return 'hard';
      } else {
        return 'easy';
      }    
    },
    hasWineExpansion() : boolean {
      return this.$store.state.setup.expansions.includes(Expansion.WINE)
    },
  },
  methods: {
    startGame() : void {
      store.commit('resetGame')
      const colorCardDeck = ColorCardDeck.new()
      const taskCardDeck = TaskCardDeck.new()
      const round = { round: 1, colorCardDeck: colorCardDeck.toPersistence(), taskCardDeck: taskCardDeck.toPersistence() }
      store.commit('round', round)
      router.push('/round/1/bot')
    }
  }
})
</script>

<style lang="scss" scoped>
.bot-setup {
  display: block;
  width: 100%;
  max-width: 500px;
}
</style>
