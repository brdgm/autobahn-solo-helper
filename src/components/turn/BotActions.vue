<template>

  <div class="main-action">
    <div class="actions">
      <div class="additional-action" v-if="colorCard.additionalBuildRoadAction">
        <a data-bs-toggle="modal" href="#buildRoadUpgradeLinkModal"><AppIcon type="action" name="build-road"/></a>
        <div class="and-or">and/or</div>
      </div>
      <div class="action">
        <a data-bs-toggle="modal" :href="getActionInfoModalTarget(taskCard.action)"><AppIcon type="action" :name="taskCard.action"/></a>
      </div>
    </div>
    <AutobahnColorCard :color-card="colorCard" class="card"/>
  </div>

  <template v-if="taskCard.bonusAction">
    <div class="bonus-action">
      <a data-bs-toggle="modal" href="#botGainBonusModal"><AppIcon type="bonus-action" :name="taskCard.bonusAction"/></a>
    </div>
  </template>

</template>

<script lang="ts">
import ColorCard from '@/services/ColorCard';
import Action from '@/services/enum/Action';
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
  methods: {
    getActionInfoModalTarget(action : Action) : string {
      switch (action) {
        case Action.BUILD_ROAD:
        case Action.BUILD_ROAD_UPGRADE_LINK:
        case Action.UPGRADE_LINK:
          return '#buildRoadUpgradeLinkModal'
        case Action.LOAD_TRUCK:
          return '#loadTruckModal'
        case Action.BUILD_SERVICE_STATION:
          return '#buildServiceStationModal'
        default:
          return '#'
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  width: 120px;
  height: 200px;
}
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
      width: 70px;
      filter: drop-shadow(2px 2px 4px #333);
    }
    .additional-action {
      .and-or {
        margin-bottom: 5px;
        background-color: white;
        text-align: center;
        font-weight: bold;
      }
    }
  }
}
.bonus-action {
  margin-top: 20px;
  margin-bottom: 10px;
  img {
    width: 50px;
    filter: drop-shadow(2px 2px 4px #333);
  }
}
a[data-bs-toggle=modal] {
  cursor: help;
}
</style>
