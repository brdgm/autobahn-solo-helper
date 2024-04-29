<template>
  <ModalDialog id="loadTruckModal" :title="t('loadTruck.title')" :size-xl="true" :scrollable="true">
    <template #body>
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
          <button class="nav-link active" id="tablink-load-truck" data-bs-toggle="tab" data-bs-target="#tab-load-truck" type="button" role="tab" aria-controls="tab-load-truck" aria-selected="false">{{t('loadTruck.title')}}</button>
        </li>
        <li class="nav-item">
          <button class="nav-link" id="tablink-pharmaceuticals" data-bs-toggle="tab" data-bs-target="#tab-pharmaceuticals" type="button" role="tab" aria-controls="tab-pharmaceuticals" aria-selected="true">{{t('loadTruck.loadingPharmaceuticals.title')}}</button>
        </li>
        <li v-if="hasWineExpansion" class="nav-item">
          <button class="nav-link" id="tablink-wine-module" data-bs-toggle="tab" data-bs-target="#tab-wine-module" type="button" role="tab" aria-controls="tab-wine-module" aria-selected="true">{{t('loadTruck.wineModule.title')}}</button>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane show active" id="tab-load-truck" role="tabpanel" aria-labelledby="tablink-load-truck" tabindex="0">
          <ul>
            <li v-html="t('loadTruck.intro1')"></li>
            <li v-html="t('loadTruck.intro2')"></li>
            <li v-html="t('loadTruck.intro3')"></li>
            <li v-html="t('loadTruck.intro4')"></li>
            <li v-html="t('loadTruck.intro5')"></li>
          </ul>
          <h6 v-html="t('loadTruck.loadNonBlack.title')"></h6>
          <p v-html="t('loadTruck.loadNonBlack.info')"></p>
          <h6 v-html="t('loadTruck.loadBlack.title')"></h6>
          <p v-html="t('loadTruck.loadBlack.info')"></p>
          <h6 v-html="t('loadTruck.priority.title')"></h6>
          <ol>
            <li v-html="t('loadTruck.priority.item1')"></li>
            <li v-html="t('loadTruck.priority.item2')"></li>
            <li v-html="t('loadTruck.priority.item3')"></li>
            <li v-html="t('loadTruck.priority.item4')"></li>
          </ol>
          <p v-html="t('loadTruck.developmentToken')"></p>
        </div>
        <div class="tab-pane" id="tab-pharmaceuticals" role="tabpanel" aria-labelledby="tablink-pharmaceuticals" tabindex="0">
          <p v-html="t('loadTruck.loadingPharmaceuticals.info')"></p>
        </div>
        <div v-if="hasWineExpansion" class="tab-pane" id="tab-wine-module" role="tabpanel" aria-labelledby="tablink-wine-module" tabindex="0">
          <p v-html="t('loadTruck.wineModule.info1')"></p>
          <p v-html="t('loadTruck.wineModule.info2')"></p>
        </div>
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'LoadTruckModal',  
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    hasWineExpansion() : boolean {
      return this.state.setup.expansions.includes(Expansion.WINE)
    },
  }
})
</script>
