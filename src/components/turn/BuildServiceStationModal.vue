<template>
  <ModalDialog id="buildServiceStationModal" :title="t('buildServiceStation.title')" :size-xl="true" :scrollable="true">
    <template #body>
      <p v-html="t('buildServiceStation.intro')"></p>
      <h6 v-html="t('buildServiceStation.priority.title')"></h6>
      <ol>
        <li v-if="hasServicesExpansion" v-html="t('buildServiceStation.priority.itemServices')"></li>
        <li v-html="t('buildServiceStation.priority.item1')"></li>
        <li v-html="t('buildServiceStation.priority.item2')"></li>
        <li v-html="t('buildServiceStation.priority.item3')"></li>
      </ol>
      <p v-html="t('buildServiceStation.noViableSpace')"></p>
      <p v-html="t('buildServiceStation.era3Info')"></p>
      <p v-html="t('buildServiceStation.gainBonus')"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'BuildServiceStationModal',  
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    hasServicesExpansion() : boolean {
      return this.state.setup.expansions.includes(Expansion.SERVICES)
    },
  },
})
</script>
