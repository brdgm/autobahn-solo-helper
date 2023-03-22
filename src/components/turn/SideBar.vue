<template>
  <div class="sidebar">
    <p>
      <b><span v-html="t('sidebar.era', {era:navigationState.era})"></span></b><br/>
      <span v-html="t('sidebar.round', {round:navigationState.round})"></span>
      <span v-if="showLastTurn" class="last-turn" v-html="t('sidebar.lastTurn')"></span>
    </p>
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
  .last-turn {
    color: red;
    font-weight: bold;
    margin-left: 0.5em;
  }
}
</style>
