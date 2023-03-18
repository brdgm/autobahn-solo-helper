<template>
  <div class="card">
    <div v-for="color of colorCard.colors" :key="color" class="color"
        :style="`background-color:${getColorCode(color)};`"></div>
  </div>
</template>

<script lang="ts">
import ColorCard from '@/services/ColorCard';
import AutobahnColor from '@/services/enum/AutobahnColor';
import getAutobahnColorCode from '@/util/getAutobahnColorCode'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'AutobahnColorCard',
  props: {
    colorCard: {
      type: Object as PropType<ColorCard>,
      required: true
    },
  },
  methods: {
    getColorCode(color: AutobahnColor) {
      return getAutobahnColorCode(color)
    }
  }
})
</script>


<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: row;
  width: 120px;
  height: 200px;
  border: 3px solid black;
  border-radius: 8px;
}
.color {
  height: 100%;
  width: 100%;
}
.color:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.color:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
