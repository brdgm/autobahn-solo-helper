<template>
  <ModalDialog id="loadTruckModal" :title="t('loadTruck.title')" :size-xl="true" :scrollable="true">
    <template #body>
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
      <h6 v-html="t('loadTruck.loadingPharmaceuticals.title')"></h6>
      <p v-html="t('loadTruck.loadingPharmaceuticals.info')"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n';
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'LoadTruckModal',  
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
})
</script>
