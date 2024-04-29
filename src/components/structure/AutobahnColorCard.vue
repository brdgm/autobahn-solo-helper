<template>
  <div>
    <div class="card-border">
      <div v-for="color of colorCard.colors" :key="color" class="color-part"
          :style="`background-color:${getColorCode(color)};width:${100/colorCard.colors.length}%;`"></div>
    </div>
  </div>
</template>

<script lang="ts">
import ColorCard from '@/services/ColorCard'
import AutobahnColor from '@/services/enum/AutobahnColor'
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
.card-border {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  border: 3px solid black;
  border-radius: 8px;
}
.color-part {
  height: 100%;
}
.color-part:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.color-part:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
