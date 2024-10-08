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
  
  <img class="bot-setup" src="../assets/bot-setup.png" alt=""/>

  <button @click="startGame" class="btn btn-primary btn-lg mt-4">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'
import ColorCardDeck from '@/services/ColorCardDeck'
import TaskCardDeck from '@/services/TaskCardDeck'
import router from '@/router'
import Era from '@/services/enum/Era'
import Player from '@/services/enum/Player'

export default defineComponent({
  name: 'SetupAutobot',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    difficultyLevel() : number {
      return this.state.setup.difficultyLevel;
    },
    soloBoardMode() : string {
      if (this.difficultyLevel >= 7) {
        return 'hard'
      } else {
        return 'easy'
      }    
    },
    hasWineExpansion() : boolean {
      return this.state.setup.expansions.includes(Expansion.WINE)
    },
  },
  methods: {
    startGame() : void {
      this.state.resetGame()
      const colorCardDeck = ColorCardDeck.new()
      const taskCardDeck = TaskCardDeck.new()
      const turn = {
        turn: 1,
        round: 1,
        era: Era.ERA1,
        player: Player.BOT,
        colorCardDeck: colorCardDeck.toPersistence(),
        taskCardDeck: taskCardDeck.toPersistence()
      }
      this.state.turn(turn)
      router.push('/turn/1/bot')
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
