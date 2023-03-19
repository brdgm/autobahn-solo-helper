<template>
  <div class="sidebar">
    <h5 v-html="t('botStatus.title')"></h5>

    <h6 v-html="t('botStatus.taskQueue')"></h6>
    <template v-if="taskCardDeck.isQueueEmpty()">
      <div class="none text-muted" v-html="t('turnBot.empty')"></div>
    </template>
    <template v-else>
      <AppIcon v-for="taskCard of taskCardDeck.queue" :key="taskCard.id"
          type="action" :name="taskCard.action" class="action-icon"/>
    </template>

    <h6 v-html="t('botStatus.taskPile')"></h6>
    <template v-if="taskCardDeck.isPileEmpty()">
      <div class="none text-muted" v-html="t('turnBot.empty')"></div>
    </template>
    <template v-else>
      <AppIcon v-for="index of taskCardDeck.pile.length" :key="index"
          type="action" name="unknown" class="action-icon"/>
    </template>

    <h6 v-html="t('botStatus.usedColors')"></h6>
    <template v-if="colorCardDeck.isUsedEmpty()">
      <div class="none text-muted" v-html="t('turnBot.none')"></div>
    </template>
    <template v-else>
      <AutobahnColorCard v-for="(colorCard, index) of colorCardDeck.used" :key="index"
        :color-card="colorCard" class="color-card"/>
    </template>

    <h6 v-html="t('botStatus.usedTasks')"></h6>
    <template v-if="taskCardDeck.isUsedEmpty()">
      <div class="none text-muted" v-html="t('turnBot.none')"></div>
    </template>
    <template v-else>
      <AppIcon v-for="taskCard of taskCardDeck.used" :key="taskCard.id"
        type="action" :name="taskCard.action" class="action-icon"/>
    </template>
  </div>
</template>

<script lang="ts">
import ColorCardDeck from '@/services/ColorCardDeck';
import TaskCardDeck from '@/services/TaskCardDeck';
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n';
import AppIcon from '../structure/AppIcon.vue';
import AutobahnColorCard from '../structure/AutobahnColorCard.vue';

export default defineComponent({
  name: 'BotStatus',  
  components: {
    AutobahnColorCard,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
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
  width: 200px;
  margin-right: -12px;
  padding: 15px;
  background-color: rgb(200, 221, 249);
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.color-card {
  display: inline-block;
  margin-right: 5px;
  width: 35px;
  height: 35px;
}
.action-icon {
  width: 38px;
  margin-right: 4px;
  margin-bottom: 6px;
  filter: drop-shadow(1px 1px 2px #555);
}
.none {
  margin-bottom: 10px;
  font-size: small;
}
</style>
