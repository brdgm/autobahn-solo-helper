<template>
  <div class="sidebar">
    <div class="era" v-html="t('sidebar.era', {era:navigationState.era})"></div>
    <div class="round">
      <span v-html="t('sidebar.round', {round:navigationState.round})"></span>
      <span v-if="showLastTurn" class="last-turn" v-html="t('sidebar.lastTurn')"></span>
    </div>
    <BotStatus :task-card-deck="navigationState.taskCardDeck" :color-card-deck="navigationState.colorCardDeck"/>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState';
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n';
import BotStatus from './BotStatus.vue';

export default defineComponent({
  name: 'SideBar',  
  components: {
    BotStatus
},
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    showLastTurn() : boolean {
      return this.navigationState.lastTurn || this.navigationState.secondToLastTurn
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 200px;
  margin-right: -12px;
  margin-left: 20px;
  .era {
    font-weight: bold;
  }
  .round {
    margin-bottom: 10px;
    .last-turn {
      color: red;
      font-weight: bold;
      margin-left: 0.5em;
    }
  }
  @media (max-width: 500px) {
    float: unset;
    margin: 0;
    width: 100%;
    .round, .era {
      display: inline-block;
      margin-right: 5px;
    }
  }
}
</style>
