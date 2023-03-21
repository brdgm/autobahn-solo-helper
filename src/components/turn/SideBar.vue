<template>
  <div class="sidebar">
    <p>
      <b><span v-html="t('sidebar.era', {era:navigationState.era})"></span></b><br/>
      <span v-html="t('sidebar.round', {round:navigationState.round})"></span>
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
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 200px;
  margin-right: -12px;
}
</style>
