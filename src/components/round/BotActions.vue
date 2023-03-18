<template>

  <div class="main-action">
    <div class="actions">
      <div class="action">
        <AppIcon v-for="action of taskCard.actions" :key="action" type="action" :name="action"/>
      </div>
      <div class="additional-action" v-if="colorCard.additionalBuildAction">
        <div class="and-or">and/or</div>
        <AppIcon type="action" name="build-road"/>
      </div>
    </div>
    <AutobahnColorCard :color-card="colorCard"/>
  </div>

  <template v-if="taskCard.bonusAction">
    <div class="mt-3 mb-3">
      <AppIcon type="bonus-action" :name="taskCard.bonusAction"/>
    </div>
  </template>
  

</template>

<script lang="ts">
import ColorCard from '@/services/ColorCard';
import TaskCard from '@/services/TaskCard';
import { defineComponent, PropType } from 'vue'
import AppIcon from '../structure/AppIcon.vue';
import AutobahnColorCard from '../structure/AutobahnColorCard.vue';

export default defineComponent({
  name: 'BotActions',
  components: {
    AutobahnColorCard,
    AppIcon
  },
  props: {
    colorCard: {
      type: Object as PropType<ColorCard>,
      required: true
    },
    taskCard: {
      type: Object as PropType<TaskCard>,
      required: true
    },
  },
})
</script>

<style lang="scss" scoped>
.main-action {
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  .actions {
    position: absolute;
    padding: 20px;
    width: 120px;
    height: 160px;
    z-index: 100;
    .action {
      position: relative;
      width: 80px;
      height: 70px;
    }
    img {
      width: 50px;
      filter: drop-shadow(2px 2px 4px #333);
    }
    .action img:first-child {
      position: absolute;
      z-index: 120;
    }
    .action img:nth-child(2) {
      position: absolute;
      top: 20px;
      left: 30px;
      z-index: 110;
    }
    .additional-action {
      .and-or {
        margin-top: 10px;
        margin-bottom: 10px;
        background-color: white;
        text-align: center;
        font-weight: bold;
      }
    }
  }
}
</style>
