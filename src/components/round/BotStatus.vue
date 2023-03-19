<template>
  <div class="sidebar">
    <h5>Autobot Status</h5>
    <h6>Task Queue</h6>
    <AppIcon v-for="taskCard of taskCardDeck.queue" :key="taskCard.id"
        type="action" :name="taskCard.action" class="action-icon"/>
    <h6>Used Colors</h6>
    <AutobahnColorCard v-for="(colorCard, index) of colorCardDeck.used" :key="index"
        :color-card="colorCard" class="color-card"/>
    <h6>Used Actions</h6>
    <AppIcon v-for="taskCard of taskCardDeck.used" :key="taskCard.id"
        type="action" :name="taskCard.action" class="action-icon"/>
  </div>
</template>

<script lang="ts">
import ColorCardDeck from '@/services/ColorCardDeck';
import TaskCardDeck from '@/services/TaskCardDeck';
import { defineComponent, PropType } from 'vue'
import AppIcon from '../structure/AppIcon.vue';
import AutobahnColorCard from '../structure/AutobahnColorCard.vue';

export default defineComponent({
  name: 'BotStatus',
  components: {
    AutobahnColorCard,
    AppIcon
  },
  props: {
    colorCardDeck: {
      type: ColorCardDeck,
      required: true
    },
    taskCardDeck: {
      type: TaskCardDeck,
      required: true
    },
  },
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 170px;
}
.color-card {
  display: inline-block;
  margin-right: 5px;
  width: 35px;
  height: 35px;
}
.action-icon {
  width: 50px;
  margin-right: 5px;
  margin-bottom: 5px;
  filter: drop-shadow(1px 1px 2px #555);
}
</style>
