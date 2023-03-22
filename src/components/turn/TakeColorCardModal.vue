<template>
  <ModalDialog id="takeColorCardModal" :title="t('takeColorCard.title')">
    <template #body>
      <p v-html="t('takeColorCard.pickColors')"></p>
      <div class="color-list">
        <div class="form-check" v-for="color of allColors" :key="color">
          <input class="form-check-input" type="checkbox" :value="color" :id="`pickColor-${color}`" v-model="pickedColors">
          <label class="form-check-label" :for="`pickColor-${color}`">
            <div class="color" :style="`background-color:${getColorCode(color)};`"></div>
          </label>
        </div>        
      </div>
      <p class="mt-3" v-html="t('takeColorCard.pickAction')"></p>
      <div class="form-check icon-check">
        <input class="form-check-input" type="checkbox" :value="true" id="hasBuildRoadAction" v-model="additionalBuildRoadAction" :disabled="!yellowCardSelected">
        <label class="form-check-label" for="hasBuildRoadAction">
          <AppIcon class="icon" name="additional-build-road-action"/>
        </label>
      </div>        
    </template>
    <template #footer>
      <button class="btn btn-primary" @click="addColorCard" data-bs-dismiss="modal" :disabled="!validChoice">{{t('takeColorCard.title')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n';
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import AutobahnColor from '@/services/enum/AutobahnColor';
import getAutobahnColorCode from '@/util/getAutobahnColorCode'
import AppIcon from '../structure/AppIcon.vue';
import ColorCardDeck from '@/services/ColorCardDeck';

export default defineComponent({
  name: 'TakeColorCardModal',  
  components: {
    ModalDialog,
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
  },
  data() {
    return {
      pickedColors: [] as AutobahnColor[],
      additionalBuildRoadAction: false
    }
  },
  computed: {
    allColors() : AutobahnColor[] {
      return Object.values(AutobahnColor)
    },
    yellowCardSelected() : boolean {
      return this.pickedColors.includes(AutobahnColor.YELLOW)
    },
    validChoice() : boolean {
      return this.pickedColors.length > 0
        && (!this.additionalBuildRoadAction || this.yellowCardSelected)
    }
  },
  methods: {
    getColorCode(color: AutobahnColor) {
      return getAutobahnColorCode(color)
    },
    addColorCard() : void {
      this.colorCardDeck.addCard({
        colors: this.pickedColors,
        additionalBuildRoadAction: this.additionalBuildRoadAction
      })
      this.pickedColors = []
      this.additionalBuildRoadAction = false
    }
  }
})
</script>

<style lang="scss" scoped>
.color-list {
  column-count: 3;
  .color {
    width: 100px;
    height: 30px;
    border: 3px solid black;
  }
}
.icon {
  width: 70px;
}
.icon-check .form-check-input {
  margin-top: 10px;
}
</style>
